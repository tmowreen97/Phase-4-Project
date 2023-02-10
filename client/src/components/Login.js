import React, { useState } from "react";
import Signup from "./Signup";

function Login({setUser}){
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
        r.json().then((user) => setUser(user));
      }
    });
  }


  return (
    <div className="login_form">
      Login:
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
      <button>Login</button>
    </form>
    <label>Don't have an account?</label>
    <a href='/signup'>
      <button onClick={(e)=> <Signup/>}>Signup</button>
    </a>

    </div>
    
  )
}

export default Login;