import { Button } from '@mantine/core';

import { useAuthentication } from '../../features/authentication';
import { AuthenticatedRouteGuard } from '../../features/authentication/route-guards';

import {MainLayout} from '../../features/teams';
import { NextPageWithLayout } from '../_app';

const Dashboard: NextPageWithLayout = () => {
  const authHook = useAuthentication()

  return (
    <div>
      dashboard
      <Button onClick={authHook.logout}>
        {authHook.authState.user ? 'Sign out' : 'Not authenticated'}
      </Button>
    </div>
  )
}

Dashboard.getLayout = MainLayout

export default Dashboard
