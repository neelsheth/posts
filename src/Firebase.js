import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDR7E-E0bodBQ6AOfEJcxUoBERpztAXd9E",
  authDomain: "oauth-44754.firebaseapp.com",
  projectId: "oauth-44754",
  storageBucket: "oauth-44754.appspot.com",
  messagingSenderId: "1058260390548",
  appId: "1:1058260390548:web:ac4c3c6ca458e8f447da81"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);


