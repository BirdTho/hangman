import React from 'react';

import './ResetStatsButton.css';

export const ResetStatsButton = React.memo((props) =>
  (<button
    className={'reset-stats-button'}
    tabIndex='0' autoFocus={true}
    onClick={props.onResetStats}>
    Reset Stats
  </button>));