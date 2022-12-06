// Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Modules
import Axios from 'axios';
import { CurrentUserContext } from 'Contexts';
import { useContext, useEffect, useState } from 'react';

function OrderPopover ({ closeOrderModal, privateKey, setPrivateKey, tokenAmmount, receiver, type }) {
  const { setReload } = useContext(CurrentUserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [stepNum, setStepNum] = useState(0);
  const [result, setResult] = useState('');

  const completeMsg = 'Transaction Complete';

  const steps = [
    'Insert your private key',
    'Waiting for transaction',
    'Complete'
  ];

  useEffect(() => {
    // 3번째 단계까지 확인하고 난 뒤 (즉 UI가 보여지고 난 뒤)
    // 컴포넌트의 데이터를 다시 불러온다.
    // 이때 꼭 트랜젝션이 올바르게 되었는지 확인한다.
    if (stepNum === 2 && result === completeMsg) {
      setReload(true);
      closeOrderModal();
    }
  }, [stepNum]);

  const handleChange = (callback) => {
    return (event) => {
      callback(event.target.value);
    };
  };

  const handleSubmit = () => {
    try {
      setStepNum(1);

      const sendOrderBody = {
        orderAmount: tokenAmmount,
        sendSupplier: receiver.accountAddress,
        userKey: privateKey
      };

      const takeOrderBody = {
        takeAmount: tokenAmmount,
        takeDistributor: receiver.accountAddress,
        userKey: privateKey
      };

      let urlSuffix, body;
      if (type === 'Z') {
        urlSuffix = 'sendZ';
        body = sendOrderBody;
      } else if (type === 'X') {
        urlSuffix = 'sendX';
        body = takeOrderBody;
      } else throw new Error('Wrong Type');

      Axios.post(`${process.env.REACT_APP_API_URL}/tx/${urlSuffix}`, body, { withCredentials: true })
        .then((response) => {
          setResult(completeMsg);
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
              autoFocus
              size='small'
              label='Private Key'
              type={showPassword ? 'text' : 'password'}
              name='privatekey'
              margin='normal'
              placeholder='123abc...'
              value={privateKey}
              onChange={handleChange(setPrivateKey)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton size='small' onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityIcon fontSize='small' /> : <VisibilityOffIcon fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
    <Box>
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
