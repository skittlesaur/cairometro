import TicketPurchaseDetails from '@/components/tickets/details/ticket-purchase-details'
import Hero from '@/components/tickets/hero'

const TicketDetails = () => {
  return (
    <div className="flex flex-col gap-16 md:gap-40 mb-16 md:mb-40">
      <Hero />
      <TicketPurchaseDetails />
    </div>
  )
}

export default TicketDetails