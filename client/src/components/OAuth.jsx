import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
export default function OAuth() {

  const dispatch = useDispatch();//we need to initialize here to use it further
  const navigate = useNavigate();//we need to initialize here to use it further
  const handleGoogleClick = async () => {
    try{
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app);//this app import from firebase.js

        const result = await signInWithPopup(auth, provider)

        const res = await fetch('api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: result.user.displayName, email: result.user.email,
            photo: result.user.photoURL
            //we send this data from inspect of user to backend 
          })
        })
        const data = await res.json()
        dispatch(signInSuccess(data));//when everything is fine then we navigate to home page in next line
        navigate('/');//we navigate to home page


    } catch (error) {
      console.log('could not sign in with google',error);
    }
  }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg 
    uppercase hover:opacity-95'>
    continue with google
    </button>
  )
}
