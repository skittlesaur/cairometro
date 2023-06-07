import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/alert-dialog'
import { Button } from '@/components/button'
import UserAvatar from '@/components/user-avatar'
import PersonRemoveIcon from '@/icons/person-remove-outline.svg'
import capitalizeFirstLetters from '@/lib/capitalize-first-letters'
import User from '@/types/user'

interface UserCardProps {
  user: User
  isCurrentUser?: boolean
  handleRemoveTeammate: (email: string)=> void
}

const UserCard = ({ user, isCurrentUser, handleRemoveTeammate }: UserCardProps) => {
  return (
    <div className="w-full px-6 py-4 grid grid-cols-[2fr_1fr_1fr] items-center">
      <div className="flex items-center gap-4">
        <UserAvatar
          id={user.id}
          name={user.name}
          className="!rounded-lg !w-11 !h-11 hover:!border-gray-900/30"
          textClassName="!text-xl"
        />
        <p className="relative">
          {user.name} ({user.email})
          {isCurrentUser && (
            <div
              aria-hidden="true"
              className="absolute bg-neutral-900 top-0 left-full translate-x-2 rounded text-xs font-medium text-white px-2 py-1 top-1/2 -translate-y-1/2"
            >
              You
            </div>
          )}
        </p>
      </div>
      <div>
        <p>
          {capitalizeFirstLetters(user.role.replace('_', ' '))}
        </p>
      </div>
      <div className="flex items-center justify-end gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="hover:text-white hover:bg-red-800"
            >
              <PersonRemoveIcon className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to remove {user.name}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone and you will have to re-invite them if you want them to have access again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleRemoveTeammate(user.email)}
              >
                Remove Teammate
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default UserCard