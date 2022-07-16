import * as admin from 'firebase-admin';

admin.initializeApp();

// Cloud functions
export * from './auth';
export * from './workspaces';
export * from './users';

// Firestore Triggers
