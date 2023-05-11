import Link from 'next/link'

import { Button } from './button'

interface TicketProps{
    departure: string,
    arrival: string,
    departureTime: string,
    arrivalTime: string,
    href: string,
    price: number,
    stations: number,
}

const Ticket = ({
  departure, arrival, departureTime, arrivalTime, href, price, stations,
}: TicketProps) =>{

  return (

    <Link
      href={href}
      className="transition-all duration-150 flex items-center bg-white border border-gray-300 rounded-2xl shadow  hover:shadow-xl w-full py-8 px-16  justify-between group"
    >
      <div className="w-full grid grid-cols-3  items-center gap-8">
          
        <div className="">
          <p className="text-lg font-medium text-center w-full ">{departure}</p>
          <p className="text-sm text-center font-normal text-neutral-400  ">{departureTime.toString()}</p>
        </div>
        <div className="flex items-center ">
             
          <div className="rounded-full bg-white border border-gray-300 min-w-[0.75em] max-w-[0.75em] min-h-[0.75em] max-h-[0.75em]"></div>
          <div className="flex flex-col relative w-full">
            <hr className="w-full my-8 border-t-2 border-dashed border-gray-200" />
            <p className="absolute left-1/2 -translate-x-1/2 top-1/2 text-center">{stations} Stations</p>
          </div>
          
          <div className="rounded-full bg-gray-300 min-w-[0.75em] max-w-[0.75em] min-h-[0.75em] max-h-[0.75em]"></div>
        </div>
        <div className="">
          <p className="text-lg font-medium text-center w-full ">{arrival}</p>
          <p className="text-sm text-center font-normal text-neutral-400  ">{arrivalTime.toString()}</p>
        </div>
            
          
      </div>
      <div className=" w-[1px] h-16 border-dashed border-gray-300 border-r"></div>

      <div className="flex items-center gap-12 justify-end">
        <span className="text-2xl font-semibold text-primary w-[150px] text-right">{price.toFixed(2)} EGP</span>
        <Button
          variant={'ticket'}
          size={'xl'}
        > View details 
        </Button>
      </div>

    </Link>
  )

}

export default Ticket