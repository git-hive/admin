import { firestore } from "firebase";

const QUESTIONS_COLLECTION = "questions";
const OPTIONS_COLLECTION = "options";

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

/**
 *
 * @param {firestore.DocumentReference} questionRef Self descriptive
 * @returns {firestore.CollectionReference}
 */
export function optionsRef(questionRef) {
  return questionRef.collection(OPTIONS_COLLECTION);
}
