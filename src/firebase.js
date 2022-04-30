import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCPWBWrAjQ713J2iJxv8veuJtavwOv-y8w",

  authDomain: "instagram-clone-c8d14.firebaseapp.com",

  projectId: "instagram-clone-c8d14",

  storageBucket: "instagram-clone-c8d14.appspot.com",

  messagingSenderId: "367370777358",

  appId: "1:367370777358:web:76be8e4cd58b166819dd5f",

  measurementId: "G-KQRFMRJ9CR",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
