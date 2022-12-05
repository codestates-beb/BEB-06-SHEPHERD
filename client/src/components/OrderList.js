// Modules
import Axios from 'axios';
import * as schema from 'features/schema';
import { useEffect, useState } from 'react';

// Material Components
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// Custom Components
import BaseStack from 'components/base/BaseStack';
import OrderPopover from 'components/OrderPopover';
import OrderOption from 'components/OrderOption';

function OrderList ({ user, shouldReload }) {
  const [availableOrders, setOrders] = useState([]);
  const [isValid, setValidation] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [orderModal, setOrderModal] = useState(false);
  const openOrderModal = () => setOrderModal(true);
  const closeOrderModal = () => setOrderModal(false);

  const [tokenAmmount, setTokenAmmount] = useState(0);
  const [privateKey, setPrivateKey] = useState('');
  const [receiver, setReceiver] = useState('');
  const [type, setType] = useState(null);

  const reset = () => {
    setTokenAmmount(0);
    setPrivateKey('');
    setReceiver('');
    setType(null);
  };

  const changePanel = (panel) => (event, newExpanded) => {
    reset();
    setExpanded(newExpanded ? panel : false);
  };

  const loadList = () => {
    try {
      const sendOrderPromises = user.sendOrder
        .filter(account => account !== '0x00')
        .map(async (account, idx) => {
          const response = await Axios.get(`${process.env.REACT_APP_API_URL}/user`, { params: { a: account }, withCredentials: true });
          const { data: receiver } = response;

          return {
            id: idx,
            title: `${receiver.name}에게 발주하기`,
            type: 'Z',
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

      const takeOrderPromises = user.takeOrder
        .filter(account => account !== '0x00')
        .map(async (account, idx) => {
          const response = await Axios.get(`${process.env.REACT_APP_API_URL}/user`, { params: { a: account } });
          const { data: receiver } = response;

          return {
            id: idx,
            title: `${receiver.name}(으)로 전달하기`,
            type: 'X',
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

      const orderPromises = [...sendOrderPromises, ...takeOrderPromises];

      Promise.all(orderPromises).then((orders) => {
        setOrders(orders);
      });
    } catch (e) {
      setOrders([]);
    }

    return () => {
      setOrders([]);
      setValidation(false);
      setExpanded(false);
      setOrderModal(false);
      reset();
    };
  };

  // Transaction 목록을 불러올 때마다 적용함
  useEffect(loadList, [user]);
  useEffect(loadList, [shouldReload]);

  useEffect(() => {
    const validationTest = (
      Array.isArray(availableOrders) &&
      availableOrders.length > 0 &&
      availableOrders.every((item) => {
        const errors = schema.order.validate(item);
        return errors.length < 1;
      })
    );

    setValidation(validationTest);
  }, [availableOrders]);

  return (
    <>
      {
        user
          ? (
            <>
              <BaseStack>
                <Typography variant='h5' sx={{ pb: 1, overflowWrap: 'anywhere' }}>
                  Order List
                </Typography>
                {
                  isValid
                    ? availableOrders.map((item, i) => {
                      return (
                        <OrderOption
                          key={i + 1}
                          data={item}
                          expanded={expanded === i + 1}
                          onChange={changePanel(i + 1)}
                          tokenAmmount={tokenAmmount}
                          setTokenAmmount={setTokenAmmount}
                          onClick={() => {
                            openOrderModal();
                            setReceiver(item.to);
                            setType(item.type);
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
                disableRestoreFocus
                onClose={closeOrderModal}
                aria-labelledby='order-modal'
              >
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
                  <OrderPopover
                    closeOrderModal={closeOrderModal}
                    privateKey={privateKey}
                    setPrivateKey={setPrivateKey}
                    tokenAmmount={tokenAmmount}
                    receiver={receiver}
                    type={type}
                  />
                </Box>
              </Modal>
            </>
            )
          : (
            <CircularProgress />
            )
      }
    </>
  );
}

export default OrderList;
