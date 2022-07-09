import {
  doc,
  getDoc,
} from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { computed, reactive } from 'vue'
import { useMutation, useQuery } from 'vue-query'
import { firestore, functions } from '../firebase'
import {
  User,
  userConverter,
} from '../firebase/converters'
import { errorHandler } from '../utils/errorHandler'

export type GetUserByIdQueryContext = {
  options: {
    userId: string | null
    enabled: boolean
  }
  handlers?: {
    onSuccess?(user: User | undefined): void
    onError?(err: unknown): void
  }
}
export const useGetUserByIdQuery = (context: GetUserByIdQueryContext) => {
  async function getUserById() {
    try {
      if (!context.options.userId) return
      const snapshot = await getDoc(
        doc(firestore, 'users', context.options.userId).withConverter(
          userConverter,
        ),
      )
      const user = snapshot.data()
      context.handlers?.onSuccess?.(user)
      return user
    } catch (err) {
      errorHandler(err)
      context.handlers?.onError?.(err)
    }
  }

  return useQuery(reactive(['user', context.options.userId]), getUserById, {
    enabled: computed(
      () => Boolean(context.options.userId) && context.options.enabled,
    ),
    refetchOnWindowFocus: false,
    onError: (err: unknown) => errorHandler(err),
  })
}

// Mutations
export type UpdateLastUsedWorkspaceId = {
  workspaceId: string
}
export function useUpdateLastUsedWorkspaceIdMutation() {
  const updateLastUsedWorkspaceIdCF = httpsCallable(
    functions,
    'updateLastUsedWorkspaceIdCF',
  )

  return useMutation(
    (lastUsedWorkspaceId: UpdateLastUsedWorkspaceId) =>
      updateLastUsedWorkspaceIdCF(lastUsedWorkspaceId),
    {
      onError: (err: unknown) => errorHandler(err),
    },
  )
}
