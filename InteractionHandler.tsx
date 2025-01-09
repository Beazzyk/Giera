<<<<<<< HEAD
import React, { useState } from 'react';

interface InteractionHandlerProps {
  onNpcInteraction: () => void;
  onItemPickup: () => void;
}

const InteractionHandler: React.FC<InteractionHandlerProps> = ({ onNpcInteraction, onItemPickup }) => {
  const [isNpcNearby, setIsNpcNearby] = useState(false);
  const [isItemNearby, setIsItemNearby] = useState(false);

  const handleNpcClick = () => {
    if (isNpcNearby) onNpcInteraction();
  };

  const handleItemClick = () => {
    if (isItemNearby) onItemPickup();
  };

  return (
    <div>
      <button onClick={handleNpcClick}>Talk to NPC</button>
      <button onClick={handleItemClick}>Pick up Item</button>
    </div>
  );
};

export default InteractionHandler;
=======
import React, { useState } from 'react';

interface InteractionHandlerProps {
  onNpcInteraction: () => void;
  onItemPickup: () => void;
}

const InteractionHandler: React.FC<InteractionHandlerProps> = ({ onNpcInteraction, onItemPickup }) => {
  const [isNpcNearby, setIsNpcNearby] = useState(false);
  const [isItemNearby, setIsItemNearby] = useState(false);

  const handleNpcClick = () => {
    if (isNpcNearby) onNpcInteraction();
  };

  const handleItemClick = () => {
    if (isItemNearby) onItemPickup();
  };

  return (
    <div>
      <button onClick={handleNpcClick}>Talk to NPC</button>
      <button onClick={handleItemClick}>Pick up Item</button>
    </div>
  );
};

export default InteractionHandler;
>>>>>>> 2c4eef8a8c2af760e670169e3438d8a3a9301b0f
