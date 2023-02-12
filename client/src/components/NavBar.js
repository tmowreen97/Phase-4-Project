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

  console.log(user)

  return (
    <div>
      <nav className="nav">
      <ul>
        <Link to="/me">Profile</Link>
      </ul>
      <ul>
        <Link to="/movies">Movies</Link>
      </ul>
      <ul>
      <Link to={`/reviews/${user.id}`} user={user}>My Reviews</Link>
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

// function CustomLink({ href, children}){
//   const path= window.location.pathname
//   return (
//     <li className={path === href ? "active" : ""}>
//       <a href={href}>
//         {children}
//       </a>
//     </li>
//   )

// }

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
