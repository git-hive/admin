import { firestore } from "firebase";

import { associationRef } from "./associations";

const MEMBER_REQUESTS_COLLECTION = "ingressRequests";

const db = firestore();
db.settings({ timestampsInSnapshots: true });

/**
 * Gets the reference to the member requests collection
 *
 * @param {String} associationID Self descriptive
 * @returns {firestore.CollectionReference}
 */
export function memberRequestsRef(associationID) {
  return associationRef(associationID).collection(MEMBER_REQUESTS_COLLECTION);
}

/**
 * Gets the reference to a member request document
 *
 * @param {String} associationID Self descriptive
 * @param {String} requestID Self descriptive
 */
export function memberRequestRef(associationID, requestID) {
  return memberRequestsRef(associationID).doc(requestID);
}

/**
 * Gets all association member requests docs
 *
 * @param {String} associationID Self descriptive
 */
export async function getAllMemberRequestsDocs(associationID) {
  const snaps = await memberRequestsRef(associationID).get();
  const docs = [];
  snaps.forEach(doc => docs.push(doc));
  return docs;
}
