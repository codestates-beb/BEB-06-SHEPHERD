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
  const { id, arrival, currentLocation } = data;

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
        title={<Typography variant='body1' sx={{ fontWeight: 500 }}>{`Transaction Number #${id}`}</Typography>}
        subheader={
          <>
            <Typography variant='subtitle2'>Current Location : {currentLocation}</Typography>
            <Typography variant='subtitle2'>Estimated Arrival Date : {arrival.date.toDateString()}</Typography>
          </>
        }
        sx={{
          flexGrow: 1
        }}
      />
      <CardActions sx={{ p: 1 }}>
        <Button size='medium' color='primary' onClick={handleClick}>
          <Typography variant='body1'>Show Details</Typography>
        </Button>
      </CardActions>
      <Collapse in={open} sx={{ flexBasis: '100%' }}>
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
                  alignItems: 'flex-start',
                  justifyContent: 'space-between'
                }}
                pb={1}
                key={key}
              >
                <Typography variant='subtitle2'>
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

function TransactionList ({ user }) {
  const [transactions, setTransactions] = useState([]);

  const loadList = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/tx/getTxInfo`)
      .then(response => {
        const { data } = response;
        const { queryTxInfo } = data;

        const transactions = queryTxInfo.map(() => {
          return {
            id: 1,
            arrival: {
              date: new Date(2022, 11, 22),
              location: '대구'
            },
            currentLocation: '포항',
            departure: {
              date: new Date(2022, 11, 21),
              location: '포항'
            },
            orderDate: new Date(2022, 11, 18),
            orderer: '건양엔지니어링',
            status: 'Ongoing',
            amount: 100
          };
        });
        setTransactions(transactions);
      }).catch(error => {
        console.error(error);
        setTransactions([]);
      });
  };

  // Transaction 목록을 불러올 때마다 적용함
  useEffect(loadList, [user]);

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
