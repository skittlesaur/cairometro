import LinesAndStations from '@/components/admin/lines-and-stations'
import AdminLayout from '@/layouts/admin'

const LinesAndStationsPage = () => {
  return (
    <AdminLayout
      navigationProps={{
        activePath: '/admin/lines-and-stations',
      }}
    >
      <LinesAndStations />
    </AdminLayout>
  )
}

export default LinesAndStationsPage