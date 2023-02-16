import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMovie({movies, setMovies}){
  // ['Action', 'Comedy', 'Documentary','Drama','Horror', 'Musical', 'Romance','Thriller'] 
  const [newMovieHash, setNewMovieHash] = useState({
    title: '',
    year: '',
    image_url: '',
    genre: '',
    description: '',
    rating: '',
    runtime: ''
  })
  const [rating, setRating] = useState('')
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  console.log(newMovieHash)


  function handleSubmit(e){
    e.preventDefault();
    setErrors([]);
    const updatedMovies = [...movies]
    // updatedMovies.push(movies)
    fetch('/movies', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMovieHash)
    })
    .then(resp=> {
      if (resp.ok) {
        resp.json().then(newMovie => {
          updatedMovies.push(newMovie)
          setNewMovieHash({
            title: '',
            year: 0,
            image_url: '',
            genre: '',
            description: '',
            rating: 0,
            runtime: 0
          })
          setMovies(updatedMovies)
          alert(`You just added a new movie, ${newMovieHash.title}!` )
          navigate("/movies")
          
        })
      } else {
        resp.json().then(err => {
          setErrors(err.error)
        })
      }
    })
  }
  console.log('movies', newMovieHash)

  return(
    <div className="add_movie">
      <h2 className="add_movie_title">Add Movie</h2>
      <div className="add_movie_form">
      <form onSubmit={(e)=> handleSubmit(e)}>
        <ul>
        <label>Title: </label>
        <input
          type = 'text'
          value = {newMovieHash.title}
          placeholder="Title"
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
          min="0" 
          max="2023"
          placeholder="Year"
          onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, year: parseFloat(e.target.value)}
          })}
        />   
        </ul>
        <ul>
        <label>Image URL: </label>
        <input
          type = 'text'
          value = {newMovieHash.image_url}
          placeholder="Image URL"
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
          placeholder="Description"
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
          step='.1'
          min="0" 
          max="10"
          placeholder="Rating out of 10"
          onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, rating: parseFloat(e.target.value)}})}
        />
        </ul>
        <ul>
        <label>Runtime: </label>
        <input
          type = 'number'
          value = {newMovieHash.runtime}
          min="0" 
          placeholder="Runtime in Minutes"
          onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, runtime: parseFloat(e.target.value)}
          })}        
        />
        </ul>
        {errors && errors.map((err => (
            <p className="error" key={err}>{err}</p>
          )))} 
        <button className="submit_movie_button">Submit Movie</button>
      </form>
      </div>
    </div>
  )
}

export default AddMovie;