import MovieCards from "./MovieCards";

function MovieList({movies}){

  return(
    <div className="movie_list">
      <h2 className="movie_list_title">All Movies</h2>
      {movies && <MovieCards movies={movies}/>}
    </div>
    
  )
}
export default MovieList;