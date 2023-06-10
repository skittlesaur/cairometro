import { Context } from '../context'

import encrypt from './encrypt'

interface Card {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  holderName: string
  cardCvc: string
}

const saveUserCard = async (card: Card, ctx: Context) => {
  const { prisma, user } = ctx
  
  if (!user) {
    return
  }
  
  const cardNumber = encrypt(card.cardNumber)
  const cardCvc = encrypt(card.cardCvc)
  const cardHolder = encrypt(card.holderName ?? '')
  
  await prisma.userCreditCard.create({
    data: {
      cardNumber,
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
      cardHolder,
      cardCvc,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })
}

export default saveUserCard