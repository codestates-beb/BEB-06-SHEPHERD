// Modules
import parseObject from 'features/parseObject';


// Material Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { useState } from 'react';

// 내부의 open state를 제외하고는 props에서 데이터를 받아 채운다.
function TransactionCard ({ data }) {
  const [open, setOpen] = useState(false);
  const { blockNumber, transactionHash } = data;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card
      variant='outlined'
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        justifyContent: 'center',
        mb: 2
      }}
    >
      <CardHeader
        title={
          <Typography
            variant='body1'
            sx={{ fontWeight: 500 }}
          >{`Block Number #${blockNumber}`}
          </Typography>
        }
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
        <CardContent
          sx={{
            p: 2,
            pt: 0
          }}
        >
          {parseObject(data, (key, value) => {
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
                <Typography variant='body2'>{value}</Typography>
              </Box>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default TransactionCard;
