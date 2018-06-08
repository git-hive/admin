import { firestore } from "firebase";

import { associationRef } from "./associations";

import { addAgendasToSession } from "@/firebase/firestore/associations/agendas";

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
 */
export async function getAllAssociationSessionSnaps() {
  const querySnap = await sessionsRef().get();
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
 *
 * @param {String} associationID
 * @param {Object} session
 */
export function addAssociationSession(associationID, session) {
  return sessionsRef(associationID).add(session);
}

/**
 * Creates a new association session and add the agendas to it
 *
 * @param {String} associationID Self descriptive
 * @param {Object} session New session data
 * @param {[{title: String, Content: String}]} agendas New session agendas
 */
export async function addAssociationSessionWithAgendas(
  associationID,
  session,
  agendas
) {
  console.log(session, agendas);
  const newSessionRef = await addAssociationSession(associationID, session);
  addAgendasToSession(newSessionRef, agendas);
}
