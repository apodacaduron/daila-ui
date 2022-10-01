import { Button } from '@mantine/core';

import { useAuthentication } from '../../features/authentication';
import { AuthenticatedRouteGuard } from '../../features/authentication/route-guards';

import type { NextPage } from 'next'
const Dashboard: NextPage = () => {
  const authHook = useAuthentication()

  return (
    <AuthenticatedRouteGuard>
      <div>
        dashboard
        <Button onClick={authHook.logout}>
          {authHook.authState.user ? 'Sign out' : 'Not authenticated'}
        </Button>
      </div>
    </AuthenticatedRouteGuard>
  )
}

export default Dashboard
