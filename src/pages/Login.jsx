import { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css';
import mascotImage from '../assets/mascota.jpg'; // Agregar la imagen de la mascota en assets

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    try {
      const res = await fetch('http://localhost/BackendSGE/BackendPhp/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, contraseña: password }), // PHP espera 'email' en lugar de 'username'
      });
  
      const data = await res.json();
  
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.usuario)); // Guardar usuario en localStorage
        navigate('/dashboard'); // Redirigir a Dashboard
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center ">
      <Card className="p-4 shadow-lg login-card text-center">
        <Card.Img variant="top" src={mascotImage} className="mascota-img mx-auto" style={{ width: '120px', height: '120px' }} />
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Iniciar Sesión
            </Button>

            <p className="text-center">
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
