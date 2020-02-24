import React from 'react';

import KeyboardEventHandler from 'react-keyboard-event-handler';
import { BamTitle, Hangman, RevealedWord, Wasted, UsedLetters, HealthBar } from '../';

import './Play.css';

const SPACE = '\u00A0';

export class Play extends React.Component {
  /**
   *
   * @param {{
   *   word: string,
   *   onEndGame: function(boolean)
   * }} props
   */
  constructor(props) {
    super(props);

    this.state = {
      lettersGuessed: {},
      strikes: 0,
      solved: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.strikes === 9 && this.state.strikes === 10) {
      // Do defeat handling here
      setTimeout(() => {
        this.props.onEndGame(false);
      }, 2500);
    } else if (!prevState.solved && this.state.solved) {
      setTimeout(() => {
        this.props.onEndGame(true);
      }, 1000);
    }
  }

  getRevealedWord = () => {
    const {
      props: {
        word,
      },
      state: {
        lettersGuessed,
      }
    } = this;

    let isValid = true;

    let newWord = '';
    let length = word.length;

    for (let i = 0; i < length; ++i) {
      let char = word.charAt(i);
      if (char !== SPACE && lettersGuessed[char] !== true) {
        newWord += SPACE;
        isValid = false;
      } else {
        newWord += char;
      }
    }

    if (isValid) {
      setTimeout(() => {
        this.setState({
          solved: true,
        });
      }, 1000);
    }

    console.log(newWord);

    return newWord;
  };

  handleKeyDown = (key) => {
    let {
      props: {
        word,
      },
      state: {
        lettersGuessed,
        strikes,
      }
    } = this;

    if (lettersGuessed[key] || strikes === 10) {
      return;
    }

    lettersGuessed[key] = true;

    if (word.indexOf(key) === -1) {
      ++strikes;
    }

    this.setState({
      lettersGuessed,
      strikes,
    });
  };

  render () {
    const {
      handleKeyDown,
      getRevealedWord,
      state: {
        strikes,
        lettersGuessed,
      }
    } = this;
    return (
      <div>
        <KeyboardEventHandler
          handleEventType={'keydown'}
          handleKeys={['alphabetic']}
          onKeyEvent={handleKeyDown}/>
        <div className={'title-container'}>
          <BamTitle word={'HANGMAN'}/>
        </div>
        <HealthBar strikes={strikes} max={10}/>
        <div className={'hang-container'}>
          <Hangman incorrectGuessCount={strikes}/>
          {strikes === 10 ? <Wasted/> : null}
        </div>
        <RevealedWord word={getRevealedWord()}/>
        <UsedLetters lettersGuessed={lettersGuessed}/>
      </div>

    );
  }
}
