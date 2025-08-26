import React from 'react';

const Menu = ({ onStartGame }) => {
  return (
    <div className="mainMenu">
      <div className="menuContent">
        <h1>🎮 Netan Show Game</h1>
        <p>Futuristic 3D Combat Arena</p>
        
        <div className="menuButtons">
          <button className="menuBtn primary" onClick={onStartGame}>
            🚀 Start New Game
          </button>
          
          <button className="menuBtn secondary" onClick={() => alert('Development in progress')}>
            ⚙️ Options
          </button>
          
          <button className="menuBtn secondary" onClick={() => alert('Development in progress')}>
            🏆 Leaderboard
          </button>
        </div>
        
        <div className="menuFooter">
          <p>Use mouse to aim • Click & hold to charge • Release to fire!</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
