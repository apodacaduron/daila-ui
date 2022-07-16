import {
    collection, doc, getDoc, getDocs, limit, orderBy, query, Query, startAfter
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { computed, reactive } from 'vue';
import { useInfiniteQuery, useMutation, useQuery } from 'vue-query';

import { firestore, functions } from '../../../firebase';
import {
    Workspace, WorkspaceCategory, workspaceConverter, WorkspaceUser, WorkspaceUserConverter,
    workspaceUserConverter
} from '../../../firebase/converters/workspaceConverter';
import { errorHandler } from '../../../utils/errorHandler';

// Mutations
export type CreateWorkspace = {
  title: string
  category: WorkspaceCategory
}
export function useCreateWorkspaceMutation() {
  const createWorkspaceCF = httpsCallable(functions, 'createWorkspaceCF')

  return useMutation((createWorkspaceData: CreateWorkspace) =>
    createWorkspaceCF(createWorkspaceData),
    {
      onError: (err: unknown) => errorHandler(err),
    }
  )
}

export type InviteUserToWorkspace = {
  workspaceId: string
  emailList: Array<{ email: string }>
}
export function useInviteUserToWorkspaceMutation() {
  const inviteUserToWorkspaceCF = httpsCallable(functions, 'inviteUserToWorkspaceCF')

  return useMutation((inviteUserToWorkspaceData: InviteUserToWorkspace) =>
    inviteUserToWorkspaceCF(inviteUserToWorkspaceData),
    {
      onError: (err: unknown) => {
        errorHandler(err)
      },
    }
  )
}

// Queries
export type GetUserWorkspacesQueryContext = {
  options: {
    userId: string | null
    enabled: boolean
  }
  handlers?: {
    onSuccess?(workspaces: Workspace[]): void
    onError?(err: unknown): void
  }
}
export const useGetUserWorkspacesQuery = (
  context: GetUserWorkspacesQueryContext,
) => {
  async function getWorkspacesByUserId() {
    try {
      if (!context.options.userId) return
      const workspaces: Workspace[] = []
      const q = query(
        collection(firestore, `users/${context.options.userId}/workspaces`),
      ).withConverter(workspaceConverter)
      const snapshot = await getDocs(q)
      snapshot.forEach((workspace) => workspaces.push(workspace.data()))
      context.handlers?.onSuccess?.(workspaces)
      return workspaces
    } catch (err) {
      errorHandler(err)
      return context.handlers?.onError?.(err)
    }
  }

  return useQuery(
    reactive(['users', context.options.userId, 'workspaces']),
    getWorkspacesByUserId,
    {
      enabled: computed(
        () => Boolean(context.options.userId) && context.options.enabled,
      ),
      refetchOnWindowFocus: false,
    },
  )
}

export type GetUserWorkspaceByIdQueryContext = {
  options: {
    workspaceId: string | null
    userId: string | null
    enabled: boolean
  }
  handlers?: {
    onSuccess?(workspace: Workspace | undefined): void
    onError?(err: unknown): void
  }
}
export const useGetUserWorkspaceByIdQuery = (
  context: GetUserWorkspaceByIdQueryContext,
) => {
  async function getUserWorkspaceById() {
    try {
      if (!context.options.userId) return
      const userWorkspaceDoc = doc(firestore, `users/${context.options.userId}/workspaces/${context.options.workspaceId}`).withConverter(workspaceConverter)
      const snapshot = await getDoc(userWorkspaceDoc)
      const workspace = snapshot.data()
      context.handlers?.onSuccess?.(workspace)
      return workspace
    } catch (err) {
      errorHandler(err)
      return context.handlers?.onError?.(err)
    }
  }

  return useQuery(
    reactive(['users', context.options.userId, 'workspaces', context.options.workspaceId]),
    getUserWorkspaceById,
    {
      enabled: computed(
        () => Boolean(context.options.workspaceId) && Boolean(context.options.userId) && context.options.enabled,
      ),
      refetchOnWindowFocus: false,
    },
  )
}

export type GetWorkspaceUsersQueryContext = {
  options: {
    pageNumber: number,
    workspaceId: string | null | undefined
    enabled: boolean
    limit: number,
  }
  handlers?: {
    onSuccess?(workspaceUsers: unknown): void
    onError?(err: unknown): void
  }
}
export const useGetWorkspaceUsersQuery = (
  context: GetWorkspaceUsersQueryContext,
) => {
  const q = computed(() => query(
    collection(
      firestore,
      `workspaces/${context.options.workspaceId}/users`,
    ),
    orderBy('email'),
    limit(context.options.limit)
  ).withConverter(workspaceUserConverter))

  async function getWorkspaceUsers(queryParam: Query<WorkspaceUserConverter>) {
    try {
      if (!context.options.workspaceId) return
      const workspaceUsers: WorkspaceUser[] = []
      const snapshot = await getDocs(queryParam)
      snapshot.forEach((workspaceUser) =>
        workspaceUsers.push(workspaceUser.data()),
      )
      context.handlers?.onSuccess?.(workspaceUsers)
      return workspaceUsers
    } catch (err) {
      errorHandler(err)
      return context.handlers?.onError?.(err)
    }
  }

  return useInfiniteQuery(
    reactive(['workspaces', context.options.workspaceId, 'users', context.options.pageNumber]),
    ({ pageParam = q.value }) => {
      return getWorkspaceUsers(pageParam)
    },
    {
      enabled: computed(
        () => Boolean(context.options.workspaceId) && context.options.enabled,
      ),
      refetchOnWindowFocus: false,
      getNextPageParam: (pageSnapshot, _allPages) => {
        if (!pageSnapshot?.length) return
        const lastUserEmail = pageSnapshot[pageSnapshot.length - 1]?.email
        return query(q.value, startAfter(lastUserEmail)).withConverter(workspaceUserConverter)
      },
    },
  )
}