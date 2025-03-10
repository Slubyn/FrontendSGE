import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GameboyLoader from './components/GameboyLoader';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmotionsCRUD from './pages/EmotionsCRUD'; // CRUD
import PreguntasJuegoCRUD from './pages/PreguntasJuegoCRUD'; // CRUD
import RecompensasCRUD from './pages/RecompensasCRUD'; // CRUD
import UsuariosCRUD from './pages/UsuariosCRUD'; // CRUD
import OpcionesJuegoCRUD from './pages/OpcionesJuegoCRUD'; // CRUD
import Empatia from './pages/Empatia';  // JUEGO
import Rewards from './pages/Rewards';
import AdviceAPI from './pages/AdviceAPI';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [loading, setLoading] = useState(!sessionStorage.getItem('hasLoaded'));

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasLoaded', 'true'); // Guarda que el loader ya se mostró
      }, 3000);
    }
  }, [loading]);

  return (
    <Router>
      {loading ? (
        <GameboyLoader /> // Muestra el loader mientras carga la app
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/emotions" element={<PrivateRoute><EmotionsCRUD /></PrivateRoute>} />
            <Route path="/preguntas" element={<PrivateRoute><PreguntasJuegoCRUD /></PrivateRoute>} />
            <Route path="/recompensas" element={<PrivateRoute><RecompensasCRUD /></PrivateRoute>} />
            <Route path="/usuarios" element={<PrivateRoute><UsuariosCRUD /></PrivateRoute>} />
            <Route path="/opciones" element={<PrivateRoute><OpcionesJuegoCRUD /></PrivateRoute>} />
            <Route path="/advice" element={<PrivateRoute><AdviceAPI /></PrivateRoute>} />
            <Route path="/empatia" element={<PrivateRoute><Empatia /></PrivateRoute>} />
            <Route path="/rewards" element={<PrivateRoute><Rewards /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;

/*function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Oculta el loader después de 3 segundos
    }, 3000);
  }, []);


function App() {
  const [loading, setLoading] = useState(!sessionStorage.getItem('hasLoaded'));

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasLoaded', 'true'); // Guarda que el loader ya se mostró
      }, 3000);
    }
  }, [loading]);

  return (
    <Router>
      {loading ? (
        <GameboyLoader /> // Muestra el loader solo la primera vez
      ) : (
        <>
          <
 */

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
