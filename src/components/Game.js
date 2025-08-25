import React, { useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import PlayerWeapon from './PlayerWeapon';
import Enemy from './Enemy';
import Projectile from './Projectile';

const Game = ({ gameState, setGameState }) => {
  const { camera } = useThree();
  const [projectiles, setProjectiles] = useState([]);
  const [weaponRotation, setWeaponRotation] = useState(60); // Start at 60 degrees (middle of 45-75)
  const [weaponPosition, setWeaponPosition] = useState([0, 0.5, 5]); // On ground, near user
  const [enemyPosition, setEnemyPosition] = useState(0);
  const [enemyDirection, setEnemyDirection] = useState(1);
  const [enemySpeed, setEnemySpeed] = useState(0.02);
  const [chargeStartTime, setChargeStartTime] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [chargePower, setChargePower] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const maxChargeTime = 2000; // 2 seconds
  const enemyBounds = 8;
  const gameDuration = 60000; // 60 seconds

  // Mouse movement for weapon rotation (45-75 degrees)
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (gameState.gameActive) {
        const mouseX = (event.clientX / window.innerWidth); // 0 to 1
        // Map mouseX to 45-75 degrees
        const angle = 45 + (mouseX * 30); // 45 + (0-30) = 45-75 degrees
        setWeaponRotation(angle);
      }
    };

    const handleMouseDown = (event) => {
      if (gameState.gameActive && event.button === 0) {
        setIsCharging(true);
        setChargeStartTime(Date.now());
      }
    };

    const handleMouseUp = (event) => {
      if (gameState.gameActive && event.button === 0) {
        throwProjectile();
        setIsCharging(false);
        setChargePower(0);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gameState.gameActive]);

  // Update charging power and game time
  useFrame(() => {
    if (isCharging) {
      const chargeTime = Date.now() - chargeStartTime;
      const power = Math.min(chargeTime / maxChargeTime, 1);
      setChargePower(power);
      setGameState(prev => ({ ...prev, chargePower: power }));
    } else {
      setGameState(prev => ({ ...prev, chargePower: 0 }));
    }

    // Update game time
    if (gameState.gameActive) {
      const newGameTime = gameTime + 16; // ~60fps
      setGameTime(newGameTime);
      
      // Check for game over
      if (newGameTime >= gameDuration) {
        setGameState(prev => ({ ...prev, gameActive: false, gameTime: newGameTime }));
      } else {
        setGameState(prev => ({ ...prev, gameTime: newGameTime }));
      }
    }
  });

  // Update camera position (third-person behind weapon)
  useFrame(() => {
    const weaponAngleRad = (weaponRotation * Math.PI) / 180;
    const cameraDistance = 8;
    const cameraHeight = 4;
    
    // Position camera behind and above the weapon
    const cameraX = weaponPosition[0] - Math.sin(weaponAngleRad) * cameraDistance;
    const cameraZ = weaponPosition[2] - Math.cos(weaponAngleRad) * cameraDistance;
    const cameraY = weaponPosition[1] + cameraHeight;
    
    camera.position.set(cameraX, cameraY, cameraZ);
    camera.lookAt(weaponPosition[0], weaponPosition[1], weaponPosition[2]);
  });

  // Update enemy movement
  useFrame(() => {
    const newPosition = enemyPosition + enemySpeed * enemyDirection;
    
    if (newPosition > enemyBounds || newPosition < -enemyBounds) {
      setEnemyDirection(-enemyDirection);
      setEnemySpeed(0.01 + Math.random() * 0.03);
    } else {
      setEnemyPosition(newPosition);
    }
  });

  // Lift weapon when game starts
  useEffect(() => {
    if (gameState.gameActive) {
      setWeaponPosition([0, 1.5, 5]); // Lift weapon up
    } else {
      setWeaponPosition([0, 0.5, 5]); // Lower weapon down
    }
  }, [gameState.gameActive]);



  const throwProjectile = () => {
    if (!isCharging) return;

    const chargeTime = Date.now() - chargeStartTime;
    const power = Math.min(chargeTime / maxChargeTime, 1);
    
    const throwSpeed = 0.5 + power * 1.5;
    const angleRad = (weaponRotation * Math.PI) / 180;
    
    const direction = new THREE.Vector3(
      Math.sin(angleRad) * throwSpeed,
      0.3 + power * 0.5,
      -Math.cos(angleRad) * throwSpeed
    );

    const newProjectile = {
      id: Date.now(),
      position: [...weaponPosition],
      velocity: [direction.x, direction.y, direction.z],
      active: true
    };

    setProjectiles(prev => [...prev, newProjectile]);
  };

  const hitEnemy = () => {
    const newScore = gameState.score + 100 + (gameState.combo * 50);
    const newCombo = gameState.combo + 1;
    const newBestCombo = Math.max(gameState.bestCombo, newCombo);
    
    setGameState(prev => ({
      ...prev,
      score: newScore,
      combo: newCombo,
      bestCombo: newBestCombo
    }));
  };

  const missShot = () => {
    setGameState(prev => ({ ...prev, combo: 0 }));
  };

  const removeProjectile = (projectileId) => {
    setProjectiles(prev => prev.filter(projectile => projectile.id !== projectileId));
  };

  return (
    <>
      {/* Enhanced Lighting for Netan Show Game */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#4A90E2"
      />
      <pointLight
        position={[0, 15, 0]}
        intensity={0.8}
        color="#FF6B6B"
        distance={50}
      />
      <pointLight
        position={[-20, 10, -20]}
        intensity={0.6}
        color="#4ECDC4"
        distance={40}
      />
      <pointLight
        position={[20, 10, -20]}
        intensity={0.6}
        color="#45B7D1"
        distance={40}
      />

      {/* Netan Show Game Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Grid Pattern on Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial 
          color="#16213e"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>





      {/* Player's weapon */}
      <PlayerWeapon 
        position={weaponPosition}
        rotation={[0, (weaponRotation * Math.PI) / 180, 0]}
      />

      {/* Enemy */}
      <Enemy 
        position={[enemyPosition, 2, -20]}
        onHit={hitEnemy}
      />

      {/* Projectiles */}
      {projectiles.map(projectile => (
        <Projectile
          key={projectile.id}
          projectile={projectile}
          enemyPosition={[enemyPosition, 2, -20]}
          onHit={hitEnemy}
          onMiss={missShot}
          onRemove={() => removeProjectile(projectile.id)}
        />
      ))}
    </>
  );
};

export default Game;
