import React, { useState } from 'react';
import './Card.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App.js";




function MovieCards({movies}) {
  const user = useContext(UserContext);
  const [currentReviews, setCurrentReviews] = useState('')


  return (
    <div className="grid">
      {movies && movies.map((movie)=> {
        // debugger
        return(
          <div key={movie.id} className='card'>
          <div className='card_body'>
            <img className='card_image' src={movie.image_url} alt='card_image'/>
            <h2 className='card_title'>{movie.title}</h2>
            <h4>{movie.rating.toFixed(1)} ⭐ | {movie.runtime} mins</h4>
            <p className='card_description'>{movie.description}</p>
          </div>
          <Link className='card_button' to={`/movies/${movie.id}`} user={user} currentReviews={currentReviews} setCurrentReviews={setCurrentReviews}>More Details</Link>
        </div>
        )
      })}
    </div>
  );
}

export default MovieCards;

