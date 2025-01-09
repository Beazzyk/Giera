import React, { useState, useEffect } from 'react';

interface CharacterOutfitProps {
  outfitGifUrl: string; // URL do GIF-a postaci
  position: { x: number; y: number }; // Pozycja postaci na mapie
  size: number; // Rozmiar postaci
}

const CharacterOutfit: React.FC<CharacterOutfitProps> = ({ outfitGifUrl, position, size }) => {
  const [gifUrl, setGifUrl] = useState(outfitGifUrl);

  useEffect(() => {
    // W tym miejscu można dodać logikę zmieniającą outfit, np. na podstawie ekwipunku
    // lub innych danych postaci, jeśli wymagane
    setGifUrl(outfitGifUrl);
  }, [outfitGifUrl]);

  return (
    <img
      src={gifUrl}
      alt="Character Outfit"
      style={{
        position: 'absolute',
        top: position.y * size, // Dostosowanie pozycji w pionie
        left: position.x * size, // Dostosowanie pozycji w poziomie
        width: `${size}px`, // Szerokość postaci
        height: `${size}px`, // Wysokość postaci
        objectFit: 'contain', // Zachowanie proporcji
        transition: 'top 0.1s, left 0.1s', // Animacja przejścia
      }}
    />
  );
};

export default CharacterOutfit;
