
import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'
import Stripe from 'stripe'

import { Context } from '../../context'
import calculatePricing from '../../lib/calculate-pricing'
import findRoute from '../../lib/find-route'



const createPayment: FieldResolver<'Mutation', 'CreateSubscritpion'> = 
async (_, args, ctx: Context) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2022-11-15',
  })
  const {
    cardNumber, expiryMonth, expiryYear, cardCvc, saveCard, metaData,
  } = args
  const {
    from, to, passengers, departureTime, 
  } = metaData
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
    const Source = token.id
    const path = await findRoute(from, to, ctx)
    const price = await calculatePricing(path, passengers, ctx) 
  
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

      const date = new Date(parseInt(departureTime))
            
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
          
        },
      })
      return true
    }
    return false
  } catch (err){
    throw new GraphQLError(err.message)
  }
  



  // if (saveCard) {
  //   const customer = await stripe.customers.create({
  //     email: user?.email,
  //     source: Source,
  //   })
  //   const paymentMethod = await stripe.paymentMethods.attach(Source, {
  //     customer: customer.id,
  //   })
  //   console.log(paymentMethod)
  // }
  
  
}


export default createPayment


