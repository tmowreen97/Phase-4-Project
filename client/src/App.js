import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AddMovie from './components/AddMovie';
import React, { useState, useEffect, useContext, createContext } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';
import MovieList from './components/MovieList';
import MovieShow from './components/MovieShow';
import MyReviews from './components/MyReviews';
import { Routes, Route} from 'react-router-dom';


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


  if (!user) return <Login setUser={setUser} />;


  return(
    <UserContext.Provider value={user}>
    <div className='home'>
    <h1>CRITIQUER</h1>
        <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/reviews">
            <MyReviews user={user}/>
          </Route>   
          <Route path="/me">
            <Profile user={user}/>
          </Route>   
          <Route path="/movies/new">
            <AddMovie/>
          </Route>  
          <Route path="/me">
          </Route>  
          <Route exact path="/movies">
            <MovieList movies={movies} user={user} />
          </Route>
          <Route path='/movies/:id'>
            <MovieShow user={user}/>
          </Route>
        </Routes>
      </>
    </div>
    </UserContext.Provider>
    
  )
}

export default App;
