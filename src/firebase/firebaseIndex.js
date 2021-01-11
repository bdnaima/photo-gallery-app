import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/storage";

const firebaseConfig = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
});

export const auth = firebaseConfig.auth()
export const db = firebase.firestore();
export const storage = firebase.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default firebaseConfig;