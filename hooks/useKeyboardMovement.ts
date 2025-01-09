import { useState, useRef, useEffect } from 'react';

interface UseKeyboardMovementProps {
  initialPosition: { x: number; y: number };
  mapWidth: number;
  mapHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  sendMovementData: (position: { x: number; y: number }, direction: number) => void;
}

const useKeyboardMovement = ({
  initialPosition,
  mapWidth,
  mapHeight,
  viewportWidth,
  viewportHeight,
  sendMovementData,
}: UseKeyboardMovementProps) => {
  const [characterPosition, setCharacterPosition] = useState(initialPosition);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const heldKeys = useRef<{ [key: string]: boolean }>({});
  const step = 20; // Szybkość ruchu

  const handleMovement = () => {
    setCharacterPosition((prevPosition) => {
      let newX = prevPosition.x;
      let newY = prevPosition.y;

      if (heldKeys.current['ArrowUp'] || heldKeys.current['w']) newY -= step;
      if (heldKeys.current['ArrowDown'] || heldKeys.current['s']) newY += step;
      if (heldKeys.current['ArrowLeft'] || heldKeys.current['a']) newX -= step;
      if (heldKeys.current['ArrowRight'] || heldKeys.current['d']) newX += step;

      // Ograniczenia dla pozycji postaci (nie może wyjść poza mapę)
      newX = Math.max(0, Math.min(newX, mapWidth));
      newY = Math.max(0, Math.min(newY, mapHeight));

      // Aktualizacja przesunięcia mapy
      setMapOffset((prevOffset) => {
        const offsetX = Math.max(
          0,
          Math.min(mapWidth - viewportWidth, newX - viewportWidth / 2)
        );
        const offsetY = Math.max(
          0,
          Math.min(mapHeight - viewportHeight, newY - viewportHeight / 2)
        );

        return { x: offsetX, y: offsetY };
      });

      // Wysyłanie danych o ruchu
      sendMovementData({ x: newX, y: newY }, 0);
      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      heldKeys.current[event.key] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      heldKeys.current[event.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const interval = setInterval(handleMovement, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(interval);
    };
  }, []);

  return { characterPosition, mapOffset };
};

export default useKeyboardMovement;
