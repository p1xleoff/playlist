// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA69wyRKVW_II6gJGGjWgjEevzfEjXKNXM",
    authDomain: "p1xlepowered.firebaseapp.com",
    projectId: "p1xlepowered",
    storageBucket: "p1xlepowered.appspot.com",
    messagingSenderId: "875482013291",
    appId: "1:875482013291:web:5e5c1fe849488083a21b2e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
