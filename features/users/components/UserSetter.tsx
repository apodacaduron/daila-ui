import React, { useCallback } from "react"
import { errorHandler } from "../../../utils/errorHandler"
import { useAuthentication } from "../../authentication"
import { UserContext } from "../context"
import { useUsers } from "../hooks"

interface Props {
  children: React.ReactNode
}

function UserSetter(props: Props) {
  const authHook = useAuthentication()
  const usersHook = useUsers()
  const userContext = React.useContext(UserContext)

  const getCurrentUser = useCallback(async () => {
    try {
      if (authHook.authState.user?.uid && !userContext.user) {
        const currentUser = await usersHook.getCurrentUser(authHook.authState.user.uid)
        userContext.setUser?.(currentUser ?? null)
      }
    } catch (err) {
      errorHandler(err)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authHook.authState.user?.uid])

  React.useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  return <>{props.children}</>
}

export default UserSetter