import React from 'react'
import {User, UserContext} from '../features/users'

interface Props {
  children: React.ReactNode
}

function ContextWrapper(props: Props) {
  const [user, setUser] = React.useState<User | null>(null)
  const userContextProviderValue = React.useMemo(() => ({
    user, setUser,
  }), [user]);

  return <UserContext.Provider value={userContextProviderValue}>{props.children}</UserContext.Provider>
}

export default ContextWrapper