import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import MovieShow from './components/MovieShow';
import MyReviews from './components/MyReviews';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        // setUser(null)
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  console.log('user', user)
  console.log('!user', !user)


  if (!user) return <Login setUser={setUser} />;

  return(
    <div className='home'>
    <h1>CRITIQUER</h1>
        <>
        <NavBar user={user} setUser={setUser} />
        <main>
          <Switch>
            <Route path="/reviews/:id">
              <MyReviews user={user}/>
            </Route>   
            <Route path="/me">
              <Profile user={user} />
            </Route>  
            <Route exact path="/movies">
              <MovieList user={user} />
            </Route>
            <Route path='/movies/:id'>
              <MovieShow user={user}/>
            </Route>
          </Switch>
        </main>
      </>
    </div>
    
  )
}

export default App;
