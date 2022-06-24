import { computed, reactive } from 'vue'
import {
  workspaceCategories,
  WorkspaceCategory,
} from '../firebase/converters/workspaceConverter'
import { useWorkspaceStore } from '../stores/useWorkspaceStore'
import { KeyIcon, ChatAlt2Icon } from '@heroicons/vue/outline'

export const workspaceCategoryHelpers = {
  admin: {
    icon: KeyIcon
  },
  psychologist: {
    icon: ChatAlt2Icon
  }
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

export const useWorkspace = () => {
  const workspaceStore = useWorkspaceStore()

  const workspaces = computed(() => workspaceStore.workspaces)
  const workspace = computed(() => workspaces.value?.find(
    (workspace) => workspace.id === workspaceStore.currentWorkspaceId,
  ))
  const hasWorkspace = computed(() => Boolean(workspaces.value?.length))
  const workspaceURL = computed(() => {
    if (!workspace.value) return ''
    return `/w/${workspace.value.id}/${workspace.value.category}`
  })

  return [
    reactive({
      workspaceURL,
      workspace,
      workspaces,
      hasWorkspace,
    }),
  ]
}
