import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import app from '/public/assets/JS/firebase'
import axios from 'axios'
import { userAuth } from '../Store'

const OAuth = ({ para }) => {
  const setUser = userAuth((state) => state.setUser);
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
  
      const res = await axios.post('/api/google-auth', {
        full_name: result.user.displayName,
        email: result.user.email,
      });
  
      if (res.data.success) {
        // userAuth.getState().fetchUser();
        console.log(res.data)
        setUser(res.data);
        navigate('/', {
          state: {
            showToast: true,
            message: `Successfully ${para ? 'signed up' : 'signed in'} with Google! Also, go to profile to update your phone number.`,
            type: 'success'
          }
        });
      }
    } catch (error) {
      navigate('*', { 
        state: { 
          showToast: true, 
          message: error.response?.data?.message || 'Google authentication failed!', 
          type: 'error' 
        } 
      });
    }
  };
  
  return (
    <button className='bg-orange-600 text-white w-full px-4 py-2 rounded-lg mt-2' onClick={handleClick}>{para ? 'Sign Up' : 'Sign In'} with Google</button>
  )
}

export default OAuth