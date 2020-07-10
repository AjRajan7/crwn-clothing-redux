import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config={
    apiKey: "AIzaSyA-o_t1fFg-fuSiHVU3oaBHfsJoLSLPumk",
    authDomain: "crwn-db-64c13.firebaseapp.com",
    databaseURL: "https://crwn-db-64c13.firebaseio.com",
    projectId: "crwn-db-64c13",
    storageBucket: "crwn-db-64c13.appspot.com",
    messagingSenderId: "176263838659",
    appId: "1:176263838659:web:3dd344508da4303f135b76"
  };

  export const createUserProfileDocument= async (userAuth,additionalData)=>{
    if(!userAuth) return;
    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapShot=await userRef.get();
    if(!snapShot.exists){
      const {displayName,email}=userAuth;
      const createdAt=new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
          console.log("error creating user",error.message);
      } 
    }
    return userRef;
  }
  firebase.initializeApp(config);
 
  export const auth=firebase.auth();
  export const firestore=firebase.firestore();

  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({promp:'select_account'});
  export const signInWithGoogle=()=> auth.signInWithPopup(provider);

  export default firebase;