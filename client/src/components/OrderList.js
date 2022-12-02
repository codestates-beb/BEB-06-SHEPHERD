// Modules
import Axios from 'axios';
import * as schema from 'features/schema';
import { useEffect, useState } from 'react';

// Material Components
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// Custom Components
import BaseStack from 'components/base/BaseStack';
import OrderPopover from 'components/OrderPopover';
import OrderOption from 'components/OrderOption';

function OrderList ({ user }) {
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
          const response = await Axios.get(`${process.env.REACT_APP_API_URL}/user`, { params: { a: account } });
          const { data: receiver } = response;

          return {
            id: idx,
            title: `Z Token to ${receiver.name}`,
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
            title: `X Token to ${receiver.name}`,
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
      {
        user
          ? (
            <>
              <BaseStack>
                <Typography variant='h5' sx={{ pb: 1, overflowWrap: 'anywhere' }}>
                  OrderList
                </Typography>
                <Typography variant='subtitle2' color={(theme) => theme.palette.text.secondary} sx={{ pb: 1, overflowWrap: 'anywhere' }}>
                  Orderer: {user.name}
                </Typography>
                <Typography variant='subtitle2' color={(theme) => theme.palette.text.secondary} sx={{ pb: 1, overflowWrap: 'anywhere' }}>
                  {user.account}
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
                    console.log(item);
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
                onClose={closeOrderModal}
                aria-labelledby='order-modal'
              >
                <OrderPopover
                  privateKey={privateKey}
                  setPrivateKey={setPrivateKey}
                  tokenAmmount={tokenAmmount}
                  receiver={receiver}
                  type={type}
                />
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
