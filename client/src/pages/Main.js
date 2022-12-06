import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import Map from 'components/Map';
import ReactTooltip from 'react-tooltip';
import News from 'components/News';

function Main () {
  return (
    <Container maxWidth='lg'>
      <Map className='mapbox' marginBottom='20px' title='Shepherd: Current Supplychain' />
      <ReactTooltip place='bottom' effect='solid' type='warning' />
      <Divider />
      <News sx={{ pt: 4, pb: 6 }} />
    </Container>
  );
}

export default Main;
