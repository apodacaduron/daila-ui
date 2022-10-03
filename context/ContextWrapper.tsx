import React from 'react'
import { Member, TeamsContext } from '../features/teams'
import { User, UserContext } from '../features/users'

interface Props {
  children: React.ReactNode
}

function ContextWrapper(props: Props) {
  const [user, setUser] = React.useState<User | null>(null)
  const userContextProviderValue = React.useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  )

  const [teams, setTeams] = React.useState<Member[] | null>(null)
  const teamContextProviderValue = React.useMemo(
    () => ({
      teams,
      setTeams,
    }),
    [teams],
  )

  return (
    <UserContext.Provider value={userContextProviderValue}>
    <TeamsContext.Provider value={teamContextProviderValue}>
      {props.children}
    </TeamsContext.Provider>
    </UserContext.Provider>
  )
}

export default ContextWrapper
