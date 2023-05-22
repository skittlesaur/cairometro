import { useRouter } from 'next/router'

import AdminNavigation, { AdminNavigationProps } from '@/components/admin/navigation'
import useUser from '@/graphql/user/me'

interface AdminProps {
  children: React.ReactNode
  navigationProps?: AdminNavigationProps
}

const AdminLayout = ({ children, navigationProps }: AdminProps) => {
  const { data: user, isLoading: userLoading } = useUser()
  const router = useRouter()
  
  if (userLoading) return null
  
  if (user.role !== 'ADMIN')
    router.push('/')
    
  
  return (
    <div className="pb-20 min-h-screen relative max-w-screen overflow-x-hidden">
      <AdminNavigation {...navigationProps} />
      <div className="max-w-screen-xl mx-4 min-[1300px]:mx-auto">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout