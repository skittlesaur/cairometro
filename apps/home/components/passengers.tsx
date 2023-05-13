import * as Popover from '@radix-ui/react-popover';
import RemoveOutline from '@/icons/remove-outline.svg';
import AddOutline from '@/icons/add-outline.svg';
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

const Passengers = ()=> {
    const { t } = useTranslation('home')
    const [seniors, setSeniors] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const addPassenger = (n: string)=>{
    if(n === "addSenior") setSeniors(seniors+1)
    if(n === "addAdult") setAdults(adults+1)
    if(n === "addChild") setChildren(children+1)
  }
  const removePassenger = (n: string)=>{
    if(n === "removeSenior") setSeniors(Math.max(seniors-1, 0))
    if(n === "removeAdult") setAdults(Math.max(adults-1, 0))
    if(n === "removeChild") setChildren(Math.max(children-1, 0))
  }
    return(
        <Popover.Root>
    <Popover.Trigger>
      <div className="flex flex-col items-start w-full">
          <label className="text-base font-medium text-base-black block">
            {t('hero.passengers.title')}
          </label>
          <input
            placeholder={t('hero.passengers.placeholder') as string}
            className="font-normal text-sm leading-5 text-neutral-500"
          />
        </div>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className='w-96 bg-gray-50 border rounded-md my-10 p-3 shadow-xl'>
        <p className='font-medium'>Passengers</p>
        <div className='flex justify-between mx-1.5 py-2'>
        <button onClick={()=>{removePassenger('removeSenior')}} className='hover:bg-gray-200 p-2 hover:rounded-md'>
          <RemoveOutline className="w-5" />
          </button>
          <div>
          <p className='text-sm font-medium text-center'>{seniors} Seniors</p>
          <p className='text-xs text-gray-500 text-center'>Age 60+</p>
          </div>
          <button onClick={()=>addPassenger('addSenior')} className='hover:bg-gray-200 p-2 hover:rounded-md'>
          <AddOutline className="w-5" />
          </button>
        </div>
        <div className='flex justify-between mx-1.5 py-2'>
          <button onClick={()=>{removePassenger('removeAdult')}} className='hover:bg-gray-200 p-2 hover:rounded-md'>
          <RemoveOutline className="w-5" />
          </button>
          <div>
          <p className='text-sm font-medium text-center'>{adults} Adults</p>
          <p className='text-xs text-gray-500 text-center'>Age 12+</p>
          </div>
          <button onClick={()=>addPassenger('addAdult')} className='hover:bg-gray-200 p-2 hover:rounded-md'>
          <AddOutline className="w-5" />
          </button>
        </div>
        <div className='flex justify-between mx-1.5 py-2'>
          <button onClick={()=>{removePassenger('removeChild')}} className='hover:bg-gray-200 p-2 hover:rounded-md'>
          <RemoveOutline className="w-5" />
          </button>
          <div>
          <p className='text-sm font-medium text-center'>{children} Children</p>
          <p className='text-xs text-gray-500 text-center'>Age under 12</p>
          </div>
          <button className='hover:bg-gray-200 p-2 hover:rounded-md'>
          <AddOutline onClick={()=>addPassenger('addChild')} className="w-5" />
          </button>
        </div>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
    )
}

export default Passengers