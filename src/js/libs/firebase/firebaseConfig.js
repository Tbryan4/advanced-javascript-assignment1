// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHKeHHcnJoTukNTdYckb4b7HtM9K1Zwc0",
  authDomain: "storefront-4a3db.firebaseapp.com",
  databaseURL: "https://storefront-4a3db-default-rtdb.firebaseio.com",
  projectId: "storefront-4a3db",
  storageBucket: "storefront-4a3db.appspot.com",
  messagingSenderId: "959440926265",
  appId: "1:959440926265:web:88f3d3cbce270e18a7bfe8",
  measurementId: "G-86DHJQFWL5"
};
 

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const storage = getStorage(app)

// export the service objects
export {db, storage}
