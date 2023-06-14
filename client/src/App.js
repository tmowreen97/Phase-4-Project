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
  const [movies, setMovies]= useState([]);
  const [reviews, setReviews] = useState([])

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
    .then(data => {
      const movies_array=[]
      const reviews_array=[]
      data.map((movie)=> {
        return(
          movies_array.push(movie),
          reviews_array.push(movie.reviews)
        )
        
      })
      setMovies(movies_array)
      setReviews(reviews_array.flat())
    })
  }, []);


  function handleEditReview(data, review){
    // console.log(data)
    // console.log('should edit', review)
    const updatedReviews = reviews.filter((rev)=> {
      return rev.id !== review.id
    })
    updatedReviews.push(data)
    setReviews(updatedReviews)
    // history.push("/movies")
  }

//  console.log('!user', !user)
//  console.log('movies',movies)
//  console.log('reviews', reviews)
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
            <Route path="/movies/:id" element= {<MovieShow movies={movies} reviews={reviews} setReviews={setReviews} handleEditReview={handleEditReview}/>}/>
            <Route path="/reviews" element= {<MyReviews/>}/>
            <Route path="/reviews/all" element= {<AllReviews reviews={reviews}/>}/>
            <Route path="/movies/new" element= {<AddMovie movies={movies} setMovies={setMovies}/>}/>
          </Routes>
      </div>
    </UserContext.Provider>
    
  )
}

export default App;
