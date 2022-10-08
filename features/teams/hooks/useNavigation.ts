import React from "react"
import { navigation, TEAM_SLUG } from "../data"
import { Team } from "../types"

type UseNavigationContext = {
  options: {
    team: Team | null
  }
}
export function useNavigation(context: UseNavigationContext) {
  const teamId = context.options.team?.id
  const teamType = context.options.team?.type

  const currentRoutes = React.useMemo(() => {
    if (!teamType || !teamId) return []
    const routes = navigation[teamType]
    return Object.values(routes).map(route => ({ ...route, path: route.path.replace(TEAM_SLUG, teamId) }))
  }, [teamId, teamType])

  return currentRoutes
}