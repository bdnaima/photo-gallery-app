import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/storage";

const firebaseConfig = firebase.initializeApp({
	apiKey: "AIzaSyBdOupH5qP3jinYyv-UJsgIkhWP2TkAoD8",
	authDomain: "gallery-b0bc4.firebaseapp.com",
	projectId: "gallery-b0bc4",
	storageBucket: "gallery-b0bc4.appspot.com",
	messagingSenderId: "622759578625",
	appId: "1:622759578625:web:8dcd944eff3e1c52a44400"
});

export const auth = firebaseConfig.auth()
export const db = firebase.firestore();
export const storage = firebase.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default firebaseConfig;