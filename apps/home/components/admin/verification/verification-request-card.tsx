import { Button } from '@/components/button'
import { UpdateVerificationRequestVariables } from '@/graphql/admin/verifications/update-verification-request'
import User from '@/types/user'

import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface VerificationRequestCardProps {
  userId: string
  userName: string
  email: string
  date: Date
  role: string
  documentVerified: string
  documentUrl: string

  setUserOpen: (data: User | undefined)=> void
  optimisticUpdate: (variables: UpdateVerificationRequestVariables)=> void
}

const VerificationRequestCard = ({
  userId, userName, email, date, documentUrl, setUserOpen, optimisticUpdate,
}: VerificationRequestCardProps) => {
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

  const handleUpdate = async (documentVerified: 'ACCEPTED' | 'REJECTED')=>{
    const variables = {
      userId: userId,
      documentVerified: { verificationstatus: documentVerified },
    }
    
    try {
      setUserOpen(undefined)
      await optimisticUpdate(variables)
      toast.success('Successfully updated verification request')
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
        setUserOpen(undefined)
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
            Would you like to approve or reject this verification request?
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
          </div>
          <div className="mx-auto">
            <img
              className="w-full max-h-[20em] object-cover"
              src={documentUrl}
            >
            </img>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button
              variant="outline"
              onClick={() => handleUpdate('ACCEPTED')}
            >
              Accept
            </Button>
            <Button
              variant="danger"
              onClick={() => handleUpdate('REJECTED')}
            >
              Reject
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default VerificationRequestCard