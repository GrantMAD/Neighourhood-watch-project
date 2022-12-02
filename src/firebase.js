import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCcEwM1nvju0HIPSQCBqWKHtdhxwaVbe5c",
    authDomain: "neighbourhood-watch-project.firebaseapp.com",
    projectId: "neighbourhood-watch-project",
    storageBucket: "neighbourhood-watch-project.appspot.com",
    messagingSenderId: "612131927235",
    appId: "1:612131927235:web:58b0e7b9dc5bd1a4595e76",
    databaseURL: "https://neighbourhood-watch-project-default-rtdb.firebaseio.com",
  };

  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);
  



 