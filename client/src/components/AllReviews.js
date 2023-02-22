import { useEffect, useState } from "react";

function AllReviews({reviews}){

  //useEffect sends get request to /reviews to reviews#index to grab all reviews in database.

  return (
    <div className="all_reviews">
    <h2 className="all_reviews_title">All Reviews</h2>
    <div className="review_list">
{
  reviews &&  reviews.map((review)=> {
    // debugger
    return(
      <>
        <li>{review.comment}</li>
        <ul>-{review.title}, @{review.username}</ul>
      </>
    )
  } )
}   
    </div>
    </div>


  )
}

export default AllReviews;