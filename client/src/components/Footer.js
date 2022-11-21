import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

function Footer (props) {
  return (
    <AppBar position='relative' component='footer' sx={props.sx}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          Footer
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
