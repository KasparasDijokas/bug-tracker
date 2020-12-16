import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDl7lXvRM3zK6g8vb07D9Mwj_BWRBGTcA4",
  authDomain: "bug-tracker-83126.firebaseapp.com",
  projectId: "bug-tracker-83126",
  storageBucket: "bug-tracker-83126.appspot.com",
  messagingSenderId: "418789037039",
  appId: "1:418789037039:web:8e800db57a200cb45edc1a",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;
