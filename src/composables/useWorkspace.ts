import { httpsCallable } from 'firebase/functions'
import { useMutation } from 'vue-query';

import { functions } from '../firebase'
import { workspaceCategories, WorkspaceCategory } from '../firebase/converters/workspaceConverter';

export type CreateWorkspace = {
  title: string;
  category: WorkspaceCategory;
}
// Typeguards
export function isCategoryValid(category: unknown): category is WorkspaceCategory {
  return typeof category === 'string' && workspaceCategories.includes(category as WorkspaceCategory)
}

export const useWorkspace = () => {}

// Mutations
export function createWorkspaceMutation() {
  const createWorkspaceCF = httpsCallable(functions, 'createWorkspaceCF')

  return useMutation((createWorkspaceData: CreateWorkspace) => createWorkspaceCF(createWorkspaceData));
}