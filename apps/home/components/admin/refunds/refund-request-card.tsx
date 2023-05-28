import * as Dialog from '@radix-ui/react-dialog';
import updateRefundRequestMutation from '@/graphql/admin/refunds/update-refund-request';
import { AnimatePresence, motion } from 'framer-motion'

const RefundRequestCard = (props: any)=>{

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        return formattedDate;
      };
    const handleUpdate = (refundId: string ,status: any)=>{
        const variables = {
            refundRequestId: refundId,
            status: {refundStatus: status}
        }
        updateRefundRequestMutation(variables).then((res)=> console.log("success"))
    }

    var divStyle = null
    switch(props.status){
        case "PENDING":
            divStyle = (
            <div className="bg-orange-100 p-2 rounded border-orange-500">
                <p className="text-xs text-orange-500">{props.status}</p>
            </div>)
            break
        case "ACCEPTED":
            divStyle = (
                <div className="bg-green-100 p-2 rounded border-green-500">
                    <p className="text-xs text-green-500">{props.status}</p>
                </div>)
                break
        case "REJECTED":
            divStyle = (
                <div className="bg-red-100 p-2 rounded border-red-500">
                    <p className="text-xs text-red-500">{props.status}</p>
                </div>)
                break
    }
    return(
        <Dialog.Root>
    <Dialog.Trigger asChild>
    <div className="flex flex-grow items-center justify-between text-gray-900 py-2 hover:cursor-pointer">
        
            <div className="flex-col">
            <div className='flex justify-between gap-8'>
                        <div>
                        <p>{props.name}</p>
                        <p className="text-gray-500">{props.email}</p>
                        </div>
                </div>
            </div>
            <div>
                <p>{formatDate(props.date)}</p>
            </div>
            <div>
                {divStyle}
            </div>
            <div>
                <p>{props.price} EGP</p>
            </div>
        </div>
    </Dialog.Trigger>
    <Dialog.Portal>
        
      <Dialog.Overlay className="fixed inset-0 bg-blackA9 animate-overlayShow bg-black bg-opacity-50 z-[50]" />
      
      <Dialog.Content className=" p-4 rounded-xl shadow-dialogShadow fixed top-1/2 left-1/2 z-[51] transform -translate-x-1/2 -translate-y-1/2 w-2/4 animate-contentShow">
        
        <Dialog.Description className="DialogDescription">
          
        </Dialog.Description>
        <motion.div
            key="refund-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="bg-white w-screen w-full max-h-screen overflow-y-auto no-scrollbar max-w-screen-lg md:rounded-xl justify-between items-center p-5 gap-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Dialog.Title className="font-semibold leading-7">Would you like to approve or reject this refund request?</Dialog.Title>
            <div className='flex flex-col gap-2'>
                <div>
                    <p className='font-medium leading-6 text-gray-500'>Requested By</p>
                    <p className='leading-6'>{props.email}</p>
                </div>
                <div>
                    <p className='font-medium leading-6 text-gray-500'>Request Date</p>
                    <p className='leading-6'>{formatDate(props.date)}</p>
                </div>
                <div>
                    <p className='font-medium leading-6 text-gray-500'>Refund Amount</p>
                    <p className='leading-6'>{props.price}</p>
                </div>
                <div>
                    <p className='font-medium leading-6 text-gray-500'>Message</p>
                    <p className='leading-6'>{props.message}</p>
                </div>
            
        </div>
        <div className='flex justify-between pt-10'>
            <button onClick={()=>{handleUpdate(props.refundId, "ACCEPTED")}} className='w-1/2 border rounded-md mr-2 p-2 hover:bg-green-100 hover:border-green-500'>Accept Refund</button>
            <button onClick={()=>{handleUpdate(props.refundId, "REJECTED")}} className='w-1/2 border rounded-md mr-2 p-2 hover:bg-red-100 hover:border-red-500'>Reject Refund</button>
        </div>
          </motion.div>
        
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
        
    )
}

export default RefundRequestCard