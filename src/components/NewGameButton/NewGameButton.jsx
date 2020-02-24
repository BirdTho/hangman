import React from 'react';

import './NewGameButton.css';

export const NewGameButtom = React.memo((props) =>
  (<button
    className={'new-game-button'}
    tabIndex='0' autoFocus={true}
    onClick={props.onStartGame}>
    Start New Game
  </button>));