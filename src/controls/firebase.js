import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyABgKDsoC84R7-2wFNdpCpQ9vnmT-u-zKA",
    authDomain: "budgetly-afaf6.firebaseapp.com",
    databaseURL: "https://budgetly-afaf6.firebaseio.com",
    projectId: "budgetly-afaf6",
    storageBucket: "budgetly-afaf6.appspot.com",
    messagingSenderId: "353236887291",
    appId: "1:353236887291:web:76acee6f95f3628ade325e"
  };

const app = firebase.initializeApp(firebaseConfig);
const store = app.firestore();
const auth = app.auth();


export {
    store, auth
}