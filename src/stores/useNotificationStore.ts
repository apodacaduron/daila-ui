import { defineStore } from "pinia"

type NotificationStoreState = {
  notifications: Notification[] | null;
}

export const useNotificationStore = defineStore('user', {
  state: (): NotificationStoreState => ({
    notifications: [],
  }),
  actions: {
    setNotification(notification: Notification) {
      this.notifications?.push(notification);
    },
    setNotifications(notifications: Notification[]) {
      this.notifications = notifications
    },
  },
})