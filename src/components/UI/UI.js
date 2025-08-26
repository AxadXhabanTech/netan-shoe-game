import React from 'react';

const UI = ({ gameState, setGameState, onReturnToMenu }) => {
  const startGame = () => {
    setGameState({
      score: 0,
      combo: 0,
      bestCombo: 0,
      isCharging: false,
      chargePower: 0,
      gameActive: true,
      gameTime: 0
    });
  };

  const restartGame = () => {
    alert('Development in progress');
  };



  return (
    <>
      {/* Score and Combo UI */}
      <div className="ui">
        <div className="score">Score: {gameState.score}</div>
        <div className="combo">Combo: {gameState.combo}</div>
        <div className="time">Time: {Math.max(0, Math.ceil((60000 - (gameState.gameTime || 0)) / 1000))}s</div>
      </div>

      {/* Power Bar */}
      <div className="powerBar">
        <div 
          className="powerFill" 
          style={{ width: `${gameState.chargePower * 100}%` }}
        />
      </div>

      {/* Instructions */}
      <div className="instructions">
        <strong>Controls:</strong><br />
        Mouse: Rotate weapon left/right (45-75°)<br />
        Click & Hold: Charge throw power<br />
        Release: Throw projectile at enemy!
      </div>

      {/* Game Over Screen */}
      <div className="gameOver" style={{ display: gameState.gameActive ? 'none' : 'block' }}>
        <h2>Game Over!</h2>
        <p>Final Score: {gameState.score}</p>
        <p>Best Combo: {gameState.bestCombo}</p>
        <div className="gameOverButtons">
          <button className="restartBtn" onClick={restartGame}>
            Play Again
          </button>
          <button className="menuBtn secondary" onClick={onReturnToMenu}>
            Main Menu
          </button>
        </div>
      </div>
    </>
  );
};

export default UI;
