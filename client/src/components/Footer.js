import Diversity1Icon from '@mui/icons-material/Diversity1';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const GithubButton = styled(Button)(({ theme }) => ({
  flexBasis: '180px',
  margin: 4
}));

function Footer (props) {
  const Heeinpark = 'https://github.com/Heein-Park';
  const GunHyunJeong = 'https://github.com/gun8121';
  const CDDWNE = 'https://github.com/CDDWNE';
  const YeonJeo = 'https://github.com/yeonvv';

  return (
    <AppBar position='flex' component='footer' sx={props.sx}>
      <Toolbar>
        <Box sx={{
          alignContent: 'center',
          alignItems: 'center',
          display: { xs: 'none', sm: 'none', md: 'flex' },
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start'
        }}
        >
          <Diversity1Icon fontSize='large' sx={{ mr: 2 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              color: 'inherit',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              mr: 2,
              textDecoration: 'none'
            }}
          >
            Our Team
          </Typography>
        </Box>

        <Stack
          direction='row'
          sx={{
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: { xs: 'center', sm: 'flex-end' },
            alignItems: 'center',
            flexGrow: 1
          }}
        >
          <GitHubIcon
            fontSize='large'
            sx={{
              m: 2,
              mt: 1.5,
              mb: 1.5,
              flexBasis: { xs: '100%', sm: 'auto' }
            }}
          />
          <GithubButton variant='contained' onClick={() => { window.open(Heeinpark); }}>Park Heein</GithubButton>
          <GithubButton variant='contained' onClick={() => { window.open(GunHyunJeong); }}>Jeong Gunhyun</GithubButton>
          <GithubButton variant='contained' onClick={() => { window.open(CDDWNE); }}>Choi Jinyoung</GithubButton>
          <GithubButton variant='contained' onClick={() => { window.open(YeonJeo); }}>Heo YeonJeo</GithubButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
