import { firestore } from "firebase";

import { getAssociationRolesRef } from "@/firebase/firestore/associations/roles";

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
 * Fetches all users that belongs to the provided association
 *
 * @param {firestore.DocumentReference} associationRef Self descriptive
 */
export async function getAllAssociationUsersSnaps(associationRef) {
  const rolesQuery = await getAssociationRolesRef(associationRef.id).get();
  const usersDocs = [];
  rolesQuery.forEach(async roleDoc => {
    const usersQuery = await usersRef()
      .where("associations", "array-contains", {
        associationRef,
        roleRef: roleDoc.ref
      })
      .get();
    usersQuery.forEach(userDoc => usersDocs.push(userDoc));
  });

  return usersDocs;
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
 * @param {firestore.DocumentReference} roleRef Self descriptive
 */
export async function addAssociationToUser(userID, associationRef, roleRef) {
  const user = await getUserSnap(userID);
  const associations = user.get("associations") || [];
  associations.push({ associationRef, roleRef });
  user.ref.set({ associations }, { merge: true });
}
