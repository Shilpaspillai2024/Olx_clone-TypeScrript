
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBQXskU6pDdz06mdNUrP58H239zCysjVXw",
  authDomain: "olx-clone-bbc5e.firebaseapp.com",
  projectId: "olx-clone-bbc5e",
  storageBucket: "olx-clone-bbc5e.appspot.com",
  messagingSenderId: "688087971553",
  appId: "1:688087971553:web:79ddb8734f204bf7c0e9a0"
};


const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const googleProvider=new GoogleAuthProvider()

 export const db=getFirestore(app)
 export const storage=getStorage(app)
