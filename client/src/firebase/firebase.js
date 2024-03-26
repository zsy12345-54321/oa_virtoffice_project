// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDyixayvU8ZZerCQzuyRj5zvaMQH_DLSK4",
    authDomain: "virtoffice-project.firebaseapp.com",
    projectId: "virtoffice-project",
    storageBucket: "virtoffice-project.appspot.com",
    messagingSenderId: "767814147105",
    appId: "1:767814147105:web:8c452c0136faca98a9d760",
    measurementId: "G-VJNYZBMDNK"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(firebaseApp);