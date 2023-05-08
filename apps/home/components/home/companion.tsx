import HeartOutline from '@/icons/heart-outline-gradient.svg'
import TicketOutline from '@/icons/ticket-outline-gradient.svg'
import TimerOutline from '@/icons/timer-outline-gradient.svg'

const Companion = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-16 h-96">
      <div className="flex flex-col gap-3">
        <h1 className="text-5xl relative text-center font-semibold">
          Your Cairo Metro Companion
        </h1>
        <p className="text-xl text-neutral-400">
          Enjoy a stress-free commute with convenient metro schedules, payment
          options, alerts, and assistance.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="px-9 py-7 bg-neutral-50 border border-neutral-200 rounded-lg flex flex-col items-center justify-center gap-2">
          <HeartOutline className="w-12 h-12" />
          <div className="flex flex-col gap-1 items-center">
            <p className="text-lg font-semibold">Live Support</p>
            <p className="text-sm text-center">
              Get immediate assistance with the live support
            </p>
          </div>
        </div>
        <div className="px-9 py-7 bg-neutral-50 border border-neutral-200 rounded-lg flex flex-col items-center justify-center gap-2">
          <TicketOutline className="w-12 h-12" />
          <div className="flex flex-col gap-1 items-center">
            <p className="text-lg font-semibold">Easy Tracking</p>
            <p className="text-sm text-center">
              Purchase and store your metro tickets
            </p>
          </div>
        </div>
        <div className="px-9 py-7 bg-neutral-50 border border-neutral-200 rounded-lg flex flex-col items-center justify-center gap-2">
          <TimerOutline className="w-12 h-12" />
          <div className="flex flex-col gap-1 items-center">
            <p className="text-lg font-semibold">Realtime Schedule</p>
            <p className="text-sm text-center">
              Plan your journey with confidence with realtime metro arrivals and departures
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Companion
