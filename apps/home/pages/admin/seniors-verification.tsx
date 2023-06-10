import type { NextPage } from 'next'

import Verifications from '@/components/admin/verification'
import AdminLayout from '@/layouts/admin'

import { NextSeo } from 'next-seo'

const VerficationPage: NextPage = () => {
  return (
    <AdminLayout
      navigationProps={{
        activePath: '/admin/seniors-verification',
      }}
    >
      <NextSeo
        title="Seniors Verification"
        description="Seniors Verification"
        titleTemplate="%s - Admin Panel"
      />
      <Verifications />
    </AdminLayout>
  )
}

export default VerficationPage