// Modules
import * as React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

/*
anchorEl = anchorElUser
closeHandler = handleCloseUserMenu
loginCallback = handleOpen
*/

const UserMenu = ({ anchorEl, onClose, settings, handleLoginButton }) => {
  return (
    <Menu
      id='menu-user'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{ mt: '45px' }}
    >
      <MenuItem onClick={handleLoginButton}>
        <Typography variant='button' color={(theme) => theme.palette.primary.main}>Login</Typography>
      </MenuItem>
      {settings.map((setting, idx) => (
        <MenuItem key={idx} onClick={onClose}>
          <Typography textAlign='center'>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/${setting.routeName}`}>{setting.name}</Link>
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default UserMenu;
