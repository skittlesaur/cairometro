
import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'
import Stripe from 'stripe'

import { Context } from '../../context'
import calculatePricing from '../../lib/calculate-pricing'
import findRoute from '../../lib/find-route'
import getSavedCard from '../../lib/get-saved-card'
import saveUserCard from '../../lib/save-user-card'



const createPayment: FieldResolver<'Mutation', 'CreateSubscritpion'> = 
async (_, args, ctx: Context) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2022-11-15',
  })
  const {
    cardNumber, expiryMonth, expiryYear, cardCvc, saveCard, metaData, cardHolder, cardId,
  } = args
  const {
    from, to, passengers, departureTime, 
  } = metaData
  const { user, prisma } = ctx
  
  if (!user) {
    throw new GraphQLError('User not Authenticated')
  }
  const date = new Date(parseInt(departureTime))
  const path = await findRoute(from, to, ctx)
  const price = await calculatePricing(path, passengers, ctx) 
  if (price === 0 ){
    await prisma.userTickets.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        from: {
          connect: {
            id: from,
          },
        },
        to: {
          connect: {
            id: to,
          },
        },
        date: date,
        price: price,
        paymentId: 'subscriptionTier',
        
      },
    })
    return true
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
  
  try {
    const token = await stripe.tokens.create({
      card,
    })
    const Source = token.id
  
    const payment = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: 'aed',
      payment_method_types: ['card'],
      payment_method_data: {
        type: 'card',
        card: {
          token: Source,
        },
      },
      confirm: true,
    })
    
    if (payment.status === 'succeeded'){
            
      // add userTicket to database
      await prisma.userTickets.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          from: {
            connect: {
              id: from,
            },
          },
          to: {
            connect: {
              id: to,
            },
          },
          date: date,
          price: price,
          paymentId: payment.id,
          
        },
      })
      return true
    }
    return false
  } catch (err){
    throw new GraphQLError(err.message)
  }
    
}


export default createPayment


