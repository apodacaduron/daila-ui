import { Avatar, Group, Menu, Text } from '@mantine/core'
import styles from '../styles/Profile.module.scss'
import { BsChevronExpand } from 'react-icons/bs'
import React from 'react'
import { TeamsContext } from '../context'
import { useRouter } from 'next/router'
import { useTeams } from '../hooks'
import { UserContext } from '../../users'

function Profile() {
  const teamsContext = React.useContext(TeamsContext)
  const userContext = React.useContext(UserContext)
  const router = useRouter()
  const teamsHook = useTeams()

  const userName = userContext.user?.displayName ?? userContext.user?.email
  
  return (
    <Menu width="target">
      <Menu.Target>
        <Group position='apart' className={styles['team-switcher']}>
          <Group position='center' spacing='sm'>
            <div className="avatar">
              <Avatar color="cyan" radius="xl">
               {userName?.charAt(0)}
              </Avatar>
            </div>
            <div className="team-name">
              <Text size="md" weight={500}>
                {userName}
              </Text>
              <Text size="xs" color="dimmed">
                Perfil
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
        <Menu.Label>Profile options</Menu.Label>
        {teamsContext.teamsList.map(team => {
          return <Menu.Item key={team.id}>{team.name}</Menu.Item>
        })}
      </Menu.Dropdown>
    </Menu>
  )
}

export default Profile
