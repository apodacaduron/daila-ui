import styles from '../styles/SideMenu.module.scss'
import TeamSwitcher from './TeamSwitcher'
import { Group, NavLink, Stack, Text } from '@mantine/core'
import Link from 'next/link'
import { useNavigation } from '../hooks'
import React from 'react'
import { TeamsContext } from '../context'
import Profile from './Profile'

function SideMenu() {
  const teamsContext = React.useContext(TeamsContext)
  const navigation = useNavigation({
    options: {
      team: teamsContext.currentTeam,
    },
  })

  return (
    <Stack justify="space-between" className={styles['side-menu']}>
      <div>
        <div className={styles['team-switcher']}>
          <Text size="sm" weight={500} color="dimmed">
            Selector de equipos
          </Text>
          <TeamSwitcher />
        </div>
        <div className="menu">
          <Text size="sm" weight={500} color="dimmed" sx={{ marginLeft: '24px' }}>
            Administrar
          </Text>
          {navigation?.map((route, index) => (
            <Link href={route.path} key={index}>
              <NavLink component="a" icon={route.icon} label={route.name} sx={{ paddingLeft: '24px' }} />
            </Link>
          ))}
        </div>
      </div>
      <div className="profile">
        <Profile />
      </div>
    </Stack>
  )
}

export default SideMenu
