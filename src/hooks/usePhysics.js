import { useCallback } from 'react';

export const usePhysics = () => {
  const calculateThrowVelocity = useCallback((power, rotation, baseForce = 20) => {
    const powerMultiplier = power / 100;
    const force = baseForce * powerMultiplier;
    
    const angleRad = (rotation * Math.PI) / 180;
    const velocity = [
      Math.sin(angleRad) * force,  // X component (left/right)
      force * 0.3,                 // Y component (upward)
      -Math.cos(angleRad) * force  // Z component (forward)
    ];

    return velocity;
  }, []);

  const checkCollision = useCallback((projectilePos, enemyPos, threshold = 1.5) => {
    const distance = Math.sqrt(
      Math.pow(projectilePos[0] - enemyPos[0], 2) +
      Math.pow(projectilePos[1] - enemyPos[1], 2) +
      Math.pow(projectilePos[2] - enemyPos[2], 2)
    );
    
    return distance < threshold;
  }, []);

  const calculateEnemyMovement = useCallback((currentPos, direction, speed, bounds) => {
    const newX = currentPos[0] + speed * direction;
    
    if (newX > bounds || newX < -bounds) {
      return { newPos: [currentPos[0], currentPos[1], currentPos[2]], newDirection: -direction };
    }
    
    return { newPos: [newX, currentPos[1], currentPos[2]], newDirection: direction };
  }, []);

  return {
    calculateThrowVelocity,
    checkCollision,
    calculateEnemyMovement
  };
};
