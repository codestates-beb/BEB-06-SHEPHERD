/*
Trasaction List마다 useState를 두고 컴포넌트 렌더링 타이밍에 데이터를 가져옵니다
*/

// Modules
import { useState, useEffect } from 'react';

// icons
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Material Components
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// Custom Components
import BaseStack from 'components/base/BaseStack';

// 내부의 open state를 제외하고는 props에서 데이터를 받아 채운다.
function TransactionItem (props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText>Item</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List disablePadding sx={{ pl: 4 }}>
          <ListItem>
            <ListItemText>collapsed</ListItemText>
          </ListItem>
        </List>

      </Collapse>
    </>
  );
}

function TransactionList () {
  const [transactions, setTransactions] = useState([]);

  const loadList = () => {
    setTransactions([
      {
        arrival: {
          date: '2022.10.10',
          location: '대구'
        },
        currentLocation: '포항',
        departure: {
          date: '2022.10.9',
          location: '포항'
        },
        orderDate: '2011.10.9',
        orderer: '건양엔지니어링',
        status: 'Ongoing'
      }
    ]);
  };

  // Transaction 목록을 불러올 때마다 적용함
  useEffect(loadList, []);

  const validationTest = (
    Array.isArray(transactions) &&
    transactions.length > 0
  );

  return (
    <BaseStack>
      <List
        subheader={
          <Typography variant='h6'>
            Ongoing Transaction List
          </Typography>
        }
      >
        {
          validationTest
            ? transactions.map((item, i) => {
              return <TransactionItem key={i} data={item} />;
            })
            : <Typography>
              You don't have any transaction yet.
              </Typography>
        }
      </List>
    </BaseStack>
  );
}

export default TransactionList;
