import Link from 'next/link'

import { Button } from '@mantine/core'

import { routes } from '../../../data/routesMap'
import styles from '../styles/Nav.module.scss'
import { UserContext, UserSetter } from '../../users'
import Image from 'next/image'
import { userAgent } from 'next/server'
import { useAuthentication } from '../../authentication'
import React from 'react'

const Nav = () => {
  const authHook = useAuthentication()
  const userContext = React.useContext(UserContext)

  const NoSessionButtons = (
    <>
      {' '}
      <Link href={routes.SIGN_IN} passHref>
        <Button component="a">Inicia sesión</Button>
      </Link>
      <Link href={routes.SIGN_UP} passHref>
        <Button component="a" variant="default">
          Regístrate
        </Button>
      </Link>
    </>
  )

  function getSessionButtons() {
    if (authHook.authState.user && !authHook.authState.loading) {
      if (userContext.user?.currentTeamId) {
        return <>
        <Link href={routes.TEAM_DASHBOARD(userContext.user.currentTeamId ?? '')} passHref>
          <Button component="a">Dashboard</Button>
        </Link>
          <Button onClick={authHook.logout} variant="default">
            Sign out
          </Button>
      </>
      }
    } else if (!authHook.authState.user && !authHook.authState.loading) {
      return NoSessionButtons
    }
  }

  return (
    <UserSetter>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Image
              src="/assets/daila.svg"
              alt="Daila logo"
              width="100px"
              height="56px"
            />
          </div>
          <div className={styles.actions}>{getSessionButtons()}</div>
        </div>
      </nav>
    </UserSetter>
  )
}

export default Nav
