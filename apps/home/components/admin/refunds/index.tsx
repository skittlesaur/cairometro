import { useState } from 'react'

import Header from '@/components/admin/header'
import RefundRequestCard from '@/components/admin/refunds/refund-request-card'
import RefundsTable from '@/components/admin/refunds/refunds-table'
import { Button } from '@/components/button'
import useAnalyticsAverageCustomerSupportResponse from '@/graphql/admin/analytics/average-response'
import useAnalyticsSoldTickets from '@/graphql/admin/analytics/sold-tickets'
import useAnalyticsTotalSubscribers from '@/graphql/admin/analytics/total-subscribers'
import useAnalyticsTotalUsers from '@/graphql/admin/analytics/total-users'
import useRefunds from '@/graphql/admin/refunds/refunds'
import updateRefundRequestMutation, {
  UpdateRefundRequestVariables,
} from '@/graphql/admin/refunds/update-refund-request'
import TicketOutlineIcon from '@/icons/ticket-outline.svg'
import Refund from '@/types/refund'

import { AnimatePresence } from 'framer-motion'

const Refunds = () => {
  const [refundOpen, setRefundOpen] = useState<Refund | undefined>(undefined)
  const [page, setPage] = useState(0)
  const [take, setTake] = useState(6)

  const { data: refunds, mutate: mutateRefunds } = useRefunds({
    page,
    take,
  })

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

  const optimisticUpdate = async (variables: UpdateRefundRequestVariables) => {
    await mutateRefunds(async () => {
      await updateRefundRequestMutation(variables)
      return refunds.map((refund: Refund) => {
        if (refund.id === variables.refundRequestId) {
          return {
            ...refund,
            status: variables.status.refundStatus,
          }
        }

        return refund
      })
    }, {
      optimisticData: refunds.map((refund: Refund) => {
        if (refund.id === variables.refundRequestId) {
          return {
            ...refund,
            status: variables.status.refundStatus,
          }
        }

        return refund
      }),
      rollbackOnError: true,
      populateCache: true,
      revalidate: true,
    })
  }

  return (
    <div className="w-full">
      <Header
        data={data}
        allLoaded={allLoaded}
      />
      <AnimatePresence mode="wait">
        {refundOpen && (
          <RefundRequestCard
            key={refundOpen.id}
            refundId={refundOpen.id}
            userName={refundOpen.user.name}
            email={refundOpen.user.email}
            price={refundOpen.price}
            date={refundOpen.createdAt}
            message={refundOpen.message}
            setRefundOpen={setRefundOpen}
            optimisticUpdate={optimisticUpdate}
          />
        )}
      </AnimatePresence>
      <RefundsTable
        setRefundOpen={setRefundOpen}
        data={refunds}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-gray-500 text-sm">
            Show result
          </label>
          <select 
            className="border px-2 py-1.5 rounded-lg text-sm font-medium"
            value={take}
            onChange={(e) => {
              console.log(parseInt(e.target.value))
              setTake(parseInt(e.target.value))
            }}
          >
            {[6, 10, 14].map((val) => (
              <option
                key={val}
                value={val}
              >
                {val}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage(prev => prev - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!refunds || refunds?.length < take}
            onClick={() => setPage(prev => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Refunds