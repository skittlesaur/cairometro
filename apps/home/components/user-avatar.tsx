import * as Avatar from '@radix-ui/react-avatar'
import { AnimatePresence, motion } from 'framer-motion'
import gradientAvatar from 'gradient-avatar'

interface UserAvatarProps {
  id: string
  name: string
  image?: string
}

const UserAvatar = ({ id, name, image }: UserAvatarProps) => {
  return (
    <AnimatePresence mode="wait">
      <Avatar.Root
        asChild
        className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-900/30 hover:border-gray-700"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <Avatar.Image
            className="w-full h-full object-cover"
            src={image}
            alt={name}
          />
          <Avatar.Fallback asChild>
            <div className="relative w-full h-full">
              <p
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-semibold select-none"
              >
                {name[0]}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: gradientAvatar(id),
                }}
              />
            </div>
          </Avatar.Fallback>
        </motion.div>
      </Avatar.Root>
    </AnimatePresence>
  )
}

export default UserAvatar