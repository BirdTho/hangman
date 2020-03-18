import React from 'react';

import './ScoreBoard.css';

interface ScoreBoardProps {
  wins: number,
  losses: number,
}

export const ScoreBoard = ({wins, losses}: ScoreBoardProps) => {
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