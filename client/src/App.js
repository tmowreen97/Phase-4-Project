import './App.css';
import Home from './components/Home';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';
import { Switch, Route, useHistory } from "react-router-dom";
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState(null);
  const [isSignedUp, setIsSignedUp]= useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)});
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;


  console.log(user)

  return (
    <div className="App">
      <Switch>
      <Route exact path='/'>
        <Home setUser={setUser} isSignedUp={isSignedUp} setIsSignedUp={setIsSignedUp} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </Route>
      <Route path='/signup'>
        <Signup setUser={setUser} setIsSignedUp={setIsSignedUp}/>
      </Route>
      <Route path='/profile'>
        <Profile user={user}/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
