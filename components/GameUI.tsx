import React from 'react';

interface GameUIProps {
  health: number;
  maxHealth: number;
}

const GameUI: React.FC<GameUIProps> = ({ health, maxHealth }) => {
  return (
    <div className="game-ui">
      <div className="health-bar">
        <span>Health: {health}/{maxHealth}</span>
        <div style={{ width: `${(health / maxHealth) * 100}%`, backgroundColor: 'green' }} />
      </div>
    </div>
  );
};

export default GameUI;
