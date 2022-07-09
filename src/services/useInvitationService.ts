import {
  query,
  where,
  collection,
  getDocs,
} from 'firebase/firestore'
import { computed, reactive } from 'vue'
import { useQuery } from 'vue-query'
import { firestore } from '../firebase'
import { Invitation, invtiationConverter } from '../firebase/converters/invitationConverter'
import { errorHandler } from '../utils/errorHandler'

export type GetInvitationsByEmailQueryContext = {
  options: {
    email: string | undefined | null
    enabled: boolean
  }
  handlers?: {
    onSuccess?(userInvitations: Invitation[]): void
    onError?(err: unknown): void
  }
}
export const useGetInvitationsByEmailQuery = (
  context: GetInvitationsByEmailQueryContext,
) => {
  const q = computed(() =>
    query(
      collection(firestore, 'invitations'),
      where('status', '==', 'invited'),
      where('email', '==', context.options.email),
    ).withConverter(invtiationConverter),
  )
  async function getInvitationsByEmail() {
    try {
      const userInvitations: Invitation[] = []
      const snapshot = await getDocs(q.value)
      snapshot.forEach((invitation) => userInvitations.push(invitation.data()))
      context.handlers?.onSuccess?.(userInvitations)
      return userInvitations
    } catch (err) {
      errorHandler(err)
      context.handlers?.onError?.(err)
    }
  }

  return useQuery(
    reactive(['invitations', { status: 'invited', email: context.options.email }]),
    getInvitationsByEmail,
    {
      enabled: computed(
        () => Boolean(context.options.email) && context.options.enabled,
      ),
      refetchOnWindowFocus: false,
    },
  )
}