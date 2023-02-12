import { useEffect, useState } from "react";
import MovieCards from "./MovieCards";
function MovieList({user, movies}){


  console.log('movies', movies)
  console.log('user', user)

  return(
    <div className="movie_list">
      <h2>List of all the movies:</h2>
      {movies && <MovieCards user={user} movies={movies}/>}
    </div>
    
  )
}
export default MovieList;