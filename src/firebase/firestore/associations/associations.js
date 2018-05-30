import { firestore } from "firebase";

const db = firestore();
db.settings({ timestampsInSnapshots: true });
const ASSOCIATIONS_COLLECTION = "associations";

/**
 * Gets the reference to associations collection
 */
export function associationsRef() {
  return db.collection(ASSOCIATIONS_COLLECTION);
}

/**
 * Gets the reference to an association
 *
 * @param {string} associationID
 */
export function associationRef(associationID) {
  return associationsRef().doc(associationID);
}

/**
 * Fetches all Association Snapshots
 */
export async function getAllAssociationSnaps() {
  const querySnap = await associationRef().get();
  const docs = [];
  querySnap.forEach(doc => docs.push(doc));
  return docs;
}

/**
 * Fetches a association document
 *
 * @param {String} associationID
 */
export function getAssociationSnap(associationID) {
  return associationRef(associationID).get();
}
