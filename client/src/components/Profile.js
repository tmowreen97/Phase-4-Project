// import ColorSchemesExample from "./NavBar";

import NavBar from "./NavBar.js";

function Profile({user}){
  debugger
  return(
    <div className="profile">
      <NavBar/>
      <h1>Welcome {user.username}!</h1>
    </div>

  )
}

export default Profile;