import React from 'react';
import { TitleScreen, Play, GameOver } from '../';
import wordApi from '../../api/getWord';

const GAME_STATES = {
  TITLE: 'TITLE',
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER',
  VICTORY: 'VICTORY',
  GETTING_WORD: 'GETTING_WORD',
};

const LOCAL_STORAGE_KEY = 'BirdThoHangmanGameData';

export class MainGame extends React.Component {
  constructor(props) {
    super(props);

    let wins, losses;
    if (window.localStorage) {
      const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      wins = data.wins;
      losses = data.losses;
    }

    this.state = {
      wins: wins || 0,
      losses: losses || 0,
      currentWord: '',
      gameState: GAME_STATES.TITLE,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.gameState === GAME_STATES.GETTING_WORD) {
      this.getWord();
    }
  }

  onResetStats = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, null);

    this.setState({
      wins: 0,
      losses: 0,
    });
  };

  onStartGame = () => {
    this.setState({
      gameState: GAME_STATES.GETTING_WORD,
    });
  };

  onEndGame = (didWin) => {
    let {
      wins,
      losses,
    } = this.state;

    let gameState;
    if (didWin) {
      ++wins;
      gameState = GAME_STATES.VICTORY;
    } else {
      ++losses;
      gameState = GAME_STATES.GAME_OVER;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      wins,
      losses,
    }));

    this.setState({
      wins, losses, gameState,
    })
  };

  getWord = () => {
    try {
      const word = wordApi.getWord();
      if (word) {
        this.setState({
          currentWord: word,
          gameState: GAME_STATES.PLAYING,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  getDisplay = () => {
    const {
      onStartGame,
      onEndGame,
      onResetStats,
      state: {
        gameState,
        currentWord,
        wins,
        losses,
      },
    } = this;

    switch (gameState) {
      case GAME_STATES.GAME_OVER:
      case GAME_STATES.VICTORY:
        return (<GameOver
          won={gameState === GAME_STATES.VICTORY}
          wins={wins} losses={losses} word={currentWord}
          onStartGame={onStartGame} onResetStats={onResetStats}/>);
      case GAME_STATES.PLAYING:
        return (<Play word={currentWord} onEndGame={onEndGame}/>);
      case GAME_STATES.GETTING_WORD:
        return (<div>Getting word, please wait</div>);
      case GAME_STATES.TITLE:
      default:
        return (<TitleScreen wins={wins} losses={losses} onResetStats={onResetStats} onStartGame={onStartGame}/>);
    }
  };

  render () {
    return this.getDisplay();
  }
}