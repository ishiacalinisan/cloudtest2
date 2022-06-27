import firebase from "firebase/compat/app";  

var firebaseConfig = {
  apiKey: "AIzaSyCdiyFwn90uHcb3owsMbVFikWXU6hQrrGI",
  authDomain: "pawhub-352708.firebaseapp.com",
  projectId: "pawhub-352708", 
};
  
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default db;