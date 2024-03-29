import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { routes } from '../../../data/routesMap';
import { useAuthentication } from '../hooks';

interface Props {
  children: React.ReactNode
  isLoading: boolean
}

function ForVisitorsRouteGuard(props: Props) {
  const authHook = useAuthentication()
  const router = useRouter()

  useEffect(() => {
    if (authHook.authState.user && !authHook.authState.loading && !props.isLoading) {
      router.push(routes.HOME)
    }
  }, [authHook.authState.user, authHook.authState.loading, router, props.isLoading])

  if (authHook.authState.loading || props.isLoading) {
    return <div>loading</div>
  }
  // prevent any flicker
  if (authHook.authState.user) {
    return null
  }
  return <>{props.children}</>
}

export default ForVisitorsRouteGuard
