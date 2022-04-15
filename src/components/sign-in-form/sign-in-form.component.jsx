import { useState } from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils.js'
import FormInput from '../../components/form-input/form-input.component.jsx'
import Button from '../button/button.component.jsx'
import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
   
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(response);
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

  const signInWithGoogle = async () => {       // whenever you make a call to some DB, it has to be async
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  return (
    <div className='sign-up-container'>
      <h2>I have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
        <div className='buttons-container'>
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType='google' onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;