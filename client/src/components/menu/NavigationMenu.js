// Modules
import * as React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const NavigationMenu = ({ anchorEl, onClose, pages }) => {
  return (
    <Menu
      id='menu-nav'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{
        display: { xs: 'block', md: 'none' }
      }}
    >
      {pages.map((page, idx) => (
        <MenuItem key={idx} onClick={onClose}>
          <Typography textAlign='center'>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/${page.routeName}`}>{page.name}</Link>
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NavigationMenu;
