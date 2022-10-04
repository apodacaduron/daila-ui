import React from "react"
import { UserContext } from "../../users"
import { NormalizedMemberTeamDataMap } from "../types"

export function useTeamsContext() {
  const userContext = React.useContext(UserContext)

  const [teams, setTeams] = React.useState<NormalizedMemberTeamDataMap | null>(
    null,
  )
  const teamsList = React.useMemo(() => {
    return Object.values(teams ?? {})
  }, [teams])
  const currentTeam = React.useMemo(() => {
    if (!userContext.user?.currentTeamId || !teams) return null
    return teams[userContext.user.currentTeamId]
  }, [teams, userContext.user?.currentTeamId])
  const teamContextProviderValue = React.useMemo(
    () => ({
      teams,
      setTeams,
      currentTeam,
      teamsList,
    }),
    [currentTeam, teams, teamsList],
  )

  return teamContextProviderValue
}