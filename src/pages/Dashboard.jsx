import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGamepad, FaAward, FaLightbulb } from 'react-icons/fa';

const Dashboard = () => {
 // 3 contenedores para recibir consejos, el juego y las recompensas
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-5 fw-bold text-purple-custom">Bienvenido a Kimochi</h2>
      <Row className="g-4 justify-content-center">
        <Col md={4}>
          <Card className="text-center shadow-lg border-0 p-4">
            <Card.Body>
              <FaGamepad size={50} className="text-purple-custom mb-3" />
              <Card.Title className="fw-bold">Juego de Empatía</Card.Title>
              <Card.Text>Responde a diferentes situaciones emocionales.</Card.Text>
              <Link to="/empatia" className="btn btn-purple-custom text-white">Jugar</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-lg border-0 p-4">
            <Card.Body>
              <FaAward size={50} className="text-purple-custom mb-3" />
              <Card.Title className="fw-bold">Recompensas</Card.Title>
              <Card.Text>Gana insignias y recompensas por tu progreso.</Card.Text>
              <Link to="/rewards" className="btn btn-purple-custom text-white">Ver Recompensas</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-lg border-0 p-4">
            <Card.Body>
              <FaLightbulb size={50} className="text-purple-custom mb-3" />
              <Card.Title className="fw-bold">Consejos Motivacionales</Card.Title>
              <Card.Text>Obtén un consejo para tu día.</Card.Text>
              <Link to="/advice" className="btn btn-purple-custom text-white">Ver Consejos</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
