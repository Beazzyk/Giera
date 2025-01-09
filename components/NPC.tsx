import React from 'react';

interface NPCProps {
  position: { x: number; y: number };
}

const NPC: React.FC<NPCProps> = ({ position }) => {
  return (
    <div
      className="npc"
      style={{
        left: `${position.x * 50}px`, // 50px to przykładowa szerokość komórki
        top: `${position.y * 50}px`,  // 50px to przykładowa wysokość komórki
      }}
    >
      NPC
    </div>
  );
};

export default NPC;
