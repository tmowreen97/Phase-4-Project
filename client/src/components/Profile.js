// import ColorSchemesExample from "./NavBar";

import NavBar from "./NavBar.js";
import Logout from "./Logout.js";

function Profile({setUser, user, setIsLoggedIn}){
  console.log('user',user)
  return(
    <div className="profile">
      {/* <NavBar/> */}
      {/* <Logout setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user}/> */}
      <h1>Welcome {user.username}!</h1>
      {user.reviews.map((review)=> {
        return <p key={review.id}>{review.comment}</p>
      })}

    </div>

  )
}

export default Profile;