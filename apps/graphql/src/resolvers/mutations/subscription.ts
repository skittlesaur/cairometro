import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'
import Stripe from 'stripe'

import { Context } from '../../context'
import capitalizeFirstLetters from '../../lib/capitalize-first-letters'
import getSavedCard from '../../lib/get-saved-card'
import saveUserCard from '../../lib/save-user-card'
import sendEmail, { EmailTemplate } from '../../lib/send-email'

import { subscriptionMapping } from './migrations/dummy-database/subscriptions-pricing'


const createSubscription: FieldResolver<'Mutation', 'CreateSubscritpion'> =
  async (_, args, ctx: Context) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
      apiVersion: '2022-11-15',
    })
    const {
      cardNumber, expiryMonth, expiryYear, cardCvc, saveCard, metaData, cardId, cardHolder,
    } = args
    const { subscriptionTier, subscriptionType } = metaData
    const { user, prisma } = ctx

    if (!user) {
      throw new GraphQLError('User not Authenticated')

    }

    let card = {
      number: cardNumber,
      exp_month: expiryMonth,
      exp_year: expiryYear,
      cvc: cardCvc,
    }
    
    if (cardId){
      card = await getSavedCard(cardId, ctx)
    } else {
      if (!cardNumber || !expiryMonth || !expiryYear || !cardCvc) {
        throw new GraphQLError('Card details are missing')
      }
      // validate card details
      const cardNumberRegex = new RegExp('^[0-9]{16}$')
      const expiryMonthRegex = new RegExp('^[0-9]{2}$')
      const expiryYearRegex = new RegExp('^[0-9]{2}$')
      const cardCvcRegex = new RegExp('^[0-9]{3}$')
      if (!cardNumberRegex.test(cardNumber)) {
        throw new GraphQLError('Invalid card number')
      }
      if (!expiryMonthRegex.test(expiryMonth)) {
        throw new GraphQLError('Invalid expiry month')
      }
      if (!expiryYearRegex.test(expiryYear)) {
        throw new GraphQLError('Invalid expiry year')
      }
      if (!cardCvcRegex.test(cardCvc)) {
        throw new GraphQLError('Invalid card cvc')
      }
      if (saveCard){
        await saveUserCard({
          cardNumber,
          expiryMonth,
          expiryYear,
          cardCvc,
          holderName: cardHolder,
        }, ctx)
      }
    }
    
    try {
      const token = await stripe.tokens.create({
        card,
      })

      const mappingKey = `${user.role}_${subscriptionTier}_${subscriptionType}`
      const subscriptionId: string | undefined = subscriptionMapping[mappingKey]
      const plan = await stripe.prices.retrieve(subscriptionId)
      const customer = await stripe.customers.create({
        source: token.id,
        email: user.email,
      })
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: plan.id }],
        expand: ['latest_invoice.payment_intent'],
        cancel_at_period_end: true,
      })

      if (subscription) {
        const expiresAt = new Date(subscription.current_period_end * 1000)
        await prisma.subscriptions.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
            type: subscriptionType,
            tier: subscriptionTier,
            stripeId: subscription.id,
            expiresAt,
            price: subscription.latest_invoice.amount_due / 100,
          },
        })
        await sendEmail<EmailTemplate.SUBSCRIPTION_SUCCESSFUL>(
          user.email as string,
          'Successful subscription details',
          EmailTemplate.SUBSCRIPTION_SUCCESSFUL,
          {
            name: user.name as string,
            subscriptionTier: capitalizeFirstLetters(subscriptionTier.replace('_', ' ')),
            subscriptionType: capitalizeFirstLetters(subscriptionType),
            expiresAt: `${expiresAt.toLocaleDateString(
              'en-US',
              {
                day: 'numeric',
                year: 'numeric',
                month: 'long',
              },
            )} at ${expiresAt.toLocaleTimeString(
              'en-US',
              {
                hour: 'numeric',
                minute: 'numeric',
              },
            )}`,
          }
        )


        return true
      }

      return false


    } catch (err) {
      throw new GraphQLError(err.code)
      
    }

  }


export default createSubscription