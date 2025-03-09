//CRUD EMOCIONES

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';

const Emotions = () => {
  const [emotions, setEmotions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', categoria: '' });

  useEffect(() => {
    // Aquí se cargará la lista de emociones desde la API cuando esté lista
    setEmotions([
      { id: 1, nombre: 'Felicidad', categoria: 'Positiva' },
      { id: 2, nombre: 'Tristeza', categoria: 'Negativa' }
    ]);
  }, []);

  const handleShowModal = (emotion = null) => {
    setSelectedEmotion(emotion);
    setFormData(emotion ? { nombre: emotion.nombre, categoria: emotion.categoria } : { nombre: '', categoria: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmotion(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEmotion) {
      // Editar emoción existente
      console.log('Editar emoción:', formData);
    } else {
      // Crear nueva emoción
      console.log('Nueva emoción:', formData);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta emoción?')) {
      console.log('Eliminar emoción con ID:', id);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Gestión de Emociones</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>Agregar Emoción</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {emotions.map((emotion) => (
            <tr key={emotion.id}>
              <td>{emotion.id}</td>
              <td>{emotion.nombre}</td>
              <td>{emotion.categoria}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(emotion)}>Editar</Button>
                {' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(emotion.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal para agregar/editar emoción */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEmotion ? 'Editar Emoción' : 'Agregar Emoción'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la emoción</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="categoria" value={formData.categoria} onChange={handleChange} required>
                <option value="">Seleccione una categoría</option>
                <option value="Positiva">Positiva</option>
                <option value="Negativa">Negativa</option>
                <option value="Neutral">Neutral</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Emotions;
