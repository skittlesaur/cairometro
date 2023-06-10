import { useState } from 'react'

import useUserCards from '@/graphql/user/user-cards'
import LogoMastercard from '@/icons/logo-mastercard.svg'
import LogoVisa from '@/icons/logo-visa.svg'

interface SavedCardsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCardSelect: (card: any)=> void
}

const SavedCards = ({ onCardSelect }: SavedCardsProps) => {
  const { data: userCards } = useUserCards()
  const [open, setOpen] = useState(false)

  if (!userCards || userCards.length === 0) return null
  
  return (
    <div className="relative flex flex-col mt-[1.8em]">
      <button
        className="bg-neutral-50 border border-neutral-200 flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-900 rounded-md hover:bg-neutral-100"
        onClick={() => setOpen(!open)}
      >
        Saved Cards
      </button>
      {open && (
        <div className="absolute z-10 w-full top-full mt-4">
          <div className="bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <ul className="divide-y divide-neutral-200">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {userCards.map((card: any) => (
                <li key={card.id}>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 flex items-center gap-3 text-sm"
                    onClick={() => {
                      onCardSelect(card)
                      setOpen(false)
                    }}
                  >
                    <div className="bg-white border border-neutral-2 p-0.5 00 w-8 h-8 rounded flex items-center justify-center">
                      {card.brand === 'Visa' && (
                        <LogoVisa className="w-full h-full" />
                      )}
                      {card.brand === 'MasterCard' && (
                        <LogoMastercard className="w-full h-full" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p>
                        Ends with {card.last4}
                      </p>
                      <p className="text-xs text-neutral-600">
                        {card.cardHolder}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default SavedCards