import React, { useState } from "react";

function PopupEditForm(props){
  const [newComment, setNewComment]= useState('')

  //Send PATCH request to update a specific review. This is our UPDATE action for reviews 
  function handleSubmit(e){
    e.preventDefault()
    fetch(`/reviews/${props.currentReview.id}`,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment: newComment
      })
    })
    .then(resp => resp.json())
    .then(data => {
      //Callback function is in MovieReviews
      //It updates the review state
      //setTrigger back to false to close popup form
      props.handleEditReview(data)
      props.setTrigger(false)
    })
  }


  return((props.trigger)?(
    <div className="popup">
      <h4>Edit Review</h4>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <input
        type='text'
        placeholder={props.currentReview.comment}
        value={newComment}
        onChange={(e)=> setNewComment(e.target.value)}
        />
        <button className="close" type='submit'>Submit</button>
      </form>
    </div>
  ) : "")
}

export default PopupEditForm;