import React from 'react';
import useKeyboardMovement from './hooks/useKeyboardMovement';
import Chat from './components/Chat';
import './App.css';


const App = () => {
  const mapWidth = 2048; // Szerokość mapy
  const mapHeight = 3072; // Wysokość mapy
  const viewportWidth = window.innerWidth; // Szerokość widoku
  const viewportHeight = window.innerHeight; // Wysokość widoku

  const initialPosition = { x: viewportWidth / 2, y: viewportHeight / 2 };
  const characterGifUrl = '/path/to/character.gif';
  const mapId = 1;
  const characterId = 1;
  const characterName = 'Player1';
  const mapName = 'Ithan';

  const { characterPosition, mapOffset } = useKeyboardMovement({
    initialPosition,
    mapWidth,
    mapHeight,
    viewportWidth,
    viewportHeight,
    sendMovementData: (position, direction) => {
      console.log('Ruch postaci:', position, 'Kierunek:', direction);
    },
  });

  return (
    <div className="app-container">
      {/* Mapa */}
      <div className="game-map-container">
        <div
          className="game-map"
          style={{
            transform: `translate(-${mapOffset.x}px, -${mapOffset.y}px)`,
            width: `${mapWidth}px`,
            height: `${mapHeight}px`,
            position: 'absolute',
          }}
        >
{/* Postać */}
<img
  src="/images/character.gif" // Ścieżka do grafiki w folderze public
  alt="Postać"
  className="player"
  style={{
    position: 'absolute',
    top: `${characterPosition.y}px`,
    left: `${characterPosition.x}px`,
    transform: `rotate(${characterPosition}deg)` // Adjust based on the direction
  }}
/>


          
        </div>
      </div>

      {/* Czat */}
      <Chat
        mapId={mapId}
        characterId={characterId}
        characterName={characterName}
        mapName={mapName}
      />
    </div>
  );
};

export default App;
