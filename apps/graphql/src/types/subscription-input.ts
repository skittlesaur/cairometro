import { enumType, inputObjectType } from 'nexus'
import { SubscriptionTier, SubscriptionType } from 'nexus-prisma'

const SubscriptionTypeEnum = enumType(SubscriptionType) 
const SubscriptionTierEnum = enumType(SubscriptionTier)

const subscriptionEnumArg = inputObjectType({
  name: 'subscriptionEnumArg',
  definition(t) {
    t.field('subscriptionType', { type: SubscriptionTypeEnum })
    t.field('subscriptionTier', { type: SubscriptionTierEnum })
  },
})

export default subscriptionEnumArg