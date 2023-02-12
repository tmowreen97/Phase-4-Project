import React, { useState } from "react";

function PopupNewForm(props){

  //Use state to keep track of new review, in review format. 
  const [newReview, setNewReview]= useState({
    movie_id: '',
    user_id: '',
    comment: ''
  })

  //submit function that creates new review in database. After the request, passes the new data to callback function in MovieShow component, and sets popup trigger to false to hide the form.
  function handleSubmit(e){
    e.preventDefault()
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
          return{...prevState, comment: e.target.value, movie_id: props.currentMovie.id, user_id: props.user.id }
        })}
        />
        <button className="submit" type='submit' >Submit</button>
      </form>
    </div>
  ) : "")
}

export default PopupNewForm;