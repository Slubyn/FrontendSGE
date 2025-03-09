import React from 'react';
import '../styles.css';
import gameboyImage from '../assets/gameboyInicio.jpg'; // Ruta de la imagen de la Gameboy
import bearImage from '../assets/ositoInicio.png'; // Imagen del osito para la pantalla

const GameboyLoader = () => {
    return (
      <div className="gameboy-loader">
        <div className="gameboy-container" style={{ width: '900px', maxWidth: '95%' }}>
          <img src={gameboyImage} alt="Gameboy" className="gameboy-image" style={{ width: '100%', height: 'auto' }} />
          <div className="gameboy-screen">
            <img src={bearImage} alt="Osito animado" className="bear-image" style={{ width: '60%', height: 'auto', background: 'none' }} />
          </div>
        </div>
      </div>
    );
  };
  
  export default GameboyLoader;
