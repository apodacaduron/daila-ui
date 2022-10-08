import { Button } from '@mantine/core';

import { useAuthentication } from '../../../features/authentication';

import { MainLayout } from '../../../features/teams';
import { NextPageWithLayout } from '../../_app';

const Dashboard: NextPageWithLayout = () => {
  const authHook = useAuthentication()

  return (
    <div>
      admin dashboard
      <Button onClick={authHook.logout}>
        {authHook.authState.user && 'Sign out'}
      </Button>
    </div>
  )
}

Dashboard.getLayout = MainLayout

export default Dashboard
