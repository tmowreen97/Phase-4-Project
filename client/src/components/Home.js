import React from "react";
import Login from "./Login";

function Home( {setUser} ){
  return(
    <div className="home_page">
      <h1>CRITIQUER</h1>
      <h3>Welcome to the Critiquer!</h3>
      <Login setUser={setUser}/>
    </div>
  )
}

export default Home;