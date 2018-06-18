import { firestore } from "firebase";

import { associationRef } from "@/firebase/firestore/associations/associations";

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
export function getAllAssociationRolesSnaps(associationID) {
  return getAssociationRolesRef(associationID).get();
}
