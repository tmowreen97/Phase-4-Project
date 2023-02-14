import { useState } from "react";
import { Redirect, useHistory, useNavigate } from "react-router-dom";

function LoginForm({setUser}){
  //Here is the loginform, which will only come up if showLogIn is true. If showLogin is true, that means there is no user currently and the site wants you to login. We pass in setUser so that we can set the user to the inputed value, then hiding this form and sending you to the user profile.

  //State values keeping track of user login info
  const [username, setUsername]= useState('')
  const [password, setPassword]=useState('')
  const navigate = useNavigate()

  //Keep track of errors also
  const [errors, setErrors]=useState([])

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
          navigate("/reviews")
         
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors)
        });
      }
    });
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>Username: </label>
      <input
      type='text'
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      />
      <label>Password: </label>
      <input
      type='password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <button type='submit'>Login</button>
      {errors && errors.map((err => (
            <p key={err}>{err}</p>
      )))} 
    </form>
  )
}

export default LoginForm;