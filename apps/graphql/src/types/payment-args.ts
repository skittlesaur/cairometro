import { booleanArg, nonNull, stringArg } from 'nexus'

import oneTimeInput from './one-time-input'
import subscriptionEnumArg from './subscription-input'

const createPaymentArgs = {
  cardNumber: nonNull(stringArg()),
  expiryMonth: nonNull(stringArg()),
  expiryYear: nonNull(stringArg()),
  cardCvc: nonNull(stringArg()),
  saveCard: nonNull(booleanArg()),
  isSubscription: nonNull(booleanArg()),
}
  
const paymentArgs = {
  ...createPaymentArgs,
  metadata: nonNull(
    (createPaymentArgs.isSubscription)
      ? subscriptionEnumArg
      : oneTimeInput
  ),
} 
export default paymentArgs