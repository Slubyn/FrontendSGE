import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer-custom text-white text-center py-3 mt-auto">
      <Container>
        <p className="mb-0">&copy; {new Date().getFullYear()} Kimochi App. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
};

export default Footer;