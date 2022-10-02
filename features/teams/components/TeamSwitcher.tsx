import { Avatar, Menu, Text } from '@mantine/core'
import styles from '../styles/TeamSwitcher.module.scss'
import { BsChevronExpand } from 'react-icons/bs'

function TeamSwitcher() {
  return (
    <Menu width="target">
      <Menu.Target>
        <button className={styles['team-switcher']}>
          <div className={styles['team-switcher-left']}>
            <div className="avatar">
              <Avatar color="cyan" radius="xl">
                MK
              </Avatar>
            </div>
            <div className="team-name">
              <Text size="md" weight={500}>
                Default text
              </Text>
              <Text size="xs" color="dimmed">
                Default text
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
        <Menu.Item>One team</Menu.Item>
        <Menu.Item>Two team</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default TeamSwitcher
