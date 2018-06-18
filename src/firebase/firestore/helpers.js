import { firestore } from "firebase";

/**
 * Gets DocumentSnapshots from the references on the array
 *
 * @param {Array<firestore.DocumentReference>} refs
 * @returns {[firestore.DocumentSnapshot]}
 */
export async function getSnapsFromRefArray(refs) {
  const snaps = [];
  for await (const snap of refs.map(ref => ref.get())) {
    snaps.push(snap);
  }

  return snaps;
}

/**
 * Gets the data from a DocumentSnapshot maintaining the
 * DocumentReference and ID
 *
 * @param {firestore.DocumentSnapshot} snap Document where to get the data from
 */
export function snapToObject(snap) {
  return {
    id: snap.id,
    ref: snap.ref,
    ...snap.data()
  };
}
