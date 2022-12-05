/*
Trasaction List마다 useState를 두고 컴포넌트 렌더링 타이밍에 데이터를 가져옵니다
*/

// Modules
import Axios from 'axios';
import parseObject from 'features/parseObject';
import * as schema from 'features/schema';
import { useEffect, useState } from 'react';

// Material Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

// Custom Components
import BaseStack from 'components/base/BaseStack';

// 내부의 open state를 제외하고는 props에서 데이터를 받아 채운다.
function TransactionItem ({ data }) {
  const [open, setOpen] = useState(false);
  const { blockNumber, transactionHash } = data;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card
      variant='outlined' sx={{
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        justifyContent: 'center',
        mb: 2
      }}
    >
      <CardHeader
        title={<Typography variant='body1' sx={{ fontWeight: 500 }}>{`Block Number #${blockNumber}`}</Typography>}
        subheader={
          <>
            <Typography variant='subtitle2'>Transaction Hash</Typography>
            <Typography variant='body2'>{transactionHash}</Typography>
          </>
        }
        sx={{
          flexGrow: 1,
          overflowWrap: 'anywhere'
        }}
      />
      <CardActions sx={{ p: 1 }}>
        <Button size='medium' color='primary' onClick={handleClick}>
          <Typography variant='body1'>Show Details</Typography>
        </Button>
      </CardActions>
      <Collapse in={open} sx={{ flexBasis: '100%', overflowWrap: 'anywhere' }}>
        <CardContent sx={{
          p: 2,
          pt: 0
        }}
        >
          {
          parseObject(data, (key, value) => {
            if (value instanceof Date) {
              value = value.toDateString();
            }

            return (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
                pb={1}
                key={key}
              >
                <Typography variant='subtitle2' sx={{ mr: 1 }}>
                  {key}
                </Typography>
                <Typography variant='body2'>
                  {value}
                </Typography>
              </Box>
            );
          })
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}

function TransactionList ({ user, shouldReload }) {
  const [transactions, setTransactions] = useState([]);

  const loadList = () => {
    const getAsyncUserInfo = async (Promise) => {
      const response = await Promise;
      if (response.data) {
        const { data } = response;
        return data;
      }
    };

    Axios.get(`${process.env.REACT_APP_API_URL}/tx/getTxInfo`, { withCredentials: true })
      .then((response) => {
        const { data } = response;
        const { queryTxInfo } = data;

        const transactions = queryTxInfo.map(async (tx) => {
          const arrival = await getAsyncUserInfo(
            Axios.get(`${process.env.REACT_APP_API_URL}/user`, { params: { a: tx.returnValues.to }, withCredentials: true })
          );
          const departure = await getAsyncUserInfo(
            Axios.get(`${process.env.REACT_APP_API_URL}/user`, { params: { a: tx.returnValues.from }, withCredentials: true })
          );

          return {
            blockNumber: tx.blockNumber,
            blockHash: tx.blockHash,
            transactionHash: tx.transactionHash,
            value: parseInt(tx.returnValues.value),
            arrival: {
              name: arrival.name,
              location: arrival.address,
              accountAddress: arrival.account
            },
            departure: {
              name: departure.name,
              location: departure.address,
              accountAddress: departure.account
            },
            orderer: tx.returnValues.operator
          };
        });

        return Promise.all(transactions);
      })
      .then((transactionPromises) => {
        setTransactions(transactionPromises);
      })
      .catch(error => {
        console.error(error);
        setTransactions([]);
      });

    return () => {
      setTransactions([]);
    };
  };

  // Transaction 목록을 불러올 때마다 적용함
  useEffect(loadList, [user]);
  useEffect(loadList, [shouldReload]);

  const validationTest = (
    Array.isArray(transactions) &&
    transactions.length > 0 &&
    transactions.every((item) => {
      const errors = schema.transaction.validate(item);
      if (errors.length > 0) {
        errors.forEach(error => console.error(error));
      }
      return errors.length < 1;
    })
  );

  return (
    <BaseStack>
      <Typography variant='h5' sx={{ pb: 2 }}>
        Ongoing Transaction List
      </Typography>

      {
        validationTest
          ? transactions.map((item, i) => {
            return <TransactionItem key={i} data={item} />;
          })
          : (
            <Typography>
              You don't have any transaction yet.
            </Typography>
            )
      }
    </BaseStack>
  );
}

export default TransactionList;
