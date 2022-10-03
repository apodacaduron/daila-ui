import { ReactElement } from 'react'
import { AuthenticatedRouteGuard } from '../../authentication'
import { UserSetter } from '../../users'
import { SideMenu } from '../components'
import TeamsSetter from '../components/TeamsSetter'
import styles from '../styles/MainLayout.module.scss'

function MainLayout(page: ReactElement) {
  return (
    <AuthenticatedRouteGuard>
      <UserSetter>
        <TeamsSetter>
          <div className={styles['main-layout']}>
            <div className={styles['side-menu']}>
              <SideMenu />
            </div>
            <div className="navbar"></div>
            <div className="content">{page}</div>
          </div>
        </TeamsSetter>
      </UserSetter>
    </AuthenticatedRouteGuard>
  )
}

export default MainLayout
