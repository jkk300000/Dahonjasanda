import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid'; 
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';


const Orders = ({ slist, wlist}) => {
  const theme = useTheme();

  const result = {};
  wlist.forEach(item => {
    const { sname, quantity } = item;
    const stock = slist.find(stock => stock.sname === sname);
    if(stock) {
      const price =stock.price;
      result[sname] = price;
    }
  });

  const onClickDelete = (wno) => {
    deleteRequest(wno);
  }
  const deleteRequest = async (wno) => {
    try {
        const response = await axios.get('http://localhost/stock/wallet/delete?wno=' + wno, { withCredentials: true });
        if (response.data.result === true) {
            alert('종목 삭제에 성공하였습니다.');
            location.href = '/stock/mystock';
        } else {
            alert('종목 삭제에 실패하였습니다.');
        }
    } catch (e) {
        console.log(e);
        alert('종목 삭제에 실패하였습니다!!!!!!');
    }
  }

  return (
    <Box>
      {wlist.length > 0 ? (
        wlist.map((item) => (
          <Box key={item.wno}>
            <Box 
              display={'block'}
              justifyContent={'space-between'}
            >
              <Box
                display={'flex'}
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent={'space-between'}
                alignItems={'flex-start'}
                style={{ marginRight: 10}}
              >
                <Avatar
                  src={`/images/stock/logo/${item.sname}.png`}
                  alt={item.sname}
                  sx={{
                    width: 60,
                    height: 60,
                    marginRight: 10,
                  }}
                />
                <Box sx={{ justifyContent:'center'}}>
                  <Typography fontWeight={'900'} gutterBottom>
                    {item.sname}
                  </Typography>
                  <Typography
                      color={'text.secondary'}
                      variant={'subtitle2'}
                      fontWeight={'300'}
                      gutterBottom
                    >
                      보유수량 : 
                      <Typography
                        variant={'inherit'}
                        component={'span'}
                        color={'inherit'}
                        fontWeight={'900'}
                      > {item.quantity} 주
                      </Typography>
                    </Typography>
                </Box>
                <Stack
                  spacing={2}
                  direction="column"
                  style={{ marginRight: 30, marginLeft: 60}}
                >
                  <Box sx={{ justifyContent: 'center'}}>
                    <Typography
                      color={'text.secondary'}
                      variant={'subtitle2'}
                      fontWeight={'300'}
                      gutterBottom
                    >
                      자산가치 :
                      <Typography
                        variant={'inherit'}
                        component={'span'}
                        color={'inherit'}
                        fontWeight={'900'}
                      > 
                      {`₩ ${new Intl.NumberFormat().format(result[item.sname] * item.quantity)}`} 원
                      </Typography>
                    </Typography>
                    <Typography
                      color={result[item.sname] >= item.price ? 'red' : 'blue'}
                      variant={'subtitle2'}
                      gutterBottom
                      fontWeight={'300'}
                    >
                      수익 : 
                      <Typography
                        variant={'inherit'}
                        component={'span'}
                        color={'inherit'}
                        fontWeight={'900'}
                      > 
                      {`₩ ${new Intl.NumberFormat().format((result[item.sname] - item.price) * item.quantity)}`} 원
                      </Typography>
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  spacing={2}
                  direction={'column'}
                  style={{ marginLeft: 20, marginRight: 30}}
                >
                  <Box>
                    <Typography
                      color={result[item.sname] >= item.price ? 'red' : 'blue'}
                      variant={'subtitle2'}
                      gutterBottom
                      fontWeight={'300'}
                    >
                      현재가 : 
                      <Typography
                        variant={'inherit'}
                        component={'span'}
                        color={'inherit'}
                        fontWeight={'900'}
                      >
                        {`₩ ${new Intl.NumberFormat().format(result[item.sname])}`} 원
                      </Typography>
                    </Typography>
                    <Typography
                      color={'text.secondary'}
                      variant={'subtitle2'}
                      fontWeight={'300'}
                      noWrap={true}
                      gutterBottom
                    >
                      구매가:
                      <Typography
                        variant={'inherit'}
                        component={'span'}
                        color={'inherit'}
                        fontWeight={'900'}
                      > 
                      {'₩ '+item.price.toLocaleString()} 원
                      </Typography>
                    </Typography>
                  </Box>
                </Stack>
                <Fab size="small" color="secondary" className="btnDelete" onClick={()=>onClickDelete(item.wno)} >
                  <DeleteIcon />
                </Fab>
              </Box>
            </Box>
            <Divider
              sx={{
                marginTop : { xs: 2, sm: 4},
                marginY: { xs: 2, sm: 4 },
              }}
            />
          </Box>
        ))
      ) : (
        <Typography varinat="h5">보유 종목이 없습니다.</Typography>
      )}
    </Box>
  );
};

export default Orders;
