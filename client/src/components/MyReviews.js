import { useEffect, useState } from "react"
import { useContext } from "react";
import { UserContext } from "../App.js";

 
function MyReviews(){
  const user = useContext(UserContext);
  // debugger
  return (
    <div className="flex_container">
      <div className="my_reviews">
        <h4 className="my_reviews_title">My Reviews:</h4>
      { 
        user.reviews.map((review)=> {
          return(
            <>
              <ul className="my_review_list">
                <li>{review.comment}</li>
              </ul>
              <ul>-{review.movie.title}</ul>         
            </>
          )
      })     }         
      </div>
      <div className="my_movies">
        <h4 className="my_movies_title">Movies I've reviewed:</h4>
        {
          user.movies.map((movie)=> {
            return(
              <>
                <ul className="movie_list">
                  <li>{movie.title}</li>
                </ul>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyReviews;