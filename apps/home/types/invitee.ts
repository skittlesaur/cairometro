import User from '@/types/user'

interface Invitee {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'CUSTOMER_SUPPORT' | 'SENIOR' | 'ADULT'
  createdAt: string
  invitedBy?: User
}

export default Invitee