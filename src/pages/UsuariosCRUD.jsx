//CRUD de Usuarios

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';

const UsuariosCRUD = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [formData, setFormData] = useState({ nombre_usuario: '', email: '', contraseña: '', rol: 'usuario' });

  const API_URL = 'http://localhost:8080/api/usuarios';

  // 🔹 Obtener todos los usuarios desde la API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  // 🔹 Mostrar modal para crear/editar usuario
  const handleShowModal = (usuario = null) => {
    setSelectedUsuario(usuario);
    setFormData(usuario ? { 
      nombre_usuario: usuario.nombre_usuario, 
      email: usuario.email, 
      contraseña: '', 
      rol: usuario.rol 
    } : { nombre_usuario: '', email: '', contraseña: '', rol: 'usuario' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUsuario(null);
  };

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Guardar usuario (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: selectedUsuario ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const url = selectedUsuario ? `${API_URL}/${selectedUsuario.id_usuario}` : API_URL;

    try {
      const res = await fetch(url, requestOptions);
      if (!res.ok) throw new Error('Error al guardar usuario');
      handleCloseModal();
      window.location.reload(); // Recargar para actualizar la lista
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  // 🔹 Eliminar usuario
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar usuario');
      setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Gestión de Usuarios</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>Agregar Usuario</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario.id_usuario || `usuario-${index}`}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nombre_usuario}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(usuario)}>Editar</Button>
                {' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(usuario.id_usuario)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar/editar usuario */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUsuario ? 'Editar Usuario' : 'Agregar Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="nombre_usuario"
                value={formData.nombre_usuario}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                placeholder={selectedUsuario ? "Dejar en blanco para mantener la actual" : ""}
                required={!selectedUsuario}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="rol" value={formData.rol} onChange={handleChange} required>
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UsuariosCRUD;
