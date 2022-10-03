import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore'
import { Member } from '../types'

export const memberConverter: FirestoreDataConverter<Member> = {
  toFirestore(member: WithFieldValue<Member>): DocumentData {
    return {
      displayName: member.displayName ?? null,
      email: member.email ?? null,
      photoURL: member.photoURL ?? null,
      phoneNumber: member.phoneNumber ?? null,
      currentTeamId: member.currentTeamId ?? null,
      teamData: member.teamData ?? null,
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Member {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      displayName: data.displayName,
      email: data.email,
      photoURL: data.photoURL,
      currentTeamId: data.currentTeamId,
      phoneNumber: data.phoneNumber,
      teamData: data.teamData,
    }
  },
}
