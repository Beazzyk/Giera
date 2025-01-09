import React, { useState } from 'react';

interface EnemyStats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
}

interface BattleSystemProps {
  playerStats: { health: number; attack: number; defense: number; speed: number };
  enemyStats: EnemyStats;
}

const BattleSystem: React.FC<BattleSystemProps> = ({ playerStats, enemyStats }) => {
  const [battleLog, setBattleLog] = useState<string[]>([]);

  const handleAttack = () => {
    // Implementacja ataku - w tym przykładzie prosta
    const playerDamage = Math.max(playerStats.attack - enemyStats.defense, 0);
    const enemyDamage = Math.max(enemyStats.attack - playerStats.defense, 0);

    setBattleLog([
      `Player attacks and deals ${playerDamage} damage!`,
      `Enemy attacks and deals ${enemyDamage} damage!`,
    ]);
  };

  return (
    <div>
      <h2>Battle</h2>
      <button onClick={handleAttack}>Attack</button>
      <div>
        <h3>Battle Log</h3>
        <ul>
          {battleLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BattleSystem;
