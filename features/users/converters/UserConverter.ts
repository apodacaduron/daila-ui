import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from "firebase/firestore";
import { User } from "../types";

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: WithFieldValue<User>): DocumentData {
    return {   displayName: user.displayName ?? null,
  email: user.email ?? null,
  photoURL: user.photoURL ?? null,
  phoneNumber: user.phoneNumber ?? null,
  currentTeamId: user.currentTeamId ?? null, };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      displayName: data.displayName,
      email: data.email,
      photoURL: data.photoURL,
      currentTeamId: data.currentTeamId,
      phoneNumber: data.phoneNumber,
    };
  },
};

