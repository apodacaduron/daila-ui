import React, { useCallback } from "react"
import { errorHandler } from "../../../utils/errorHandler"
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

  const getUserTeams = useCallback(async () => {
    try {
      if (authHook.authState.user?.uid && !teamsContext.teams) {
        const teams = await teamsHook.getUserTeams(authHook.authState.user.uid)
        teamsContext.setTeams?.(teams ?? null)
      }
    } catch (err) {
      errorHandler(err)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authHook.authState.user?.uid])

  React.useEffect(() => {
    getUserTeams()
  }, [getUserTeams])

  return <>{props.children}</>
}

export default TeamsSetter