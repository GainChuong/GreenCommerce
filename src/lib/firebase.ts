import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBH82VaylnM5vK-4kHr-QOY4idLLykJ7Xc",
  authDomain: "refashion-8ec39.firebaseapp.com",
  projectId: "refashion-8ec39",
  storageBucket: "refashion-8ec39.firebasestorage.app",
  messagingSenderId: "504474441025",
  appId: "1:504474441025:web:629815aebccb60d865fdc0",
  measurementId: "G-44GTNFX07S"
};

// Initialize Firebase (prevent re-init in dev hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Request additional Google profile scopes
googleProvider.addScope("profile");
googleProvider.addScope("email");

export default app;
