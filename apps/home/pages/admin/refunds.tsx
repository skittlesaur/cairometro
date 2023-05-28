import type { NextPage } from 'next'

import Admin from '@/components/admin/home'
import AdminLayout from '@/layouts/admin'
import AdminNavigation from '@/components/admin/navigation'
import Header from '@/components/admin/header'

import useAnalyticsAverageCustomerSupportResponse from '@/graphql/admin/analytics/average-response'
import useAnalyticsSoldTickets from '@/graphql/admin/analytics/sold-tickets'
import useAnalyticsTotalSubscribers from '@/graphql/admin/analytics/total-subscribers'
import useAnalyticsTotalUsers from '@/graphql/admin/analytics/total-users'
import CardOutlineIcon from '@/icons/card-outline.svg'
import HourglassOutlineIcon from '@/icons/hourglass-outline.svg'
import PersonOutlineIcon from '@/icons/person-outline.svg'
import TicketOutlineIcon from '@/icons/ticket-outline.svg'

import RefundsTable from '@/components/admin/refunds/refunds-table'

const RefundsPage: NextPage = () => {
    const { data: soldTickets } = useAnalyticsSoldTickets()
  const { data: totalUsers } = useAnalyticsTotalUsers()
  const { data: totalSubscribers } = useAnalyticsTotalSubscribers()
  const { data: averageResponseTime } = useAnalyticsAverageCustomerSupportResponse()

  const allLoaded = soldTickets && totalUsers && totalSubscribers && averageResponseTime
  const data = [
    {
      title: 'Total Refund Requests',
      value: soldTickets,
      icon: TicketOutlineIcon,
    },
    {
      title: 'Total Approved',
      value: totalUsers?.totalUsers,
      icon: TicketOutlineIcon,
    },
    {
      title: 'Total Rejected',
      value: totalSubscribers,
      icon: TicketOutlineIcon,
    },
    {
      title: 'Total Refunds This Month',
      // response is in minutes convert it to x hours y minutes
      value: averageResponseTime ? `${Math.floor(averageResponseTime / 60)}h ${averageResponseTime % 60}m` : undefined,
      icon: TicketOutlineIcon,
    },
  ]
  return (
    <div>
       <AdminNavigation />
       <Header 
       data={data}
       allLoaded={allLoaded}
       />
       <RefundsTable />
    </div>

  )
}

export default RefundsPage