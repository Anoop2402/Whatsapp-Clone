import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5zVgEmLLti8yhAmNzYO9id--w41DNj6E",
  authDomain: "whatsapp-clone-bbbfa.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-bbbfa-default-rtdb.firebaseio.com",
  projectId: "whatsapp-clone-bbbfa",
  storageBucket: "whatsapp-clone-bbbfa.appspot.com",
  messagingSenderId: "469131746467",
  appId: "1:469131746467:web:164451de52e4d0d6497316",
  measurementId: "G-S3FSR8Y7X7"
};

  const firebaseApp=firebase.initializeApp(firebaseConfig, "App");

  const db=firebaseApp.firestore();
  const auth=firebaseApp.auth();
  var provider = new firebase.auth.GoogleAuthProvider();
  
  export {auth, provider}
  export default db;