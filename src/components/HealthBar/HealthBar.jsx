import React from 'react';

import './HealthBar.css';

const _HealthBar = (props) => {
  const {
    strikes,
    max,
  } = props;
  return (
    <div className={'health-bar'}>
      <div className={'background'}/>
      <div className={'health-juice' + (max - strikes <= 2 ? ' pulsing' : '')}
        style={{width: `${400.0 * ((max-strikes) / max)}px`}}/>
    </div>
  );
};

// This component will be predictable enough to memoize
// Although its probably not worth it.
export const HealthBar = React.memo(_HealthBar);
