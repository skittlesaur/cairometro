import type { NextPage } from 'next'

import Refunds from '@/components/admin/refunds'
import AdminLayout from '@/layouts/admin'
import Verifications from '@/components/admin/verification'

const VerficationPage: NextPage = () => {
  return (
    <AdminLayout
      navigationProps={{
        activePath: '/admin/seniors-verification',
      }}
    >
      <Verifications />
    </AdminLayout>
  )
}

export default VerficationPage