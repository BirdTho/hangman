import React from 'react';
import { TitleScreen, Play, GameOver } from '../';
import wordApi from '../../api/getWord';

const LOCAL_STORAGE_KEY: string = 'BirdThoHangmanGameData';

enum GAME_STATES {
  TITLE = 'Title',
  PLAYING = 'Playing',
  GAME_OVER = 'GameOver',
  VICTORY = 'Victory',
  GETTING_WORD = 'GettingWord',
}

interface MainGameState {
  wins: number,
  losses: number,
  currentWord: string,
  gameState: GAME_STATES,
}

export class MainGame extends React.Component<{}, MainGameState> {
  constructor(props: {}) {
    super(props);

    let wins: number;
    let losses: number;
    if (window.localStorage) {
      const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '') || {};
      wins = data.wins;
      losses = data.losses;
    } else {
      wins = 0;
      losses = 0;
    }

    this.state = {
      wins,
      losses,
      currentWord: '',
      gameState: GAME_STATES.TITLE,
    };
  }

  componentDidUpdate() {
    if (this.state.gameState === GAME_STATES.GETTING_WORD) {
      this.getWord();
    }
  }

  onResetStats = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, '');

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

  onEndGame = (didWin: boolean) => {
    let {
      wins,
      losses,
    } = this.state;

    let gameState: GAME_STATES;
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
      const word: string | null = wordApi.getWord();
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