import React from 'react';
import './Card.css';
import { Redirect } from 'react-router-dom';

function MovieCards({movies}) {

  return (
    <div className="grid">
      {movies.map((movie)=> {
        return(
          <Card movie={movie}/>
        )
      })}
      
    </div>
  );
}

export default MovieCards;

function Card({movie}){
  function handleMoreDetails(movie){
    fetch(`/movies/${movie.id}`)
    .then(r=> r.json())
    .then(data => console.log(data))
  }

  return (
    <div className='card'>
      <div className='card_body'>
        <img className='card_image' src={movie.image_url}/>
        <h2 className='card_title'>{movie.title}</h2>
        <h4>{movie.rating.toFixed(1)} ⭐ | {movie.runtime} mins</h4>
        <p className='card_description'>{movie.description}</p>
      </div>
      <button className='card_button' onClick={()=>handleMoreDetails(movie)}>More Details</button>
    </div>
  )

}