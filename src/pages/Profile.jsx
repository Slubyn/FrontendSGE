// Filename: Profile.jsx
import { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({ nombre_usuario: '', email: '' });
  const [userId, setUserId] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // 1) Al montar, verifica si hay un usuario en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.id_usuario) {
        navigate('/');
        return;
      }
      setUserId(parsedUser.id_usuario);

      // 2) GET a obtenerPerfil.php
      fetchUserData(parsedUser.id_usuario);
    } catch (error) {
      console.error('Error parseando user:', error);
      navigate('/');
    }
  }, [navigate]);

  const fetchUserData = async (uId) => {
    try {
      const response = await fetch(
        `http://localhost/BackendSGE/BackendPhp/.php?id_usuario=${uId}`
      );
      if (!response.ok) throw new Error('Error al obtener datos del usuario');
      const data = await response.json();
      // data debe tener { nombre_usuario, email, ... }
      setUserData({
        nombre_usuario: data.nombre_usuario || '',
        email: data.email || ''
      });
    } catch (error) {
      console.error(error);
      setError('Error al cargar datos del usuario.');
    }
  };

  // 3) POST a actualizarPerfil.php
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!userId) {
      setError('Error: No se encontró el ID de usuario en localStorage.');
      return;
    }

    // Armamos el body con los campos que tu API requiere
    const bodyData = {
      id_usuario: userId,
      nombre_usuario: userData.nombre_usuario,
      email: userData.email // si la BD no permite null en email, envíalo siempre
    };
    if (currentPassword) bodyData.contrasenaActual = currentPassword;
    if (newPassword) bodyData.nuevaContrasena = newPassword;

    try {
      const response = await fetch('http://localhost/BackendSGE/BackendPhp/actualizarPerfil.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      const data = await response.json();

      if (data.success) {
        setSuccess('Perfil actualizado con éxito');
        setError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        // Actualizar localStorage para que el Header muestre el nuevo nombre
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...storedUser,
            nombre_usuario: userData.nombre_usuario
            // email: userData.email (si también lo permites cambiar)
          })
        );
      } else {
        setError(data.error || 'Error al actualizar el perfil.');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // Si ocurre un error de conexión o parseo de JSON
      setError('Error de conexión con el servidor.');
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
            onChange={(e) =>
              setUserData({ ...userData, nombre_usuario: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña Actual</Form.Label>
          <Form.Control
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Obligatorio si vas a cambiar tu nombre o contraseña"
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

        <Button variant="primary" type="submit">
          Actualizar Perfil
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;
