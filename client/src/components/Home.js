import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

function Home( {user, setUser, setIsSignedUp, isSignedUp, isLoggedIn, setIsLoggedIn} ){
  return(
    <div className="home_page">
      <h1>CRITIQUER</h1>
      <h3>Welcome to the Critiquer!</h3>
    </div>
  )
}

export default Home;