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
            return {...prevState, year: parseFloat(e.target.value)}
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
          placeholder=""
          value = {newMovieHash.rating}
          step='.1'
          onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, rating: parseFloat(e.target.value)}})}
          // onChange={(e)=> setNewMovieHash(prevState => {
          //   return {...prevState, rating: (e.target.value).toFixed(1)}
          // })}
        /> /10
        </ul>
        <ul>
        <label>Runtime: </label>
        <input
          type = 'number'
          value = {newMovieHash.runtime}
          onChange={(e)=> setNewMovieHash(prevState => {
            return {...prevState, runtime: parseFloat(e.target.value)}
          })}        
        /> mins
        </ul>
        {errors && errors.map((err => (
            <p key={err}>{err}</p>
          )))} 
        <button>Submit Movie</button>
   
      </form>
    </div>
    
  )
}

export default AddMovie;