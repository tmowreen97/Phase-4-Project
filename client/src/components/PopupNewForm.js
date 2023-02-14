import React, { useState } from "react";
//Rendered in MovieShow.js
function PopupNewForm(props){

  //Use state to keep track of new review, in review format. 
  const [newReview, setNewReview]= useState({
    movie_id: 0,
    user_id: 0,
    comment: ''
  })

  //submit function that creates new review in database. After the request, passes the new data to callback function in MovieShow component, and sets popup trigger to false to hide the form.
  function handleSubmit(e){
    e.preventDefault()
    const updatedReviews=[]
    fetch('/reviews', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview),
    })
    .then(resp=>resp.json())
    .then(data=> {
      props.setTrigger(false)
      props.handleNewReview(data)
      setNewReview({
        movie_id: 0,
        user_id: 0,
        comment: ''})
    }
      )
  }
  //If the trigger is true, it will display the New Review Form. If it's false, it'll be an empty string.
  return((props.trigger)?(
    <div className="popup">
      <h4>New Review Form</h4>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <input
        type='text'
        value={newReview.comment}
        onChange={(e)=> setNewReview(prevState => {
          return{...prevState, comment: e.target.value, movie_id: parseInt(props.currentMovie.id), user_id: parseInt(props.user.id) }
        })}
        />
        <button className="submit" type='submit' >Submit</button>
      </form>
    </div>
  ) : "")
}

export default PopupNewForm;