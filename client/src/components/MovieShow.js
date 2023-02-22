//This is responsible for handling the #show action for Movies. This is rendered when the 'More Details' button is selected on a Movie Card on MovieCards.js

import { createContext, useEffect, useState } from "react";
import PopupNewForm from "./PopupNewForm";
import { useContext } from "react";
import { UserContext } from "../App.js";
import { useParams } from "react-router-dom";


export const CurrentReviewContext = createContext()


function MovieShow({movies, reviews, setReviews, handleEditReview}){
  //current user value is stored in useContext(UserContext)
  //state values, keeps track of current movie on show page, and reviews attached to that movie.
  //showNewReview state toggles new review edit popup form
  const [currentReviews, setCurrentReviews] = useState([])
  const [showNewReview, setShowNewReview] = useState(false)
  const [showEditMode, setShowEditMode] = useState(false)

// useEffect request to movies#show, returns info about specific movie.
  // useEffect(()=>{
  //   console.log(`${window.location.pathname}`)
  //   fetch(`${window.location.pathname}`)
  //   .then(resp=>resp.json())
  //   .then(current => {
  //     setCurrentMovie(current)
  //   })
  // },[])

  const { id }= useParams()

  const currentMovie = movies.find((movie)=> {
    return movie.id == id
  })

  // useEffect request to reviews#index, returns all reviews belonging to a specific movie. Done through nested routes.
  useEffect(()=> {
    // console.log('id', `${id}`)
    fetch('/movies/'+id+'/reviews')
    .then(resp=> resp.json())
    .then(current=>{
      setCurrentReviews(current)
    })
  },[])


  //when the 'New Review' button is clicked, showNewReview is switched to true and the popup form displays.
  function handleClick(){
    setShowNewReview(!showNewReview)
  }

  //when the 'Edit' button is clicked, toggles edit mode.
  function handleEditClick(){
    setShowEditMode(!showEditMode)
  }

  //handles edit review, sends patch request to reviews#update. triggered when PopupEdit form submitted
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
      updatedReviews.push(data)
      setCurrentReviews(updatedReviews)
      setShowEditMode(!showEditMode)
    })
  }
  //handles delete review, sends delete request to reviews#destroy, when PopupEdit form delete button is pressed
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
  // handles new review, this is called in the PopupNewForm component, updates reviews state
  function handleNewReview(newReview){
    const updatedReviews = [...currentReviews]
    updatedReviews.unshift(newReview)
    setCurrentReviews(updatedReviews)
  }


  return(
    //useContext used to pass down currentReviews throughout this component
            //as long as these values exist and are not null
        //movie_container responsible for movie description, and movie's reviews listed on page.
        //buttons responsible for 'New Review' and 'Edit Mode' buttons.
        //when 'New Review' button is clicked, PopupNewForm is displayed
        
    <CurrentReviewContext.Provider value={currentReviews}>
      { currentReviews && currentMovie &&
        <div className="movie_show_container">
          <>
          <div className="movie_container">
            <MovieInfo currentMovie={currentMovie}/>
            <MovieReviews showEditMode={showEditMode} handleSubmit={handleSubmit} handleDelete={handleDelete}/>
          </div>
          <PopupNewForm trigger={showNewReview} setTrigger={setShowNewReview} currentMovie={currentMovie} handleNewReview={handleNewReview}  /> 
          <div className="buttons">
            <button className="new_button" onClick={()=> handleClick()}>New Review</button>
            <button className="edit_button"onClick={()=> handleEditClick()}>{showEditMode ? 'Close' : 'Edit Mode'}</button>
          </div>
          </>
        </div>      
      }

    </CurrentReviewContext.Provider>
  )
}

export default MovieShow;

function MovieInfo({currentMovie}){
  //displays movie info
  console.log('movie info',currentMovie)
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

function MovieReviews({showEditMode, handleSubmit, handleDelete}){
  //displays movie reviews.
  //when the user presses the edit mode button, the popup edit form will come up for each review belonging to the user.
  const currentReviews= useContext(CurrentReviewContext)
  const user = useContext(UserContext)
  return(
    <div className="movie_reviews">
      <h4>Reviews:</h4>
      {currentReviews && currentReviews.map((review)=>{
        // debugger
        return(
          <div key={review.id} className="movie_comments">
            <li className="movie_comment">{review.comment}</li>
            {console.log('in movie reviews',review)}
            {console.log('username?', review.username)}
            <ul>@{review.user.username}</ul>
            {user.username === review.user.username && showEditMode ? <PopupEdit review={review}  handleSubmit={handleSubmit} handleDelete={handleDelete}/> : ''}
          </div>
        )
      })}
    </div>
  )
}

function PopupEdit({review, handleSubmit, handleDelete}){
  //edit state value allows the edit form to be prefilled with previous data
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