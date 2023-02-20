import { useState } from "react";
import { useNavigate} from "react-router-dom";

function SignUpForm({setUser}){
  const navigate = useNavigate()

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
          navigate("/home")
          setUsername('')
          setPassword('')
          setPasswordConfirmation('')
          setBio('')

          
        });
      } else {
        r.json().then((err) => 
        {
          setErrors(err.error)
          setUsername('')
          setPassword('')
          setPasswordConfirmation('')
          setBio('')
        }
        );
      }
    });
  }
  return(
    <div >
      <form onSubmit={handleSubmit}>
      <h2 className="signup_title">Sign Up</h2>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />          
        <label htmlFor="password">Password Confirmation: </label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          placeholder="Enter password again"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />          
        <label>Bio:</label>
        <input

        type="text"
        value={bio}
        placeholder="Tell us about yourself!"
        onChange={(e)=>setBio(e.target.value)}
        />
        <button className="signup_button" type="submit">Sign Up</button>
        {errors && errors.map((err => (
          <p className="error" key={err}>{err}</p>
        )))}               
      </form>

    </div>
  
  )
}

export default SignUpForm;