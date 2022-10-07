import { MdDashboard } from 'react-icons/md'
import { IoCalendar } from 'react-icons/io5'

export const TEAM_SLUG = ':teamId'

const sharedRoutes = [
  {
    name: 'Dashboard',
    path: `/${TEAM_SLUG}/dashboard`,
    icon: <MdDashboard size="1.5em" />
  }
]

export const navigation = {
  ADMIN: [
    ...sharedRoutes
  ],
  PSYCHOLOGIST: [
    ...sharedRoutes,
    {
      name: 'Appointments',
      path: `/${TEAM_SLUG}/appointments`,
      icon: <IoCalendar size="1.5em" />
    }
  ],
}