import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCDJPOYj7IurZVvH-y4D7PPYMk9vug1xLE',
  authDomain: 'listapp-5effa.firebaseapp.com',
  databaseURL: 'https://listapp-5effa.firebaseio.com',
  storageBucket: 'listapp-5effa.appspot.com',
  messagingSenderId: '843938428073'
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const firebaseAuth = firebaseApp.auth()
export const firebaseDb = firebaseApp.database()
