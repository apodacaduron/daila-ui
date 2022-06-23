import * as admin from 'firebase-admin';

admin.initializeApp();

// Cloud functions
export * from './auth';
export * from './workspaces';

// Firestore Triggers
export * from './triggers/workspaceTriggers';
