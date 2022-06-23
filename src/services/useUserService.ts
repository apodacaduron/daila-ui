import { doc, getDoc } from 'firebase/firestore'
import { computed, reactive } from 'vue'
import { useQuery } from 'vue-query'
import { firestore } from '../firebase'
import { User, userConverter } from '../firebase/converters'
import { errorHandler } from '../utils/errorHandler'

export type GetUserByIdQueryContext = {
  options: {
    userId: string | null
    enabled: boolean
  },
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
        doc(firestore, 'users', context.options.userId).withConverter(userConverter),
      )
      const user = snapshot.data()
      context.handlers?.onSuccess?.(user)
      return user
    } catch (err) {
      errorHandler(err)
      context.handlers?.onError?.(err)
    }
  }

  return useQuery(
    reactive(['user', context.options.userId]),
    getUserById,
    {
      enabled: computed(() => Boolean(context.options.userId) && context.options.enabled),
      refetchOnWindowFocus: false
    },
  )
}
