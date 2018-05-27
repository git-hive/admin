import { auth } from "firebase";
import store from "@/vuex/store";

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

export function setOnAuthStateChangedListener() {
  auth().onAuthStateChanged(async user => {
    if (user) {
      store.dispatch("setUser", user);
    } else {
      store.dispatch("unsetUser");
    }
  });
}
