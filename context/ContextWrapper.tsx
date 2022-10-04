import React from 'react'
import {
  TeamsContextWrapper,
} from '../features/teams'
import { UserContextWrapper } from '../features/users'

interface Props {
  children: React.ReactNode
}

function ContextWrapper(props: Props) {

  return (
    <UserContextWrapper>
      <TeamsContextWrapper>
        {props.children}
      </TeamsContextWrapper>
    </UserContextWrapper>
  )
}

export default ContextWrapper
