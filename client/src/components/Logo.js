import Link from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const Logo = ({ children, to }) => (
  <Link
    variant='h6'
    noWrap
    sx={{
      mr: 2,
      color: 'inherit',
      textDecoration: 'none',
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}
    component={RouterLink} to={to}
  >
    {children}
  </Link>
);

export default Logo;
