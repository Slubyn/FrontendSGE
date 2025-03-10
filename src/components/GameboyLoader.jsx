//esta clase es solo para la animación inicial
import React from 'react';
import '../styles.css';
import gameboyImage from '../assets/gameboyInicio.jpg'; 
import bearImage from '../assets/ositoInicio.png';

const GameboyLoader = () => {
    return (
      <div className="gameboy-loader">
        <div className="gameboy-container" style={{ width: '900px', maxWidth: '95%' }}>
          <img src={gameboyImage} alt="Gameboy" className="gameboy-image" style={{ width: '100%', height: 'auto' }} />
          <div className="gameboy-screen">
            <img src={bearImage} alt="Osito" className="bear-image" style={{ width: '60%', height: 'auto', background: 'none' }} />
          </div>
        </div>
      </div>
    );
  };
  
  export default GameboyLoader;
