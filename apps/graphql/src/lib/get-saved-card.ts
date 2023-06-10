import { Context } from '../context'

import decrypt from './decrypt'

const getSavedCard = async (cardId: string, ctx: Context) => {
  const { prisma, user } = ctx
  
  const card = await prisma.userCreditCard.findUnique({
    where: {
      id: cardId,
    },
  })
  
  if (!card) {
    throw new Error('Card not found')
  }
  
  if (card.userId !== user?.id) {
    throw new Error('Card not found')
  }
  
  const cardNumber = decrypt(card.cardNumber)
  const expiryMonth = card.expiryMonth
  const expiryYear = card.expiryYear
  const cardCvc = decrypt(card.cardCvc)
  
  return {
    number: cardNumber,
    exp_month: expiryMonth,
    exp_year: expiryYear,
    cvc: cardCvc,
  }
}

export default getSavedCard