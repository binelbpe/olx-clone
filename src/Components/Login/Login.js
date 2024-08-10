import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Spinner from '../Spinner/Spinner';
import olxLogo from "../olx-logo.png"

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [spinner, setSpinner] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,}$/.test(email)) {
      setError("Email is invalid");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setError("Password should be at least 8 characters long");
      return false;
    }
    if (! /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!-/%*?&]{8,}$/.test(password)) {
        setError( "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        return false;
      }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setSpinner(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/');
      })
      .catch((error) => {
        setSpinner(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('login error', errorCode);
        console.log('login error ', errorMessage);
        const message = errorMessage.split("(auth/")[1].split(")")[0];
        setError(message);
      });
  }

  const gotoSignup = () => {
    navigate('/Signup')
  }

  return (
    <div>
      {spinner ? (
        <Spinner />
      ) : (
        <div className='loginParentDiv'>
          <img width="200px" height="200px" src={olxLogo} alt='OLX logo' />
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <br />
            <input 
              id="email" 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className='input' 
              type="email" 
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input 
              id="password" 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className='input' 
              type="password" 
            />
            <br />
            <span style={{ color: "red", marginBottom: "3%" }}>
              {error ? error : ""}
            </span>
            <br />
            <button className='submit'>Submit</button>
            <br />
            <button className='atag' onClick={gotoSignup}>New User? Create Account</button>
            <br />
          </form>
        </div>
      )}
    </div>
  )
}

export default Login