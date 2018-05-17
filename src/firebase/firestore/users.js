const USERS_COLLECTION = "users";

/**
 * Gets the reference to users collection
 *
 * @param {firebase.Firestore} firestore
 */
export function usersRef(firestore) {
  return firestore().collection(USERS_COLLECTION);
}

/**
 * Gets the reference to a user
 *
 * @param {firebase.Firestore} firestore
 * @param {string} userID
 */
export function userRef(firestore, userID) {
  return usersRef(firestore).doc(userID);
}

/**
 * Gets all User Snapshots
 *
 * @param {firebase.Firestore} firestore
 */
export async function getAllUserSnaps(firestore) {
  const querySnap = await usersRef(firestore).get();
  const docs = [];
  querySnap.forEach(doc => docs.push(doc));
  return docs;
}
