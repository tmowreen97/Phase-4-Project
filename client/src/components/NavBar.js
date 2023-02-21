import {React, useContext} from "react";
import { useNavigate} from "react-router-dom";
import { UserContext } from "../App.js";


function NavBar({ setUser }) {
  const navigate = useNavigate()
  const user = useContext(UserContext);

  //sends DELETE request to /logout executed by sessions#destroy, clearing the user. 
  function handleLogoutClick() {
    fetch("/logout", {
       method: "DELETE" 
      })
      .then((r) => {
        if (r.ok) {
        setUser(null);
        navigate("/")
      }
    });
  }

  return (
    <div>
      <nav className="nav">
      <ul>
        <CustomLink className="nav_text" href="/profile">Profile</CustomLink>
      </ul>
      <ul>
        <CustomLink className="nav_text" href="/movies">Movies</CustomLink>
      </ul>
      <ul>
      <CustomLink className="nav_text" href='/reviews' user={user}>My Reviews</CustomLink>
      </ul>
      <ul>
      <CustomLink className="nav_text" href='/reviews/all' user={user}>All Reviews</CustomLink>
      </ul>
      <ul>
      <CustomLink className="nav_text" href='/movies/new' user={user}>New Movie</CustomLink>
      </ul>
      <ul>
        <button className="logout_button" onClick={handleLogoutClick}>
          Logout
        </button>
      </ul>
    </nav>
    </div>
  )
}

function CustomLink({ href, children}){
  const path= window.location.pathname
  return (
    <li className={path === href ? "active" : ""}>
      <a href={href}>
        {children}
      </a>
    </li>
  )

}

export default NavBar;
