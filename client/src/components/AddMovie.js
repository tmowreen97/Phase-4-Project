import { useState } from "react";
import { Redirect } from "react-router-dom";

function AddMovie({handleAddMovie}){
  // ['Action', 'Comedy', 'Documentary','Drama','Horror', 'Musical', 'Romance','Thriller'] 
  const [newMovieHash, setNewMovieHash] = useState({
    title: '',
    year: 0,
    image_url: '',
    genre: '',
    description: '',
    rating: 0,
    runtime: 0
  })
  console.log('newMovie', newMovieHash)
  function handleSubmit(e){
    e.preventDefault()
    fetch('/movies', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMovieHash)
    })
    .then(resp=> resp.json())
    .then(newMovie => {
      handleAddMovie(newMovie)
      setNewMovieHash({
        title: '',
        year: 0,
        image_url: '',
        genre: '',
        description: '',
        rating: 0,
        runtime: 0
      })
      alert(`You just added a new movie, ${newMovieHash.title}!` )
    })
  }

  return(
    <div className="add_movie">
      <h1>Add a Movie!</h1>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <ul>
        <label>Title: </label>
        <input
          type = 'text'
          value = {newMovieHash.title}
          onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, title: e.target.value}
          })}
        />          
        </ul>
        <ul>
        <label>Year: </label>
        <input
          type = 'number'
          value = {newMovieHash.year}
          onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, year: e.target.value}
          })}
        />   
        </ul>
        <ul>
        <label>Image URL: </label>
        <input
          type = 'text'
          value = {newMovieHash.image_url}
          onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, image_url: e.target.value}
          })}
        />       
        </ul>
        <ul>
        <label>Genre: </label>
        <select type='text' onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, genre: e.target.value}
          })}>
            <option disabled selected>Select Genre</option>
            <option>Action</option>
            <option>Comedy</option>            
            <option>Documentary</option>            
            <option>Drama</option>            
            <option>Horror</option>           
            <option>Musical</option>
            <option>Romance</option>            
            <option>Thriller</option>
        </select>
        </ul>
        <ul>
        <label>Description: </label>
        <input
          type = 'text'
          value = {newMovieHash.description}
          onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, description: e.target.value}
          })}
        />        
        </ul>
        <ul>
        <label>Rating: </label>
        <input
          type = 'number'
          value = {newMovieHash.rating}
          onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, rating: e.target.value}
          })}
        />     
        </ul>
        <ul>
        <label>Runtime: </label>
        <input
          type = 'number'
          value = {newMovieHash.runtime}
          onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, runtime: e.target.value}
          })}        /> 
        </ul>
        <button>Submit Movie</button>
      </form>
    </div>
    
  )
}

export default AddMovie;