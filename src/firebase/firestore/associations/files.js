import { firestore, storage } from "firebase";

import { associationRef } from "./associations";

const db = firestore();
const storageRef = storage().ref();
db.settings({ timestampsInSnapshots: true });
const FILES_COLLECTION = "files";

/**
 * Generates GUID code to file name
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() + s4() + "-" +
    s4() + "-" +
    s4() + "-" +
    s4() + "-" +
    s4() + s4() + s4()
  );
}

/**
 * Gets the reference to files collection
 * @param {String} associationID association document ID where to
 *                               get the files from
 */
export function filesRef(associationID) {
  return associationRef(associationID).collection(FILES_COLLECTION);
}

/**
 * Gets the reference to a file
 * @param {String} associationID
 * @param {String} fileID
 */
export function fileRef(associationID, fileID) {
  return filesRef(associationID).doc(fileID);
}

/**
 * Fetches all Association Files Snapshots
 * * @param {String} associationID
 */
export async function getAllAssociationFileSnaps(associationID) {
  const querySnap = await filesRef(associationID).get();
  const docs = [];
  querySnap.forEach(doc => docs.push(doc));
  return docs;
}

/**
 * Fetches a association file document
 * @param {String} associationID
 * @param {String} fileID
 */
export function getAssociationFileSnap(associationID, fileID) {
  return fileRef(associationID, fileID).get();
}

/**
 * Add file to association
 * @param {String} associationID
 * @param {Object} file
 */
export async function addAssociationFile(associationID, file, fileID = null) {
  if (fileID) {
    return filesRef(associationID)
      .doc(fileID)
      .set(file);
  } else {
    return filesRef(associationID).add(file);
  }
}

/**
 * Add the file to association. Return the file ID in association.
 * @param {String} associationID
 * @param {Object} file
 */
export async function getAssociationFileID(associationID, file) {
  var file = await addAssociationFile(associationID, file).then(doc => {
    return doc.id;
  });
  return file;
}

/**
 * Delete association file in firebase database
 * @param {String} associationID
 * @param {Object} fileID
 */
export async function deleteDatabaseFile(associationID, fileID) {
  return filesRef(associationID)
    .doc(fileID)
    .delete()
    .then(() => {
      console.log("The file was deleted");
    })
    .catch(error => {
      console.error("Was not possible to delete file", error);
    });
}

/**
 * Delete file from storage
 * @param {String} associationID
 * @param {String} storage_file_name
 */
export async function deleteStorageFile(associationID, storage_file_name) {
  // Set full path into Firebase Storage
  var full_path = `${associationID}/${storage_file_name}.pdf`;

  // Delte 'full_path' file
  return storageRef
    .child(full_path)
    .delete()
    .then(() => {
      console.log("The file was deleted");
    })
    .catch(error => {
      console.error("Was not possible to delete file", error);
    });
}

/**
 * Delete association file and the storage
 * @param {String} associationID
 * @param {String} fileID
 */
export async function deleteAssociationFile(associationID, fileID) {
  await deleteDatabaseFile(associationID, fileID);
  await deleteStorageFile(associationID, fileID);
}

/**
 * Upload file to firebase storage and add it to association
 * @param {File} file_uploade
 * @param {String} file_name
 * @param {String} associationID
 */
export async function uploadAssociationFile(
  file_uploaded,
  file_name,
  associationID,
  progress_value
) {
  var storage_file_name = guid();

  // Create the file metadata
  var metadata = { contentType: "application/pdf" };

  // Set full path into Firebase Storage
  var full_path = `${associationID}/${storage_file_name}.pdf`;

  // Upload file and metadata to the object 'full_path'
  var uploadTask = storageRef.child(full_path).put(file_uploaded, metadata);

  // Listen for state changes, errors, and completion of the upload.
  await uploadTask.on(
    storage.TaskEvent.STATE_CHANGED,
    snapshot => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progress_value = progress;
      console.log(`Upload is ${progress}% done`); 
      switch (snapshot.state) {
        case storage.TaskState.PAUSED:
          console.log("Upload is paused");
          break;
        case storage.TaskState.RUNNING:
          console.log("Upload is running");
          break;
      }
    },
    error => {
      alert("SOMETHING GOES WRONG DURING FILE UPLOAD");
      console.error("Error during file uploading", error);
    },
    () => {
      // Upload completed successfully, now we add file to database
      addAssociationFile(
        associationID,
        { name: file_name, createdAt: Number(new Date()) },
        storage_file_name
      );
      // We can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log("File available at", downloadURL);
      });
    }
  );
}
