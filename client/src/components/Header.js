// Modules
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// Login modal
import Login from 'components/Login';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '0.5px solid #000',
  boxShadow: 24,
  p: 4
};

const pages = [{ name: ['Dashboard'], routeName: ['Dashboard'] }];
const settings = [{ name: ['Dashboard'], routeName: ['Dashboard'] }, { name: ['Transaction List'], routeName: ['Dashboard'] }, { name: ['Make Order'], routeName: ['Dashboard'] }];

// Custom Logo Box
const Logo = () => (
  <Box sx={{
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }}
  >
    <LocalShippingIcon sx={{ mr: 2 }} />
    <Typography
      variant='h6'
      noWrap
      component='a'
      href='/'
      sx={{
        mr: 2,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none'
      }}
    >
      Shepherd
    </Typography>
  </Box>
);

function Header (props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='relative' component='header' sx={props.sx}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Logo />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page, idx) => (
                <MenuItem key={idx} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/${page.routeName}`}>{page.name}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, idx) => (
              <Button
                key={idx}
                onClick={handleCloseNavMenu}
                sx={{ color: 'white' }}
              >
                <Link style={{ textDecoration: 'none', color: 'white' }} to={`/${page.routeName}`}>{page.name}</Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open Menu'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: grey[50] }}>
                  <AccountCircleIcon fontSize='large' />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleOpen}>
                <Typography variant='button' color={(theme) => theme.palette.primary.main}>Login</Typography>
              </MenuItem>
              {settings.map((setting, idx) => (
                <MenuItem key={idx} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/${setting.routeName}`}>{setting.name}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        {/* 모달을 메뉴 안에 넣으면, 특정 키를 눌렀을 때 lose focuse하는 문제가 발생함 */}
        {/* 그래서 메뉴 밖으로 꺼내옴 */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Login />
          </Box>
        </Modal>
      </Container>
    </AppBar>
  );
}
export default Header;
