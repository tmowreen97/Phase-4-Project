import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
//Rendered in MovieShow.js
function PopupNewForm(props){
  const user = useContext(UserContext)
  console.log('should have context', user)

  //Use state to keep track of new review, in review format. 
  const [newReview, setNewReview]= useState({
    movie_id: 0,
    user_id: 0,
    comment: ''
  })

  //submit function that creates new review in database. After the request, passes the new data to callback function in MovieShow component, and sets popup trigger to false to hide the form.
  function handleSubmit(e){
    e.preventDefault()
    console.log('new review',newReview)
    console.log(props.currentReviews)
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
      <form className ="popup_new_form"onSubmit={(e)=> handleSubmit(e)}>
      <h4>Add New Review</h4>
        <input
        type='text'
        value={newReview.comment}
        onChange={(e)=> setNewReview(prevState => {
          // debugger
          return{...prevState, comment: e.target.value, movie_id: parseInt(props.currentMovie.id), user_id: parseInt(user.id) }
        })}
        />
        <button className="submit_new_button" type='submit' >Submit</button>
        <button className="close_new_button" onClick={()=> props.setTrigger(!props.trigger)}>Close</button>
      </form>
    </div>
  ) : "")
}

export default PopupNewForm;