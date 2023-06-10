import LinesAndStations from '@/components/admin/lines-and-stations'
import AdminLayout from '@/layouts/admin'

import { NextSeo } from 'next-seo'

const LinesAndStationsPage = () => {
  return (
    <AdminLayout
      navigationProps={{
        activePath: '/admin/lines-and-stations',
      }}
    >
      <NextSeo
        title="Lines and Stations"
        description="Lines and Stations"
        titleTemplate="%s - Admin Panel"
      />
      <LinesAndStations />
    </AdminLayout>
  )
}

export default LinesAndStationsPage