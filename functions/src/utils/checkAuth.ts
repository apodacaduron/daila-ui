import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/v1/https';

export function checkAuth(context: CallableContext) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }
}