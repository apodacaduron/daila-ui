import type { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"

class TeamMemberConverter {
  constructor(
    readonly id: string,
    readonly displayName: string,
    readonly email: string,
    readonly photoURL: string,
    readonly role: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) { }

  toString(): string {
    return `Name: ${this.displayName}`
  }
}

export const teamMemberConverter = {
  toFirestore(teamMember: TeamMemberConverter): DocumentData {
    return { ...teamMember }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): TeamMemberConverter {
    const data = snapshot.data(options)
    return new TeamMemberConverter(
      snapshot.id,
      data.displayName,
      data.email,
      data.photoURL,
      data.role,
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    )
  },
}