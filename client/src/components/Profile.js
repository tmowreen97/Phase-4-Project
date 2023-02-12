// import ColorSchemesExample from "./NavBar";

import NavBar from "./NavBar.js";
import Logout from "./Logout.js";
import MyReviews from "./MyReviews.js";

function Profile({setUser, user, setIsLoggedIn}){
  console.log('user',user)
  return(
    <div className="profile">
      <h1>Welcome {user.username}!</h1>
      <MyReviews user={user}/>



    </div>

  )
}

export default Profile;