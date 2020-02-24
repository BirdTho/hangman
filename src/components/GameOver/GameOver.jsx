import React from 'react';

import './GameOver.css';
import { NewGameButtom, ResetStatsButton, ScoreBoard } from '..';

const getMessage = (won, word) => {
  return (won ? ([<p>Congratulations!</p>,<p>You guessed the word:</p>, <p>{word.toUpperCase()}</p>]) :
    ([<p>The word was:</p>, <p>{word.toUpperCase()}</p>, <p>Better luck next time!</p>]));
};

/**
 *
 * @param {{
 *   won: boolean,
 *   onStartGame: Function,
 *   word: string,
 *   wins: number,
 *   losses: number,
 * }} props
 * @returns {*}
 * @constructor
 */
export const GameOver = (props) => {
  const {
    wins,
    losses,
    word,
    won,
    onStartGame,
    onResetStats,
  } = props;
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
