import type { NextPage } from 'next'

import Admin from '@/components/admin/home'
import AdminLayout from '@/layouts/admin'

import { NextSeo } from 'next-seo'

const AdminPage: NextPage = () => {
  return (
    <AdminLayout
      navigationProps={{
        activePath: '/admin',
      }}
    >
      <NextSeo
        title="Admin Panel"
        description="Admin Panel"
        titleTemplate="%s"
      />
      <Admin />
    </AdminLayout>
  )
}

export default AdminPage