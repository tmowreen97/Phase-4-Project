function MyReviews({user}){
  console.log('hello',user.reviews)
  return (
    user.reviews.map((rev)=> {
      return(
        <h4>{rev.comment}</h4>
      )
    })
  )
}

export default MyReviews;