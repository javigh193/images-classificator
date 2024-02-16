import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
    return ( 
      <Navbar bg="dark" data-bs-theme="dark" className='mb-4'>
        <Container>
          <Navbar.Brand href="#home">Image Classificator</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/list">Images Classified</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     );
}
 
export default Navigation;