import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import { UserWorkspace } from '../../stores/useUserStore'

class User {
  constructor(
    readonly displayName: string | null,
    readonly email: string | null,
    readonly photoURL: string | null,
    readonly phoneNumber: string | null,
    readonly hasWorkspace: boolean,
    readonly currentWorkspaceId: string | null,
    readonly workspaces: UserWorkspace[],
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) { }

  toString(): string {
    return `Email: ${this.email}`
  }
}

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return { ...user }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): User {
    const data = snapshot.data(options)!
    return new User(
      data.displayName,
      data.email,
      data.photoURL,
      data.phoneNumber,
      data.hasWorkspace,
      data.currentWorkspaceId,
      data.workspaces,
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    )
  },
}
