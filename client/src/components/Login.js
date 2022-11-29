// Modules
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from 'Contexts';

// Material Icon
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Material UI
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Login = () => {
  // App.js에 CurrentUserContext Provider가 있음
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [userId, setUserId] = useState(currentUser.id);
  const [password, setPassword] = useState(currentUser.password);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const onSubmit = () => {
    // 이후 axios가 추가되어 먼저 서버로부터의 인증을 거친 뒤
    // 사용자를 지정하는 것으로 수정함
    // 이때 currentUser에 password를 넘기지 않습니다
    setCurrentUser({ id: userId, password: password });
  };

  const handleChange = (callback) => {
    return (event) => {
      callback(event.target.value);
    };
  };

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Stack
          sx={{
            p: 4,
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LocalShippingIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
        </Stack>

        <Stack
          sx={{
            p: 2,
            alignItems: 'center'
          }}
          spacing={1}
        >
          <TextField
            size='small' label='User ID' name='id' autoFocus autoComplete='id'
            value={userId}
            onChange={handleChange(setUserId)}
          />
          <TextField
            size='small' label='Password' type='password' name='passoword' autoComplete='current-password'
            value={password}
            onChange={handleChange(setPassword)}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
            sx={{
              pr: 1.4
            }}
          />
          <Button
            type='submit'
            onClick={onSubmit}
          >
            Sign in
          </Button>
        </Stack>

        {/* 잠시 보류합니다 */}
        {/* <Stack
          sx={{
            p: 1,
            alignItems: 'center'
          }}
          spacing={0.2}
        >
          <Button>Forgot Password?</Button>
          <Button>Get MemberShip</Button>
        </Stack> */}
      </Box>
    </Container>
  );
};

export default Login;
