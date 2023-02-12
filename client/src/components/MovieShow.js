//This is responsible for handling the #show action for Movies. This is rendered when the 'More Details' button is selected on a Movie Card on MovieCards.js

import { useEffect, useState } from "react";
import MovieReviews from "./MovieReviews";
import PopupNewForm from "./PopupNewForm";

function MovieShow({user}){

  const [currentMovie, setCurrentMovie]= useState(null)
  const [currentReviews, setCurrentReviews] = useState(null)

  console.log(window.location.pathname)
  useEffect(()=>{
    fetch(`${window.location.pathname}`)
    .then(resp=>resp.json())
    .then(current => {
      setCurrentMovie(current)
      setCurrentReviews(current.reviews)
    })
  },[])

  const [showNewReview, setShowNewReview] = useState(false)
  console.log('currentMovie', currentMovie)
  console.log('currentReviews', currentReviews)


  function handleClick(){
    setShowNewReview(true)
  }

  function handleNewReview(newReview){
    const updatedReviews= [...currentReviews, newReview]
    setCurrentReviews(updatedReviews)
  }


  console.log('reviews, this is the page we want them to show up on!', currentReviews)

  return(
    currentMovie && currentReviews && <div className="movieShow">
        <img className='movie_image' src={currentMovie.image_url}/>
        <h2 className='movie_title'>{currentMovie.title}</h2>
        <h4>{currentMovie.rating.toFixed(1)} ⭐ | {currentMovie.runtime} mins</h4>
        <h5>Description</h5>
        <p className='card_description'>{currentMovie.description}</p>
        <button onClick={()=> handleClick()}>New Review</button>
        <PopupNewForm trigger={showNewReview} setTrigger={setShowNewReview} currentMovie={currentMovie} user={user} 
        currentReviews={currentReviews} setCurrentReviews={setCurrentReviews} handleNewReview={handleNewReview}/>
        <MovieReviews user ={user} currentMovie={currentMovie} setCurrentReviews={setCurrentReviews} currentReviews={currentReviews}/>
    </div>

  )
}

export default MovieShow;