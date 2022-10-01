import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { routes } from '../../../data/routesMap';
import { useAuthentication } from '../hooks';

interface Props {
  children: React.ReactNode
}

function AuthenticatedRouteGuard(props: Props) {
  const authHook = useAuthentication()
  const router = useRouter()

  useEffect(() => {
    if (!authHook.authState.user && !authHook.authState.loading) {
      router.push(routes.SIGN_IN)
    }
  }, [authHook.authState.user, authHook.authState.loading, router])

  if (authHook.authState.loading) {
    return <div>loading</div>
  }
  // prevent any flicker
  if (!authHook.authState.user) {
    return null
  }
  return <>{props.children}</>
}

export default AuthenticatedRouteGuard
