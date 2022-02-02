// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBzlepS3-e3HLnfC8dyWCdkqHH_9voZbGs",
  authDomain: "whatsapp-clone-cabee.firebaseapp.com",
  projectId: "whatsapp-clone-cabee",
  storageBucket: "whatsapp-clone-cabee.appspot.com",
  messagingSenderId: "606795477677",
  appId: "1:606795477677:web:c6f5add589cc29cabf8c24",
  measurementId: "G-XKMRBGYLVK"
};
const firebaseApp =firebase.initializeApp(firebaseConfig);
const db =firebaseApp.firestore();
const auth =firebase.auth();
const provider =new firebase.auth.GoogleAuthProvider();
export {auth ,provider};
export default db;


