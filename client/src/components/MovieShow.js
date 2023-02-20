//This is responsible for handling the #show action for Movies. This is rendered when the 'More Details' button is selected on a Movie Card on MovieCards.js

import { useEffect, useState } from "react";
import PopupNewForm from "./PopupNewForm";
import { useContext } from "react";
import { UserContext } from "../App.js";



function MovieShow(){
  //current user value is stored in useContext(UserContext)
  //state values, keeps track of current movie on show page, and reviews attached to that movie.
  //showNewReview state toggles new review edit popup form
  const [currentMovie, setCurrentMovie]= useState(null)
  const [currentReviews, setCurrentReviews] = useState(null)
  const [showNewReview, setShowNewReview] = useState(false)
  const [showEditMode, setShowEditMode] = useState(false)

  useEffect(()=>{
    console.log(`${window.location.pathname}`)
    fetch(`${window.location.pathname}`)
    .then(resp=>resp.json())
    .then(current => {
      // debugger
      setCurrentMovie(current)
    })
  },[])

  useEffect(()=> {
    fetch(`${window.location.pathname}/reviews`)
    .then(resp=> resp.json())
    .then(current=>{
      setCurrentReviews(current)
    })
  },[])


  //when the 'New Review' button is clicked, showNewReview is switched to true and the popup form displays.
  function handleClick(){
    setShowNewReview(!showNewReview)
  }
  function handleEditClick(review){
    setShowEditMode(!showEditMode)
  }

  function handleSubmit(e, edit, review){
    e.preventDefault()
    const updatedReviews = currentReviews.filter((rev)=> {
      return(
        rev.id !== review.id
      )
    })
    fetch(`/reviews/${review.id}`, {
      method: "PATCH",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movie_id: review.movie_id,
        user_id: review.user_id,
        comment: edit
      })
    })
    .then(resp=>resp.json())
    .then(data=> {
      updatedReviews.unshift(data)
      setCurrentReviews(updatedReviews)
      setShowEditMode(!showEditMode)
    })

  }

  function handleDelete(e, review){
    e.preventDefault()
    console.log(review)
    const updatedReviews = currentReviews.filter((rev)=> {
      return(
        rev.id !== review.id
      )
    })
    fetch(`/reviews/${review.id}`, {
      method: "DELETE",
    })
    .then(resp => resp.json)
    .then(data => {
      setCurrentReviews(updatedReviews)
      setShowEditMode(!showEditMode)
    })
  }

  function handleNewReview(newReview){
    const updatedReviews = [...currentReviews]
    updatedReviews.unshift(newReview)
    setCurrentReviews(updatedReviews)
  }


  return(
    <div className="movie_show_container">
    {
      currentMovie && currentReviews &&
      <>
      <div className="movie_container">
        <MovieInfo currentMovie={currentMovie}/>
        <MovieReviews currentReviews={currentReviews} showEditMode={showEditMode} handleSubmit={handleSubmit} handleDelete={handleDelete}/>
        </div>
      <PopupNewForm trigger={showNewReview} setTrigger={setShowNewReview} currentMovie={currentMovie} setCurrentReviews={setCurrentReviews} currentReviews={currentReviews}
        handleNewReview={handleNewReview}  /> 
      <div className="buttons">
        <button className="new_button" onClick={()=> handleClick()}>New Review</button>
        <button className="edit_button"onClick={()=> handleEditClick()}>{showEditMode ? 'Close' : 'Edit Mode'}</button>
      </div>

      </>

    }
    </div>
  )
}

export default MovieShow;

function MovieInfo({currentMovie}){
  return(
    <div className="movie_info">
      <img className='movie_image' src={currentMovie.image_url} alt='movie_image'/>
      <h2 className='movie_title'>{currentMovie.title}</h2>
      <h4>{currentMovie.rating.toFixed(1)} ⭐ | {currentMovie.runtime} mins</h4>
      <h5>Description</h5>
      <p className='card_description'>{currentMovie.description}</p>
    </div>
  )
}

function MovieReviews({currentReviews,  showEditMode, handleSubmit, handleDelete}){
  const user = useContext(UserContext)
  console.log('should have context', user)
  return(
    <div className="movie_reviews">
      <h4>Reviews:</h4>
      {currentReviews && currentReviews.map((review)=>{
        return(
          <div key={review.id} className="movie_comments">
            <li className="movie_comment">{review.comment}</li>
            <ul>@{review.user.username}</ul>
            {user.username === review.user.username && showEditMode ? <PopupEdit review={review}  handleSubmit={handleSubmit}handleDelete={handleDelete}/> : ''}
          </div>
          
        )
      })}
    </div>
  )
}

function PopupEdit({review, handleSubmit, handleDelete}){
  const [edit, setEdit]=useState(review.comment)
  return(
    <div >
    <form onSubmit={(e)=>handleSubmit(e, edit, review)}>
    <h5>Edit Review:</h5>
    <input
      value={edit}
      type="text"
      onChange={(e)=> {
        setEdit(e.target.value)
      }}
    />
    <button className="submit_edit_button" type='submit'>Submit</button>
    <button className="delete_edit_button"onClick={(e)=>{handleDelete(e, review)}}>Delete</button>
    </form>
     </div>
  )
}