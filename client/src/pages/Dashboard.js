// Modules
import Grid from '@mui/material/Grid';

// Components
import TransactionDetail from 'components/TransactionDetail';
import TransferDetail from 'components/TransferDetail';

function Dashboard () {
  const style = {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'stretch',
    alignItems: 'stretch'
  };

  return (
    <Grid container spacing={2} sx={style}>
      <Grid item columns={6}>
        <TransactionDetail />
      </Grid>
      <Grid item columns={6}>
        <TransferDetail />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
