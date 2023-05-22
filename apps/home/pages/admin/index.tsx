import type { NextPage } from 'next'

import Admin from '@/components/admin/home'
import AdminLayout from '@/layouts/admin'

const AdminPage: NextPage = () => {
  return (
    <AdminLayout
      navigationProps={{
        activePath: '/admin',
      }}
    >
      <Admin />
    </AdminLayout>
  )
}

export default AdminPage