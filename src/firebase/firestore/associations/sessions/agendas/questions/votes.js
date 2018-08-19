import { firestore } from "firebase";

import { getDocsFromCollection } from "@/firebase/firestore/helpers";

const VOTES_COLLECTION = "votes";

const db = firestore();
db.settings({ timestampsInSnapshots: true });

/**
 * Gets the reference to the question votes collection
 *
 * @param {firestore.DocumentReference} questionRef Self descriptive
 * @returns {firestore.DocumentReference}
 */
export function votesRef(questionRef) {
  return questionRef.collection(VOTES_COLLECTION);
}

/**
 * Fetches all vote documents from the votes sub-collection inside questions
 *
 * @param {firestore.DocumentReference} questionRef Self descriptive
 */
export function getAllVotesSnaps(questionRef) {
  return getDocsFromCollection(votesRef(questionRef));
}
