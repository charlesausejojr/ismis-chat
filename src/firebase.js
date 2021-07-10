import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBJxYBzbb8_vRZvvbE8bPF_8B1KtE9IhM4",
    authDomain: "ismessage-2c64f.firebaseapp.com",
    databaseURL: "https://ismessage-2c64f.firebaseio.com",
    projectId: "ismessage-2c64f",
    storageBucket: "ismessage-2c64f.appspot.com",
    messagingSenderId: "813341089160",
    appId: "1:813341089160:web:fdc9c3e01397c16ac22e3d",
    measurementId: "G-BDTYYHD1FS"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;