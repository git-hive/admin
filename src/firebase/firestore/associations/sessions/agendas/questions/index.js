import { firestore } from "firebase";

const QUESTIONS_COLLECTION = "questions";

const db = firestore();
db.settings({ timestampsInSnapshots: true });

/**
 * Gets the reference to the agenda questions ref
 *
 * @param {firestore.DocumentReference} agendaRef Self descriptive
 * @returns {firestore.DocumentReference}
 */
export function questionsRef(agendaRef) {
  return agendaRef.collection(QUESTIONS_COLLECTION);
}
