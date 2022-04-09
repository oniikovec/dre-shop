import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js'

const SignIn = () => {

  const logGoogleUser = async () => {       // whenever you make a call to some DB, it has to be async
    const { user } = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  )
}

export default SignIn;