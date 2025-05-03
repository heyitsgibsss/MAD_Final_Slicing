// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCIoiOLPelNdEm3DNlX6MWkq1_4gfqyh10',
  authDomain: 'demomoodcook.firebaseapp.com',
  projectId: 'demomoodcook',
  storageBucket: 'demomoodcook.firebasestorage.app',
  messagingSenderId: '1040443020156',
  appId: '1:1040443020156:web:a37e5887a8b96f5bcccaf9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
