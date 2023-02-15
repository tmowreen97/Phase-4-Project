import { useEffect, useState } from "react"
import { useContext } from "react";
import { UserContext } from "../App.js";

 
function MyReviews(){
  const user = useContext(UserContext);
  console.log(user)

  return (
    <div className="flex_container">
      <div>
        <h4>My Reviews:</h4>
      { 
        user.reviews.map((review)=> {
          return(
            <>
              <ul>{review.comment}</ul>
              <ul>-{review.movie.title}</ul>         
            </>
          )
      })     }         
      </div>
      <div>
        <h4>Movies I've reviewed:</h4>
        {
          user.movies.map((movie)=> {
            return(
              <>
                <ul>{movie.title}</ul>
              </>
            )
          })
        }

      </div>

    </div>

  )
}

export default MyReviews;