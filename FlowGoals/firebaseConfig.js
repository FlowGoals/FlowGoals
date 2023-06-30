// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAFsDzoKht3hUNskaJYd2M-2PunWSs6Y9g',
  authDomain: 'flowgoals-1687760068724.firebaseapp.com',
  projectId: 'flowgoals-1687760068724',
  storageBucket: 'flowgoals-1687760068724.appspot.com',
  messagingSenderId: '370669195791',
  appId: '1:370669195791:web:a2f0db14a25ce9c1aa097a',
  measurementId: 'G-72DC9V0ZP0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
