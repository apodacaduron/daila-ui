import { computed, reactive } from 'vue';

import {
    CalendarIcon, CurrencyDollarIcon, UserGroupIcon, UsersIcon, ViewGridIcon
} from '@heroicons/vue/outline';

import { useWorkspace } from '../features/workspaces';

import type { WorkspaceCategory } from '../firebase/converters'
type CategoryMenu = {
  id: string
  name: string
  icon: any
  path: string | object
}

export const workspaceCategoryMenus: Record<
  WorkspaceCategory,
  CategoryMenu[]
> = {
  admin: [
    {
      id: '1',
      name: 'Dashboard',
      icon: ViewGridIcon,
      path: { name: 'AdminDashboard' }
    },
    {
      id: '2',
      name: 'Sales',
      icon: CurrencyDollarIcon,
      path: { name: 'AdminSales' }
    },
  ],
  psychologist: [
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
      name: 'Patients',
      icon: UsersIcon,
      path: { name: 'PsychologistPatients' }
    },
    {
      id: '4',
      name: 'Team members',
      icon: UserGroupIcon,
      path: { name: 'PsychologistTeam' }
    },
  ],
}

export const useCRMLayout = () => {
  const [workspaceOptions] = useWorkspace()

  const primaryMenuItems = computed(() => {
    if (!workspaceOptions.workspace?.category) return []
    return workspaceCategoryMenus[workspaceOptions.workspace.category]
  })

  return reactive({
    primaryMenuItems,
  })
}
