import UserAvatar from '@/components/user-avatar'
import capitalizeFirstLetters from '@/lib/capitalize-first-letters'
import Invitee from '@/types/invitee'

interface UserCardProps {
  data: Invitee
}

const InvitationCard = ({ data }: UserCardProps) => {
  return (
    <div className="w-full px-6 py-4 grid grid-cols-[2fr_1fr_1fr] items-center">
      <div className="flex items-center gap-4">
        <UserAvatar
          id={data.id}
          name={data.name}
          className="!rounded-lg !w-11 !h-11 hover:!border-gray-900/30"
          textClassName="!text-xl"
        />
        <p className="relative">
          {data.name} ({data.email})
        </p>
      </div>
      <div>
        <p>
          {capitalizeFirstLetters(data.role)}
        </p>
      </div>
      <p className="text-sm text-right">
        Invited by {data.invitedBy?.name} on {new Date(data.createdAt).toLocaleString(
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
  )
}

export default InvitationCard