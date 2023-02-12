//This is responsible for handling the #show action for Movies. This is rendered when the 'More Details' button is selected on a Movie Card on MovieCards.js

import { useEffect, useState } from "react";
import MovieReviews from "./MovieReviews";

function MovieShow({user}){

  const [currentMovie, setCurrentMovie]= useState(null)
  console.log(window.location.pathname)
  useEffect(()=>{
    fetch(`${window.location.pathname}`)
    .then(resp=>resp.json())
    .then(current => 
      setCurrentMovie(current)
      )
  },[])
  console.log('user', user)

  return(
    currentMovie && <div className="movieShow">
        <img className='movie_image' src={currentMovie.image_url}/>
        <h2 className='movie_title'>{currentMovie.title}</h2>
        <h4>{currentMovie.rating.toFixed(1)} ⭐ | {currentMovie.runtime} mins</h4>
        <h5>Description</h5>
        <p className='card_description'>{currentMovie.description}</p>
        <MovieReviews user ={user} props={currentMovie}/>
    </div>

  )
}

export default MovieShow;