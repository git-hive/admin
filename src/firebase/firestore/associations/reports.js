import { firestore } from "firebase";

import { associationRef } from "./associations";

const db = firestore();
db.settings({ timestampsInSnapshots: true });
const REPORTS_COLLECTION = "reports";

/**
 * Gets the reference to reports collection
 * @param {String} associationID association document ID where to
 *                               get the report from
 */
export function reportsRef(associationID) {
  return associationRef(associationID).collection(REPORTS_COLLECTION);
}

/**
 * Gets the reference to a report
 *
 * @param {String} associationID
 * @param {String} reportID
 */
export function reportRef(associationID, reportID) {
  return reportsRef(associationID).doc(reportID);
}

/**
 * Fetches all Association Report Snapshots
 */
export async function getAllAssociationReportSnaps(associationID) {
  const querySnap = await reportsRef(associationID).get();
  const docs = [];
  querySnap.forEach(doc => docs.push(doc));
  return docs;
}

/**
 * Fetches a association report document
 *
 * @param {String} associationID
 * @param {String} reportID
 */
export function getAssociationReportSnap(associationID, reportID) {
  return reportRef(associationID, reportID).get();
}

/**
 *
 * @param {String} associationID
 * @param {Object} report
 */
export function addAssociationReport(associationID, report) {
  return reportsRef(associationID).add(report);
}
