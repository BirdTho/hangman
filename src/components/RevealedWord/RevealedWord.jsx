import React from 'react';

import './RevealedWord.css';

const LETTER_WIDTH = 40;
const LETTER_SPACING = 15;

export const RevealedWord = (props) => {
  const word = props.word.toUpperCase();

  // Limiting line length to 9 chars for fitting in 500px wide area
  const length = Math.min(word.length, 9);
  const width = length * LETTER_WIDTH + (length - 1) * LETTER_SPACING;

  let arr = [];
  let j = 0;
  [...word].forEach((l, i) => {

    if (i > 0 && i % 9 === 0) {
      arr.push(<br key={j++}/>);
    }

    arr.push((<div key={j++} className={'letter'} style={(i % 9 === 0) ? { marginLeft: '0px'} : {}}>
      <span>{l}</span>
      <div/>
    </div>));
  });

  return (
    <div className={'revealed'} style={{marginLeft: `calc(50% - ${width / 2}px)`, width: `${width}px`}}>
      {arr}
    </div>
  );
};