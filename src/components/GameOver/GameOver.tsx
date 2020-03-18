import React from 'react';

import './GameOver.css';
import { NewGameButtom, ResetStatsButton, ScoreBoard } from '..';

const getMessage = (won: boolean, word: string) => {
  return (won ? ([<p>Congratulations!</p>,<p>You guessed the word:</p>, <p>{word.toUpperCase()}</p>]) :
    ([<p>The word was:</p>, <p>{word.toUpperCase()}</p>, <p>Better luck next time!</p>]));
};

interface Props {
  wins: number,
  losses: number,
  word: string,
  won: boolean,
  onStartGame: () => void,
  onResetStats: () => void,
}

export const GameOver = ({ wins, losses, word, won, onStartGame, onResetStats }: Props) => {
  return (
    <div className={'gameover'}>
      <div className={'message'}>
        {getMessage(won, word)}
      </div>
      <ScoreBoard wins={wins} losses={losses}/>
      <ResetStatsButton onResetStats={onResetStats}/>
      <NewGameButtom onStartGame={onStartGame}/>
    </div>
  )
};
