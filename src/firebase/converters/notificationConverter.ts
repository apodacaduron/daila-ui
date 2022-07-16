import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'

export type Notification = {
  id: string,
  title: string | null,
  description: string | null,
  photoURL: string | null,
  userEmail: string,
  type: 'redirect' | 'visual' | 'prompt',
  data: unknown,
  status: 'accepted' | 'denied' | 'removed' | 'opened' | 'idle',
  createdAt: Date,
}

class NotificationConverter {
  constructor(
    readonly id: string,
    readonly title: string | null,
    readonly description: string | null,
    readonly photoURL: string | null,
    readonly userEmail: string,
    readonly type: 'redirect' | 'visual' | 'prompt',
    readonly data: unknown,
    readonly status: 'accepted' | 'denied' | 'removed' | 'opened' | 'idle',
    readonly createdAt: Date,
  ) { }

  toString(): string {
    return `Email: ${this.userEmail}`
  }
}

export const notificationConverter = {
  toFirestore(notification: NotificationConverter): DocumentData {
    return { ...notification }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): NotificationConverter {
    const data = snapshot.data(options)
    return new NotificationConverter(
      snapshot.id,
      data.title,
      data.description,
      data.photoURL,
      data.userEmail,
      data.type,
      data.data,
      data.status,
      data.createdAt.toDate(),
    )
  },
}