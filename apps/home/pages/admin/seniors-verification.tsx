import type { NextPage } from 'next'

import Verifications from '@/components/admin/verification'
import AdminLayout from '@/layouts/admin'

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