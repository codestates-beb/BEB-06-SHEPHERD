// Modules
import * as React from 'react';
import { CurrentUserContext } from 'Contexts';
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleLogout = () => {
    setCurrentUser(null);
  };

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
      {
        currentUser
          ? (
            <MenuItem onClick={handleLogout}>
              <Typography variant='button' color={(theme) => theme.palette.primary.main}>Sign Out</Typography>
            </MenuItem>
            )

          : (
            <MenuItem onClick={handleLoginButton}>
              <Typography variant='button' color={(theme) => theme.palette.primary.main}>Sign In</Typography>
            </MenuItem>
            )
      }
      {
        currentUser && settings.map((setting, idx) => (
          <MenuItem sx={{ textDecoration: 'none', color: 'inherit' }} key={idx} component={RouterLink} to={`/${setting.routeName}`} onClick={onClose}>
            <Typography>
              {setting.name}
            </Typography>
          </MenuItem>
        ))
      }
    </Menu>
  );
};

export default UserMenu;
