import { useEffect, useState } from "react";
import MovieCards from "./MovieCards";
function MovieList({user}){
  const [movies, setMovies]= useState(null)

  useEffect(() => {
    // fetch all movies #index
    fetch("/movies")
    .then(resp => resp.json())
    .then(data => setMovies(data))
  }, []);

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