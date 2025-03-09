import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre de usuario"
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
    </Container>
  );
};

export default Login;










