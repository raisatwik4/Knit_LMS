import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Form,
  Modal,
  Row,
  Col,
  
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import SearchComponent from "../../SearchComponent";

import { searchNewBooks} from "../../../api";

import "./navbar.css";
import { useEffect } from "react";

function CollapsibleExample() {
  const dispatch = useDispatch();
  const SET_LOGIN_SUCCESS = useSelector((state) => state.loginSuccess);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const regex = /^[0-9\b]+$/;

  const validatesearch = (id) => {
    if (!id) {
      setError("Search is required");
      return false;
    } else if (!regex.test(id)) {
      setError("Search is not valid");
      return false;
    }
    return true;
  };
  const handleSubmit = event => {
    event.preventDefault();
    const isValid = validatesearch(searchTerm);

    if (!isValid) {
      alert("Please Enter a valid search id");
      return;
      setError("Please Enter a valid search id");
     
    }
    else{
      searchNewBooks(searchTerm).then(results => {
          setResults(results.data);
          setShowModal(true);
          }
      );
    }
  };

 


  const logout = () => {
    dispatch({ type: "SET_LOGIN_SUCCESS", payload: false });
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };
  return (
    <>
    <Navbar
      className="navbar"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="#home">KNIT SULTANPUR</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
            <Nav.Link href="/dashboard/addnewstudent">Add Student</Nav.Link>
            <Nav.Link href="/rentedbooks">Rented Books</Nav.Link>
            <Nav.Link href="/dashboard/addbook">Add New Book</Nav.Link>
            <Nav.Link href="/updatebook">Update Book</Nav.Link>
            <Nav.Link href="/dashboard/student">Students</Nav.Link>
          </Nav>
          <Nav>
            <Form className="d-flex p-2">
              <Form.Control
                type="search"
                placeholder="Search" 
                aria-label="Search"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}

              />
              <Button   variant="outline-success" onClick={handleSubmit}
              >Search</Button>
            </Form>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Button
                className="me-5"
                variant="outline-danger"
                onClick={logout}
              >
                Log Out
              </Button>
            ) : (
              <Button
                className="me-5"
                variant="outline-success"
                href="/login"
              >
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {results.length > 0 ? (
            <ul>
              {results.map(result => (
                <li key={result.id}>{result.title}</li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CollapsibleExample;
