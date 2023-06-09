import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'
import Stripe from 'stripe'

import { Context } from '../../context'


interface SubscriptionMapping {
    [key: string]: string;
  }
const subscriptionMapping: SubscriptionMapping = {
  ONE_AREA_MONTHLY: 'price_1NGVrBJ85o4Y1it227OWB8Md',
  ONE_AREA_QUARTERLY: 'price_1NGVrBJ85o4Y1it2MTslSmnh',
  ONE_AREA_YEARLY: 'price_1NGVrBJ85o4Y1it2xcgtmHPP',
  TWO_AREAS_MONTHLY: 'price_1NGVstJ85o4Y1it2nZDFUeQA',
  TWO_AREAS_QUARTERLY: 'price_1NGVstJ85o4Y1it26494tuHx',
  TWO_AREAS_YEARLY: 'price_1NGVstJ85o4Y1it2M9k1S3mC',
  THREE_AREAS_MONTHLY: 'price_1NGVuJJ85o4Y1it2B7OxVpi5',
  THREE_AREAS_QUARTERLY: 'price_1NGVuJJ85o4Y1it2wh5thxp7',
  THREE_AREAS_YEARLY: 'price_1NGVuJJ85o4Y1it2aGX1Bjlx',
}
  
// define function handle subscription
  
const handleSubscription = async (stripe: Stripe, Source: string, subscriptionType: string, subscriptionTier: string, email: string) => {
  try {
    const mappingKey = `${subscriptionTier}_${subscriptionType}`
    const subscriptionId: string | undefined = subscriptionMapping[mappingKey]
    const plan = await stripe.prices.retrieve(subscriptionId)
    const customer = await stripe.customers.create({
      source: Source,
      email: email,
    })
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: plan.id }],
      expand: ['latest_invoice.payment_intent'],
    })
    // TODO: save subscription to database
    // TODO: link subscription to user
    return true}
  catch (err){
    console.log(err)
    return false
  }
}

const createSubscription: FieldResolver<'Mutation', 'CreateSubscritpion'> =
async (_, args, ctx: Context) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2022-11-15',
  })
  const {
    cardNumber, expiryMonth, expiryYear, cardCvc, saveCard, subscription,
  } = args
  const { subscriptionTier, subscriptionType } = subscription
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
  const token = await stripe.tokens.create({
    card: {
      number: cardNumber,
      exp_month: expiryMonth,
      exp_year: expiryYear,
      cvc: cardCvc,
    },
  })
  return handleSubscription(stripe, token.id, subscriptionType, subscriptionTier, user?.email ?? 'test@gmail.com')
}


export default createSubscription