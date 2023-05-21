import { forwardRef, useImperativeHandle, useState } from 'react'

import AddOutline from '@/icons/add-outline.svg'
import RemoveOutline from '@/icons/remove-outline.svg'

import * as Menubar from '@radix-ui/react-menubar'
import { useTranslation } from 'next-i18next'

const Passengers = forwardRef((_, ref)=> {
  const { t } = useTranslation('find-ticket')
  const [seniors, setSeniors] = useState(0)
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)

  useImperativeHandle(ref, () => ({
    getResult: () => ({
      adults,
      seniors,
      children,
    }),
  }))

  const addPassenger = (n: string)=>{
    if (n === 'addSenior') setSeniors(seniors + 1)
    if (n === 'addAdult') setAdults(adults + 1)
    if (n === 'addChild') setChildren(children + 1)
  }
  const removePassenger = (n: string)=>{
    if (n === 'removeSenior') setSeniors(Math.max(seniors - 1, 0))
    if (n === 'removeAdult') setAdults(Math.max(adults - 1, 0))
    if (n === 'removeChild') setChildren(Math.max(children - 1, 0))
  }

  const getAdultsText = () =>
    `${adults} ${adults > 1 ? t('passengers.adults') : t('passengers.adult')}`

  const getSeniorsText = () =>
    `${seniors} ${seniors > 1 ? t('passengers.seniors') : t('passengers.senior')}`

  const getChildrenText = () =>
    `${children} ${children > 1 ? t('passengers.children') : t('passengers.child')}`

  const getPassengersText = () => {
    if (adults <= 0 && seniors <= 0 && children <= 0){
      return t('passengers.noPassengersSelected')
    }

    const passengers = []

    if (adults > 0)
      passengers.push(getAdultsText())

    if (seniors > 0)
      passengers.push(getSeniorsText())

    if (children > 0)
      passengers.push(getChildrenText())

    return passengers.join(', ')
  }

  return (
    <Menubar.Menu>
      <Menubar.Trigger asChild>
        <button className="flex flex-col items-start w-full">
          <label className="text-base font-medium text-base-black block">
            {t('passengers.title')}
          </label>
          <p
            className="font-normal text-sm leading-5 text-neutral-500"
          >
            {getPassengersText()}
          </p>
        </button>
      </Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content className="relative z-10 w-72 bg-white border rounded-md p-3 my-2 md:my-5 shadow-xl">
          <p className="font-medium">
            {t('passengers.title')}
          </p>
          <div className="flex justify-between mx-1.5 py-2">
            <button
              className="hover:bg-gray-200 p-2 hover:rounded-md"
              onClick={()=>{removePassenger('removeSenior')}}
            >
              <RemoveOutline className="w-5" />
            </button>
            <div>
              <p className="text-sm font-medium text-center">{getSeniorsText()}</p>
              <p className="text-xs text-gray-500 text-center">{t('passengers.age')} 60+</p>
            </div>
            <button
              className="hover:bg-gray-200 p-2 hover:rounded-md"
              onClick={()=>addPassenger('addSenior')}
            >
              <AddOutline className="w-5" />
            </button>
          </div>
          <div className="flex justify-between mx-1.5 py-2">
            <button
              className="hover:bg-gray-200 p-2 hover:rounded-md"
              onClick={()=>{removePassenger('removeAdult')}}
            >
              <RemoveOutline className="w-5" />
            </button>
            <div>
              <p className="text-sm font-medium text-center">{getAdultsText()}</p>
              <p className="text-xs text-gray-500 text-center">{t('passengers.age')} 12+</p>
            </div>
            <button
              className="hover:bg-gray-200 p-2 hover:rounded-md"
              onClick={()=>addPassenger('addAdult')}
            >
              <AddOutline className="w-5" />
            </button>
          </div>
          <div className="flex justify-between mx-1.5 py-2">
            <button
              className="hover:bg-gray-200 p-2 hover:rounded-md"
              onClick={()=>{removePassenger('removeChild')}}
            >
              <RemoveOutline className="w-5" />
            </button>
            <div>
              <p className="text-sm font-medium text-center">{getChildrenText()}</p>
              <p className="text-xs text-gray-500 text-center">{t('passengers.ageUnder')} 12</p>
            </div>
            <button className="hover:bg-gray-200 p-2 hover:rounded-md">
              <AddOutline
                className="w-5"
                onClick={()=>addPassenger('addChild')}
              />
            </button>
          </div>
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  )
})

Passengers.displayName = 'Passengers'

export default Passengers