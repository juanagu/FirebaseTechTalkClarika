import * as FirebaseModule from 'firebase';
require("firebase/firestore");
import firebaseConfig from '../constants/firebase';

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
} = firebaseConfig;

let firebaseInitialized = false;

if (
  apiKey !== 'null' &&
  authDomain !== 'null' &&
  projectId !== 'null' &&
  storageBucket !== 'null' &&
  messagingSenderId !== 'null'
) {
  FirebaseModule.initializeApp({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
  });
  
  FirebaseModule.firestore().settings( { timestampsInSnapshots: true })
  
  firebaseInitialized = true;
}

export const FirebaseRef = firebaseInitialized ? FirebaseModule.firestore(): null;
export const Firebase = firebaseInitialized ? FirebaseModule : null;
