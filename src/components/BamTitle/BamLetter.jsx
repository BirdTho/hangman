import React from 'react';

const BamLetter = (props) => {
  return <span className={'animated'}>{props.letter}</span>;
};

export default React.memo(BamLetter);
