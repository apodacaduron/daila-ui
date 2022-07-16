import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { ChatAlt2Icon, KeyIcon } from '@heroicons/vue/outline';

import {
    Workspace, workspaceCategories, WorkspaceCategory, WorkspaceUserStatus
} from '../../../firebase/converters/workspaceConverter';
import { useWorkspaceStore } from '../../../stores/useWorkspaceStore';

import type { BadgeColor } from '../../../components/primitives'

export const workspaceCategoryHelpers = {
  admin: {
    icon: KeyIcon,
  },
  psychologist: {
    icon: ChatAlt2Icon,
  },
}

// Typeguards
export function isWorkspaceCategory(
  category: unknown,
): category is WorkspaceCategory {
  return (
    typeof category === 'string' &&
    workspaceCategories.includes(category as WorkspaceCategory)
  )
}

type WorkspaceContext = {
  handlers: {
    onSwitchWorkspace(workspace: Workspace): void
  }
}
export const useWorkspace = (context?: WorkspaceContext) => {
  const workspaceStore = useWorkspaceStore()
  const router = useRouter()

  // Computed state
  const workspaces = computed(() => workspaceStore.workspaces)
  const workspace = computed(() =>
    workspaces.value?.find(
      (workspace) => workspace.id === workspaceStore.lastUsedWorkspaceId,
    ),
  )
  const hasWorkspace = computed(() => Boolean(workspaces.value?.length))
  const workspaceURL = computed(() => {
    if (!workspace.value) return ''
    return `/w/${workspace.value.id}/${workspace.value.category}`
  })

  // Handlers
  function switchWorkspace(_workspace: Workspace, redirect = true) {
    if (_workspace.id === workspace.value?.id) return ''
    workspaceStore.setCurrentWorkspaceId(_workspace.id)
    const workspaceURL = `/w/${_workspace.id}/${_workspace.category}`
    if (redirect) {
      router.push(workspaceURL)
    }
    context?.handlers.onSwitchWorkspace(_workspace)
    return workspaceURL
  }

  function getWorkspaceUserStatusColor(status: WorkspaceUserStatus): BadgeColor {
    switch (status) {
      case 'active':
        return 'green'
      case 'inactive':
        return 'gray'
      case 'deleted':
        return 'red'
      case 'invited':
        return 'blue'
      default:
        return 'green'
    }
  }

  return [
    reactive({
      workspaceURL,
      workspace,
      workspaces,
      hasWorkspace,
    }),
    {
      switchWorkspace,
      getWorkspaceUserStatusColor
    }
  ] as const
}
