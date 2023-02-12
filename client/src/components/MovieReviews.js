import { useState } from "react";
import React from "react";
import PopupEditForm from "./PopupEditForm";
// import Popup from "reactjs-popup";

function MovieReviews(props){
  //*Want to map through reviews, and display comments on screen
  //*Then we want to check if the current user made any of the reviews.. if they did, add an edit or delete button next to the review.
  const [showEdit, setShowEdit] = useState(false)
  
  
  function handleEditReview(data){
    console.log('were editing!',data)
    const updatedReviews = props.currentReviews.filter((rev)=> {
      return rev.id !== data.id
    })
    updatedReviews.push(data)
    props.setCurrentReviews(updatedReviews)
  }

  function handleDelete(rev){
    const updatedReviews = props.currentReviews.filter((review)=> {
      return review.id !== rev.id
    })
    console.log(updatedReviews)
    fetch(`/reviews/${rev.id}`, {
      method: "DELETE",
    })
    .then(resp => resp.json)
    .then(data => props.setCurrentReviews(updatedReviews))
  }
  const renderCard = (rev)=> {
  return( props.currentReviews && 
    <div key={rev.id}>
      <ul>{rev.comment} -@{rev.user.username}</ul>
      <ul>
        {props.user.username == rev.user.username ? <button onClick={()=> setShowEdit(true)}>Edit</button> : <></>}
        {props.user.username == rev.user.username ? <button onClick={()=>handleDelete(rev)}>Delete</button> : <></>}
        {props.user.username == rev.user.username ? <PopupEditForm trigger={showEdit} setTrigger={setShowEdit} currentReview={rev} handleEditReview={handleEditReview}></PopupEditForm> : <></>}
      </ul>
      
    </div>
  )}

return (
  <div>
    {props.currentReviews && props.currentReviews.map(renderCard)}
  </div>
)}

export default MovieReviews;



