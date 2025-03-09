import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Button, Image } from 'react-bootstrap';
import { FaMedal } from 'react-icons/fa';

const Rewards = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/recompensas')
      .then((res) => res.json())
      .then((data) => setRewards(data))
      .catch((error) => console.error('Error al obtener recompensas:', error));
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 fw-bold">Recompensas y Logros</h2>

      <div className="d-flex flex-wrap justify-content-center">
        {rewards.map((reward) => (
          <Card 
            key={reward.id_recompensa} 
            className="m-3 shadow-lg" 
            style={{ width: '20rem', borderRadius: '1rem' }}
          >
            <Card.Body className="text-center">
              <div className="mb-3">
                {reward.imagen_url ? (
                  <Image src={reward.imagen_url} alt={reward.nombre} fluid roundedCircle width={80} height={80} />
                ) : (
                  <FaMedal size={48} className="text-warning" />
                )}
              </div>
              <Card.Title className="fw-bold">{reward.nombre}</Card.Title>
              <Card.Text className="mt-2">{reward.descripcion}</Card.Text>
              <Badge bg="info" className="mt-3">
                {reward.tipo}
              </Badge>
              <p className="text-muted mt-2">Obtenido el: {reward.fecha}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Rewards;
