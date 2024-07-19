// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU1ilUni2AkxEFHeFzoTrkc2ZPXuGXURg",
  authDomain: "wavemocards.firebaseapp.com",
  projectId: "wavemocards",
  storageBucket: "wavemocards.appspot.com",
  messagingSenderId: "327511843796",
  appId: "1:327511843796:web:604c280ebee22849546c41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;