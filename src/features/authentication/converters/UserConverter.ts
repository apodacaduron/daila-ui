import type { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"

class UserConverter {
  constructor(
    readonly id: string,
    readonly displayName: string | null,
    readonly email: string | null,
    readonly photoURL: string | null,
    readonly phoneNumber: string | null,
    readonly lastWorkspaceId: string | null,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) { }

  toString(): string {
    return `Email: ${this.email}`
  }
}

export const userConverter = {
  toFirestore(user: UserConverter): DocumentData {
    return { ...user }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): UserConverter {
    const data = snapshot.data(options)
    return new UserConverter(
      snapshot.id,
      data.displayName,
      data.email,
      data.photoURL,
      data.phoneNumber,
      data.lastWorkspaceId,
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    )
  },
}