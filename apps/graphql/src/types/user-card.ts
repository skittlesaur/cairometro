import { objectType } from 'nexus'
import { UserCreditCard } from 'nexus-prisma'



const UserCardType = objectType({
  name: UserCreditCard.$name,
  definition(t) {
    t.field(UserCreditCard.id)
    t.field(UserCreditCard.cardHolder)
    t.field('last4', {
      type: 'String',
    })
    t.field('brand', {
      type: 'String',
    })
    t.field(UserCreditCard.expiryMonth)
    t.field(UserCreditCard.expiryYear)
  },
})


export default UserCardType