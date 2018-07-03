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
      const { uid, email, displayName } = authUser;
      const userSnap = await getUserSnap(authUser.uid);
      const user = {
        uid,
        email,
        displayName,
        ref: userSnap.ref,
        ...userSnap.data()
      };

      store.dispatch("setUser", user);

      const associations = await getSnapsFromRefArray(
        Array.from(user.associations.map(a => a.associationRef))
      );
      store.dispatch("setUserAssociations", associations);
      store.dispatch("setSelectedAssociation", associations[0]);
    } else {
      store.dispatch("unsetUser");
    }
  });
}
