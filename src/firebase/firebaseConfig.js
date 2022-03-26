// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";

const STOREFRONT_FIREBASE_API_KEY= "AIzaSyAMbk5iCtqQIHr1IMYZfxj1f1_RVbuvF-k"
const STOREFRONT_FIREBASE_AUTH_DOMAIN= "storefront-41f10.firebaseapp.com"
const STOREFRONT_FIREBASE_DATABASE_URL= "https://storefront-41f10-default-rtdb.firebaseio.com"
const STOREFRONT_FIREBASE_PROJECT_ID= "storefront-41f10"
const STOREFRONT_FIREBASE_STORAGE_BUCKET= "storefront-41f10.appspot.com"
const STOREFRONT_FIREBASE_MESSAGING_SENDER_ID= "857346295411"
const STOREFRONT_FIREBASE_APP_ID= "1:857346295411:web:514c708fbb67221399cc06"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: STOREFRONT_FIREBASE_API_KEY,
  authDomain: STOREFRONT_FIREBASE_AUTH_DOMAIN,
  databaseURL: STOREFRONT_FIREBASE_DATABASE_URL,
  projectId: STOREFRONT_FIREBASE_PROJECT_ID, 
  storageBucket: STOREFRONT_FIREBASE_STORAGE_BUCKET,  
  messagingSenderId: STOREFRONT_FIREBASE_MESSAGING_SENDER_ID,
  appId: STOREFRONT_FIREBASE_APP_ID,
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)
const storage = getStorage(app)

// export the service objects
export {db, storage, auth}
