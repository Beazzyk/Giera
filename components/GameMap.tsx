import React from 'react';

interface GameMapProps {
  imageSrc: string;     // Ścieżka do obrazu
  offsetX: number;      // Przesunięcie mapy w poziomie
  offsetY: number;      // Przesunięcie mapy w pionie
  tileSize: number;     // Rozmiar kafelka w pikselach
  playerPosition: { x: number; y: number }; // Pozycja gracza
  npcPositions: { x: number; y: number }[]; // Pozycje NPC
}

const GameMap: React.FC<GameMapProps> = ({ imageSrc, offsetX, offsetY, tileSize, playerPosition, npcPositions }) => {
  return (
    <div
      style={{
        position: 'relative',
        left: offsetX * tileSize,
        top: offsetY * tileSize,
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Renderowanie gracza */}
      <div
        style={{
          position: 'absolute',
          top: playerPosition.y * tileSize,
          left: playerPosition.x * tileSize,
          width: tileSize,
          height: tileSize,
          backgroundColor: 'blue', // Gracz jako niebieski kwadrat
        }}
      ></div>

      {/* Renderowanie NPC */}
      {npcPositions.map((npc, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: npc.y * tileSize,
            left: npc.x * tileSize,
            width: tileSize,
            height: tileSize,
            backgroundColor: 'red', // NPC jako czerwony kwadrat
          }}
        ></div>
      ))}
    </div>
  );
};

export default GameMap;
