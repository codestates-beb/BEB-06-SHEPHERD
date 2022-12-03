import BaseLayout from 'components/base/BaseLayout';

// Material UI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// Icons
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Modules
import { useRouteError } from 'react-router-dom';

function Error () {
  const error = useRouteError();

  return (
    <BaseLayout>
      <Container>
        <Box
          sx={{
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center'
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 60, m: 2 }} />
          <Typography variant='h4' gutterBottom>
            {
            error.statusText
              ? `${error.statusText}`
              : 'Unknown Error'
            }
          </Typography>
        </Box>
      </Container>
    </BaseLayout>
  );
}

export default Error;
