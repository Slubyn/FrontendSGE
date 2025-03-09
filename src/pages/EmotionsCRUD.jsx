import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Image } from 'react-bootstrap';

const EmotionsCRUD = () => {
  const [emotions, setEmotions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [formData, setFormData] = useState({ nombre_emocion: '', imagen_url: '' });

  const API_URL = 'http://localhost:8080/api/emociones'; 

  // 🔹 Obtener emociones desde la API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setEmotions(data))
      .catch((error) => console.error('Error al obtener emociones:', error));
  }, []);

  // 🔹 Mostrar modal para crear/editar emoción
  const handleShowModal = (emotion = null) => {
    setSelectedEmotion(emotion);
    setFormData(emotion ? { nombre_emocion: emotion.nombre_emocion, imagen_url: emotion.imagen_url } : { nombre_emocion: '', imagen_url: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmotion(null);
  };

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Guardar emoción (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: selectedEmotion ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const url = selectedEmotion ? `${API_URL}/${selectedEmotion.id_emocion}` : API_URL;

    try {
      const res = await fetch(url, requestOptions);
      if (!res.ok) throw new Error('Error al guardar emoción');
      handleCloseModal();
      window.location.reload(); // Recargar para actualizar lista
    } catch (error) {
      console.error('Error al guardar emoción:', error);
    }
  };

  // 🔹 Eliminar emoción
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta emoción?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar emoción');
      setEmotions(emotions.filter((emotion) => emotion.id_emocion !== id));
    } catch (error) {
      console.error('Error al eliminar emoción:', error);
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
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {emotions.map((emotion, index) => (
            <tr key={emotion.id_emocion || `emotion-${index}`}>
              <td>{emotion.id_emocion}</td>
              <td>{emotion.nombre_emocion}</td>
              <td>
                <Image src={emotion.imagen_url} alt={emotion.nombre_emocion} width="50" height="50" rounded />
              </td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(emotion)}>Editar</Button>
                {' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(emotion.id_emocion)}>Eliminar</Button>
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
                name="nombre_emocion"
                value={formData.nombre_emocion}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen_url"
                value={formData.imagen_url}
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

export default EmotionsCRUD;
