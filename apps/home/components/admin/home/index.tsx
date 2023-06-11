import Header from '@/components/admin/header'
import MonthlyRevenue from '@/components/admin/home/monthly-revenue'
import TotalUsers from '@/components/admin/home/total-users'
import useTotalSoldTickets from '@/graphql/admin/analytics/average-response'
import useAnalyticsSoldTickets from '@/graphql/admin/analytics/sold-tickets'
import useAnalyticsTotalSubscribers from '@/graphql/admin/analytics/total-subscribers'
import useAnalyticsTotalUsers from '@/graphql/admin/analytics/total-users'
import CardOutlineIcon from '@/icons/card-outline.svg'
import HourglassOutlineIcon from '@/icons/hourglass-outline.svg'
import PersonOutlineIcon from '@/icons/person-outline.svg'
import TicketOutlineIcon from '@/icons/ticket-outline.svg'


const Admin = () => {
  const { data: soldTickets } = useAnalyticsSoldTickets()
  const { data: totalUsers } = useAnalyticsTotalUsers()
  const { data: totalSubscribers } = useAnalyticsTotalSubscribers()
  const { data: totalSoldTickets } = useTotalSoldTickets()

  const allLoaded = soldTickets && totalUsers && totalSubscribers && totalSoldTickets

  const data = [
    {
      title: 'Sold Tickets',
      value: soldTickets,
      icon: TicketOutlineIcon,
    },
    {
      title: 'Total Users',
      value: totalUsers?.totalUsers,
      icon: PersonOutlineIcon,
    },
    {
      title: 'Total Active Subscribers',
      value: totalSubscribers,
      icon: CardOutlineIcon,
    },
    {
      title: 'Total Sold Tickets',
      value: totalSoldTickets,
      icon: HourglassOutlineIcon,
    },
  ]
  
  return (
    <div className="w-full flex flex-col gap-20">
      <Header
        data={data}
        allLoaded={allLoaded}
      />
      <div className="grid lg:grid-cols-2 gap-4 md:gap-6 w-full">
        <MonthlyRevenue />
        <TotalUsers />
      </div>
    </div>
  )
}

export default Admin