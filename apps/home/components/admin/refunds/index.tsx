import { useState } from 'react'

import Header from '@/components/admin/header'
import RefundRequestCard from '@/components/admin/refunds/refund-request-card'
import RefundsTable from '@/components/admin/refunds/refunds-table'
import { Button } from '@/components/button'
import useRefundsAnalytics from '@/graphql/admin/analytics/refunds-analytics'
import useRefunds, { RefundsVariables } from '@/graphql/admin/refunds/refunds'
import updateRefundRequestMutation, {
  UpdateRefundRequestVariables,
} from '@/graphql/admin/refunds/update-refund-request'
import CalendarIcon from '@/icons/calendar-outline.svg'
import CheckboxIcon from '@/icons/checkbox-outline.svg'
import CloseCircleIcon from '@/icons/close-circle-outline.svg'
import PriceTagsIcon from '@/icons/pricetags-outline.svg'
import Refund from '@/types/refund'

import { AnimatePresence } from 'framer-motion'

const Refunds = () => {
  const [refundOpen, setRefundOpen] = useState<Refund | undefined>(undefined)
  const [page, setPage] = useState(0)
  const [take, setTake] = useState(6)
  const [filterBy, setFilterBy] = useState<RefundsVariables['filterBy']>('ALL')
  const [search, setSearch] = useState('')


  const { data: refunds, mutate: mutateRefunds } = useRefunds({
    page,
    take,
    filterBy,
    search,
  })

  const { data: analytics, isLoading: analyticsLoading } = useRefundsAnalytics()

  const data = [
    {
      title: 'Total Refund Requests',
      value: analytics?.total,
      icon: PriceTagsIcon,
    },
    {
      title: 'Total Approved',
      value: analytics?.totalApproved,
      icon: CheckboxIcon,
    },
    {
      title: 'Total Rejected',
      value: analytics?.totalRejected,
      icon: CloseCircleIcon,
    },
    {
      title: 'Total Refunds This Month',
      value: analytics?.totalThisMonth,
      icon: CalendarIcon,
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
        allLoaded={!analyticsLoading && analytics}
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
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
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