// Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Modules
import Axios from 'axios';
import { useState } from 'react';

function OrderPopover ({ privateKey, setPrivateKey, tokenAmmount, receiver, type }) {
  const [stepNum, setStepNum] = useState(0);
  const [result, setResult] = useState('');

  const steps = [
    'Insert your private key',
    'Waiting for transaction',
    'Complete'
  ];

  const handleChange = (callback) => {
    return (event) => {
      callback(event.target.value);
    };
  };

  const handleSubmit = () => {
    try {
      setStepNum(1);

      const body = {
        orderAmount: tokenAmmount,
        sendSupplier: receiver.accountAddress,
        userKey: privateKey
      };

      let urlSuffix;
      if (type === 'Z') urlSuffix = 'sendZ';
      else if (type === 'X') urlSuffix = 'sendX';
      else throw new Error('Wrong Type');

      Axios.post(`${process.env.REACT_APP_API_URL}/tx/${urlSuffix}`, body)
        .then((response) => {
          setResult('Transaction Complete');
          setStepNum(2);
        })
        .catch((error) => {
          setResult(error.message);
          setStepNum(2);
        });
    } catch (error) {
      setResult(error.message);
      setStepNum(2);
    }
  };

  const ContentByStep = () => {
    switch (stepNum) {
      case 0 :
        return (
          <>
            <Typography variant='h5' mb={3}>{steps[0]}</Typography>
            <TextField
              fullWidth
              size='small'
              label='Private Key'
              name='privatekey'
              margin='normal'
              placeholder='123abc...'
              value={privateKey}
              onChange={handleChange(setPrivateKey)}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                minWidth: 4
              }}
              mt={1}
            >
              <Button
                disableElevation
                size='medium'
                type='submit'
                onClick={handleSubmit}
              >
                Send Transaction
              </Button>
            </Box>
          </>
        );
      case 1 :
        return (
          <>
            <Typography variant='h5' mb={3}>{steps[1]}</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
              pt={2}
              pb={2}
            >
              <CircularProgress />
            </Box>
          </>
        );
      case 2 :
        return (
          <>
            <Typography variant='h5' mb={3}>{steps[2]}</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
              pt={2}
              pb={2}
            >
              <Typography variant='h6'>
                {result}
              </Typography>
            </Box>
          </>
        );
      default :
        return <Typography>Unexpected Step</Typography>;
    }
  };

  return (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'auto',
      bgcolor: 'white',
      border: '0.5px solid #000',
      boxShadow: 24,
      p: 4
    }}
    >
      <Container
        maxWidth='md'
        sx={{
          minWidth: {
            xs: 'auto',
            md: '700px'
          },
          pb: 2,
          pt: 2,
          minHeight: '200px'
        }}
      >
        <Stack sx={{
          justifyContent: 'center'
        }}
        >
          <ContentByStep />
        </Stack>
      </Container>

      <Stepper activeStep={stepNum} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default OrderPopover;
