import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm1UqsMskxyj3ShYUNr4JnoItN5pEGEJc",
  authDomain: "crwn-clothing-db-48251.firebaseapp.com",
  projectId: "crwn-clothing-db-48251",
  storageBucket: "crwn-clothing-db-48251.appspot.com",
  messagingSenderId: "632649554403",
  appId: "1:632649554403:web:a8b980dd4ec985c09b28d6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

// creating new user from Google Auth
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  // if the snapshot does not exist, we set it inside of the DB
  if(!userSnapshot.exists()) {                
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
}

