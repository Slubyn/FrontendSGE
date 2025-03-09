import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-auto">
      <Container>
        <p>&copy; {new Date().getFullYear()} Kimochi app. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
};

export default Footer;