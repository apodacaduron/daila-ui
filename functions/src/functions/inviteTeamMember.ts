import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { checkAuth } from '../utils/checkAuth';
import { getTimestamps } from '../utils/timestamps';
import { Member, Notification } from '../utils/types';

export const inviteTeamMember = functions.https.onCall(async (data, context) => {
  checkAuth(context)

  if (!data.workspaceId) throw new functions.https.HttpsError(
    'failed-precondition',
    'Workspace id must be provided.',
  );

  if (!data.email) throw new functions.https.HttpsError(
    'failed-precondition',
    'Email must be provided.',
  );

  const memberDoc: Member = {
    displayName: null,
    email: data.email,
    photoURL: null,
    role: 'USER',
    status: 'ACTIVE',
    ...getTimestamps()
  }
  await admin.firestore().collection('workspaces').doc(data.workspaceId).collection('invitedMembers').add(memberDoc);

  const notificationDoc: Notification = {
    title: '',
    description: '',
    photoURL: null,
    data: {
      workspaceId: data.workspaceId,
      email: data.email,
    },
    ...getTimestamps()
  }
  await admin.firestore().collection('notifications').add(notificationDoc)
});