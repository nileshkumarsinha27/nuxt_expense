import firebase from 'firebase';

let app = null;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_APIKEY,
  appId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT,
};

app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);
app.database().ref();
