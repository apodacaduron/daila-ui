import { navigation, TEAM_SLUG } from "../data"
import { Team } from "../types"

type UseNavigationContext = {
  options: {
    team: Team | null
  }
}
export function useNavigation(context: UseNavigationContext) {
  if (!context?.options?.team?.id) return

  const teamId = context.options.team.id
  const teamType = context.options.team.type
  const currentRoutes = replacePlaceholderTeamSlug(navigation[teamType])

  function replacePlaceholderTeamSlug(routes: typeof navigation[typeof teamType]) {
    console.log('TEST')
    return Object.values(routes).map(route => ({ ...route, path: route.path.replace(TEAM_SLUG, teamId) }))
  }
  
  return currentRoutes
}