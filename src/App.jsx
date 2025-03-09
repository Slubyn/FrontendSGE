import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmotionsCRUD from './pages/EmotionsCRUD'; //CRUD
import PreguntasJuegoCRUD from './pages/PreguntasJuegoCRUD'; //CRUD
import RecompensasCRUD from './pages/RecompensasCRUD'; //CRUD
import UsuariosCRUD from './pages/UsuariosCRUD'; //CRUD
import Empatia from './pages/Empatia';  //JUEGO
import Diary from './pages/Diary';  
import Rewards from './pages/Rewards';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/emotions" element={<EmotionsCRUD />} />
      <Route path="/preguntas" element={<PreguntasJuegoCRUD />} />
      <Route path="/recompensas" element={<RecompensasCRUD />} />
      <Route path="/usuarios" element={<UsuariosCRUD />} />
      <Route path="/empatia" element={<Empatia />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="/rewards" element={<Rewards />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


/*    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/emotions" element={<PrivateRoute><Emotions /></PrivateRoute>} />
      <Route path="/empatia" element={<PrivateRoute><Empatia /></PrivateRoute>} />
      <Route path="/diary" element={<PrivateRoute><Diary /></PrivateRoute>} />
      <Route path="/rewards" element={<PrivateRoute><Rewards /></PrivateRoute>} />*/
      
//primer login y heather 

/*import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<h2>Dashboard</h2>} />
        <Route path="/profile" element={<h2>Perfil</h2>} />
        <Route path="/logout" element={<h2>Salir</h2>} />
      </Routes>
    </Router>    
    );
  }
      
    
    export default App*/
