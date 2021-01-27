import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAV9DucydnF7hu5R1vdjKkQvFhhwFNSSD0",
  authDomain: "bug-trackerv2.firebaseapp.com",
  projectId: "bug-trackerv2",
  storageBucket: "bug-trackerv2.appspot.com",
  messagingSenderId: "570881381207",
  appId: "1:570881381207:web:3ddecd25d7307ec8eea412",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
