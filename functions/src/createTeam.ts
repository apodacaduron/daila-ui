import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import {mustBeSignedIn} from "./utils";

const env = functions.config();

export const createTeamCF = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  mustBeSignedIn(context.auth);

  const userRef = admin.firestore().collection("users").doc(context.auth.uid);
  const userSnapshot = await userRef.get();
  const userData = userSnapshot.data();
  const hasTeam = Boolean(userData?.currentTeamId);

  if (hasTeam) return;

  const teamsRef = admin.firestore().collection("teams");

  const teamPayload = {
    name: data?.name ?? "Espacio personal",
    type: "PSYCHOlOGIST",
    memberCount: 1,
    // createdAt: admin.firestore.FieldValue.serverTimestamp(),
    // updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const teamRef = await teamsRef.add(teamPayload);

  const memberRef = admin
      .firestore()
      .collection("teams")
      .doc(teamRef.id)
      .collection("members")
      .doc(context.auth.uid);

  memberRef.set({
    ...userData,
    teamData: {...teamPayload, id: teamRef.id},
    userId: context.auth.uid,
    role: "OWNER",
  });

  const userEmail = context.auth.token.email;
  const isAdmin = userEmail === env.role.admin;

  if (isAdmin) {
    const adminTeamPayload = {
      ...teamPayload,
      name: "Admin",
      type: "ADMIN",
    };

    const adminTeamRef = await teamsRef.add(adminTeamPayload);

    const adminMemberRef = admin
        .firestore()
        .collection("teams")
        .doc(adminTeamRef.id)
        .collection("members")
        .doc(context.auth.uid);

    adminMemberRef.set({
      ...userData,
      teamData: {...adminTeamPayload, id: adminTeamRef.id},
      userId: context.auth.uid,
      role: "OWNER",
    });
  }

  userRef.update({
    currentTeamId: teamRef.id,
  });

  return teamRef.id;
});
