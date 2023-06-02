import { Button } from '@/components/button'
import { UpdateRefundRequestVariables } from '@/graphql/admin/refunds/update-refund-request'
import Refund from '@/types/refund'

import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface RefundRequestCardProps {
  refundId: string
  userName: string
  email: string
  date: Date
  price: number
  message: string
  setRefundOpen: (data: Refund | undefined)=> void
  optimisticUpdate: (variables: UpdateRefundRequestVariables)=> void
}

const RefundRequestCard = ({
  refundId, userName, email, date, price, message, setRefundOpen, optimisticUpdate,
}: RefundRequestCardProps) => {
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)

    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    })

    return `${formattedDate} at ${formattedTime}`
  }

  const handleUpdate = async (status: 'ACCEPTED' | 'REJECTED')=>{
    const variables = {
      refundRequestId: refundId,
      status: { refundStatus: status },
    }
    
    try {
      setRefundOpen(undefined)
      await optimisticUpdate(variables)
      toast.success('Refund request updated successfully')
    } catch (e) {
      toast.error('Something went wrong please try again')
    }
  }

  return (
    <motion.div
      key="purchase-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.1 } }}
      transition={{ duration: 0.2 }}
      className="fixed bg-neutral-900/80 backdrop-blur-sm inset-0 z-[100] flex items-center justify-center"
      onClick={() => {
        setRefundOpen(undefined)
      }}
    >
      <motion.div
        key="refund-modal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="bg-white w-screen w-full max-h-screen overflow-y-auto no-scrollbar max-w-screen-lg md:rounded-xl justify-between items-center p-5 gap-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-8 items-start">
          <h1 className="text-lg font-semibold">
            Would you like to approve or reject this refund request?
          </h1>
          <div className="flex flex-col gap-3">
            <div>
              <label
                htmlFor="requested-by"
                className="text-gray-500 font-medium"
              >
                Requested By
              </label>
              <p
                id="requested-by"
              >
                {userName} ({email})
              </p>
            </div>
            <div>
              <label
                htmlFor="date"
                className="text-gray-500 font-medium"
              >
                Request Date
              </label>
              <p
                id="date"
              >
                {formatDate(date)}
              </p>
            </div>
            <div>
              <label
                htmlFor="amount"
                className="text-gray-500 font-medium"
              >
                Refund Amount
              </label>
              <p
                id="amount"
              >
                {price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'EGP',
                })}
              </p>
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-gray-500 font-medium"
              >
                Message
              </label>
              <p
                id="message"
              >
                {message}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button
              variant="outline"
              onClick={() => handleUpdate('ACCEPTED')}
            >
              Accept Refund
            </Button>
            <Button
              variant="danger"
              onClick={() => handleUpdate('REJECTED')}
            >
              Reject Refund
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RefundRequestCard