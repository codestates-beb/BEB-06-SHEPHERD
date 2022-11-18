import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

const BaseStack = (props) => {
  const theme = useTheme();
  const style = {
    height: 1,
    minHeight: '5em',
    padding: '1em',
    background: theme.palette.background.custom
  };

  return (
    <Stack sx={style}>
      {props.children}
    </Stack>
  );
};

export default BaseStack;
