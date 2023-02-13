import { useState } from "react";
import Profile from "./Profile";

function SignUpForm({setUser}){
    //Set state for username and password (user info)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [bio, setBio]= useState('')
    // console.log('username', username)
    // console.log('password', password)
    // console.log('passwordConfirmation', passwordConfirmation)
  
    //Set state for errors
    const [errors, setErrors] = useState([])
    console.log(errors)

    function handleSubmit(e) {
      e.preventDefault();
      setErrors([]);
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
          bio: bio
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user)
            return (<Profile user={user}/>)
          });
        } else {
          r.json().then((err) => 
          {
            setErrors(err.error)
          }
          );
        }
      });
    }
    return(
      <div className="signup">
        <form className="signup_form" onSubmit={handleSubmit}>
        <h3>Sign Up Form</h3>
        <ul>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </ul>
        <ul>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />          
        </ul>
        <ul>
          <label htmlFor="password">Password Confirmation: </label>
          <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            placeholder="Enter password again"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />          
        </ul>
        <ul>
          <label>Bio:</label>
          <input

          type="text"
          value={bio}
          placeholder="Tell us about yourself!"
          onChange={(e)=>setBio(e.target.value)}
          />
        </ul>
        <ul>
          <button type="submit">Sign Up</button>
          {errors && errors.map((err => (
            <p key={err}>{err}</p>
          )))}          
        </ul>
        
        </form>

      </div>
    
  )
}

export default SignUpForm;