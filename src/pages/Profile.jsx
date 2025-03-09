import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({ nombre_usuario: '', email: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/');
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/api/usuarios/${userId}`);
        if (!response.ok) throw new Error('Error al obtener los datos del usuario');
        const data = await response.json();
        setUserData({ nombre_usuario: data.nombre_usuario, email: data.email });
      } catch (error) {
        console.error(error);
        setError('Error al cargar los datos del usuario.');
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_usuario: userData.nombre_usuario,
          contrasenaActual: currentPassword,
          nuevaContrasena: newPassword || undefined
        })
      });
      if (!response.ok) throw new Error('Error al actualizar el perfil');
      setSuccess('Perfil actualizado con éxito');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('Error al actualizar el perfil. Verifica tu contraseña actual.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Editar Perfil</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleUpdateProfile}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            value={userData.nombre_usuario}
            onChange={(e) => setUserData({ ...userData, nombre_usuario: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={userData.email} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña Actual</Form.Label>
          <Form.Control
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nueva Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirmar Nueva Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Actualizar Perfil</Button>
      </Form>
    </Container>
  );
};

export default Profile;