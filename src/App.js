import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGameState } from './hooks/useGameState';
import HomeScene from './scenes/HomeScene';
import Battlefield from './scenes/Battlefield';
import './styles/globals.css';

function App() {
  const { 
    gameState, 
    isLoading, 
    loadingProgress, 
    startGame, 
    restartGame,
    returnToMenu,
    getChargePower,
    updateChargePower
  } = useGameState();

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

  if (gameState.currentScreen === 'menu') {
    return (
      <div className="App">
        <HomeScene onStartGame={startGame} />
      </div>
    );
  }

  if (gameState.currentScreen === 'battlefield') {
    return (
      <div className="App">
        <Canvas
          key={gameState.restartCount} // Force remount on restart
          shadows
          camera={{ position: [0, 4, 12], fov: 75 }}
          style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e, #16213e)' }}
        >
          <Battlefield onReturnToMenu={returnToMenu} updateChargePower={updateChargePower} />
        </Canvas>
        
        {/* Battlefield UI - Left Side */}
        <div className="battlefieldUI">
          <button 
            className="returnButton"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onMouseUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              returnToMenu();
            }}
          >
            ← Return to Menu
          </button>
        </div>

        {/* Battlefield UI - Right Side */}
        <div className="battlefieldUIRight">
          <button 
            className="restartButton"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onMouseUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              restartGame();
            }}
          >
            🔄 Restart Game
          </button>
        </div>

        {/* Power Bar */}
        <div className="powerBar">
          <div 
            className="powerFill" 
            style={{ height: `${(getChargePower() / 100) * 100}%` }}
          />
        </div>


      </div>
    );
  }

  return (
    <div className="App">
      <HomeScene onStartGame={startGame} />
    </div>
  );
}

export default App;
