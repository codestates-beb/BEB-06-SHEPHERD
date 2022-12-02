import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as ShepherdSVG } from 'assets/svg/shepherd.svg';

function HomeIcon (props) {
  return (
    <SvgIcon {...props}>
      <ShepherdSVG />
    </SvgIcon>
  );
}

export default HomeIcon;
