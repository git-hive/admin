import { firestore } from "firebase";

import { associationRef } from "@/firebase/firestore/associations";

const ROLES_COLLECTION = "roles";

const db = firestore();
db.settings({ timestampsInSnapshots: true });

/**
 * Gets the reference to the roles collection
 *
 * @param {String} associationID Self descriptive
 * @returns {firestore.CollectionReference}
 */
export function getAssociationRolesRef(associationID) {
  return associationRef(associationID).collection(ROLES_COLLECTION);
}

/**
 * Fetches all association roles
 *
 * @param {String} associationID Self descriptive
 * @returns {Promise<[firestore.DocumentSnapshot]>}
 */
export async function getAllAssociationRolesDocs(associationID) {
  const docs = [];
  const snaps = await getAssociationRolesRef(associationID).get();
  snaps.forEach(doc => docs.push(doc));
  return docs;
}
