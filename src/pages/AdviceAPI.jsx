//api externa que da consejos aleatorios a los niños

import React, { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';

const AdviceAPI = () => {
  const [advice, setAdvice] = useState('');

  //llamada a la API
  const fetchAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      console.error('Error al obtener consejo:', error);
    }
  };

  //contenedor para obtener consejo
  return (
    <Container className="text-center mt-4">
      <Card className="p-4 shadow-lg">
        <Card.Title>Consejo del Día</Card.Title>
        <Card.Body>
          <p>{advice || 'Haz clic en el botón para obtener un consejo.'}</p>
          <Button variant="primary" onClick={fetchAdvice}>
            Obtener Consejo
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdviceAPI;



