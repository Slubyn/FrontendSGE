import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Bienvenido a EmoKids</h2>
      <Row className="g-4">

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Gestión de Emociones</Card.Title>
              <Card.Text>Identifica y administra tus emociones de manera sencilla.</Card.Text>
              <Link to="/emotions" className="btn btn-primary">Ir a Emociones</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Juego de Empatía</Card.Title>
              <Card.Text>Aprende a responder a diferentes situaciones emocionales.</Card.Text>
              <Link to="/empatia" className="btn btn-primary">Jugar</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Diario Emocional</Card.Title>
              <Card.Text>Registra tus emociones y reflexiona sobre ellas.</Card.Text>
              <Link to="/diary" className="btn btn-primary">Ir al Diario</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Recompensas</Card.Title>
              <Card.Text>Gana insignias y recompensas por tu progreso.</Card.Text>
              <Link to="/rewards" className="btn btn-primary">Ver Recompensas</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
