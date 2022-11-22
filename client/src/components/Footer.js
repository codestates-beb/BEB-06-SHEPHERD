import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Footer(props) {
  const Heeinpark = "https://github.com/Heein-Park"
  const GunHyunJeong = "https://github.com/gun8121"
  const CDDWNE = "https://github.com/CDDWNE"
  const YeonJeo = "https://github.com/yeonvv"

  return (
    <AppBar position='flex' component='footer' sx={props.sx}>
      <Toolbar>
        <Box sx={{flexGrow: 1}}>
        <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Our Team
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <GitHubIcon fontSize='large' />
          <Button variant="contained" onClick={() => { window.open(Heeinpark) }}>Park Heein</Button>
          <Button variant="contained" onClick={() => { window.open(GunHyunJeong) }}>Jeong Gunhyun</Button>
          <Button variant="contained" onClick={() => { window.open(CDDWNE) }}>Choi Jinyoung</Button>
          <Button variant="contained" onClick={() => { window.open(YeonJeo) }}>Heo YeonJeo</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
