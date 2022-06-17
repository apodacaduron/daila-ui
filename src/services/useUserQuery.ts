import { doc, getDoc } from 'firebase/firestore'
import { computed, reactive } from 'vue'
import { useQuery } from 'vue-query'
import { firestore } from '../firebase'
import { userConverter } from '../firebase/converters'

export type UserByIdQueryOptions = {
  userId: string | null
  enabled: boolean
}
export const useUserByIdQuery = (options: UserByIdQueryOptions) => {
  async function getUserById() {
    if (!options.userId) return
    const snapshot = await getDoc(
      doc(firestore, 'users', options.userId).withConverter(userConverter),
    )
    return snapshot.data()
  }

  return useQuery(
    reactive(['user', options.userId]),
    getUserById,
    {
      enabled: computed(() => Boolean(options.userId) && options.enabled),
      refetchOnWindowFocus: false
    },
  )
}
