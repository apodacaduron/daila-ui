import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import {mustBeSignedIn} from "./utils";

export const switchCurrentTeamCF = functions.https.onCall(
    async (data, context) => {
    // Check if user is authenticated
      mustBeSignedIn(context.auth);

      const userRef = admin.firestore().collection("users")
          .doc(context.auth.uid);

      await userRef.update({
        currentTeamId: data.currentTeamId,
      });
    },
);
