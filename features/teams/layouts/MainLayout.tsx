import { ReactElement } from 'react'
import { AuthenticatedRouteGuard } from '../../authentication'
import { UserSetter } from '../../users'
import { Navbar, SideMenu } from '../components'
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
            <div className={styles['content']}>
              <div className={styles['navbar']}>
                <Navbar />
              </div>
              {page}
            </div>
          </div>
        </TeamsSetter>
      </UserSetter>
    </AuthenticatedRouteGuard>
  )
}

export default MainLayout
