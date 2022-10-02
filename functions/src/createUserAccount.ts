import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import {mustBeSignedIn} from "./utils";

const env = functions.config();

export const createUserAccountCF = functions.https.onCall(
    async (data, context) => {
    // Check if user is authenticated
      mustBeSignedIn(context.auth);

      const usersRef = admin.firestore().collection("users");
      const userEmail = context.auth.token.email;
      const userRole = userEmail === env.role.admin ? "ADMIN" : "USER";

      // Set user account role
      await admin.auth().setCustomUserClaims(context.auth.token.uid, {
        role: userRole,
      });
      const currentAuthUser = await admin.auth().getUser(context.auth.uid);

      // Create user in collection
      await usersRef.doc(context.auth.uid).set({
        displayName: currentAuthUser.displayName ?? null,
        email: currentAuthUser.email ?? null,
        photoURL: currentAuthUser.photoURL ?? null,
        phoneNumber: currentAuthUser.phoneNumber ?? null,
        currentTeamId: null,
      // createdAt: admin.firestore.FieldValue.serverTimestamp(),
      // updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    },
);
