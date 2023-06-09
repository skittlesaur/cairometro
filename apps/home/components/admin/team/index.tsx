import { useState } from 'react'

import InvitationCard from '@/components/admin/team/invitation-card'
import Invite from '@/components/admin/team/invite'
import UserCard from '@/components/admin/team/user-card'
import Loader from '@/components/loader'
import usePendingInvitations from '@/graphql/admin/pending-invitations'
import adminRemoveTeammateMutation from '@/graphql/admin/remove-teammate'
import useTeamMembers from '@/graphql/admin/team'
import useUser from '@/graphql/user/me'
import AddIcon from '@/icons/add.svg'
import User from '@/types/user'

import toast from 'react-hot-toast'

import HeroGradient from '../hero-gradient'
const Team = () => {
  const [inviteOpen, setInviteOpen] = useState(false)
  const { data: teammates, isLoading: teammatesLoading, mutate: mutateTeammembers } = useTeamMembers()
  const { data: pendingInvitations } = usePendingInvitations()
  console.log(pendingInvitations)
  const { data: user } = useUser()

  const handleRemoveTeammate = async (email: string) => {
    try {
      await mutateTeammembers(async () => {
        await adminRemoveTeammateMutation({ email })
        return teammates?.filter((teammate: User) => teammate.email !== email)
      }, {
        optimisticData: teammates?.filter((teammate: User) => teammate.email !== email),
        revalidate: true,
        rollbackOnError: true,
      })
    } catch (errors) {
      const error = (errors as {message: string}[])?.[0]?.message || 'Something went wrong'
      toast.error(error)
    }
  }

  return (
    <div className="flex flex-col">
      <HeroGradient />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-1">
            <h1 className="text-2xl font-medium">
              Team Members
            </h1>
            <button
              className="flex items-center gap-2 text-sm bg-black text-white rounded-lg pl-4 p-2 font-medium hover:bg-black/70 transition-colors duration-200"
              onClick={() => setInviteOpen(prev => !prev)}
            >
              Invite Teammate
              <div className="bg-white text-black p-1 rounded-lg w-6 h-6 flex items-center justify-center">
                <AddIcon />
              </div>
            </button>
          </div>
          {inviteOpen && (
            <Invite
              setInviteOpen={setInviteOpen}
            />
          )}
          {teammatesLoading && (
            <Loader />
          )}
          {teammates && teammates.length > 0 && (
            <div className="flex flex-col rounded-lg border border-neutral-200">
              {teammates.map((teammate: User) => (
                <UserCard
                  key={teammate.id}
                  user={teammate}
                  isCurrentUser={user?.id === teammate.id}
                  handleRemoveTeammate={handleRemoveTeammate}
                />
              ))}
            </div>
          )}
        </div>
        {pendingInvitations && pendingInvitations.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-medium">
              Pending Invitations
            </h1>
            <div className="flex flex-col rounded-lg border border-neutral-200">
              {pendingInvitations.map((invitation: User) => (
                <InvitationCard
                  key={invitation.id}
                  data={invitation}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Team