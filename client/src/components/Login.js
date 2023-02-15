import React, { useState } from "react";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import {Redirect} from "react-router-dom"


function Login({setUser}){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showLogin, setShowLogin] = useState(true);
  console.log('showLogin', showLogin)
  console.log('onLogIn, which is equal to setUser', setUser)

  return (
    <div className="login">
      <h1>CRITIQUER</h1>
      {showLogin ? (
        <>
          <LoginForm setUser={setUser} />
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm setUser={setUser} />

          <p>
            Already have an account? &nbsp;
            <button onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
      
  )

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   fetch("/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ username, password }),
  //   }).then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => {
  //         setUser(user)
  //         setIsLoggedIn(true)
  //       });
  //     }
  //   });
  // }
  // if (isLoggedIn) return <Redirect to='/me'/>


  // return (
  //   <div className="login_form">
  //     <h3>Login:</h3>
  //     <form className='login_form' onSubmit={handleSubmit}>
  //       <label htmlFor="username">Username:</label>
  //     <input
  //     type='text'
  //     id='username'
  //     value={username}
  //     onChange={(e)=> setUsername(e.target.value)}
  //     />
  //     <label htmlFor="password">Password:</label>
  //     <input
  //     type='text'
  //     id='password'
  //     value={password}
  //     onChange={(e)=> setPassword(e.target.value)}
  //     />
  //     <button type='submit'>Login</button>
  //   </form>
  //   <label>Don't have an account?</label>
  //   <button onClick={()=>setIsSignedUp(false)}>Signup</button>
  //   </div>
    
  // )
}

export default Login;