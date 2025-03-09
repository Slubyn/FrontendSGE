import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUserCircle, FaListAlt } from 'react-icons/fa';
import '../styles.css'; // Asegurar que los estilos personalizados están cargados

const Header = () => {
  const [username, setUsername] = useState('Usuario');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('username') || 'Usuario';
    setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow-lg rounded header-custom">
      <Container>
        <Navbar.Brand href="/dashboard" className="fw-bold text-white">Kimochi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard" className="text-white fw-semibold">Inicio</Nav.Link>
            <Nav.Link href="/empatia" className="text-white fw-semibold">Empatía</Nav.Link>
            <Nav.Link href="/diary" className="text-white fw-semibold">Diario</Nav.Link>
            <Nav.Link href="/rewards" className="text-white fw-semibold">Recompensas</Nav.Link>
            
            <NavDropdown title={<><FaListAlt className="me-2" />CRUDs</>} id="crud-nav-dropdown" className="text-white">
              <NavDropdown.Item href="/emotions">Gestión de Emociones</NavDropdown.Item>
              <NavDropdown.Item href="/preguntas">Gestión de Preguntas</NavDropdown.Item>
              <NavDropdown.Item href="/recompensas">Gestión de Recompensas</NavDropdown.Item>
              <NavDropdown.Item href="/usuarios">Gestión de Usuarios</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title={<><FaUserCircle className="me-2" />{username}</>} id="basic-nav-dropdown" className="text-white">
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