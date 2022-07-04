import { httpsCallable } from "firebase/functions";
import { firestore, functions } from "../firebase";
import { Workspace, WorkspaceCategory, workspaceConverter, WorkspaceUser, workspaceUserConverter } from "../firebase/converters/workspaceConverter";
import { useInfiniteQuery, useMutation, useQuery } from 'vue-query';
import { getDocs, query, collection, startAfter, startAt } from "firebase/firestore";
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

// Queries
export type GetWorkspaceUsersQueryContext = {
  options: {
    workspaceId: string | null | undefined
    enabled: boolean
  },
  handlers?: {
    onSuccess?(workspaceUsers: unknown): void
    onError?(err: unknown): void
  }
}
export const useGetWorkspaceUsersQuery = (context: GetWorkspaceUsersQueryContext) => {
  async function getWorkspaceUsers({ pageParam = 0 }) {
    try {
      if (!context.options.workspaceId) return
      const workspaceUsers: WorkspaceUser[] = [];
      const q = query(collection(firestore, `workspaces/${context.options.workspaceId}/users`)).withConverter(workspaceUserConverter);
      const snapshot = await getDocs(q)
      snapshot.forEach(workspaceUser => workspaceUsers.push(workspaceUser.data()))
      context.handlers?.onSuccess?.(workspaceUsers)
      return workspaceUsers
    } catch (err) {
      errorHandler(err)
      context.handlers?.onError?.(err)
    }
  }

  return useInfiniteQuery(
    reactive(['workspaces', context.options.workspaceId, 'users']),
    getWorkspaceUsers,
    {
      enabled: computed(() => Boolean(context.options.workspaceId) && context.options.enabled),
      refetchOnWindowFocus: false,
      getNextPageParam: (pageSnapshot, allPages) => {
        if (!pageSnapshot?.length) return
        const lastDocument = pageSnapshot[pageSnapshot.length - 1]
        return query(collection(firestore, `workspaces/${context.options.workspaceId}/users`), startAt('email'))
      }
    },
  )
}