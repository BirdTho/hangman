import React from 'react';
import { Hangman, BamTitle } from './components';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <BamTitle word={'HANGMAN'}/>
        <Hangman incorrectGuessCount={0}/>
      </div>
    </div>
  );
};

export default App;
