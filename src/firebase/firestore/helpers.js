import { firestore } from "firebase";

/**
 *
 * @param {Array<firestore.DocumentReference>} refs
 */
export async function getSnapsFromRefArray(refs) {
  const snaps = [];
  for await (const snap of refs.map(ref => ref.get())) {
    snaps.push(snap);
  }

  return snaps;
}
