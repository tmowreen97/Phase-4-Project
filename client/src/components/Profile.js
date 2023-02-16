// import ColorSchemesExample from "./NavBar";


import { useContext } from "react";
import { UserContext } from "../App.js";


function Profile(){
  const user = useContext(UserContext);
  return(
      <div className="profile">
        <h1 className="title">CRITIQUER</h1>
        <h2 className="welcome">Welcome {user.username}!</h2>
        <p className="page_summary">Here on CRITIQUER you become a movie critic! Look at movies reviewed by other users, add your own reviews, or add your own movie and be the first to review!</p>
        <div className="bio">
          <h4>Bio:</h4>
          <p>{user.bio}</p>
        </div>

      </div>


  )
}

export default Profile;