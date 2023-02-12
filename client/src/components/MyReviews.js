import { useEffect, useState } from "react"
function MyReviews({user}){
  
  const [myReviews, setMyReviews] = useState('')
  useEffect(()=>{
    fetch('/reviews')
    .then(resp=> resp.json())
    .then(data => {
      const reviewArray = []
      data.map((review)=>{
        console.log(review)
        if (parseInt(review.user_id) === user.id){
          reviewArray.push(review)
        }
      }
      )
      setMyReviews(reviewArray)
    })
  },[])

  console.log(myReviews)
  return (
    <div>
      <h4>My Reviews</h4>
{    myReviews && myReviews.map((review)=> {
      return(
        <>
          <ul>{review.comment}</ul>
          <ul>-{review.movie.title}</ul>         
        </>
      )
    })     } 
    </div>

  )
}

export default MyReviews;