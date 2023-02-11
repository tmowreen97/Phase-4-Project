// import React, { useState } from "react";

// function Signup({setUser, setIsSignedUp}){
//   //Set state for username and password (user info)
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordConfirmation, setPasswordConfirmation] = useState('');

//   //Set state for errors
//   const [errors, setErrors] = useState([])

//   // function handleSubmit(e) {
//   //   e.preventDefault();
//   //   fetch("/signup", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({
//   //       username,
//   //       password,
//   //       password_confirmation: passwordConfirmation,
//   //     }),
//   //   }).then((r) => {
//   //     if (r.ok) {
//   //       r.json().then((user) => {
//   //         setIsSignedUp(true)
//   //         setUser(user)
//   //         alert('You signed up! Now login with your new username and password.')
//   //       });
//   //     }
//   //     else {
//   //       r.json().then((err) => {
//   //         setErrors(err.error)});
//   //     }
//   //   });
//   //   setUsername('')
//   //   setPassword('')
//   //   setPasswordConfirmation('')
//   // }

//   function handleSubmit(e) {
//     e.preventDefault();
//     setErrors([]);
//     fetch("/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         password,
//         password_confirmation: passwordConfirmation
//       }),
//     }).then((r) => {
//       if (r.ok) {
//         r.json().then((user) => setUser(user));
//       } else {
//         r.json().then((err) => setErrors(err.errors));
//       }
//     });
//   }

//   return(
//     <div className="signup">
//       <form className="signup_form" onSubmit={handleSubmit}>
//       <h3>Sign Up</h3>
//         <label htmlFor="username">Username: </label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <label htmlFor="password">Password: </label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <label htmlFor="password">Password Confirmation: </label>
//         <input
//           type="password"
//           id="password_confirmation"
//           value={passwordConfirmation}
//           onChange={(e) => setPasswordConfirmation(e.target.value)}
//         />
//         <button type="submit">Sign Up</button>
//         {errors && errors.map((err => (
//           <p key={err}>{err}</p>
//         )))}
//       </form>
//       Already have an account?
//       <button onClick={()=> setIsSignedUp(true)}>Login</button>
//     </div>
//   )

// }

// export default Signup;