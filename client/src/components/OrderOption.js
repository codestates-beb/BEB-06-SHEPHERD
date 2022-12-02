// Material Components
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Icons
import ClearIcon from '@mui/icons-material/Clear';

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
  />
))(({ theme }) => ({
  '& .MuiAccordionSummary-content': {
    alignContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
}));

function OrderOption ({ data, expanded, onChange, onClick, tokenAmmount, setTokenAmmount }) {
  const {
    title,
    to
  } = data;

  const setTokenAmmountOnlyNumber = (value) => {
    const wordOnly = /[^\d]+/g;
    const filtered = value.replaceAll(wordOnly, '');

    let number;
    if (filtered.length > 0)number = parseInt(filtered);
    else number = 0;

    setTokenAmmount(number);
  };

  const handleChange = (callback) => {
    return (event) => {
      callback(event.target.value);
    };
  };

  const resetTokenAmount = () => {
    setTokenAmmount(0);
  };

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      disableGutters
      square
      expanded={expanded}
      onChange={onChange}
      sx={theme => ({
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[0],
        '&:hover': {
          boxShadow: theme.shadows[2]
        },
        '&:before': {
          display: 'none'
        },
        mb: 1
      })}
    >
      <AccordionSummary
        disableRipple={false}
        disableTouchRipple={false}
        sx={theme => ({
          '&:hover': {
            backgroundColor: theme.palette.grey[100]
          }
        })}
      >
        <Typography variant='subheader1' sx={{ pb: 1, overflowWrap: 'anywhere' }}>
          {title}
        </Typography>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}
        >
          <Typography variant='body2' sx={{ color: 'text.secondary', overflowWrap: 'anywhere' }}>
            {to.locationAddress}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary', overflowWrap: 'anywhere' }}>
            {to.accountAddress}
          </Typography>
        </Box>

      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: 'column',
          pb: 0,
          mt: '1em'
        }}
      >
        <TextField
          label='Amount'
          size='small'
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          value={tokenAmmount}
          onChange={handleChange(setTokenAmmountOnlyNumber)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton size='small' onClick={resetTokenAmount}>
                  <ClearIcon
                    fontSize='small'
                  />
                </IconButton>
              </InputAdornment>
            ),
            inputProps: {
              sx: (theme) => ({
                textAlign: 'end'
              })
            }
          }}
        />
      </AccordionDetails>
      <AccordionActions
        sx={{
          p: 2,
          pb: 1
        }}
      >
        <Button
          variant='text'
          onClick={onClick}
        >Offer
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default OrderOption;
