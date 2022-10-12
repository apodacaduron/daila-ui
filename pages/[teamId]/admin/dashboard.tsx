import { MainLayout } from '../../../features/teams';
import { NextPageWithLayout } from '../../_app';

const Dashboard: NextPageWithLayout = () => {
  return (
    <div>
      admin dashboard
    </div>
  )
}

Dashboard.getLayout = MainLayout

export default Dashboard
