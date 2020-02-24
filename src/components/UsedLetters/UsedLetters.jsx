import React from 'react';

import './UsedLetters.css';

const ABCS = [...'abcdefghijklmnopqrstuvwxyz'];

const getLetters = (lettersGuessed) => {
  return ABCS.map((letter, i) => {
    return (
      <span key={i} className={lettersGuessed[letter] ? 'crossed' : ''}>{letter}</span>
    );
  });
};

export const UsedLetters = (props) => {
  return (
    <div className={'used-letters'}>
      {getLetters(props.lettersGuessed)}
    </div>
  );
};
