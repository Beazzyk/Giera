import React, { useEffect, useState } from 'react';

interface MapData {
  id: number;
  name: string;
  imageUrl: string; // Przykładowy URL do tła mapy
}

interface PlayerPosition {
  x: number;
  y: number;
}

interface MapRendererProps {
  mapId: number;
  playerPosition: PlayerPosition;
}

const MapRenderer: React.FC<MapRendererProps> = ({ mapId, playerPosition }) => {
  const [mapData, setMapData] = useState<MapData | null>(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(`/api/maps/${mapId}`);
        const data = await response.json();
        setMapData(data);
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };

    fetchMapData();
  }, [mapId]);

  if (!mapData) return <div>Loading map...</div>;

  return (
    <div
      style={{
        backgroundImage: `url(${mapData.imageUrl})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: `${playerPosition.y}px`,
          left: `${playerPosition.x}px`,
          width: '50px',
          height: '50px',
          backgroundColor: 'red', // Reprezentacja gracza na mapie
        }}
      />
    </div>
  );
};

export default MapRenderer;
