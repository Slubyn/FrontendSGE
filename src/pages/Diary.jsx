import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ emocion: '', descripcion: '' });

  const API_URL = 'http://localhost:8080/api/diario';

  // 🔹 Obtener registros del Diario desde la API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos desde la API:", data);  // 🔍 Verifica qué estructura tiene la API
        setEntries(data);
      })
      .catch((error) => console.error('Error al obtener el diario emocional:', error));
  }, []);

  // 🔹 Mostrar modal para agregar nueva entrada
  const handleShowModal = () => {
    setFormData({ emocion: '', descripcion: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Guardar nueva entrada en el Diario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    try {
      const res = await fetch(`${API_URL}/crear/1`, requestOptions); // Cambia "1" por el ID de usuario dinámico
      if (!res.ok) throw new Error('Error al guardar entrada en el diario');
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error al guardar la entrada:', error);
    }
  };

  // 🔹 Eliminar una entrada
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta entrada?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar la entrada');
      setEntries(entries.filter((entry) => entry.id_diario !== id));
    } catch (error) {
      console.error('Error al eliminar la entrada:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Mi Diario Emocional</h2>
      <p className="text-center">Registra cómo te sientes cada día y haz un seguimiento de tus emociones.</p>
      <Button variant="primary" onClick={handleShowModal}>Añadir Entrada</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Emoción</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.id_registro || `entry-${index}`}>
              <td>{new Date(entry.fecha_registro).toLocaleDateString()}</td>
              <td>{typeof entry.emocion === 'object' ? entry.emocion.nombre_emocion : entry.emocion}</td>
              <td>{entry.nota}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(entry.id_registro)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar nueva entrada */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Entrada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Emoción</Form.Label>
              <Form.Control
                type="text"
                name="emocion"
                value={formData.emocion}
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

export default Diary;
