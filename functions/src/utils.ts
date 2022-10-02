import * as functions from "firebase-functions";
import {AuthData} from "firebase-functions/lib/common/providers/https";

export function mustBeSignedIn(
    auth: AuthData | undefined,
): asserts auth is AuthData {
  if (!auth) {
    throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated.",
    );
  }
}
