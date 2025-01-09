import React, { useState, useEffect } from 'react';

interface PlayerStats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
}

interface PlayerCharacterProps {
  playerId: number;
}

const PlayerCharacter: React.FC<PlayerCharacterProps> = ({ playerId }) => {
  const [stats, setStats] = useState<PlayerStats | null>(null);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch(`/api/characters/${playerId}`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    };

    fetchPlayerStats();
  }, [playerId]);

  if (!stats) return <div>Loading player stats...</div>;

  return (
    <div className="player-stats">
      <h2>Player Stats</h2>
      <ul>
        <li>Health: {stats.health}</li>
        <li>Attack: {stats.attack}</li>
        <li>Defense: {stats.defense}</li>
        <li>Speed: {stats.speed}</li>
      </ul>
    </div>
  );
};

export default PlayerCharacter;
