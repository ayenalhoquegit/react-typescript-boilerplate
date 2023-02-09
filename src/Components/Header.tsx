import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to={"/menu"}>
              Menu
            </Link>
            <Link className="nav-link" to={"/role"}>
              Role
            </Link>
            <Link className="nav-link" to={"/user"}>
              User
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
