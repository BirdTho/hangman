import React from 'react';

import './NewGameButton.css';

interface NewGameProps {
  onStartGame: () => void
}

export const NewGameButtom = React.memo(({onStartGame}: NewGameProps) =>
  (<button
    className={'new-game-button'}
    tabIndex={0} autoFocus={true}
    onClick={onStartGame}>
    Start New Game
  </button>));