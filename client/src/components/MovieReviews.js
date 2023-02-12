import { useState } from "react";
import React from "react";
import PopupForm from "./PopupForm";
// import Popup from "reactjs-popup";

function MovieReviews({user, props}){
  console.log('user', user)
  console.log(props.reviews)
  //Want to map through reviews, and display comments on screen
  //Then we want to check if the current user made any of the reviews.. if they did, add an edit or delete button next to the review.
  const [currentUser, setCurrentUser]= useState(user.username)
  const [showEdit, setShowEdit] = useState(false)
  const [reviews, setReviews] = useState(props.reviews)
  console.log('reviews', reviews)
  
  function handleEditReview(data){
    console.log('were editing!',data)
    const updatedReviews = reviews.filter((rev)=> {
      return rev.id !== data.id
    })
    updatedReviews.push(data)
    setReviews(updatedReviews)
  }

  // function handleDeleteMovie(current_movie){
  //   alert(`You just deleted ${current_movie.title}`)
  //   const updatedMovies = movies.filter((movie)=> movie.title !== current_movie.title )
  //   console.log(updatedMovies)
  //   fetch(`http://localhost:9292/movie/${current_movie.id}`, {
  //     method: "DELETE",
  //   })
  //   .then(resp => resp.json)
  //   .then(data => setMovies(updatedMovies))
  // }

  function handleDelete(rev){
    const updatedReviews = reviews.filter((review)=> {
      return review.id !== rev.id
    })
    console.log(updatedReviews)
    console.log('del',rev)
    fetch(`/reviews/${rev.id}`, {
      method: "DELETE",
    })
    .then(resp => resp.json)
    .then(data => setReviews(updatedReviews))
  }
  const renderCard = (rev)=> {
  return(
    // console.log('rev',rev)
    <div key={rev.id}>
      <ul>{rev.comment} -@{rev.user.username}</ul>
      <ul>
        {currentUser == rev.user.username ? <button onClick={()=> setShowEdit(true)}>Edit</button> : <></>}
        {currentUser == rev.user.username ? <button onClick={()=>handleDelete(rev)}>Delete</button> : <></>}
        {currentUser == rev.user.username ? <PopupForm trigger={showEdit} setTrigger={setShowEdit} currentReview={rev} handleEditReview={handleEditReview}></PopupForm> : <></>}
      </ul>
      
    </div>
  )}

return (
  <div>
    {reviews.map(renderCard)}

  </div>
)

  // return(
  //   <div>
  //     <h5>Reviews</h5>
  //     {props.reviews.map((rev)=> {
  //       return(
  //         <h1></h1>
  //       )
  //     })}
      
  //   </div>
    

  // )
}

export default MovieReviews;



