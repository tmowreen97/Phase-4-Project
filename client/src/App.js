import './App.css';
import Home from './components/Home';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import { Switch, Route, useHistory } from "react-router-dom";
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {

          setUser(user)});
      }
    });
  }, []);

  return (
    <div className="App">
      <Switch>
      <Route exact path='/'>
        <Home setUser={setUser}/>
      </Route>
        {/* <Route path='/login'>
          <Login/>
        </Route> */}
      <Route path='/signup'>
        <Signup setUser={setUser}/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
