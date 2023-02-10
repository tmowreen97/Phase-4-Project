import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

function Home( {setUser, setIsSignedUp, isSignedUp, isLoggedIn, setIsLoggedIn} ){
  return(
    <div className="home_page">
      <h1>CRITIQUER</h1>
      <h3>Welcome to the Critiquer!</h3>
      {isSignedUp ? <Login setUser={setUser} setIsSignedUp={setIsSignedUp} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> : <Signup setUser={setUser} setIsSignedUp={setIsSignedUp}/>}
    </div>
  )
}

export default Home;