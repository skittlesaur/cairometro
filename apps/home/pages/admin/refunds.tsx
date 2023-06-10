import type { NextPage } from 'next'

import Refunds from '@/components/admin/refunds'
import AdminLayout from '@/layouts/admin'

import { NextSeo } from 'next-seo'

const RefundsPage: NextPage = () => {
  return (
    <AdminLayout
      navigationProps={{
        activePath: '/admin/refunds',
      }}
    >
      <NextSeo
        title="Refunds"
        description="Refunds"
        titleTemplate="%s - Admin Panel"
      />
      <Refunds />
    </AdminLayout>
  )
}

export default RefundsPage