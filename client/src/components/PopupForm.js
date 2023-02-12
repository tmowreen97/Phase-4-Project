import React, { useState } from "react";

function PopupForm(props){
  const [newComment, setNewComment]= useState('')
  console.log(props.currentReview.id)
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
    }
    
    )
    .then(resp => resp.json())
    .then(data => props.setTrigger(false))
  }

  return(props.trigger)?(
    <div className="popup">
      <h4>Edit Review</h4>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <input
        type='text'
        placeholder={props.currentReview.comment}
        value={newComment}
        onChange={(e)=> setNewComment(e.target.value)}
        />
        <button className="close" type='submit' >Close</button>
      </form>
    </div>
  ) : ""
}

export default PopupForm;