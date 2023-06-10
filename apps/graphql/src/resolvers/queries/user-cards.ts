import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import decrypt from '../../lib/decrypt'
import authenticatedPermission from '../../permissions/authenticated'

const getCardBrand = (cardNumber: string) => {
  if (cardNumber.slice(0, 1) === '4') {
    return 'Visa'
  }

  if (cardNumber.slice(0, 2) === '51' || cardNumber.slice(0, 2) === '52' || cardNumber.slice(0, 2) === '53' || cardNumber.slice(0, 2) === '54' || cardNumber.slice(0, 2) === '55') {
    return 'MasterCard'
  }

  return 'Unknown'
}

const userCards: FieldResolver<'Query', 'userCards'> =
  async (_, args, ctx: Context) => {
    authenticatedPermission(ctx)
    const { prisma } = ctx

    const userCards = await prisma.userCreditCard.findMany({
      where: {
        userId: ctx.user?.id,
      },
    })
    
    // format card to { id, holderName, last4, brand, expiryMonth, expiryYear }
    const formattedUserCards = userCards.map((card) => {
      const cardNumber = decrypt(card.cardNumber)
      const cardHolder = decrypt(card.cardHolder)
      const last4 = cardNumber.slice(-4)
      const brand = getCardBrand(cardNumber)

      return {
        id: card.id,
        cardHolder,
        last4,
        brand,
        expiryMonth: card.expiryMonth,
        expiryYear: card.expiryYear,
      }
    })

    return formattedUserCards
  }

export default userCards
