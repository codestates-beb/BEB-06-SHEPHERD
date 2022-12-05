// Modules
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
        <MenuItem sx={{ textDecoration: 'none', color: 'inherit' }} key={idx} component={RouterLink} to={`/${page.routeName}`} onClick={onClose}>
          <Typography>
            {page.name}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NavigationMenu;
