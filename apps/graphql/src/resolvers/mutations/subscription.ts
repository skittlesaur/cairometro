import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'
import Stripe from 'stripe'

import { Context } from '../../context'

import { subscriptionMapping } from './migrations/dummy-database/subscriptions-pricing'


const createSubscription: FieldResolver<'Mutation', 'CreateSubscritpion'> =
  async (_, args, ctx: Context) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
      apiVersion: '2022-11-15',
    })
    const {
      cardNumber, expiryMonth, expiryYear, cardCvc, saveCard, metaData,
    } = args
    const { subscriptionTier, subscriptionType } = metaData
    const { user, prisma } = ctx

    if (!user) {
      throw new GraphQLError('User not Authenticated')
    }
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
    try {
      const token = await stripe.tokens.create({
        card: {
          number: cardNumber,
          exp_month: expiryMonth,
          exp_year: expiryYear,
          cvc: cardCvc,
        },
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
        
        return true
      }

      return false


      // TODO: saveCard

    } catch (err) {
      throw new GraphQLError(err.code)
      
    }

  }


export default createSubscription