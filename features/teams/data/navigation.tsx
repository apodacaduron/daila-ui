import { MdDashboard } from 'react-icons/md'
import { IoCalendar } from 'react-icons/io5'
import { FaUsers, FaUsersCog } from 'react-icons/fa'
import { routes } from '../../../data/routesMap'

export const TEAM_SLUG = ':teamId'

export const navigation = {
  ADMIN: [
    {
      name: 'Inicio',
      path: routes.ADMIN.TEAM_DASHBOARD(TEAM_SLUG),
      icon: <MdDashboard size="1.5em" />
    },
    {
      name: 'Usuarios',
      path: routes.ADMIN.TEAM_USERS(TEAM_SLUG),
      icon: <FaUsers size="1.5em" />
    }
  ],
  PSYCHOLOGIST: [
    {
      name: 'Inicio',
      path: routes.TEAM_DASHBOARD(TEAM_SLUG),
      icon: <MdDashboard size="1.5em" />
    },
    {
      name: 'Citas',
      path: routes.TEAM_APPOINTMENTS(TEAM_SLUG),
      icon: <IoCalendar size="1.5em" />
    },
    {
      name: 'Pacientes',
      path: routes.TEAM_PATIENTS(TEAM_SLUG),
      icon: <FaUsers size="1.5em" />
    },
    {
      name: 'Equipo',
      path: routes.TEAM(TEAM_SLUG),
      icon: <FaUsersCog size="1.5em" />
    }
  ],
}