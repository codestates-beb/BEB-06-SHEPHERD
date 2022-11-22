// Modules
import * as schema from 'features/schema';
import { useEffect, useState } from 'react';

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

// Custom Components
import BaseStack from 'components/base/BaseStack';

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

function OrderOption ({ data, expanded, onChange }) {
  const {
    id,
    title,
    from,
    to
  } = data;

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
        <Typography variant='subheader1' sx={{ pb: 1 }}>
          {`${title} #${id}`}
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
        >
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            From {`${from}`}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            To {`${to}`}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: 'column',
          pb: 0
        }}
      >

        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Detail
        </Typography>
        <TextField
          label='Amount'
          size='small'
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            startAdornment: <InputAdornment position='start'>kg</InputAdornment>,
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton size='small'>
                  <ClearIcon fontSize='small' />
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
        >Offer
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

function MakeOrder () {
  const [availableOrders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const loadList = () => {
    setOrders([
      {
        id: 1,
        title: '포스코에서 철강 발주',
        from: '포항',
        to: '대구',
        orderer: '건양엔지니어링'
      },
      {
        id: 2,
        title: '포스코에서 철강 발주',
        from: '포항',
        to: '대구',
        orderer: '건양엔지니어링'
      }
    ]);
  };

  // Transaction 목록을 불러올 때마다 적용함
  useEffect(loadList, []);

  const validationTest = (
    Array.isArray(availableOrders) &&
    availableOrders.length > 0 &&
    availableOrders.every((item) => {
      const errors = schema.order.validate(item);
      if (errors.length > 0) {
        errors.forEach(error => console.error(error));
      }
      return errors.length < 1;
    })
  );

  return (
    <BaseStack>
      <Typography variant='h5' sx={{ pb: 1 }}>
        Make an Order
      </Typography>
      <Typography variant='h6' color={(theme) => theme.palette.text.secondary} sx={{ pb: 2, fontWeight: 'normal', fontSize: '1.2rem' }}>
        Orderer:
      </Typography>
      {
        validationTest
          ? availableOrders.map((item, i) => {
            return <OrderOption key={i + 1} data={item} expanded={expanded === i + 1} onChange={handleChange(i + 1)} />;
          })
          : (
            <Typography>
              You don't have any available order yet.
            </Typography>
            )
      }
    </BaseStack>
  );
}

export default MakeOrder;
