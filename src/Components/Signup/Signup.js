import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import Spinner from "../Spinner/Spinner";
import olxLogo from "../olx-logo.png"

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!/^(?! )[a-zA-Z'\s_-]{3,16}$/.test(username)) {
        setError("Username is invalid");
        return false;
      }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,}$/.test(email)) {
      setError("Email is invalid");
      return false;
    }
    if (!phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number should be 10 digits");
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
    setError("");

    if (!validateForm()) {
      return;
    }

    setSpinner(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, "//......");
        const db = getFirestore();
        addDoc(collection(db, "users"), {
          id: user.uid,
          userName: username,
          phoneNo: phone,
        }).then(() => {
          console.log("login page");
          navigate("/login");
        });
      })
      .catch((error) => {
        setSpinner(false);
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage, ".....//");
        const message = errorMessage.split("(auth/")[1].split(")")[0];
        setError(message);
      });
  };

  const gotLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="singupParentDiv">
          <img
            width="200px"
            height="200px"
            src={olxLogo}
            alt="OLX logo"
          />
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">UserName</label>
            <br />
            <input
              onChange={(e) => setUserName(e.target.value)}
              className="input"
              type="text"
              id="username"
              value={username}
            />
            <br />
            <label htmlFor="email">Email Address</label>
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input"
              type="email"
              id="email"
            />
            <br />
            <label htmlFor="phone">Phone Number</label>
            <br />
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="input"
              type="tel"
              id="phone"
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="input"
              type="password"
              id="password"
            />
            <br />
            <span style={{ marginBottom: "3%", color: "red" }}>
              {error ? error : ""}
            </span>

            <br />
            <button className="submit" type="submit">
              Submit
            </button>
          </form>
          <div className="login">
            <button onClick={gotLogin} className="login-button">
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;