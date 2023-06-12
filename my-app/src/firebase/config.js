import app from 'firebase/app'
import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyD1JJJ0q13qr6lGzn4pjNnWJjUEgF3LORc",
    authDomain: "final-prog-1c24a.firebaseapp.com",
    projectId: "final-prog-1c24a",
    storageBucket: "final-prog-1c24a.appspot.com",
    messagingSenderId: "1000680685661",
    appId: "1:1000680685661:web:ea2ccbce0b97dd6fa68db4"
  }

  app.initializeApp(firebaseConfig)

  export const auth = firebase.auth();
  export const storage = firebase.storage();
  export const db = app.firestore();
