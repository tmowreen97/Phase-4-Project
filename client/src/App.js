import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AddMovie from './components/AddMovie';
import React, { useState, useEffect, useContext, createContext } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';
import { Switch, Route, useHistory, Redirect  } from "react-router-dom";
import MovieList from './components/MovieList';
import MovieShow from './components/MovieShow';
import MyReviews from './components/MyReviews';
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies]= useState(null) 


  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        // setUser(null)
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    // fetch all movies #index
    fetch("/movies")
    .then(resp => resp.json())
    .then(data => setMovies(data))
  }, []);

  function handleAddMovie(newMovie){
    const updatedMovies= [...movies, newMovie]
    setMovies(updatedMovies)  
    return (<Redirect to="/movies"/>)
  }

  function isObjEmpty (obj) {
    return Object.keys(obj).length === 0;
  }
  // if (isObjEmpty(user)) return <Login setUser={setUser} />;

  if (!user) return <Login setUser={setUser} />;


  return(
    <UserContext.Provider value={user}>
    <div className='home'>
    <h1>CRITIQUER</h1>
        <>
        <NavBar user={user} setUser={setUser} />
        <Switch> 
          <Route path="/reviews">
            <MyReviews user={user}/>
          </Route>   
          <Route path="/me">
            <Profile user={user}/>
          </Route>   
          <Route path="/movies/new">
            <AddMovie handleAddMovie={handleAddMovie}/>
          </Route>  
          <Route path="/me">
          </Route>  
          <Route exact path="/movies">
            <MovieList movies={movies} user={user} />
          </Route>
          <Route path='/movies/:id'>
            <MovieShow user={user}/>
          </Route>
        </Switch>
      </>
    </div>
    </UserContext.Provider>
    
  )
}

export default App;
