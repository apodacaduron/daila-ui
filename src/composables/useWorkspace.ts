import { workspaceCategories, WorkspaceCategory } from '../firebase/converters/workspaceConverter';


// Typeguards
export function isWorkspaceCategory(category: unknown): category is WorkspaceCategory {
  return typeof category === 'string' && workspaceCategories.includes(category as WorkspaceCategory)
}

export const useWorkspace = () => {}
