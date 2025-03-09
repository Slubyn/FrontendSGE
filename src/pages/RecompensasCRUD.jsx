//CRUD Recompensas

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Card } from 'react-bootstrap';

const RecompensasCRUD = () => {
  const [recompensas, setRecompensas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecompensa, setSelectedRecompensa] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

  const API_URL = 'http://localhost:8080/api/recompensas';

  // 🔹 Obtener todas las recompensas desde la API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setRecompensas(data))
      .catch((error) => console.error('Error al obtener recompensas:', error));
  }, []);

  // 🔹 Mostrar modal para crear/editar recompensa
  const handleShowModal = (recompensa = null) => {
    setSelectedRecompensa(recompensa);
    setFormData(recompensa ? { nombre: recompensa.nombre, descripcion: recompensa.descripcion } : { nombre: '', descripcion: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecompensa(null);
  };

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Guardar recompensa (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: selectedRecompensa ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const url = selectedRecompensa ? `${API_URL}/${selectedRecompensa.id_recompensa}` : API_URL;

    try {
      const res = await fetch(url, requestOptions);
      if (!res.ok) throw new Error('Error al guardar recompensa');
      handleCloseModal();
      window.location.reload(); // Recargar para actualizar la lista
    } catch (error) {
      console.error('Error al guardar recompensa:', error);
    }
  };

  // 🔹 Eliminar recompensa
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta recompensa?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar recompensa');
      setRecompensas(recompensas.filter((recompensa) => recompensa.id_recompensa !== id));
    } catch (error) {
      console.error('Error al eliminar recompensa:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Gestión de Recompensas</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>Agregar Recompensa</Button>
      <div className="d-flex flex-wrap justify-content-center mt-3">
        {recompensas.map((recompensa, index) => (
          <Card key={recompensa.id_recompensa || `recompensa-${index}`} className="m-3" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{recompensa.nombre}</Card.Title>
              <Card.Text>{recompensa.descripcion}</Card.Text>
              <div className="d-flex justify-content-between">
                <Button variant="warning" size="sm" onClick={() => handleShowModal(recompensa)}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(recompensa.id_recompensa)}>Eliminar</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal para agregar/editar recompensa */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecompensa ? 'Editar Recompensa' : 'Agregar Recompensa'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Recompensa</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RecompensasCRUD;
