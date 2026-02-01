// firebase.js
// 需要用下面指令，先安裝 firebase
// npm  install  firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth , GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjot0CMztQ3vPP2QGhfSz8urjgs_3lPDc",
  authDomain: "fir-flutter-codelab-9e89b.firebaseapp.com",
  projectId: "fir-flutter-codelab-9e89b",
  storageBucket: "fir-flutter-codelab-9e89b.firebasestorage.app",
  messagingSenderId: "1078239467689",
  appId: "1:1078239467689:web:2fef5ba598fe6fb121b1b8",
  measurementId: "G-KTTK20PMRC"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// 初始化 Firestore
const db = getFirestore(app);

const provider = new GoogleAuthProvider(); // Google 登錄提供者

export { db  , auth , provider };