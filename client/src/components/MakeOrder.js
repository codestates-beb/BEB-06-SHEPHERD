// Modules
import Axios from 'axios';
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
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Icons
import ClearIcon from '@mui/icons-material/Clear';

// Custom Components
import BaseStack from 'components/base/BaseStack';
import OrderPopover from 'components/OrderPopover';

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
    from,
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
          {`${title}`}
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
        >
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            From {`${from.locationAddress}`}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            To {`${to.locationAddress}`}
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
          value={tokenAmmount}
          onChange={handleChange(setTokenAmmountOnlyNumber)}
          InputProps={{
            startAdornment: <InputAdornment position='start'>z token</InputAdornment>,
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

function MakeOrder ({ user }) {
  const [availableOrders, setOrders] = useState([]);
  const [isValid, setValidation] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [orderModal, setOrderModal] = useState(false);
  const openOrderModal = () => setOrderModal(true);
  const closeOrderModal = () => setOrderModal(false);

  const [tokenAmmount, setTokenAmmount] = useState(0);
  const [privateKey, setPrivateKey] = useState(0);
  const [receiver, setReceiver] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const loadList = () => {
    try {
      const orderPromises = user.sendOrder.map(async (account, idx) => {
        const response = await Axios.get(`${process.env.REACT_APP_API_URL}/user`, { params: { a: account } });
        const { data: receiver } = response;

        return {
          id: idx,
          title: account,
          from: {
            locationAddress: user.address,
            accountAddress: user.account
          },
          to: {
            locationAddress: receiver.address,
            accountAddress: receiver.account
          },
          orderer: user.name
        };
      });

      Promise.all(orderPromises).then((orders) => {
        setOrders(orders);
      });
    } catch (e) {
      console.error(e);
      setOrders([]);
    }
  };

  // Transaction 목록을 불러올 때마다 적용함
  useEffect(loadList, [user]);

  useEffect(() => {
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

    setValidation(validationTest);
  }, [availableOrders]);

  return (
    <>
      <BaseStack>
        <Typography variant='h5' sx={{ pb: 1 }}>
          Make an Order
        </Typography>
        <Typography variant='h6' color={(theme) => theme.palette.text.secondary} sx={{ pb: 2, fontWeight: 'normal', fontSize: '1.2rem' }}>
          Orderer:
        </Typography>
        {
        isValid
          ? availableOrders.map((item, i) => {
            return (
              <OrderOption
                key={i + 1}
                data={item}
                expanded={expanded === i + 1}
                onChange={handleChange(i + 1)}
                tokenAmmount={tokenAmmount}
                setTokenAmmount={setTokenAmmount}
                onClick={() => {
                  openOrderModal();
                  console.log(item);
                  setReceiver(item.to);
                }}
              />
            );
          })
          : (
            <Typography>
              You don't have any available order yet.
            </Typography>
            )
      }
      </BaseStack>
      <Modal
        open={orderModal}
        onClose={closeOrderModal}
        aria-labelledby='order-modal'
      >
        <OrderPopover
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          tokenAmmount={tokenAmmount}
          receiver={receiver}
        />
      </Modal>
    </>

  );
}

export default MakeOrder;
