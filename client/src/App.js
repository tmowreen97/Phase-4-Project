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

//useContext for user 
export const UserContext = createContext();

function App() {
  //start with user at null value
  const [user, setUser] = useState(null);
  const [movies, setMovies]= useState('') 

// console.log(user)
//useEffect logs in user and keeps their data in state
//This request is sent to users#show
//While the user is not logged in this returns 401 unauthorized
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

//useEffect grabs all movies from database and keeps the data in state
  useEffect(() => {
    // fetch all movies #index
    fetch("/movies")
    .then(resp => resp.json())
    .then(data => setMovies(data))
  }, []);

 console.log('!user', !user)
  //if !(user is null) return log in screen. since user is null in the beginning, this login page will show until we're signed in.
  if (!user) return <Login setUser={setUser} />;
  return(
    //UserContext provides user value throughout App
    <UserContext.Provider value={user}>
      <div className='home'>
          <NavBar setUser={setUser} />
          <Routes>
            <Route path="/profile" element= {<Profile/>}/>
            <Route path="/movies" element= {<MovieList movies={movies}/>}/>
            <Route path="/movies/:id" element= {<MovieShow/>}/>
            <Route path="/reviews" element= {<MyReviews/>}/>
            <Route path="/reviews/all" element= {<AllReviews/>}/>
            <Route path="/movies/new" element= {<AddMovie movies={movies} setMovies={setMovies}/>}/>
          </Routes>
      </div>
    </UserContext.Provider>
    
  )
}

export default App;
