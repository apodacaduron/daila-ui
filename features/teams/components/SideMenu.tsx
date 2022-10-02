import styles from '../styles/SideMenu.module.scss'
import TeamSwitcher from './TeamSwitcher'
import { Text } from '@mantine/core'

function SideMenu() {
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
      </div>
      <div className="profile"></div>
    </aside>
  )
}

export default SideMenu
