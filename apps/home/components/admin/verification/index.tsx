import { useState } from 'react'

import Header from '@/components/admin/header'
import RefundRequestCard from '@/components/admin/refunds/refund-request-card'
import RefundsTable from '@/components/admin/refunds/refunds-table'
import { Button } from '@/components/button'
import useRefundsAnalytics from '@/graphql/admin/analytics/refunds-analytics'
import useRefunds from '@/graphql/admin/refunds/refunds'
import updateRefundRequestMutation, {
  UpdateRefundRequestVariables,
} from '@/graphql/admin/refunds/update-refund-request'
import CalendarIcon from '@/icons/calendar-outline.svg'
import CheckboxIcon from '@/icons/checkbox-outline.svg'
import CloseCircleIcon from '@/icons/close-circle-outline.svg'
import PriceTagsIcon from '@/icons/pricetags-outline.svg'
import Refund from '@/types/refund'
import User from '@/types/user'
import VerificationsTable from './verification-table'
import VerificationRequestCard from './verification-request-card'
import { UpdateVerificationRequestVariables } from '@/graphql/admin/verifications/update-verification-request'
import updateVerificationRequestMutation from '@/graphql/admin/verifications/update-verification-request'

import useVerifications from '@/graphql/admin/verifications/verifications'

import { AnimatePresence } from 'framer-motion'

const Verifications = () => {
  const [userOpen, setUserOpen] = useState<User | undefined>(undefined)
  const [page, setPage] = useState(0)
  const [take, setTake] = useState(6)

  const { data: verifications, mutate: mutateVerifications} = useVerifications({
    page,
    take,
  })
  console.log(verifications)

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

  const optimisticUpdate = async (variables: UpdateVerificationRequestVariables) => {
    await mutateVerifications(async () => {
      await updateVerificationRequestMutation(variables)
      return verifications.map((user: User) => {
        if (user.id === variables.userId) {
          return {
            ...user,
            documentVerified: variables.documentVerified.verificationStatus,
          }
        }

        return user
      })
    }, {
      optimisticData: verifications.map((user: User) => {
        if (user.id === variables.userId) {
          return {
            ...user,
            documentVerified: variables.documentVerified.verificationStatus,
          }
        }

        return user
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
        {userOpen && (
          <VerificationRequestCard
            key={userOpen.id}
            userId={userOpen.id}
            userName={userOpen.name}
            email={userOpen.email}
            date={new Date(userOpen.createdAt)}
            role={userOpen.role}
            documentVerified={userOpen.documentVerified}
            documentUrl={userOpen.documentUrl}
            setUserOpen={setUserOpen}
            optimisticUpdate={optimisticUpdate}
          />
        )}
      </AnimatePresence>
      <VerificationsTable
        setUserOpen={setUserOpen}
        data={verifications?.map(datum => ({
          ...datum,
          user: {
            name: datum.name,
            email: datum.email,
          }
        }))}
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
            disabled={!verifications || verifications?.length < take}
            onClick={() => setPage(prev => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Verifications