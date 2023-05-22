import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import Input from '@/components/input'
import DefaultCard from '@/components/modal/purchase/default-card'
import MastercardCard from '@/components/modal/purchase/mastercard-card'
import VisaCard from '@/components/modal/purchase/visa-card'
import { useAppContext } from '@/context/app-context'
import CloseIcon from '@/icons/close.svg'
import LogoBinqueMisr from '@/icons/logo-banque-misr.svg'
import LogoCIB from '@/icons/logo-cib.svg'
import LogoMastercard from '@/icons/logo-mastercard.svg'
import LogoNBE from '@/icons/logo-nbe.svg'
import LogoPaymobAccept from '@/icons/logo-paymob-accept.svg'
import LogoVisa from '@/icons/logo-visa.svg'

import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'

const PurchaseModal = () => {
  const { purchaseModal } = useAppContext()
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [validThru, setValidThru] = useState('')
  const [csv, setCsv] = useState('')

  const saveCardRef = useRef<HTMLButtonElement>(null)

  const creditCardWithoutSpaces = cardNumber.replace(/\s/g, '')
  const formattedCardNumber = `${creditCardWithoutSpaces}${'•'.repeat(Math.max(0, 16 - creditCardWithoutSpaces.length))}`
    .replace(/(.{4})/g, '$1 ')
    .replace(/(^\s+|\s+$)/, '')

  const isVisa = creditCardWithoutSpaces.startsWith('4')
  const isMastercard = creditCardWithoutSpaces.startsWith('5') || creditCardWithoutSpaces.startsWith('2')

  const onPayClick = useCallback(async (_: MouseEvent<HTMLButtonElement>) => {
    // validate card number
    const cardNumberRegex = /^[0-9]{16}$/
    if (!cardNumberRegex.test(creditCardWithoutSpaces)) {
      toast.error('Invalid card number')
      return
    }

    // validate card holder (name has to be at least 2 words)
    const cardHolderRegex = /^[a-zA-Z]+ [a-zA-Z]+$/
    if (!cardHolderRegex.test(cardHolder)) {
      toast.error('Invalid card holder')
      return
    }

    // validate valid thru (has to be in MM/YY format and not expired)
    const validThruRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    if (!validThruRegex.test(validThru)) {
      toast.error('Invalid expiration date')
      return
    }

    // validate csv (has to be 3 digits)
    const csvRegex = /^[0-9]{3}$/
    if (!csvRegex.test(csv)) {
      toast.error('Invalid csv')
      return
    }

    // check the data-state of the checkbox
    const saveCard = saveCardRef.current?.dataset.state === 'checked'
    
    const data = {
      cardNumber: creditCardWithoutSpaces,
      cardHolder,
      validThru,
      csv,
      saveCard,
    }
    
    console.log(data)

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    await delay(1000)
    purchaseModal.close()
  }, [
    cardHolder,
    creditCardWithoutSpaces,
    csv,
    purchaseModal,
    validThru,
  ])
  
  useEffect(() => {
    if (purchaseModal.isOpen) {
      setCardNumber('')
      setCardHolder('')
      setValidThru('')
      setCsv('')
    }
  }, [purchaseModal.isOpen])

  return (
    <AnimatePresence mode="wait">
      {purchaseModal.isOpen && (
        <motion.div
          key="purchase-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.1 } }}
          transition={{ duration: 0.2 }}
          className="fixed bg-neutral-900/80 backdrop-blur-sm inset-0 z-[100] flex items-center justify-center"
          onClick={() => purchaseModal.close()}
        >
          <motion.div
            key="purchase-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="bg-white w-screen w-full max-h-screen overflow-y-auto no-scrollbar max-w-screen-lg md:rounded-xl flex flex-col justify-between items-center p-5 gap-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 w-full">
              <button
                className="md:hidden self-end"
                onClick={() => purchaseModal.close()}
              >
                <CloseIcon className="w-7 h-7" />
              </button>
              <div className="flex flex-col md:items-center gap-1">
                <h1 className="text-xl font-semibold">
                  {purchaseModal.data.title}
                </h1>
                {purchaseModal.data.description && (
                  <p className="text-sm text-neutral-500 text-center font-medium">
                    {purchaseModal.data.description}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium text-neutral-500">
                  Total
                </p>
                <h2 className="text-xl font-semibold">
                  {purchaseModal.data.price} EGP
                </h2>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-5 w-full">
              <AnimatePresence mode="wait">
                {!isVisa && !isMastercard && (
                  <DefaultCard
                    key="default-card"
                    validThru={validThru}
                    cardHolder={cardHolder}
                    formattedCardNumber={formattedCardNumber}
                  />
                )}
                {isVisa && (
                  <VisaCard
                    key="visa-card"
                    validThru={validThru}
                    cardHolder={cardHolder}
                    formattedCardNumber={formattedCardNumber}
                  />
                )}
                {isMastercard && (
                  <MastercardCard
                    key="mastercard-card"
                    validThru={validThru}
                    cardHolder={cardHolder}
                    formattedCardNumber={formattedCardNumber}
                  />
                )}
              </AnimatePresence>
              <div className="flex flex-col w-full md:w-3/5 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="card-number"
                    className="text-sm font-medium text-neutral-500"
                  >
                    Card Number
                  </label>
                  <Input
                    id="card-number"
                    type="text"
                    value={cardNumber}
                    placeholder={formattedCardNumber}
                    maxLength={19}
                    className="font-mono"
                    onChange={(event) => {
                      const { value } = event.target
                      const formattedValue = value
                        .replace(/\D/g, '')
                        .replace(/(.{4})/g, '$1 ')

                      // check if the user is deleting the last character
                      if (value.length < cardNumber.length) {
                        const lastCharacter = cardNumber[cardNumber.length - 1]
                        const formattedValueWithoutLastCharacter = formattedValue.slice(0, -1)

                        if (lastCharacter === ' ') {
                          setCardNumber(formattedValueWithoutLastCharacter)
                        } else {
                          setCardNumber(formattedValue)
                        }

                        return
                      }

                      setCardNumber(formattedValue)
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="card-holder"
                    className="text-sm font-medium text-neutral-500"
                  >
                    Card Holder
                  </label>
                  <Input
                    id="card-holder"
                    type="text"
                    value={cardHolder}
                    placeholder="Enter Card Holder Name"
                    onChange={(event) => setCardHolder(event.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="valid-thru"
                      className="text-sm font-medium text-neutral-500"
                    >
                      Valid Thru
                    </label>
                    <Input
                      id="valid-thru"
                      type="text"
                      value={validThru}
                      placeholder="MM/YY"
                      maxLength={5}
                      onChange={(event) => {
                        const { value } = event.target

                        const formattedValue = value
                          .replace(/\D/g, '')
                          .replace(/(.{2})/g, '$1/')
                          .replace(/(^\s+|\s+$)/, '')

                        // if the user is deleting the slash, we need to remove the last character
                        if (value.length < validThru.length) {
                          const lastCharacter = validThru[validThru.length - 1]
                          const formattedValueWithoutLastCharacter = formattedValue.slice(0, -1)

                          if (lastCharacter === '/') {
                            setValidThru(formattedValueWithoutLastCharacter)
                          } else {
                            setValidThru(formattedValue)
                          }

                          return
                        }

                        setValidThru(formattedValue.slice(0, 5))
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="csv"
                      className="text-sm font-medium text-neutral-500"
                    >
                      CSV
                    </label>
                    <Input
                      id="csv"
                      type="text"
                      value={csv}
                      placeholder="•••"
                      maxLength={3}
                      onChange={(event) => {
                        const { value } = event.target

                        const formattedValue = value
                          .replace(/\D/g, '')
                          .replace(/(^\s+|\s+$)/, '')

                        setCsv(formattedValue)
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    useLoading
                    variant="primary"
                    className="uppercase"

                    onClick={onPayClick}
                  >
                    Pay
                  </Button>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      ref={saveCardRef}
                      id="save-card"
                    />
                    <label
                      htmlFor="save-card"
                      className="text-sm font-medium text-neutral-500"
                    >
                      Save Card
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[
                LogoVisa,
                LogoMastercard,
                LogoBinqueMisr,
                LogoCIB,
                LogoNBE,
              ].map((Logo, index) => (
                <Logo
                  key={index}
                  className="h-5"
                />
              ))}
            </div>
            <div className="flex flex-col items-center text-neutral-500">
              <p className="text-xs font-semibold">
                Powered by
              </p>
              <LogoPaymobAccept className="h-8 fill-current" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PurchaseModal