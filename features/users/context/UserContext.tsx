import React from 'react'
import { useUserContext } from '../hooks'
import { User } from '../types'

interface IUserContext {
  user: User | null
  setUser?: React.Dispatch<React.SetStateAction<User | null>>
}

const defaultState = {
  user: null,
}

export const UserContext = React.createContext<IUserContext>(defaultState)

interface Props {
  children: React.ReactNode
}

export function UserContextWrapper(props: Props) {
  const userContext = useUserContext()
  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  )
}
