import { useRef, useState } from 'react'

import { Button } from '@/components/button'
import Input from '@/components/input'
import { RadioGroup, RadioGroupItem } from '@/components/radio-group'
import adminInviteTeammateMutation from '@/graphql/admin/invite-teammate'
import capitalizeFirstLetters from '@/lib/capitalize-first-letters'

import { motion } from 'framer-motion'
import toast from 'react-hot-toast'


interface InviteProps {
  setInviteOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Invite = ({ setInviteOpen }: InviteProps) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [role, setRole] = useState<'ADMIN' | 'CUSTOMER_SUPPORT'>('CUSTOMER_SUPPORT')

  const handleInvite = async () => {
    const name = nameRef.current?.value
    const email = emailRef.current?.value
    
    if (!name)
      return toast.error('Please enter a name')
    
    if (!email)
      return toast.error('Please enter an email')
    
    if (!role)
      return toast.error('Please select a role')
    
    try {
      await adminInviteTeammateMutation({
        name,
        email,
        role: {
          userRole: role as 'ADMIN' | 'CUSTOMER_SUPPORT',
        },
      })
      toast.success('Teammate invited successfully')
      setInviteOpen(false)
    } catch (errors) {
      const error = (errors as {message: string}[])?.[0]?.message || 'Something went wrong'
      toast.error(error)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative w-full py-6 px-6 rounded-lg border border-neutral-200 shadow-lg transition duration-200"
    >
      <div
        className="flex flex-col gap-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col items-start gap-1">
          <label
            htmlFor="email"
            className="text-sm font-medium text-neutral-500"
          >
            Teammate Email
          </label>
          <Input
            ref={emailRef}
            dir="ltr"
            id="email"
            placeholder="Enter your invitee's email"
            className="font-medium"
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          <label
            htmlFor="name"
            className="text-sm font-medium text-neutral-500"
          >
            Teammate Name
          </label>
          <Input
            ref={nameRef}
            dir="ltr"
            id="name"
            placeholder="Enter your invitee's name"
            className="font-medium"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label
            htmlFor="role"
            className="text-sm font-medium text-neutral-500"
          >
            Teammate Role
          </label>
          <RadioGroup
            value={role}
          >
            {['ADMIN', 'CUSTOMER_SUPPORT'].map((role: string) => (
              <div 
                key={role}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem
                  value={role}
                  id={role}
                  onClick={() => setRole(role as 'ADMIN' | 'CUSTOMER_SUPPORT')}
                />
                <label
                  htmlFor={role}
                  className="text-sm font-medium text-neutral-500"
                >
                  {capitalizeFirstLetters(role.replace('_', ' '))}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2 ">
          <Button
            useLoading
            variant="primary"
            className="w-full"
            onClick={handleInvite}
          >
            Invite
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setInviteOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default Invite