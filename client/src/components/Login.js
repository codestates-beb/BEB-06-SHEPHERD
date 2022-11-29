// Modules
import Axios from 'axios';
import { CurrentUserContext } from 'Contexts';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Material Icon
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Material UI
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Custom Modules
import * as schema from 'features/schema';

const Login = ({ handleClose }) => {
  // App.js에 CurrentUserContext Provider가 있음
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = async () => {
    // 이후 axios가 추가되어 먼저 서버로부터의 인증을 거친 뒤
    // 사용자를 지정하는 것으로 수정함
    // 이때 currentUser에 password를 넘기지 않습니다

    try {
      const body = {
        email: email,
        password: password
      };

      const errors = schema.loginForm.validate(body);
      if (errors.length > 0) {
        errors.forEach(error => console.error(error));

        const primaryError = errors[0];
        throw (primaryError);
      } else {
        const response = await Axios.post(`${process.env.REACT_APP_API_URL}/user/login`, body);
        setError(false);

        const userInfo = response.data.user;
        setCurrentUser(userInfo);
        navigate('/dashboard');
        handleClose();
      }
    } catch (error) {
      const { message } = error;

      switch (message) {
        case 'Validation failed for email.' :
          setError('email is required.');
          break;
        case 'password is required.' :
          setError('password is required.');
          break;
        default :
          setError('An unexpected error occurs.');
      }
    }
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
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center'
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
            size='small' label='Email' name='email' autoFocus autoComplete='id'
            error={!!error}
            value={email}
            onChange={handleChange(setEmail)}
          />
          <TextField
            size='small' label='Password' type='password' name='passoword' autoComplete='current-password'
            error={!!error}
            value={password}
            helperText={error || ''} // 모든 로그인 오류는 비밀번호 쪽 헬퍼 텍스트로 보여준다.
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
