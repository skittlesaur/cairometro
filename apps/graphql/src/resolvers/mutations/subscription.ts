
import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'
import Stripe from 'stripe'

import { Context } from '../../context'


const createSubscription: FieldResolver<'Mutation', 'CreateSubscritpion'> =
async (_, args, ctx: Context) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2022-11-15',
  })
  const {
    cardNumber, expiryMonth, expiryYear, cardCvc, 
  } = args
  const { user } = ctx
   
  if (!user) {
    throw new GraphQLError('User not Authenticated')
  }
  if (!cardNumber || !expiryMonth || !expiryYear || !cardCvc) {
    throw new GraphQLError('Card details are missing')
  }
  // validate card details
  const cardNumberRegex = new RegExp('^[0-9]{16}$')
  const expiryMonthRegex = new RegExp('^[0-9]{2}$')
  const expiryYearRegex = new RegExp('^[0-9]{4}$')
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
  stripe.tokens.create({
    card: {
      number: cardNumber,
      exp_month: expiryMonth,
      exp_year: expiryYear,
      cvc: cardCvc,
    },
  }).then((token) => {
    console.log(token)
  }).catch((error) => {
    console.log(error)
  })

  console.log(user)

}

export default createSubscription