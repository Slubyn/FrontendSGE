import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';

const OpcionesJuegosCRUD = () => {
  const [opciones, setOpciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOpcion, setSelectedOpcion] = useState(null);
  const [formData, setFormData] = useState({ id_pregunta: '', id_emocion: '', opcion_texto: '', es_correcto: false });

  const API_URL = 'http://localhost:8080/api/opciones';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos desde la API:", data); // 🔍 Verifica qué estructura tiene la API
        setOpciones(data);
      })
      .catch((error) => console.error('Error al obtener opciones:', error));
  }, []);
  

  const handleShowModal = (opcion = null) => {
    setSelectedOpcion(opcion);
    setFormData(opcion ? { 
      id_pregunta: opcion.id_pregunta, 
      id_emocion: opcion.id_emocion || '', 
      opcion_texto: opcion.opcion_texto, 
      es_correcto: opcion.es_correcto 
    } : { id_pregunta: '', id_emocion: '', opcion_texto: '', es_correcto: false });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOpcion(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: selectedOpcion ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const url = selectedOpcion ? `${API_URL}/${selectedOpcion.id_opcion}` : `${API_URL}/pregunta/${formData.id_pregunta}`;

    try {
      const res = await fetch(url, requestOptions);
      if (!res.ok) throw new Error('Error al guardar la opción');
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error al guardar la opción:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta opción?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar opción');
      setOpciones(opciones.filter((opcion) => opcion.id_opcion !== id));
    } catch (error) {
      console.error('Error al eliminar opción:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Gestión de Opciones de Juegos</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>Agregar Opción</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Pregunta</th>
            <th>ID Emoción</th>
            <th>Texto</th>
            <th>Correcto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {opciones.map((opcion, index) => (
            <tr key={opcion.id_opcion || `opcion-${index}`}>
              <td>{opcion.id_opcion}</td>
              <td>{opcion.id_pregunta}</td>
              <td>{opcion.id_emocion}</td>
              <td>{opcion.opcion_texto}</td>
              <td>{opcion.es_correcto ? 'Sí' : 'No'}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(opcion)}>Editar</Button>
                {' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(opcion.id_opcion)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedOpcion ? 'Editar Opción' : 'Agregar Opción'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID de la Pregunta</Form.Label>
              <Form.Control type="number" name="id_pregunta" value={formData.id_pregunta} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID de la Emoción (Opcional)</Form.Label>
              <Form.Control type="number" name="id_emocion" value={formData.id_emocion} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Texto de la Opción</Form.Label>
              <Form.Control type="text" name="opcion_texto" value={formData.opcion_texto} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="¿Es la opción correcta?" name="es_correcto" checked={formData.es_correcto} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OpcionesJuegosCRUD;
