import Stripe from 'stripe'

export const refundSubscription = async (subscription:  Stripe.Subscription, stripe: Stripe) => {
  if (subscription && subscription.latest_invoice){
    const currentPeriodStart = subscription.current_period_start * 1000 
    const currentPeriodEnd = subscription.current_period_end * 1000
    const paymentIntent = subscription.latest_invoice.payment_intent
    const { amount, id } = paymentIntent
  
  
    const remainingPeriod = currentPeriodEnd - Date.now()
    const totalPeriod = currentPeriodEnd - currentPeriodStart
  
    const remainingAmount = (amount * remainingPeriod) / totalPeriod
    const refundAmount = Math.round(remainingAmount) 

    await stripe.refunds.create({
      payment_intent: id,
      amount: refundAmount,
    })
  }

  return 
}