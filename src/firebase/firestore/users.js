import { firestore } from "firebase";

const db = firestore();
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
 */
export function getUserSnap(userID) {
  return userRef(userID).get();
}
