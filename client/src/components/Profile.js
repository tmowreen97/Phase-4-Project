// import ColorSchemesExample from "./NavBar";

import NavBar from "./NavBar.js";
import Logout from "./Logout.js";
import MyReviews from "./MyReviews.js";
import { useContext } from "react";


function Profile({setUser, user, setIsLoggedIn}){
  console.log('user',user)
  // const user = useContext(UserContext)
  return(
    <div className="profile">
      <h1>Welcome {user.username}!</h1>
      <h4>Bio:</h4>
      <p>{user.bio}</p>
    </div>

  )
}

export default Profile;