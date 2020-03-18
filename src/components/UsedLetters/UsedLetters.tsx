import React from 'react';

import { LettersGuessed } from '..';

import './UsedLetters.css';

const ABCS: string[] = [...'abcdefghijklmnopqrstuvwxyz'];

const getLetters = (lettersGuessed: LettersGuessed) => {
  return ABCS.map((letter, i) => {
    return (
      <span key={i} className={lettersGuessed[letter] ? 'crossed' : ''}>{letter}</span>
    );
  });
};

export const UsedLetters = ({ lettersGuessed }: { lettersGuessed: LettersGuessed }) => {
  return (
    <div className={'used-letters'}>
      {getLetters(lettersGuessed)}
    </div>
  );
};
