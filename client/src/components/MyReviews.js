import { useEffect, useState } from "react"
function MyReviews({user}){
  
  console.log(user)

  return (
    <div className="flex_container">
      <div>
        <h4>My Reviews</h4>
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