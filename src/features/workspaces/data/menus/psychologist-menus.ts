import { ViewGridIcon, CalendarIcon } from '@heroicons/vue/outline';

export const psychologistMenus = [
  {
    id: '1',
    name: 'Dashboard',
    icon: ViewGridIcon,
    path: { name: 'PsychologistDashboard' }
  },
  {
    id: '2',
    name: 'Appointments',
    icon: CalendarIcon,
    path: { name: 'PsychologistAppointments' }
  },
  {
    id: '3',
    name: 'Team members',
    icon: CalendarIcon,
    path: { name: 'PsychologistTeamMembers' }
  },
]