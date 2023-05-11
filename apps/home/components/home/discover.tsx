import Link  from 'next/link'

import { Button } from '../button'

const Discover = ()=>{

  return (

    <div className="w-full flex flex-col items-center">
      <div className="">
        <h1 className="text-5xl text-center font-semibold ">Not sure where to discover?</h1>
        <h2 className="text-xl text-center font-normal text-neutral-400  ">Here are some suggestions based on your current location</h2>
      </div>
      <Link
        href="#"
        className="delay 150ms flex items-center bg-white border border-gray-300 rounded-2xl shadow  hover:shadow-lg w-full py-8 px-16 gap-8 justify-between"
      >
        <div className=" w-[62%]  lg:flex">
          <div className="flex w-full items-center gap-8">
            <div className="">
              <p className="text-lg-medium text-center ">Sadat</p>
              <p className="text-sm text-center font-normal text-neutral-400  ">12:30pm</p>
            </div>
            
            <div className="rounded-full bg-white border border-gray-300 min-w-[0.75em] max-w-[0.75em] min-h-[0.75em] max-h-[0.75em]"></div>
            <div className="flex flex-col relative w-full">
              <hr className="w-full my-8 border-t-2 border-dashed border-gray-200" />
              <p className="absolute left-1/2 -translate-x-1/2 top-1/2 text-center">7 Stations</p>
            </div>
            
            <div className="rounded-full bg-gray-300 min-w-[0.75em] max-w-[0.75em] min-h-[0.75em] max-h-[0.75em]"></div>
            <div className="">
              <p className="text-lg-medium text-center ">Maadi</p>
              <p className="text-sm text-center font-normal text-neutral-400  ">12:52pm</p>
            </div>
            
          </div>
        </div>
        <div className=" w-[1px] h-16 border-dashed border-gray-300 border-r"></div>

        <div className="flex items-center gap-8 justify-end">
          <span className="text-2xl font-semibold text-primary">5.00 EGP</span>
          <Button
            variant={'ticket'}
            size={'lg'}
          > View details 
          </Button>
        </div>

      </Link>
      <Link
        href="#"
        className="delay 150ms flex items-center bg-white border border-gray-300 rounded-2xl shadow  hover:shadow-lg w-full py-8 px-16 gap-8 justify-between"
      >
        <div className=" w-[62%]  lg:flex">
          <div className="flex w-full items-center gap-8">
            <div className="">
              <p className="text-lg-medium text-center ">Kit-Kat</p>
              <p className="text-sm text-center font-normal text-neutral-400  ">11:26pm</p>
            </div>
            
            <div className="rounded-full bg-white border border-gray-300 min-w-[0.75em] max-w-[0.75em] min-h-[0.75em] max-h-[0.75em]"></div>
            <div className="flex flex-col relative w-full">
              <hr className="w-full my-8 border-t-2 border-dashed border-gray-200" />
              <p className="absolute left-1/2 -translate-x-1/2 top-1/2 text-center">23 Stations</p>
            </div>
            
            <div className="rounded-full bg-gray-300 min-w-[0.75em] max-w-[0.75em] min-h-[0.75em] max-h-[0.75em]"></div>
            <div className="">
              <p className="text-lg-medium text-center ">Adly Mansour</p>
              <p className="text-sm text-center font-normal text-neutral-400  ">12:12am</p>
            </div>
            
          </div>
        </div>
        <div className=" w-[1px] h-16 border-dashed border-gray-300 border-r"></div>

        <div className="flex items-center gap-8 justify-end">
          <span className="text-2xl font-semibold text-primary">10.00 EGP</span>
          <Button
            variant={'ticket'}
            size={'lg'}
          > View details 
          </Button>
        </div>

      </Link>
      <Link
        href="#"
        className="delay 150ms flex items-center bg-white border border-gray-300 rounded-2xl shadow  hover:shadow-lg w-full py-8 px-16 gap-8 justify-between"
      >
        <div className=" w-[62%]  lg:flex">
          <div className="flex w-full items-center gap-8">
            <div className="">
              <p className="text-lg-medium text-center ">Safaa Hegazi</p>
              <p className="text-sm text-center font-normal text-neutral-400  ">11:30pm</p>
            </div>
            
            <div className="rounded-full bg-white border border-gray-300 min-w-[0.75em] max-w-[0.75em] min-h-[0.75em] max-h-[0.75em]"></div>
            <div className="flex flex-col relative w-full">
              <hr className="w-full my-8 border-t-2 border-dashed border-gray-200" />
              <p className="absolute left-1/2 -translate-x-1/2 top-1/2 text-center">11Stations</p>
            </div>
            
            <div className="rounded-full bg-gray-300 min-w-[0.75em] max-w-[0.75em] min-h-[0.75em] max-h-[0.75em]"></div>
            <div className="">
              <p className="text-lg-medium text-center ">Shubra El-Kheima</p>
              <p className="text-sm text-center font-normal text-neutral-400  ">11:59pm</p>
            </div>
            
          </div>
        </div>
        <div className=" w-[1px] h-16 border-dashed border-gray-300 border-r"></div>

        <div className="flex items-center gap-8 justify-end">
          <span className="text-2xl font-semibold text-primary">12.00 EGP</span>
          <Button
            variant={'ticket'}
            size={'lg'}
          > View details 
          </Button>
        </div>

      </Link>
    </div>
  )
}

export default Discover