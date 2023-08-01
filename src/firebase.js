import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCcEwM1nvju0HIPSQCBqWKHtdhxwaVbe5c",
  authDomain: "neighbourhood-watch-project.firebaseapp.com",
  projectId: "https://neighbourhood-watch-project-default-rtdb.firebaseio.com",
  storageBucket: "neighbourhood-watch-project",
  messagingSenderId: "neighbourhood-watch-project.appspot.com",
  appId: "612131927235",
  databaseURL: "1:612131927235:web:58b0e7b9dc5bd1a4595e76",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app);

export { app, db, storage, auth };



