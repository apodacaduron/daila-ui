import { Avatar, Menu, Text } from '@mantine/core'
import styles from '../styles/TeamSwitcher.module.scss'
import { BsChevronExpand, BsCheck } from 'react-icons/bs'
import React from 'react'
import { TeamsContext } from '../context'

function TeamSwitcher() {
  const teamsContext = React.useContext(TeamsContext)

  function onSelectTeam(teamId: string) {
    const newCurrentTeam = teamsContext.teams?.[teamId]
    if (!newCurrentTeam) return
    teamsContext.setCurrentTeam?.(newCurrentTeam)
  }

  function getCheckedIcon(teamId: string) {
    if (teamId !== teamsContext.currentTeam?.id) return null

    return <BsCheck size='1.5em' />
  }
  
  return (
    <Menu width="target">
      <Menu.Target>
        <button className={styles['team-switcher']}>
          <div className={styles['team-switcher-left']}>
            <div className="avatar">
              <Avatar color="cyan" radius="xl">
               {teamsContext.currentTeam?.name?.charAt(0)}
              </Avatar>
            </div>
            <div className="team-name">
              <Text size="md" weight={500}>
                {teamsContext.currentTeam?.name}
              </Text>
              <Text size="xs" color="dimmed">
                Team
              </Text>
            </div>
          </div>
          <div className={styles['team-switcher-right']}>
            <div className="icon">
              <BsChevronExpand />
            </div>
          </div>
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Your teams</Menu.Label>
        {teamsContext.teamsList.map(team => {
          return <Menu.Item key={team.id} rightSection={getCheckedIcon(team.id)} onClick={() => onSelectTeam(team.id)}>{team.name}</Menu.Item>
        })}
      </Menu.Dropdown>
    </Menu>
  )
}

export default TeamSwitcher
