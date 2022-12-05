// Modules
import { useContext } from 'react';
import { CurrentUserContext } from 'Contexts';
import { Navigate } from 'react-router-dom';

// Material UI
import Container from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// Components
import LoginForm from 'components/LoginForm';

function Login () {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Container maxWidth='xs'>
      <Stack sx={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        pb: 3
      }}
      >
        {
        currentUser
          ? (
            <Navigate to='/dashboard' replace />
            )
          : (
            <Typography variant='subtitle2' sx={{ pb: 1 }}>You need to log in before using dashboard</Typography>
            )
        }
        <LoginForm sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        />
      </Stack>
    </Container>
  );
}

export default Login;
