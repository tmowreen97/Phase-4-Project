
import MovieCards from "./MovieCards";
import { useContext } from "react";
import { UserContext } from "../App.js";


function MovieList({movies}){
  const user = useContext(UserContext);

  console.log('movies', movies)
  console.log('user', user)

  return(
    <div className="movie_list">
      <h2 className="movie_list_title">All Movies</h2>
      {movies && <MovieCards movies={movies}/>}
    </div>
    
  )
}
export default MovieList;