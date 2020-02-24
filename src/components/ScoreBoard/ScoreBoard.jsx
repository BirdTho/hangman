import React from 'react';

import './ScoreBoard.css';

export const ScoreBoard = (props) => {
  const {
    wins,
    losses,
  } = props;

  return (
    <div className={'scoreboard'}>
      <div className={'score'}>
        <span>Wins</span>
        <span>{wins}</span>
      </div>
      <div className={'divider'}/>
      <div className={'score'}>
        <span>Losses</span>
        <span>{losses}</span>
      </div>
    </div>
  );
};