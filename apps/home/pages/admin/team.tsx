import Team from '@/components/admin/team'
import AdminLayout from '@/layouts/admin'

import { NextSeo } from 'next-seo'

const TeamPage = () => {
  return (
    <AdminLayout
      navigationProps={{
        activePath: '/admin/team',
      }}
    >
      <NextSeo
        title="Team"
        description="Team"
        titleTemplate="%s - Admin Panel"
      />
      <Team />
    </AdminLayout>
  )
}

export default TeamPage