/*
Trasaction List마다 useState를 두고 컴포넌트 렌더링 타이밍에 데이터를 가져옵니다
*/

// Modules
import Axios from 'axios';
import * as schema from 'features/schema';
import { useEffect, useState } from 'react';

// Material Components
import Typography from '@mui/material/Typography';

// Custom Components
import BaseStack from 'components/base/BaseStack';
import TransactionCard from 'components/transactionList/TransactionCard';

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

    Axios.get(`${process.env.REACT_APP_API_URL}/tx/getTxInfo`, {
      withCredentials: true
    })
      .then((response) => {
        const { data } = response;
        const { queryTxInfo } = data;

        const transactions = queryTxInfo.map(async (tx) => {
          const arrival = await getAsyncUserInfo(
            Axios.get(`${process.env.REACT_APP_API_URL}/user`, {
              params: { a: tx.returnValues.to },
              withCredentials: true
            })
          );
          const departure = await getAsyncUserInfo(
            Axios.get(`${process.env.REACT_APP_API_URL}/user`, {
              params: { a: tx.returnValues.from },
              withCredentials: true
            })
          );

          const types = ['발주(ZToken)', '유통(XToken)']

          return {
            blockNumber: tx.blockNumber,
            blockHash: tx.blockHash,
            transactionHash: tx.transactionHash,
            value: parseInt(tx.returnValues.value),
            type: types[tx.returnValues['3']],
            to: {
              name: arrival.name,
              location: arrival.address,
              accountAddress: arrival.account
            },
            from: {
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
        setTransactions(transactionPromises.reverse());
      })
      .catch((error) => {
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

  const validationTest =
    Array.isArray(transactions) &&
    transactions.length > 0 &&
    transactions.every((item) => {
      const errors = schema.transaction.validate(item);
      if (errors.length > 0) {
        errors.forEach((error) => console.error(error));
      }
      return errors.length < 1;
    });

  return (
    <BaseStack>
      <Typography variant='h5' sx={{ pb: 2 }}>
        Ongoing Transaction List
      </Typography>

      {validationTest
        ? (
            transactions.map((item, i) => {
              return <TransactionCard key={i} data={item} />;
            })
          )
        : (
          <Typography>You don't have any transaction yet.</Typography>
          )}
    </BaseStack>
  );
}

export default TransactionList;
