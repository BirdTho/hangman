import React from 'react';

import './RevealedWord.css';

const LETTER_WIDTH: number = 40;
const LETTER_SPACING: number = 15;

interface RevealedWordProps {
  word: string,
}

export const RevealedWord = (props: RevealedWordProps) => {
  const word: string = props.word.toUpperCase();

  // Limiting line length to 9 chars for fitting in 500px wide area
  const length: number = Math.min(word.length, 9);
  const width: number = length * LETTER_WIDTH + (length - 1) * LETTER_SPACING;

  let arr: JSX.Element[] = [];
  let j: number = 0;
  [...word].forEach((l: string, i: number) => {

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