import { firestore } from "firebase";

import { associationRef } from "./associations";
import { agendasRef } from "./agendas";
import { questionsRef, optionsRef } from "./questions";

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
  console.log("[addAssociationSession]", session);

  const agendas = cutOut(session, "agendas");

  const newSessionRef = await sessionsRef(associationID).add(session);
  const agendasColRef = agendasRef(newSessionRef);

  agendas.forEach(async agenda => {
    const questions = cutOut(agenda, "questions");
    const newAgendaRef = await agendasColRef.add(agenda);
    const questionsColRef = questionsRef(newAgendaRef);

    questions.forEach(async question => {
      const options = cutOut(question, "options");
      const newQuestionRef = await questionsColRef.add(question);
      const optionsColRef = optionsRef(newQuestionRef);

      options.forEach(async option => {
        await optionsColRef.add(option);
      });
    });
  });
}

function cutOut(obj, key) {
  const value = obj[key];
  delete obj[key];
  return value;
}
