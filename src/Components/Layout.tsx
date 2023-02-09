import { Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/role">Role</Link>
          <Link to="/user">User</Link>
        </Nav>
      </Navbar.Collapse>

      <Outlet />
    </>
  );
};

export default Layout;
