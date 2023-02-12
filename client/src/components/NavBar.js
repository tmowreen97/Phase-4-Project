import React from "react";
import { Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <div>
      <nav className="nav">
      <ul>
        <CustomLink href="/me">Profile</CustomLink>
      </ul>
      <ul>
        <CustomLink href="/movies">Movies</CustomLink>
      </ul>
      <ul>
        <CustomLink href="/my-reviews">My Reviews</CustomLink>
      </ul>
      <ul>
        <button as={Link} to="/new">
          New Review
        </button>
      </ul>
      <ul>
        <button variant="outline" onClick={handleLogoutClick}>
          Logout
        </button>
      </ul>
    </nav>
    </div>
  )
}


// function NavBar(){
//   return (
//     <nav className="nav">
//       <ul className="nav_selection">
//         <CustomLink href="/">Home</CustomLink>
//       </ul>
//       <ul>
//         <CustomLink href="/movies">Movies</CustomLink>
//       </ul>
//       <ul>
//         <CustomLink href="/genres">Genres</CustomLink>
//       </ul>
//       <ul>
//         <CustomLink href="/add-edit-movie">Add/Edit Movie</CustomLink>
//       </ul>
//       <ul>
//         <CustomLink href="/add-genre">Add Genre</CustomLink>
//       </ul>
//     </nav>
//   )
// }

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

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}




// const Nav = styled.nav`
//   display: flex;
//   gap: 4px;
//   position: absolute;
//   right: 8px;
// `;

export default NavBar;
