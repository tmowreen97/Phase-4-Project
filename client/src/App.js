import './App.css';
import NavBar from './components/NavBar';
import AddMovie from './components/AddMovie';
import React, { useState, useEffect, createContext } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';
import MovieList from './components/MovieList';
import MovieShow from './components/MovieShow';
import MyReviews from './components/MyReviews';
import { Routes, Route} from 'react-router-dom'
import AllReviews from './components/AllReviews';


export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies]= useState('') 

console.log(user)

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
          <>
          <NavBar setUser={setUser} />
          <Routes>
            <Route path="/reviews" element= {<MyReviews/>}/>
            <Route path="/home" element= {<Profile/>}/>
            <Route path="/movies/new" element= {<AddMovie movies={movies} setMovies={setMovies}/>}/>
            <Route path="/movies" element= {<MovieList movies={movies}/>}/>
            <Route path="/movies/:id" element= {<MovieShow/>}/>
            <Route path="/reviews/all" element= {<AllReviews/>}/>
          </Routes>
        </>
      </div>
    </UserContext.Provider>
    
  )
}

export default App;
