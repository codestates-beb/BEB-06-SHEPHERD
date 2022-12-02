// Modules
import { useContext } from 'react';
import { CurrentUserContext } from 'Contexts';
import { Navigate } from 'react-router-dom';

// Material UI
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// Components
import TransactionList from 'components/TransactionList';
import OrderList from 'components/OrderList';

function Dashboard () {
  const { currentUser } = useContext(CurrentUserContext);

  const style = {
    justifyContent: 'center',
    alignContent: 'stretch',
    alignItems: 'stretch'
  };

  return (
    <>
      {!currentUser
        ? (
          <Navigate to='/login' replace />
          )
        : (
          <Grid container spacing={2} p={2} sx={style}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={5} sx={{ height: 1 }}>
                <TransactionList user={currentUser} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={5} sx={{ height: 1 }}>
                <OrderList user={currentUser} />
              </Paper>
            </Grid>
          </Grid>
          )}
    </>

  );
}

export default Dashboard;
