// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO3T61gUKNn5FLfSTMNzkyk7yw9lMj_WQ",
  authDomain: "twitter-4d5bb.firebaseapp.com",
  projectId: "twitter-4d5bb",
  storageBucket: "twitter-4d5bb.appspot.com",
  messagingSenderId: "1028427574686",
  appId: "1:1028427574686:web:39daa60ad0b4653c8dfa8f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//ytkilendirmenın referansini alma
export const auth = getAuth(app);

//google saglayıcı kurulum
export const provider = new GoogleAuthProvider();

//veritabaninin referansini alma
export const db = getFirestore(app);

//depolama alanının ref alma
export const storage = getStorage(app);
