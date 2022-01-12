import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAYhJV94WE6a7uwwLSeuUyIJSHxnFw6ELU",
    authDomain: "crwn-db-a6c5e.firebaseapp.com",
    projectId: "crwn-db-a6c5e",
    storageBucket: "crwn-db-a6c5e.appspot.com",
    messagingSenderId: "534885900630",
    appId: "1:534885900630:web:01240d06f670dfe842f6f7",
    measurementId: "G-MG2MWKHGR8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (userAuth === false) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = await userRef.get();

   if (snapShot.exists === false) {
       const {displayName, email} = userAuth;
       const createdAt = new Date();
       
       try {
           await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData
           })
       } catch (error) {
           console.log('error creating user', error.message)
       }
   } 
   
   return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;