import Stack from '@mui/material/Stack';

const BaseStack = (props) => {
  const style = {
    minHeight: '5em',
    padding: '1em',
    flex: 1
  };

  return (
    <Stack sx={style}>
      {props.children}
    </Stack>
  );
};

export default BaseStack;
