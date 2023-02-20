import { useEffect, useState } from "react";

function AllReviews(){

  const [allReviews, setAllReviews]= useState(null)

  useEffect(()=> {
    fetch('/reviews')
    .then(resp=> resp.json())
    .then(data => setAllReviews(data))
  },[])

  return (
    <div className="all_reviews">
    <h2 className="all_reviews_title">All Reviews</h2>
    <div className="review_list">
{
  allReviews &&  allReviews.map((review)=> {
    return(
      <>
        <li>{review.comment}</li>
        <ul>-{review.movie.title}, @{review.user.username}</ul>
      </>
    )
  } )
}   
    </div>
    </div>


  )
}

export default AllReviews;