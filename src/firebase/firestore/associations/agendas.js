import { firestore } from "firebase";

const AGENDAS_COLLECTION = "agendas";

const db = firestore();
db.settings({ timestampsInSnapshots: true });

/**
 * Add agendas to the session
 *
 * @param {firestore.DocumentReference} sessionRef Session document where to add
 * the agendas to
 * @param {[{title: String, content: String }]} agendas Agendas to be added
 */
export function addAgendasToSession(sessionRef, agendas) {
  const agendasColRef = sessionRef.collection(AGENDAS_COLLECTION);

  const batch = db.batch();

  agendas.forEach(agenda => {
    agendasColRef.add(agenda);
  });

  batch.commit();
}
