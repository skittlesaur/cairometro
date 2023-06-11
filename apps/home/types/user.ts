interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'CUSTOMER_SUPPORT' | 'SENIOR' | 'ADULT'
  createdAt: string
  documentVerified: 'ACCEPTED' | 'REJECTED' | 'PENDING'
  documentUrl: string
  picture?: string
}

export default User