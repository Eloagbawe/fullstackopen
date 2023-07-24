import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const NavBar = ({ loggedInUser, logout }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mt-2 mb-4">
      <Container>
        <Navbar.Brand href="/">Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Blogs</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="me-3">
            Signed in as: <span>{loggedInUser}</span>
          </Navbar.Text>
          <Button
            className="px-4"
            variant="outline-secondary"
            onClick={(e) => logout(e)}
          >
            logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
