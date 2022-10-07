import styles from '../styles/SideMenu.module.scss'
import TeamSwitcher from './TeamSwitcher'
import { List, NavLink, Text } from '@mantine/core'
import Link from 'next/link'
import { useNavigation } from '../hooks'
import React from 'react'
import { TeamsContext } from '../context'

function SideMenu() {
  const teamsContext = React.useContext(TeamsContext)
  const navigation = useNavigation({
    options: {
      team: teamsContext.currentTeam,
    },
  })

  return (
    <aside className={styles['side-menu']}>
      <div className={styles['team-switcher']}>
        <Text size="sm" weight={500} color="dimmed">
          Team switcher
        </Text>
        <TeamSwitcher />
      </div>
      <div className="menu">
        <Text size="sm" weight={500} color="dimmed">
          Administrar
        </Text>
        {navigation?.map((route, index) => (
          <Link href={route.path} key={index}>
            <NavLink component="a" icon={route.icon} label={route.name} />
          </Link>
        ))}
      </div>
      <div className="profile"></div>
    </aside>
  )
}

export default SideMenu
