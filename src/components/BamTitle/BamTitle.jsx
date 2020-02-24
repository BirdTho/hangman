import React from 'react';

import './BamTitle.css';

export class BamTitle extends React.Component {
  /**
   * @param {{
   *   word: string
   * }} props
   */
  constructor(props) {
    super(props);

    this.state = {
      revealedLetters: 0,
      width: null,
    };

    this.sizingRef = React.createRef();
    this.letters = [];
  }

  componentDidMount() {
    console.log('Componentdidmount for bamtitle');
    const width = Math.ceil(this.sizingRef.current.getBoundingClientRect().width) + 1;
    this.setState({ width });
    this.timer = setInterval(this.reveal, 600);
  }

  reveal = () => {
    console.log('Reveal called');
    let revealedLetters = this.state.revealedLetters;
    ++revealedLetters;
    if (revealedLetters === this.props.word.length) {
      clearInterval(this.timer);
    }
    this.setState({
      revealedLetters
    });
  };

  getBamLetters = () => {
    const {
      props: {
        word,
      },
      state: {
        revealedLetters,
      },
    } = this;

    if (revealedLetters === 0 || this.letters.length === revealedLetters) return this.letters;

    // Save previous list of letters - Why make a new list of identical elements each time?
    // Would be terrible form for very large words.
    let letters = this.letters;
    let letter = word.charAt(revealedLetters - 1);

    // Need an &nbsp in unicode for the word
    letter = letter === ' ' ? '\u00A0' : letter;
    letters.push(<span key={revealedLetters - 1} className={'animated'}>{letter}</span>);
    return letters;
  };

  render () {
    const {
      sizingRef,
      props: {
        word,
      },
      state: {
        width,
      }
    } = this;

    return (<div className={'bamtitle'} style={{ width }}>
      {width ? this.getBamLetters() : (<span ref={sizingRef} style={{ opacity: 0, }}>{word.replace(' ', '\u00A0')}</span>)}
    </div>);
  }
}
