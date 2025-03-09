import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card } from 'react-bootstrap';

const Rewards = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    // Simulación de carga de recompensas desde la API
    setRewards([
      { id: 1, nombre: 'Explorador Emocional', descripcion: 'Has registrado 5 emociones en tu diario.', fecha: '2025-02-24' },
      { id: 2, nombre: 'Empático', descripcion: 'Has respondido correctamente en 3 juegos de empatía.', fecha: '2025-02-20' }
    ]);
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Recompensas y Logros</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {rewards.map((reward) => (
          <Card key={reward.id} className="m-3" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{reward.nombre}</Card.Title>
              <Card.Text>{reward.descripcion}</Card.Text>
              <small className="text-muted">Obtenido el: {reward.fecha}</small>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Rewards;
