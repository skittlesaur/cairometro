import type { NextPage } from 'next'

import Refunds from '@/components/admin/refunds'
import AdminLayout from '@/layouts/admin'

const RefundsPage: NextPage = () => {
  return (
    <AdminLayout
      navigationProps={{
        activePath: '/admin/refunds',
      }}
    >
      <Refunds />
    </AdminLayout>
  )
}

export default RefundsPage