import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Game from './components/Game';
import UI from './components/UI';
import Menu from './components/Menu';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('loading'); // 'loading', 'menu', 'game'
  const [gameState, setGameState] = useState({
    score: 0,
    combo: 0,
    bestCombo: 0,
    isCharging: false,
    chargePower: 0,
    gameActive: false,
    gameTime: 0
  });

  // Simulate loading progress
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => {
            setIsLoading(false);
            setCurrentScreen('menu');
          }, 500); // Small delay for smooth transition
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random progress increments
      });
    }, 200);

    return () => clearInterval(loadingInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="loadingScreen">
        <div className="loadingContent">
          <h1>🎮 Netan Show Game</h1>
          <p>Loading Netan Show Game...</p>
          
          <div className="loadingBar">
            <div 
              className="loadingProgress" 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          
          <div className="loadingText">
            {loadingProgress < 30 && "Initializing 3D Engine..."}
            {loadingProgress >= 30 && loadingProgress < 60 && "Loading Game Assets..."}
            {loadingProgress >= 60 && loadingProgress < 90 && "Preparing Tech Weapons..."}
            {loadingProgress >= 90 && "Almost Ready..."}
          </div>
          
          <div className="loadingPercentage">{Math.round(loadingProgress)}%</div>
        </div>
      </div>
    );
  }

  // Menu handlers
  const handleStartGame = () => {
    setCurrentScreen('game');
    setGameState(prev => ({ ...prev, gameActive: true }));
  };

  const handleReturnToMenu = () => {
    setCurrentScreen('menu');
    setGameState(prev => ({ ...prev, gameActive: false }));
  };

  if (currentScreen === 'menu') {
    return (
      <div className="App">
        {/* Game battlefield commented out for now */}
        {/* <Canvas
          shadows
          camera={{ position: [0, 5, 10], fov: 75 }}
          style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e, #16213e)' }}
        >
          <Game 
            gameState={{ ...gameState, gameActive: false }} 
            setGameState={setGameState} 
          />
        </Canvas> */}
        <Menu 
          onStartGame={handleStartGame}
        />
      </div>
    );
  }

  return (
    <div className="App">
      {/* Game battlefield commented out for now */}
      {/* <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e, #16213e)' }}
      >
        <Game 
          gameState={gameState} 
          setGameState={setGameState} 
        />
      </Canvas>
      <UI gameState={gameState} setGameState={setGameState} onReturnToMenu={handleReturnToMenu} /> */}
    </div>
  );
}

export default App;
