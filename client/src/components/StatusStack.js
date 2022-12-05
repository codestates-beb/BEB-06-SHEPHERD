// Modules
import Axios from 'axios';
import { useEffect, useState } from 'react';

// Material Components
import Typography from '@mui/material/Typography';

// Custom Components
import BaseStack from 'components/base/BaseStack';

function StatusStack ({ user, shouldReload }) {
  const [zBalance, setZBalance] = useState(0);
  const [xBalance, setXBalance] = useState(0);

  const loadStatus = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/tx/getTokenBalance`, { withCredentials: true })
      .then(response => {
        const { data } = response;
        const _balanceZ = data.findBalanceZ;
        const _balanceX = data.findBalanceX;

        setZBalance(_balanceZ);
        setXBalance(_balanceX);
      })
      .catch(error => {
        console.error(error);
        setZBalance(0);
        setXBalance(0);
      });
  };

  useEffect(loadStatus, [user]);
  useEffect(loadStatus, [shouldReload]);

  return (
    <BaseStack>
      <Typography variant='h6' sx={{ pb: 1, overflowWrap: 'anywhere' }}>
        Orderer : {user.name}
      </Typography>
      <Typography variant='subtitle1' color={(theme) => theme.palette.text.secondary} sx={{ fontWeight: 'bold', overflowWrap: 'anywhere' }}>
        Account Address
      </Typography>
      <Typography variant='body1' color={(theme) => theme.palette.text.secondary} sx={{ pl: 1, pb: 1, overflowWrap: 'anywhere' }}>
        {user.account}
      </Typography>
      <Typography variant='subtitle1' color={(theme) => theme.palette.text.secondary} sx={{ fontWeight: 'bold', overflowWrap: 'anywhere' }}>
        Token Balance
      </Typography>
      <Typography variant='body1' color={(theme) => theme.palette.text.secondary} sx={{ pl: 1, overflowWrap: 'anywhere' }}>
        Z : {zBalance}
      </Typography>
      <Typography variant='body1' color={(theme) => theme.palette.text.secondary} sx={{ pl: 1, overflowWrap: 'anywhere' }}>
        X : {xBalance}
      </Typography>
    </BaseStack>
  );
}

export default StatusStack;
