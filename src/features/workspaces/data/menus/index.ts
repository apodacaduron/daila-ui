import { ChatAlt2Icon, KeyIcon, UserIcon } from '@heroicons/vue/outline';

import { adminMenus } from './admin-menus';
import { personalSpaceMenus } from './personal-space-menus';
import { psychologistMenus } from './psychologist-menus';

import type { WorkspaceCategory } from '../../services';
import type { FunctionalComponent } from 'vue';
type WorkspaceMenuItem = {
  id: string
  name: string
  icon: FunctionalComponent
  path: { name: string }
}
type WorkspaceMenuMap = Record<WorkspaceCategory, Array<WorkspaceMenuItem>>

type WorkspaceIconsMap = Record<WorkspaceCategory, { icon: FunctionalComponent }>

export const workspaceMenus: WorkspaceMenuMap = {
  admin: adminMenus,
  'personal-space': personalSpaceMenus,
  psychologist: psychologistMenus,
}

export const workspaceIcons: WorkspaceIconsMap = {
  admin: {
    icon: KeyIcon,
  },
  'personal-space': {
    icon: UserIcon,
  },
  psychologist: {
    icon: ChatAlt2Icon,
  },
}