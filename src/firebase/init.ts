// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2OZdFyVw6Q8HqCgBcxRiEWfTwsEA-Ll4",
  authDomain: "meerchat-51b85.firebaseapp.com",
  projectId: "meerchat-51b85",
  storageBucket: "meerchat-51b85.appspot.com",
  messagingSenderId: "907422238573",
  appId: "1:907422238573:web:aced88049176f0fd51bc64",
  measurementId: "G-3WN0VV877C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
