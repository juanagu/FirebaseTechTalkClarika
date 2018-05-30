
import * as FirebaseModule from 'firebase';
// Required for side-effects
require("firebase/firestore");
import firebaseConfig from '../constants/firebase';

const {
  apiKey,
  authDomain,
  storageBucket,
  messagingSenderId,
  projectId,
} = firebaseConfig;

let firebaseInitialized = false;

if (
  apiKey !== 'null' &&
  authDomain !== 'null' &&
  storageBucket !== 'null' &&
  messagingSenderId !== 'null' &&
  projectId !== 'null'
) {
  FirebaseModule.initializeApp({
    apiKey,
    authDomain,
    storageBucket,
    messagingSenderId,
    projectId,
  });

  firebaseInitialized = true;
}

export const FirebaseRef = firebaseInitialized ? FirebaseModule.firestore() : null;
export const Firebase = firebaseInitialized ? FirebaseModule : null;
