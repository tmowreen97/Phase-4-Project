import { useState } from "react";

function LoginForm({setUser}){
  //Here is the loginform, which will only come up if showLogIn is true. If showLogin is true, that means there is no user currently and the site wants you to login. We pass in setUser so that we can set the user to the inputed value, then hiding this form and sending you to the user profile.

  //State values keeping track of user login info
  const [username, setUsername]= useState('')
  const [password, setPassword]=useState('')

  //Keep track of errors also
  const [errors, setErrors]=useState([])
  console.log(errors)

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
        debugger
        r.json().then((user) => setUser(user));
      } else {
        r.json().then((err) => {
          debugger
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
      type='text'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm;