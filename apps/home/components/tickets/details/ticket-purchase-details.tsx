import { Button } from "@/components/button"
import { Separator } from "@/components/separator"
import LocationIcon from '@/icons/location.svg'
import ForwardIcon from '@/icons/return-up-forward.svg'
import QrCodeIcon from '@/icons/qr-code.svg'
import TicketIcon from '@/icons/ticket.svg'
import TrainIcon from '@/icons/train.svg'

const TicketPurchaseDetails = ()=>{
    return(
        <div className="mx-44 my-10">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-3xl leading-9">Review ticket options</h1>
                <div className="flex justify-between gap-x-2.5 items-center">
                    <div className="text-right">
                        <h1 className="font-semibold text-xl leading-7">50.00 EGP</h1>
                        <p className="leading-6 text-base font-normal text-neutral-600">1 Adult, Standard</p>
                    </div>
                    <Button
                        size={'lg'}
                        variant={'primary'}
                        className="py-2.5 px-9"
                        >
                        Purchase
                    </Button>
                </div>
            </div>
            <div className="border rounded-2xl grid grid-cols-2 my-10">
                <div className="border-r px-10 py-3">
                    <h1 className="text-sm font-medium">Trip route</h1>
                </div>
                <div className="px-10 py-3">
                <h1 className="text-sm font-medium">Flexibility and conditions</h1>
                </div>
                <div className="py-4 px-10 border-t border-r">
                    <div className="flex gap-x-4 items-center">
                        <div className="flex items-center gap-x-1">
                            <p className="text-sm leading-5 font-medium">1:10 </p>
                            <p className="text-xs font-medium leading-4">PM</p>
                        </div>
                        <div className="border-4 rounded-full w-4 h-4 border-neutral-400"></div>
                        <p className="text-sm leading-5 font-medium">Helwan</p>
                    </div>
                    <div className="flex gap-x-4">
                        <p></p>
                        <Separator vertical className="hidden md:block w-[2px] h-10 bg-neutral-200 ml-14" />
                        <p></p>
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <div className="flex items-center gap-x-1">
                            <p className="text-sm leading-5 font-medium">1:10 </p>
                            <p className="text-xs font-medium leading-4">PM</p>
                        </div>
                        <div className="border-4 rounded-full w-4 h-4 border-neutral-400"></div>
                        <p className="text-sm leading-5 font-medium">Hello</p>
                    </div>
                    <div className="flex gap-x-4">
                        <p></p>
                        <Separator vertical className="hidden md:block w-[2px] h-10 bg-neutral-200 ml-14" />
                        <p></p>
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <div className="flex items-center gap-x-1">
                            <p className="text-sm leading-5 font-medium">1:10 </p>
                            <p className="text-xs font-medium leading-4">PM</p>
                        </div>
                        <div className="border-4 rounded-full w-4 h-4 border-neutral-400"></div>
                        <p className="text-sm leading-5 font-medium">Really long something here for visualization</p>
                    </div>
                    <div className="flex gap-x-4">
                        <p></p>
                        <Separator vertical className="hidden md:block w-[2px] h-10 bg-neutral-200 ml-14" />
                        <p></p>
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <div className="flex items-center gap-x-1">
                            <p className="text-sm leading-5 font-medium">1:10 </p>
                            <p className="text-xs font-medium leading-4">PM</p>
                        </div>
                        <div className="border-4 rounded-full w-4 h-4 border-neutral-400"></div>
                        <p className="text-sm leading-5 font-medium">Small</p>
                    </div>
                    <div className="flex gap-x-4">
                        <p></p>
                        <Separator vertical className="hidden md:block w-[2px] h-20 bg-neutral-200 ml-14" />
                        <div className="flex bg-red-100 rounded items-center p-2 ml-2 mt-2 mb-10">
                            <ForwardIcon className="w-4 text-red-500" />
                            <p className="text-sm text-neutral-700 leading-4">Transfer</p>
                        </div>
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <div className="flex items-center gap-x-1">
                            <p className="text-sm leading-5 font-medium">1:10 </p>
                            <p className="text-xs font-medium leading-4">PM</p>
                        </div>
                        <div className="border-4 rounded-full w-4 h-4 border-neutral-400"></div>
                        <p className="text-sm leading-5 font-medium">Really long something here for visualization</p>
                    </div>
                    <div className="flex gap-x-4">
                        <p></p>
                        <Separator vertical className="hidden md:block w-[2px] h-20 bg-neutral-200 ml-14" />
                        <div className="flex bg-red-100 rounded items-center p-2 ml-2 mt-2 mb-10">
                            <ForwardIcon className="w-4 text-red-500" />
                            <p className="text-sm text-neutral-700 leading-4">Transfer</p>
                        </div>
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <div className="flex items-center gap-x-1">
                            <p className="text-sm leading-5 font-medium">1:10 </p>
                            <p className="text-xs font-medium leading-4">PM</p>
                        </div>
                        <LocationIcon className="w-4 fill-neutral-400" />
                        <p className="text-sm leading-5 font-medium">Maadi</p>
                    </div>
                </div>
                <div className="py-4 px-10 border-t">
                    <p className="text-xs leading-4 font-medium text-neutral-500 my-2">BOARDING REQUIREMENTS</p>
                    <div className="flex items-center gap-x-2">
                        <QrCodeIcon className="w-3.5 fill-neutral-500" />
                        <p className="text-sm leading-5 text-neutral-900">Booking number or QR code are required</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <TicketIcon className="w-3.5 fill-neutral-500" />
                        <p className="text-sm leading-5 text-neutral-900">A ticket is only valid for one time use</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <TrainIcon className="w-3.5 fill-neutral-500" />
                        <p className="text-sm leading-5 text-neutral-900">To learn more about metro requirements, please <a className="font-semibold text-primary" href="">click here</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketPurchaseDetails