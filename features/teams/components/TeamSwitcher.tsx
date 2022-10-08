import { Avatar, Group, Menu, Text } from '@mantine/core'
import styles from '../styles/TeamSwitcher.module.scss'
import { BsChevronExpand, BsCheck } from 'react-icons/bs'
import React from 'react'
import { TeamsContext } from '../context'
import { useRouter } from 'next/router'
import { routes } from '../../../data/routesMap'
import { useTeams } from '../hooks'
import {useDebounce} from 'react-use'
import { UserContext } from '../../users'

function TeamSwitcher() {
  const teamsContext = React.useContext(TeamsContext)
  const userContext = React.useContext(UserContext)
  const router = useRouter()
  const teamsHook = useTeams()

  useDebounce(
    () => {
      if (userContext.user?.currentTeamId === teamsContext.currentTeam?.id) return
      teamsHook.switchCurrentTeam.execute({ currentTeamId: teamsContext.currentTeam?.id })
    },
    2000,
    [teamsContext.currentTeam?.id, userContext.user?.currentTeamId]
  );

  function onSelectTeam(teamId: string) {
    const newCurrentTeam = teamsContext.teams?.[teamId]
    if (!newCurrentTeam) return
    teamsContext.setCurrentTeam?.(newCurrentTeam)
    switch (newCurrentTeam.type) {
      case 'ADMIN':
        router.push(routes.ADMIN.TEAM_DASHBOARD(newCurrentTeam.id))
        break;
      default:
        router.push(routes.TEAM_DASHBOARD(newCurrentTeam.id))
        break;
    }
  }

  function getCheckedIcon(teamId: string) {
    if (teamId !== teamsContext.currentTeam?.id) return null

    return <BsCheck size='1.5em' />
  }
  
  return (
    <Menu width="target">
      <Menu.Target>
        <Group position='apart' className={styles['team-switcher']}>
          <Group position='center' spacing='sm'>
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
          </Group>
          <div>
            <div className="icon">
              <BsChevronExpand />
            </div>
          </div>
        </Group>
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
