import { auth } from "firebase";
import store from "@/vuex/store";

import { getUserSnap } from "@/firebase/firestore/users";
import { getSnapsFromRefArray } from "@/firebase/firestore/helpers";

const firebaseAuth = auth();
const signInProvider = new auth.GoogleAuthProvider();

/**
 * Signs in the user using Google Auth Provider
 */
export function signIn() {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .setPersistence(auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebaseAuth
          .signInWithPopup(signInProvider)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
}

/**
 * Signs out the current logged in user
 */
export function signOut() {
  return firebaseAuth.signOut();
}

/**
 * Sets up the 'OnAuthStateChanged' listener
 */
export async function setOnAuthStateChangedListener() {
  auth().onAuthStateChanged(async authUser => {
    if (authUser) {
      // Extract data from auth
      const { uid, email, displayName } = authUser;

      // Get user from firestore
      const userSnap = await getUserSnap(uid);

      // Check if the user has already been registered
      if (!userSnap.exists) return;

      // Join auth and firestore data
      const user = {
        uid,
        email,
        displayName,
        ref: userSnap.ref,
        ...userSnap.data()
      };

      // Gets roles, filter them by key='admin' and then get the association
      // ref by calling role.parent
      const associationsWhereUserIsAdmin = (await getSnapsFromRefArray(
        user.associations.map(a => a.roleRef)
      ))
        .filter(role => role.get("key") === "admin")
        .map(role => role.parent); // role is an association child

      if (associationsWhereUserIsAdmin.length > 0) {
        const associations = await getSnapsFromRefArray(
          associationsWhereUserIsAdmin
        );

        store.dispatch("setUser", user);
        store.dispatch("setUserAssociations", associations);
        store.dispatch("setSelectedAssociation", associations[0]);
      }
    } else {
      store.dispatch("unsetUser");
    }
  });
}
