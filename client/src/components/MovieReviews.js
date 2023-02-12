import { useState } from "react";
import React from "react";
import PopupForm from "./PopupForm";
// import Popup from "reactjs-popup";

function MovieReviews({user, props}){
  console.log('user', user)
  //Want to map through reviews, and display comments on screen
  //Then we want to check if the current user made any of the reviews.. if they did, add an edit or delete button next to the review.
  const [currentUser, setCurrentUser]= useState(user.username)
  const [showEdit, setShowEdit] = useState(false)
  
  const renderCard = (rev)=> {
  return(
    // console.log('rev',rev)
    <div key={rev.id}>
      <ul>{rev.comment} -@{rev.user.username}</ul>
      <ul>
        {currentUser == rev.user.username ? <button onClick={()=> setShowEdit(true)}>Edit</button> : <></>}
        {currentUser == rev.user.username ? <button>Delete</button> : <></>}
        {currentUser == rev.user.username ? <PopupForm trigger={showEdit} setTrigger={setShowEdit} currentReview={rev}></PopupForm> : <></>}
      </ul>
      
    </div>
  )}

return (
  <div>
    {props.reviews.map(renderCard)}

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



