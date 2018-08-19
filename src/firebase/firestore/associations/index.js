import { firestore } from "firebase";

const db = firestore();
db.settings({ timestampsInSnapshots: true });

const ASSOCIATIONS_COLLECTION = "associations";
const REQUESTS_COLLECTION = "requests";

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

/**
 * Gets the reference to the association requests collection
 *
 * @param {String} associationID Self descriptive
 */
export function getAssociationRequestsCol(associationID) {
  return associationRef(associationID).collection(REQUESTS_COLLECTION);
}

/**
 * Fetches all requests snaps from the association
 *
 * @param {String} associationID Self descriptive
 */
export function getAssociationRequestSnaps(associationID) {
  return getAssociationRequestsCol(associationID).get();
}
