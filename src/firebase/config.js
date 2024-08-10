// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApnHghNgsTaj-pxzx7JEgj1l7QCtlHsas",
  authDomain: "olx-demo-a0abd.firebaseapp.com",
  projectId: "olx-demo-a0abd",
  storageBucket: "olx-demo-a0abd.appspot.com",
  messagingSenderId: "546910700313",
  appId: "1:546910700313:web:e1cc313308f49845edfb88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;