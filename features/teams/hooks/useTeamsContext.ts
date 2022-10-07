import React from "react"
import { UserContext } from "../../users"
import { NormalizedMemberTeamData, NormalizedMemberTeamDataMap } from "../types"

export function useTeamsContext() {
  const userContext = React.useContext(UserContext)

  const [teams, setTeams] = React.useState<NormalizedMemberTeamDataMap | null>(
    null,
  )
  const [localCurrentTeam, setCurrentTeam] = React.useState<NormalizedMemberTeamData | null>(
    null,
  )
  const teamsList = React.useMemo(() => {
    return Object.values(teams ?? {})
  }, [teams])
  const currentTeam = React.useMemo(() => {
    if (!userContext.user?.currentTeamId || !teams) return null

    return localCurrentTeam || teams[userContext.user.currentTeamId]
  }, [teams, userContext.user?.currentTeamId, localCurrentTeam])
  const teamContextProviderValue = React.useMemo(
    () => ({
      teams,
      setTeams,
      currentTeam,
      teamsList,
      setCurrentTeam,
    }),
    [currentTeam, teams, teamsList],
  )

  return teamContextProviderValue
}