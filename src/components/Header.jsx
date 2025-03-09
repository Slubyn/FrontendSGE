import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [username, setUsername] = useState('Usuario');
  const navigate = useNavigate();

  useEffect(() => {
    // aqui se cargará el nombre de usuario desde el backend o cookies
    const storedUser = localStorage.getItem('username') || 'Usuario';
    setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión (borrar cookies, etc.)
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/dashboard">Kimochi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Inicio</Nav.Link>
            <Nav.Link href="/emotions">Emociones</Nav.Link>
            <Nav.Link href="/preguntas">Preguntas</Nav.Link>
            <Nav.Link href="/recompensas">Recompensas</Nav.Link>
            <Nav.Link href="/usuarios">Usuarios</Nav.Link>
            <Nav.Link href="/empatia">Empatía</Nav.Link>
            <Nav.Link href="/diary">Diario</Nav.Link>
            <Nav.Link href="/rewards">Recompensas</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={username} id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">Editar Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

//PRIMER HEADER

/* src/components/Header.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">SGE App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/profile">Perfil</Nav.Link>
            <Nav.Link href="/logout">Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;*/