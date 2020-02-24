import React from 'react';

import './TitleScreen.css';
import { NewGameButtom, ResetStatsButton, ScoreBoard } from '..';

const getScoreBoardIfNeeded = (props) => {
  const {
    onResetStats,
    wins,
    losses,
  } = props;

  if (wins > 0 || losses > 0) {
    return [
      <p>Welcome back!</p>,
      <ScoreBoard wins={wins} losses={losses}/>,
      <ResetStatsButton onResetStats={onResetStats}/>
    ];
  } else {
    return null;
  }
};

export const TitleScreen = (props) => {
  const {
    onStartGame,
    wins, losses,
  } = props;
  return (
    <div className={'title-window'}>
      <div
        className={'hang-title'}
        /* Title page is shorter without scoreboard, so push it down a tad */
        style={(wins || losses ? {} : {marginTop: '100px'})}
      >
        <span>H</span>
        <span>A</span>
        <span>N</span>
        <span>G</span>
        <span>M</span>
        <span>A</span>
        <span>N</span>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
      {getScoreBoardIfNeeded(props)}
      <NewGameButtom onStartGame={onStartGame}/>
    </div>
  );
};