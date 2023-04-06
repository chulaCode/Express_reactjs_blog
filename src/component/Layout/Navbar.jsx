import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../../style.scss"
import { AuthContext } from "../../context/authContext";
import Logo from "../../img/logo1.jpg";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffcanvasExample()  {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <>
     {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3 bg-primary">
          <Container fluid>
          <Navbar.Brand as={Link} to="/" className="logo"> <img src={Logo} alt=""  /></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  ELEME REPORTS
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={NavLink}  className="nav_text"to="/home">Home</Nav.Link>
                  <Nav.Link as={NavLink} className="nav_text" to="/home">News</Nav.Link>
                  <Nav.Link as={NavLink}  className="nav_text"to="/home">About us</Nav.Link>
                  <Nav.Link as={NavLink} className="nav_text" to="/home">Advertise with us</Nav.Link>
                
                  <NavDropdown
                    title={
                      <span className="">Category</span>
                  }>
                     <NavDropdown.Item as={Link} to="/?cat=politics">Politics</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/?cat=sports">
                      Sports
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/?cat=business">
                      Business
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/?cat=entertainment">
                      Entertainment
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/about">
                      About us
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/advert">
                      Advertise with us
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 "
                    aria-label="Search"
                  />
                  <Button variant="outline-primary">Search</Button>
                </Form>
                <span>{currentUser?.username}</span>
                  {currentUser ? (
                   <span className="mr-3"onClick={logout}>Logout</span>
                   ) : (
                   <Link className="link" to="/login">
                     Login to comment
                   </Link>
          )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

      ))}
    </>
  );
}

export default OffcanvasExample;
