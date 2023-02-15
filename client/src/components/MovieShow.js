//This is responsible for handling the #show action for Movies. This is rendered when the 'More Details' button is selected on a Movie Card on MovieCards.js

import { useEffect, useState } from "react";
import PopupNewForm from "./PopupNewForm";
import { useContext } from "react";
import { UserContext } from "../App.js";



function MovieShow(){
  const user = useContext(UserContext);
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
      setCurrentMovie(current)
      setCurrentReviews(current.reviews)
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
        rev.id != review.id
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
        rev.id != review.id
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
    <div className="movieShow">
    {
      currentMovie && currentReviews &&
      <>
        <MovieInfo currentMovie={currentMovie}/>
        <h5>Reviews:</h5>
        <MovieReviews currentReviews={currentReviews} user={user} showEditMode={showEditMode} handleSubmit={handleSubmit} handleDelete={handleDelete}/>
        <PopupNewForm trigger={showNewReview} setTrigger={setShowNewReview} currentMovie={currentMovie} setCurrentReviews={setCurrentReviews} currentReviews={currentReviews} user={user} 
        handleNewReview={handleNewReview}  />      
        <button onClick={()=> handleClick()}>{showNewReview ? 'Close' : 'New Review'}</button>
        <button onClick={()=> handleEditClick()}>{showEditMode ? 'Close' : 'Edit Mode'}</button>
      </>

    }
    </div>

    

  )
}

export default MovieShow;

function MovieInfo({currentMovie}){
  return(
    <div className="movie_info">
      <img className='movie_image' src={currentMovie.image_url}/>
      <h2 className='movie_title'>{currentMovie.title}</h2>
      <h4>{currentMovie.rating.toFixed(1)} ⭐ | {currentMovie.runtime} mins</h4>
      <h5>Description</h5>
      <p className='card_description'>{currentMovie.description}</p>
    </div>
  )
}

function MovieReviews({currentReviews, user,  showEditMode, handleSubmit, handleDelete}){
  return(
    <div className="movie_reviews">
      {currentReviews && currentReviews.map((review)=>{
        return(
          <>
            <p className="movie_comment">{review.comment} -@{review.user.username}</p>
            {user.username === review.user.username && showEditMode ? <PopupEdit review={review}  handleSubmit={handleSubmit}handleDelete={handleDelete}/> : ''}

          </>
          
        )
      })}
    </div>
  )
}

function PopupEdit({review, handleSubmit, handleDelete}){
  const [edit, setEdit]=useState(review.comment)
  return(
     <div>
    <form onSubmit={(e)=>handleSubmit(e, edit, review)}>
    <label>Edit Review:</label>
    <input
      value={edit}
      type="text"
      onChange={(e)=> {
        setEdit(e.target.value)
      }}
    />
    <button type='submit'>Submit</button>
    </form>
     <button onClick={(e)=>{handleDelete(e, review)}}>Delete</button>
     </div>
  )
}