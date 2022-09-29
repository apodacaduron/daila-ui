import * as admin from 'firebase-admin'

admin.initializeApp()

// Cloud functions
export * from './createUserAccount'
export * from './createTeam'
