import React from 'react'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Login = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LocalShippingIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField margin="normal" label="User ID" name='id' autoFocus autoComplete='id' />
        <TextField label="Password" type="password" name='passoword' autoComplete='current-password' />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label='Remember me' />
        <Button type='submit' sx={{ mb: 1}}>Sign in</Button>
        <Grid Container>
          <Grid item xs>
            <Button>Forgot Password?</Button>
          </Grid>
          <Grid item>
            <Button>Get MemberShip</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Login