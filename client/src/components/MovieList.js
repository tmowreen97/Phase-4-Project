import { useEffect, useState } from "react";
import MovieCards from "./MovieCards";
function MovieList(){
  const [movies, setMovies]= useState(null)

  useEffect(() => {
    // fetch all movies #index
    fetch("/movies")
    .then(resp => resp.json())
    .then(data => setMovies(data))
  }, []);

  console.log('movies', movies)

  return(
    <div className="movie_list">
      <h2>List of all the movies:</h2>
      {movies && <MovieCards movies={movies}/>}
    </div>
    
  )
}
export default MovieList;