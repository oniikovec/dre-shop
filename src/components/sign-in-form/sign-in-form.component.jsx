import { useState } from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils.js'
import FormInput from '../../components/form-input/form-input.component.jsx'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component.jsx'
import { ButtonsContainer } from './sign-in-form.styles.jsx'
import { SignUpContainer, H2 } from '../sign-up-form/sign-up-form.styles.jsx'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
   
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {       // whenever you make a call to some DB, it has to be async
    const { user } = await signInWithGooglePopup()  
    createUserDocumentFromAuth(user);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields();
    } catch(error) {
        switch(error.code) {
          case 'auth/wrong-password':
            alert('Incorrect password or email')
            break
          case 'auth/user-not-found':
            alert('User not found')
            break
          default:
            console.log(error)
        }
      }
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  return (
    <SignUpContainer>
      <H2>I have an account</H2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
        <ButtonsContainer>
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  )
}

export default SignInForm;