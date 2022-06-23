import { httpsCallable } from "firebase/functions";
import { firestore, functions } from "../firebase";
import { Workspace, WorkspaceCategory, workspaceConverter } from "../firebase/converters/workspaceConverter";
import { useMutation, useQuery } from 'vue-query';
import { getDocs, query, collection } from "firebase/firestore";
import { computed, reactive } from "vue";
import { errorHandler } from "../utils/errorHandler";

export type CreateWorkspace = {
  title: string;
  category: WorkspaceCategory;
}

// Mutations
export function useCreateWorkspaceMutation() {
  const createWorkspaceCF = httpsCallable(functions, 'createWorkspaceCF')

  return useMutation((createWorkspaceData: CreateWorkspace) => createWorkspaceCF(createWorkspaceData));
}

// Queries
export type GetWorkspacesByUserIdQueryContext = {
  options: {
    userId: string | null
    enabled: boolean
  },
  handlers?: {
    onSuccess?(workspaces: Workspace[]): void
    onError?(err: unknown): void
  }
}
export const useGetWorkspacesByUserIdQuery = (context: GetWorkspacesByUserIdQueryContext) => {
  async function getWorkspacesByUserId() {
    try {
      if (!context.options.userId) return
      const workspaces: Workspace[] = [];
      const q = query(collection(firestore, `users/${context.options.userId}/workspaces`)).withConverter(workspaceConverter);
      const snapshot = await getDocs(q)
      snapshot.forEach(workspace => workspaces.push(workspace.data()))
      context.handlers?.onSuccess?.(workspaces)
      return workspaces
    } catch (err) {
      errorHandler(err)
      context.handlers?.onError?.(err)
    }
  }

  return useQuery(
    reactive(['users', context.options.userId, 'workspaces']),
    getWorkspacesByUserId,
    {
      enabled: computed(() => Boolean(context.options.userId) && context.options.enabled),
      refetchOnWindowFocus: false
    },
  )
}
