import React from 'react';

import { BamTitle } from './BamTitle';
import { storiesOf } from '@storybook/react';

storiesOf('BamTitle', module)
  .add('Animated Display Of Letters',
    () => <BamTitle word={'My Animated Title'}/>);
