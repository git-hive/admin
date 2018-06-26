import { firestore } from "firebase";

const db = firestore();
db.settings({ timestampsInSnapshots: true });
const USERS_COLLECTION = "users";

/**
 * Gets the reference to users collection
 */
export function usersRef() {
  return db.collection(USERS_COLLECTION);
}

/**
 * Gets the reference to a user
 *
 * @param {string} userID
 * @returns {firestore.DocumentReference}
 */
export function userRef(userID) {
  return usersRef().doc(userID);
}

/**
 * Fetches all User Snapshots
 */
export async function getAllUserSnaps() {
  const querySnap = await usersRef().get();
  const docs = [];
  querySnap.forEach(doc => docs.push(doc));
  return docs;
}

/**
 * Fetches a user document
 *
 * @param {String} userID
 * @returns {Promise<firestore.DocumentSnapshot>}
 */
export function getUserSnap(userID) {
  return userRef(userID).get();
}

/**
 * Adds the associationRef to the user's associationsRefs Array
 *
 * @param {String} userID Self descriptive
 * @param {firestore.DocumentReference} associationRef Self descriptive
 */
export async function addAssociationToUser(userID, associationRef) {
  const user = await getUserSnap(userID);
  const associationsRefs = user.get("associationsRefs") || [];
  associationsRefs.push(associationRef);
  user.ref.set({ associationsRefs }, { merge: true });
}
