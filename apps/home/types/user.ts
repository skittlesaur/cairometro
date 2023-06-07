interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'CUSTOMER_SUPPORT' | 'SENIOR' | 'ADULT'
  createdAt: string
}

export default User