// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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
  databaseURL: 'https://demomoodcook-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
