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
    <h1>All Reviews</h1>
{
  allReviews &&  allReviews.map((review)=> {
    return(
      <li>{review.movie.title}: {review.comment} @{review.user.username}</li>
    )
  } )
}   
    </div>


  )
}

export default AllReviews;