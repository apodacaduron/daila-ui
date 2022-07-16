import { collection, getDocs, query, where } from 'firebase/firestore';
import { computed, reactive } from 'vue';
import { useQuery } from 'vue-query';

import { firestore } from '../../../firebase';
import {
    Notification, notificationConverter
} from '../../../firebase/converters/notificationConverter';
import { errorHandler } from '../../../utils/errorHandler';

export type GetNotificationByEmailQueryContext = {
  options: {
    email: string | undefined | null
    enabled: boolean
  }
  handlers?: {
    onSuccess?(userNotification: Notification[]): void
    onError?(err: unknown): void
  }
}
export const useGetNotificationsByEmailQuery = (
  context: GetNotificationByEmailQueryContext,
) => {
  const q = computed(() =>
    query(
      collection(firestore, 'notifications'),
      where('status', '==', 'invited'),
      where('email', '==', context.options.email),
    ).withConverter(notificationConverter),
  )
  async function getNotificationsByEmail() {
    try {
      const userNotification: Notification[] = []
      const snapshot = await getDocs(q.value)
      snapshot.forEach((notification) => userNotification.push(notification.data()))
      context.handlers?.onSuccess?.(userNotification)
      return userNotification
    } catch (err) {
      errorHandler(err)
      return context.handlers?.onError?.(err)
    }
  }

  return useQuery(
    reactive(['notifications', { status: 'invited', email: context.options.email }]),
    getNotificationsByEmail,
    {
      enabled: computed(
        () => Boolean(context.options.email) && context.options.enabled,
      ),
      refetchOnWindowFocus: false,
    },
  )
}