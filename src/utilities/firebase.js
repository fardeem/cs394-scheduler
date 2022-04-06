import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyD9WwjqsS2TqfPk0DmzukJX3hwwFkYQxqE",
  authDomain: "cs394-fardeem-scheduler.firebaseapp.com",
  databaseURL: "https://cs394-fardeem-scheduler-default-rtdb.firebaseio.com",
  projectId: "cs394-fardeem-scheduler",
  storageBucket: "cs394-fardeem-scheduler.appspot.com",
  messagingSenderId: "372152799640",
  appId: "1:372152799640:web:302ce591f6798a8bb25bed",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = database.ref(path);
    const devMode =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    if (devMode) {
      console.log(`loading ${path}`);
    }
    return dbRef.on(
      "value",
      (snapshot) => {
        const val = snapshot.val();
        if (devMode) {
          console.log(val);
        }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};

export const setData = (path, value) => database.ref(path).set(value);

export const signOut = () => firebase.auth().signOut();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return [user];
};
