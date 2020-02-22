import React from 'react';
import BamLetter from './BamLetter';

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
  }

  componentDidMount() {
    debugger;
    const width = Math.ceil(this.sizingRef.current.getBoundingClientRect().width);
    this.setState({ width });
    this.timer = setInterval(this.reveal, 600);
  }

  reveal = () => {
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

    let letters = [];
    for (let i = 0; i < revealedLetters; ++i) {
      letters.push(<BamLetter key={i} letter={word.charAt(i)}/>);
    }
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
      {width ? this.getBamLetters() : (<span ref={sizingRef} style={{ opacity: 0, }}>{word}</span>)}
    </div>);
  }
}
