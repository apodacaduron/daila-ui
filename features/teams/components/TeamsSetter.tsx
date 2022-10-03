import React, { useCallback } from "react"
import { useAuthentication } from "../../authentication"
import { TeamsContext } from "../context"
import { useTeams } from "../hooks"

interface Props {
  children: React.ReactNode
}

function TeamsSetter(props: Props) {
  const authHook = useAuthentication()
  const teamsHook = useTeams()
  const teamsContext = React.useContext(TeamsContext)

  const getCurrentUser = useCallback(async () => {
    if (authHook.authState.user?.uid && !teamsContext.teams) {
      const members = await teamsHook.getUserTeams(authHook.authState.user.uid)
      teamsContext.setTeams?.(members ?? null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authHook.authState.user?.uid])

  React.useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  return <>{props.children}</>
}

export default TeamsSetter