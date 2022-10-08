import { MdDashboard } from 'react-icons/md'
import { IoCalendar } from 'react-icons/io5'
import { routes } from '../../../data/routesMap'

export const TEAM_SLUG = ':teamId'

export const navigation = {
  ADMIN: [
    {
      name: 'Dashboard',
      path: routes.ADMIN.TEAM_DASHBOARD(TEAM_SLUG),
      icon: <MdDashboard size="1.5em" />
    }
  ],
  PSYCHOLOGIST: [
    {
      name: 'Dashboard',
      path: routes.TEAM_DASHBOARD(TEAM_SLUG),
      icon: <MdDashboard size="1.5em" />
    },
    {
      name: 'Appointments',
      path: routes.TEAM_APPOINTMENTS(TEAM_SLUG),
      icon: <IoCalendar size="1.5em" />
    }
  ],
}