// Modules
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Material UI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// Components
import LoginForm from 'components/LoginForm';
import Logo from 'components/Logo';
import UserMenu from 'components/menu/UserMenu';
import NavigationMenu from 'components/menu/NavigationMenu';
import HomeIcon from 'components/HomeIcon';

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
const settings = [{ name: ['Transaction List'], routeName: ['Dashboard'] }, { name: ['Make Order'], routeName: ['Dashboard'] }];

function Header (props) {
  const [loginModal, setLoginModal] = useState(false);
  const openLoginModal = () => setLoginModal(true);
  const closeLoginModal = () => setLoginModal(false);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const createMenuHandlers = (setAnchorEl) => {
    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return {
      open: handleOpen,
      close: handleClose
    };
  };

  const handleNavMenu = createMenuHandlers(setAnchorElNav);
  const handleUserMenu = createMenuHandlers(setAnchorElUser);

  useEffect(() => {
    handleNavMenu.close();
    handleUserMenu.close();
  }, [loginModal]);

  return (
    <AppBar position='relative' component='header' sx={props.sx}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>

          {/* Logo */}
          <Logo to='/'>
            <HomeIcon sx={{ mr: 2 }} />
            <Typography
              variant='h6'
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem'
              }}
            >
              Shepherd
            </Typography>
          </Logo>

          {/* Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='navigation menu'
              aria-controls='menu-nav'
              aria-haspopup='true'
              onClick={handleNavMenu.open}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <NavigationMenu
              anchorEl={anchorElNav}
              onClose={handleNavMenu.close}
              pages={pages}
            />
          </Box>

          {/* Navigation List */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, idx) => (
              <Button
                key={idx}
                onClick={handleNavMenu.close}
                sx={{ textDecoration: 'none', color: 'white' }}
                component={RouterLink}
                to={`/${page.routeName}`}
              >
                <Typography variant='button'>
                  {page.name}
                </Typography>
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open Menu'>
              <IconButton onClick={handleUserMenu.open} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: grey[50] }}>
                  <AccountCircleIcon fontSize='large' />
                </Avatar>
              </IconButton>
            </Tooltip>
            <UserMenu
              anchorEl={anchorElUser}
              onClose={handleUserMenu.close}
              settings={settings}
              handleLoginButton={openLoginModal}
            />
          </Box>
        </Toolbar>
        {/* 모달을 메뉴 안에 넣으면, 특정 키를 눌렀을 때 lose focuse하는 문제가 발생함 */}
        {/* 그래서 메뉴 밖으로 꺼내옴 */}
        <Modal
          open={loginModal}
          onClose={closeLoginModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <LoginForm handleClose={closeLoginModal} />
          </Box>
        </Modal>
      </Container>
    </AppBar>
  );
}
export default Header;
