import React, { useState } from "react";
import {Redirect} from "react-router-dom"


function Login({setUser, setIsSignedUp, setIsLoggedIn, isLoggedIn}){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


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
  if (isLoggedIn) return <Redirect to='/me'/>


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