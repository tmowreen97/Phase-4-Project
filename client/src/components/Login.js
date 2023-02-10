import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import Signup from "./Signup";
import Profile from "./Profile";

function Login({setUser, setIsSignedUp, setIsLoggedIn}){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setIsLoggedIn(true)
        });
      }
    });
  }


  return (
    <div className="login_form">
      <h3>Login:</h3>
      <form className='login_form' onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
      <input
      type='text'
      id='username'
      value={username}
      onChange={(e)=> setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
      type='text'
      id='password'
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
      />
      <button type='submit'>Login</button>
    </form>
    <label>Don't have an account?</label>
    <button onClick={()=>setIsSignedUp(false)}>Signup</button>
    </div>
    
  )
}

export default Login;