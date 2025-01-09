import React, { useState, useEffect } from 'react';

interface PlayerProps {
  position: { x: number; y: number };
  direction: number; // 0 - dół, 1 - lewo, 2 - prawo, 3 - góra
}

const Player: React.FC<PlayerProps> = ({ position, direction }) => {
  const [frame, setFrame] = useState(0); // Numer klatki animacji
  const [characterPosition, setCharacterPosition] = useState(position); // Pozycja postaci
  const [characterDirection, setCharacterDirection] = useState(direction); // Kierunek postaci

  // Zmiana klatki co 200 ms
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % 4); // 4 klatki na każdy kierunek
    }, 200); // 200ms - czas pomiędzy klatkami

    return () => clearInterval(interval); // Sprzątanie po interwale
  }, []);

  useEffect(() => {
    // Ustawianie pozycji i kierunku, gdy props się zmieniają
    setCharacterPosition(position);
    setCharacterDirection(direction);
  }, [position, direction]);

  // Zależność między numerem klatki a numerem wiersza w GIF (w zależności od kierunku)
  const backgroundPositionY = characterDirection * 64; // 64px - wysokość jednej klatki w sprite sheet
  const backgroundPositionX = frame * 64; // 64px - szerokość jednej klatki w sprite sheet

  return (
    <div
      className="player"
      style={{
        position: 'absolute',
        left: `${characterPosition.x * 50}px`, // 50px to przykładowa szerokość komórki
        top: `${characterPosition.y * 50}px`,  // 50px to przykładowa wysokość komórki
        width: '64px',               // Szerokość jednej klatki
        height: '64px',              // Wysokość jednej klatki
        backgroundImage: "url('/images/character_walk.gif')", // Ścieżka do sprite sheet (jeden wariant animacji)
        backgroundPosition: `-${backgroundPositionX}px -${backgroundPositionY}px`, // Pozycja klatki w sprite sheet
        backgroundRepeat: 'no-repeat',
        transform: `rotate(${characterDirection * 90}deg)`, // Obrót w zależności od kierunku (0 - dół, 1 - lewo, 2 - prawo, 3 - góra)
      }}
    />
  );
};

export default Player;
