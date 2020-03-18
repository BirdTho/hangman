import React from 'react';

import './ResetStatsButton.css';

interface ResetStatsProps {
  onResetStats: () => void
}

export const ResetStatsButton = React.memo(({onResetStats}: ResetStatsProps) =>
  (<button
    className={'reset-stats-button'}
    tabIndex={0} autoFocus={true}
    onClick={onResetStats}>
    Reset Stats
  </button>));