import { firestore } from "firebase";

import { associationRef } from "@/firebase/firestore/associations";
import { agendasRef } from "@/firebase/firestore/associations/sessions/agendas";
import { questionsRef } from "@/firebase/firestore/associations/sessions/agendas/questions";

const db = firestore();
db.settings({ timestampsInSnapshots: true });
const SESSIONS_COLLECTION = "sessions";

/**
 * Gets the reference to sessions collection
 * @param {String} associationID association document ID where to
 *                               get the sessions from
 */
export function sessionsRef(associationID) {
  return associationRef(associationID).collection(SESSIONS_COLLECTION);
}

/**
 * Gets the reference to a session
 *
 * @param {String} associationID
 * @param {String} sessionID
 */
export function sessionRef(associationID, sessionID) {
  return sessionsRef(associationID).doc(sessionID);
}

/**
 * Fetches all Association Session Snapshots
 *
 * @param {String} associationID Self descriptive
 */
export async function getAllAssociationSessionSnaps(associatonID) {
  const querySnap = await sessionsRef(associatonID).get();
  const docs = [];
  querySnap.forEach(doc => docs.push(doc));
  return docs;
}

/**
 * Fetches a association session document
 *
 * @param {String} associationID
 * @param {String} sessionID
 */
export function getAssociationSessionSnap(associationID, sessionID) {
  return sessionRef(associationID, sessionID).get();
}

/**
 * Creates a new association session and add the agendas to it
 *
 * @param {String} associationID Self descriptive
 * @param {Object} session New session data
 */
export async function addAssociationSession(associationID, session) {
  const agendas = cutOut(session, "agendas");

  const newSessionRef = await sessionsRef(associationID).add(session);
  const agendasColRef = agendasRef(newSessionRef);

  agendas.forEach(async agenda => {
    agenda.sessionRef = newSessionRef;
    const questions = cutOut(agenda, "questions");
    const newAgendaRef = await agendasColRef.add(agenda);
    const questionsColRef = questionsRef(newAgendaRef);

    questions.forEach(async question => {
      question.sessionRef = newSessionRef;
      question.agendaRef = newAgendaRef;
      questionsColRef.add(question);
    });
  });
}

function cutOut(obj, key) {
  const value = obj[key];
  delete obj[key];
  return value;
}
