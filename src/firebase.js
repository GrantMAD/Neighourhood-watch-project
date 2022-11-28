import firebase from "./firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCcEwM1nvju0HIPSQCBqWKHtdhxwaVbe5c",
    authDomain: "neighbourhood-watch-project.firebaseapp.com",
    projectId: "neighbourhood-watch-project",
    storageBucket: "neighbourhood-watch-project.appspot.com",
    messagingSenderId: "612131927235",
    appId: "1:612131927235:web:58b0e7b9dc5bd1a4595e76"
  };

  let instance;

  export default function getFirebase() {
    if (typeof window !== "undefined") {
      if (instance) return instance;
      instance = firebase.initializeApp(firebaseConfig);
      return instance;
    }
  
    return null;
  }



 