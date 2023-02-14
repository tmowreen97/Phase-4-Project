import { useState } from "react";
import React from "react";
import PopupEditForm from "./PopupEditForm";
// import Popup from "reactjs-popup";

function MovieReviews(props){
  //*Want to map through reviews, and display comments on screen
  //*Then we want to check if the current user made any of the reviews.. if they did, add an edit or delete button next to the review.
//   const [showEdit, setShowEdit] = useState(false)
  const [currentUser, setCurrentUser]= useState(props.user.username)
  const [showEdit, setShowEdit] = useState(false)
  // const [reviews, setReviews] = useState(props.reviews)
  console.log('reviews', props.reviews)

  function handleEditReview(data){
    console.log('were editing!',data)
    const updatedReviews = props.reviews.filter((rev)=> {
      return rev.id !== data.id
    })
    updatedReviews.push(data)
    props.setReviews(updatedReviews)
  }


  function handleDelete(rev){
    const updatedReviews = props.reviews.filter((review)=> {
      return review.id !== rev.id
    })
    console.log(updatedReviews)
    console.log('del',rev)
    fetch(`/reviews/${rev.id}`, {
      method: "DELETE",
    })
    .then(resp => resp.json)
    .then(data => props.setReviews(updatedReviews))
  }
  const renderCard = (rev)=> {
    // debugger
  return(
    // console.log('rev',rev)
    <div key={rev.id}>
      <ul>{rev.comment} -@{rev.user.username}</ul>
      <ul>
        {currentUser == rev.user.username ? <button onClick={()=> setShowEdit(true)}>Edit</button> : <></>}
        {currentUser == rev.user.username ? <button onClick={()=>handleDelete(rev)}>Delete</button> : <></>}
        {currentUser == rev.user.username ? <PopupEditForm trigger={showEdit} setTrigger={setShowEdit} currentReview={rev} handleEditReview={handleEditReview}></PopupEditForm> : <></>}
      </ul>

    </div>
  )}

return (
  <div>
    {props.reviews.map(renderCard)}

  </div>
)}
  
  
//   function handleEditReview(data){
//     console.log('were editing!',data)
//     const updatedReviews = props.currentReviews.filter((rev)=> {
//       return rev.id !== data.id
//     })
//     updatedReviews.push(data)
//     props.setCurrentReviews(updatedReviews)
//   }

//   function handleDelete(rev){
//     const updatedReviews = props.currentReviews.filter((review)=> {
//       return review.id !== rev.id
//     })
//     console.log(updatedReviews)
//     fetch(`/reviews/${rev.id}`, {
//       method: "DELETE",
//     })
//     .then(resp => resp.json)
//     .then(data => props.setCurrentReviews(updatedReviews))
//   }

//   function handleToggle(rev){
//     setShowEdit(true)
//   }
//   const renderCard = (rev)=> {
//   return( props.currentReviews && 
//     <div key={rev.id}>
//       <ul>{rev.comment} -@{rev.user.username}</ul>
//       <ul>
//         {props.user.username == rev.user.username ? <button onClick={()=> handleToggle(rev)}>Edit</button> : <></>}
//         {props.user.username == rev.user.username ? <button onClick={()=>handleDelete(rev)}>Delete</button> : <></>}
//         <PopupEditForm trigger={showEdit} setTrigger={setShowEdit} currentReview={rev} handleEditReview={handleEditReview}/>
//         {/* {props.user.username == rev.user.username ? <PopupEditForm trigger={showEdit} setTrigger={setShowEdit} currentReview={rev} handleEditReview={handleEditReview}></PopupEditForm> : <></>} */}
//       </ul>
      
//     </div>
//   )}

// return (
//   <div>
//     {props.currentReviews && props.currentReviews.map(renderCard)}
//   </div>
// )}

export default MovieReviews;



