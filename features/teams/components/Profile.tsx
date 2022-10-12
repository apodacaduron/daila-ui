import { Avatar, Group, Menu, Text } from '@mantine/core'
import styles from '../styles/Profile.module.scss'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiLogOutCircle } from 'react-icons/bi'
import React from 'react'
import { UserContext } from '../../users'
import { useAuthentication } from '../../authentication'

function Profile() {
  const authHook = useAuthentication()
  const userContext = React.useContext(UserContext)

  const userName = userContext.user?.displayName ?? userContext.user?.email
  
  return (
    <Menu position='top-end' width='200px'>
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
              <BsThreeDotsVertical />
            </div>
          </div>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Profile options</Menu.Label>
        <Menu.Item onClick={authHook.logout} icon={<BiLogOutCircle />} color='red'>Sign out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default Profile
