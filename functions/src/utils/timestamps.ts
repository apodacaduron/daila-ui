import * as admin from 'firebase-admin';

export function getTimestamps() {
  return {
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  }
}