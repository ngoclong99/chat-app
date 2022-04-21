import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBA1DDv28ucrJZdpYUdpPKGQ5h69S4izbw',
  authDomain: 'react-chat-953f7.firebaseapp.com',
  databaseURL: 'https://react-chat-953f7-default-rtdb.firebaseio.com',
  projectId: 'react-chat-953f7',
  storageBucket: 'react-chat-953f7.appspot.com',
  messagingSenderId: '669786191990',
  appId: '1:669786191990:web:b24a6282db7ce5b0d04757'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics()

// const auth = firebase.auth()
const db = firebase.firestore()
const auth = firebase.auth()

// connect location firebase
// auth.useEmulator('http://localhost:9099')
// if (window.location.hostname === 'localhost') {
//   db.useEmulator('localhost', '8080')
// }

export { db, auth }

export default firebase
