//CRUD de preguntas del juego

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';

const PreguntasJuegoCRUD = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPregunta, setSelectedPregunta] = useState(null);
  const [formData, setFormData] = useState({ pregunta: '', id_juego: '' });

  const API_URL = 'http://localhost:8080/api/preguntas';

  // 🔹 Obtener todas las preguntas desde la API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos de la API:", JSON.stringify(data, null, 2)); // 🔍 Muestra el JSON formateado
        setPreguntas(data);
      })
      .catch((error) => console.error("Error al obtener preguntas:", error));
  }, []);
  
  

  // 🔹 Mostrar modal para crear/editar pregunta
  const handleShowModal = (pregunta = null) => {
    setSelectedPregunta(pregunta);
    setFormData(pregunta ? { pregunta: pregunta.pregunta, id_juego: pregunta.id_juego } : { pregunta: '', id_juego: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPregunta(null);
  };

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Guardar pregunta (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: selectedPregunta ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const url = selectedPregunta ? `${API_URL}/${selectedPregunta.id_pregunta}` : `${API_URL}/juego/${formData.id_juego}`;

    try {
      const res = await fetch(url, requestOptions);
      if (!res.ok) throw new Error('Error al guardar la pregunta');
      handleCloseModal();
      window.location.reload(); // Recargar para actualizar la lista
    } catch (error) {
      console.error('Error al guardar pregunta:', error);
    }
  };

  // 🔹 Eliminar pregunta
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta pregunta?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar pregunta');
      setPreguntas(preguntas.filter((pregunta) => pregunta.id_pregunta !== id));
    } catch (error) {
      console.error('Error al eliminar pregunta:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Gestión de Preguntas de Juegos</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>Agregar Pregunta</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pregunta</th>
            <th>ID Juego</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {preguntas.map((pregunta, index) => (
            <tr key={pregunta.id_pregunta || `pregunta-${index}`}>
              <td>{pregunta.id_pregunta}</td>
              <td>{pregunta.pregunta}</td>
              <td>{pregunta.juego ? pregunta.juego.id_juego : 'Sin asignar'}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(pregunta)}>Editar</Button>
                {' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(pregunta.id_pregunta)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar/editar pregunta */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPregunta ? 'Editar Pregunta' : 'Agregar Pregunta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Texto de la Pregunta</Form.Label>
              <Form.Control
                type="text"
                name="pregunta"
                value={formData.pregunta}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID del Juego</Form.Label>
              <Form.Control
                type="number"
                name="id_juego"
                value={formData.id_juego}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PreguntasJuegoCRUD;
