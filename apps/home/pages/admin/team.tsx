import Team from '@/components/admin/team'
import AdminLayout from '@/layouts/admin'

const TeamPage = () => {
  return (
    <AdminLayout
      navigationProps={{
        activePath: '/admin/team',
      }}
    >
      <Team />
    </AdminLayout>
  )
}

export default TeamPage