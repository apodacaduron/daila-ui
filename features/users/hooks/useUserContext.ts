import React from "react"
import { User } from "../types"

export function useUserContext( ) {
  const [user, setUser] = React.useState<User | null>(null)
  const userContextProviderValue = React.useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  )

  return userContextProviderValue
}