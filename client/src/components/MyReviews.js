import { useContext } from "react";
import { UserContext } from "../App.js";

 
function MyReviews(){
  const user = useContext(UserContext);
  // debugger
  //maps out reviews and movies that belong to user.
  return (
    <div className="flex_container">
      <div className="my_reviews">
        <h4 className="my_reviews_title">My Reviews:</h4>
      {user.reviews.length===0 ? <ul><em>No reviews yet!</em></ul> : 
      <>{ 
        user.reviews.map((review)=> {
          return(
            <div key={review.id}>
              <ul className="my_review_list">
                <li>{review.comment}</li>
              </ul>
              <ul>-{review.movie.title}</ul>         
            </div>
          )
      })     }</>}         
      </div>
      <div className="my_movies">
        <h4 className="my_movies_title">Movies I've Reviewed:</h4>
        {user.movies.length===0 ? <ul><em>No movies reviewed yet!</em></ul> : 
        <>
        {
          user.movies.map((movie)=> {
            return(
              <div key={movie.id}>
                <ul key={movie.id} className="movie_list">
                  <li>{movie.title}</li>
                </ul>
              </div>
            )
          })
        }
        </>}
        
      </div>
    </div>
  )
}

export default MyReviews;