import { useRouter } from 'next/router'

import { Button } from '@/components/button'
import Loader from '@/components/loader'
import useGetInvitation from '@/graphql/get-invitation'
import updateInvitationMutation from '@/graphql/update-invitation'
import capitalizeFirstLetters from '@/lib/capitalize-first-letters'

import toast from 'react-hot-toast'

const InvitePage = () => {
  const router = useRouter()
  
  const { code } = router.query

  const { data, isLoading, error } = useGetInvitation({
    token: code as string,
  })

  if (error){
    router.push('/')
    return null
  }

  const handleClick = async (status: 'ACCEPTED' | 'REJECTED') => {
    try {
      await updateInvitationMutation({
        token: data.id,
        status,
      })
      
      router.push('/login')
    } catch (e) {
      const error = (e as {message: string}[])?.[0]?.message || 'Something went wrong'
      toast.error(error)
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {isLoading && (
        <Loader />
      )}
      {data && (
        <div className="flex flex-col gap-4 max-w-screen-md w-full">
          <div className="w-full flex items-center justify-between border-b pb-2 border-neutral-200">
            <h1 className="text-2xl font-medium">
              You{"'"}ve been invited to join the team!
            </h1>
            <p className="text-sm text-neutral-500">
              Received on {new Date(data.createdAt).toLocaleString(
                'en-US',
                {
                  month: 'long',
                  day: 'numeric',
                }
              )} at {new Date(data.createdAt).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </p>
          </div>
          <p>
            {data.invitedBy?.name} ({data.invitedBy?.email}) has invited you to join Cairo Metro as {capitalizeFirstLetters(data.role.replace('_', ' '))}.
          </p>
          <p className="text-sm text-neutral-500">
            Please note that you can only accept this invitation once. If you decline this invitation, you will not be able to accept it again. If you wish to join the team after declining this invitation, please contact the person who invited you.
          </p>
          <div className="flex items-center gap-2">
            <Button
              useLoading
              onClick={() => handleClick('ACCEPTED')}
            >
              Accept Invitation
            </Button>
            <Button
              useLoading
              variant="outline"
              onClick={() => handleClick('REJECTED')}
            >
              Decline Invitation
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InvitePage