import React, { useState } from 'react';
import './Card.css';
import { Redirect } from 'react-router-dom';
import MovieShow from './MovieShow';
import { Link } from "react-router-dom";

function MovieCards({movies, user}) {

  return (
    <div className="grid">
      {movies.map((movie)=> {
        return(
          <Card user={user} movie={movie}/>
        )
      })}
    </div>
  );
}

export default MovieCards;

function Card({user, movie}){
  const [currentMovie, setCurrentMovie]= useState(null)


  console.log('currentMovie', currentMovie)

  return (
    <div className='card'>
      <div className='card_body'>
        <img className='card_image' src={movie.image_url}/>
        <h2 className='card_title'>{movie.title}</h2>
        <h4>{movie.rating.toFixed(1)} ⭐ | {movie.runtime} mins</h4>
        <p className='card_description'>{movie.description}</p>
      </div>
      <Link className='card_button' to={`/movies/${movie.id}`} user={user}>Show Movie Details</Link>
    </div>
  )

}
