import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const API_URL = 'http://localhost:8080/api/preguntas';
const RESPUESTA_API_URL = 'http://localhost:8080/api/respuestas';

const EmpathyGame = () => {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');

  // 🔹 Obtener una pregunta aleatoria de la API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const randomQuestion = data[Math.floor(Math.random() * data.length)];
          setQuestion(randomQuestion);
        }
      })
      .catch((error) => console.error('Error al obtener pregunta:', error));
  }, []);

  // 🔹 Manejar selección de opción
  const handleOptionClick = async (option) => {
    if (!question) return;
    setSelectedOption(option);

    // 🔹 Guardar la respuesta del usuario en la API
    const respuesta = {
      id_usuario: 1, // TODO: Reemplazar con el ID real del usuario autenticado
      id_pregunta: question.id_pregunta,
      opcion_elegida: option,
    };

    try {
      await fetch(RESPUESTA_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(respuesta),
      });
    } catch (error) {
      console.error('Error al registrar respuesta:', error);
    }

    // 🔹 Retroalimentación basada en la respuesta
    setFeedback(option.includes('ayuda') ? 
      '¡Buena elección! Mostrar empatía puede ayudar a otros.' : 
      'Piensa en cómo te sentirías si estuvieras en su lugar.');
  };

  return (
    <Container className="mt-5 text-center">
      <h2>Juego de Empatía</h2>
      {question ? (
        <Card className="mt-4 p-3">
          <Card.Body>
            <Card.Title>{question.pregunta}</Card.Title>
            <div className="mt-3">
              {[question.opcion_1, question.opcion_2, question.opcion_3].map((option, index) => (
                <Button
                  key={index}
                  variant={selectedOption === option ? 'success' : 'primary'}
                  className="m-2"
                  onClick={() => handleOptionClick(option)}
                  disabled={!!selectedOption}
                >
                  {option}
                </Button>
              ))}
            </div>
            {feedback && <p className="mt-3"><strong>{feedback}</strong></p>}
          </Card.Body>
        </Card>
      ) : (
        <p>Cargando pregunta...</p>
      )}
    </Container>
  );
};

export default EmpathyGame;
