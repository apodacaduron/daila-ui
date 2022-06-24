import { ViewGridIcon } from '@heroicons/vue/outline'
import { computed, reactive } from 'vue'
import { WorkspaceCategory } from '../firebase/converters'
import { useWorkspace } from './useWorkspace'

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
      icon: ViewGridIcon,
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
      name: 'Team members',
      icon: ViewGridIcon,
      path: { name: 'PsychologistTeamMembers' }
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
