import { ViewGridIcon } from '@heroicons/vue/outline'
import { WorkspaceCategory } from '../firebase/converters'

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
      path: { name: 'Dashboard' }
    },
    {
      id: '2',
      name: 'Sales',
      icon: ViewGridIcon,
      path: { name: 'Sales' }
    },
  ],
  psychologist: [
    {
      id: '1',
      name: 'Dashboard',
      icon: ViewGridIcon,
      path: { name: 'Dashboard' }
    },
    {
      id: '2',
      name: 'Team members',
      icon: ViewGridIcon,
      path: { name: 'TeamMembers' }
    },
  ],
}

export const useCRMLayout = () => {
  const getPrimaryMenuItems = (category?: WorkspaceCategory | undefined) => {
    if (!category) return []
    return workspaceCategoryMenus[category]
  }

  return {
    getPrimaryMenuItems,
  }
}
