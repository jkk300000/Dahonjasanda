import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Paging from '../Pagination';
import IndexGraph from '../IndexGraph';
import ImageLinkButton from '../ImgButton/imagelinkbutton';
import Container from 'components/Container';

import { alpha, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Button from '@mui/material/Button';

const WithAvatarsAndMultilineContent = ({list}) => {
  const theme = useTheme();

  const router = useRouter();

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const Last = page * itemsPerPage;
  const First = Last - itemsPerPage;
  const currentItems = list.slice(First, Last);
  const totalPages = Math.ceil(list.length / itemsPerPage);
  const priceList = list.map(item=>item.sprice);
  const ClprList = priceList.map(item=>item.clpr);

  const handlePageChange = (newPage)=>{
    setPage(newPage);
  };

  const handleClick = (event, value) => {
    router.push(`/stock/view?searchvalue=${item.sname}`);
    getStockList(value, searchValue);
  }

  console.log("listlist", list);
  console.log("priceList",priceList);
  console.log("ClprList",ClprList);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: 'alternate.main' }}>
            <TableRow>
              <TableCell>
                <Typography
                  color={'text.secondary'}
                  variant={'caption'}
                  fontWeight={700}
                  sx={{ textTransform: 'uppercase' }}
                >
                  #
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  color={'text.secondary'}
                  variant={'caption'}
                  fontWeight={700}
                  sx={{ textTransform: 'uppercase' }}
                >
                  종목명
                </Typography>
              </TableCell>
              <TableCell >
                <Typography
                  color={'text.secondary'}
                  variant={'caption'}
                  fontWeight={700}
                  sx={{ textTransform: 'uppercase' }}
                >
                  Symbol
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  color={'text.secondary'}
                  variant={'caption'}
                  fontWeight={700}
                  sx={{ textTransform: 'uppercase' }}
                >
                  추세
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  color={'text.secondary'}
                  variant={'caption'}
                  fontWeight={700}
                  sx={{ textTransform: 'uppercase' }}
                >
                  현재가
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  color={'text.secondary'}
                  variant={'caption'}
                  fontWeight={700}
                  sx={{ textTransform: 'uppercase' }}
                >
                  등락률
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  color={'text.secondary'}
                  variant={'caption'}
                  fontWeight={700}
                  sx={{ textTransform: 'uppercase' }}
                >
                  시가총액
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  color={'text.secondary'}
                  variant={'caption'}
                  fontWeight={700}
                  sx={{ textTransform: 'uppercase' }}
                >
                  거래량ㆍ거래대금
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  color={'text.secondary'}
                  variant={'caption'}
                  fontWeight={700}
                  sx={{ textTransform: 'uppercase' }}
                >
                  MyStock
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <List sx={{ p: 0, m: 0 }}>
                    <ListItem sx={{ p: 0, m: 0 }}>
                      <ListItemText
                        primary={(page - 1) * itemsPerPage + index + 1}
                      />
                    </ListItem>
                  </List>
                </TableCell>
                <TableCell align="center">
                  <Typography>{item.sname}</Typography>
                </TableCell>
                <TableCell>
                  <List sx={{ p: 0, m: 0 }}>
                    <ListItem sx={{ p: 0, m: 0 }}>
                      <ListItemAvatar>
                        <Link href={`/stock/view?searchValue=${item.sname}`} passHref>
                          <Avatar sx={{ width: 70, height: 70}} src={`/images/stock/logo/${item.sname}.png`} alt={item.sname}/>
                        </Link>
                      </ListItemAvatar>
                      <ListItemText
                      />
                    </ListItem>
                  </List>
                </TableCell>
                <TableCell align="center" sx={{ width : '100px', height: '100px' }}>
                  <IndexGraph data={item.sprice.map((item) => item.clpr)} />
                </TableCell>
                <TableCell align="center">
                  <Typography>{parseInt(item.price).toLocaleString()}원</Typography>
                  <Typography color={String(item.sgap).startsWith('-') ? 'blue' : 'red'} variant={'subtitle2'}>
                    {parseInt(item.sgap).toLocaleString()}원
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={handleClick}
                    href={`/stock/view?searchValue=${item.sname}`}
                    style={{ backgroundColor: item.sgap < 0 ? 'blue' : 'red', color: 'white'}}>
                        {((parseFloat(item.sgap)/parseFloat(item.yprice))*100).toFixed(2)}%
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    color={'primary'}
                    variant={'subtitle2'}
                    fontWeight={700}
                    sx={{ cursor: 'pointer' }}
                  >
                    {item.total}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                <Typography>{item.volume}건</Typography>
                  <Typography
                    color={'primary'}
                    variant={'subtitle2'}
                    fontWeight={700}
                    sx={{ cursor: 'pointer' }}
                  >
                    {item.onevolume}
                  </Typography>
                </TableCell>
                <TableCell align="center" style={{ width: '70px', height: '70px' }} >
                  <ImageLinkButton
                    src="/images/stock/icon/wallet.png"
                    alt="Edit"
                    to="/stock/mystock"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paging count={totalPages} currentPage={page} onPageChange={handlePageChange}/>
    </Container>
  );
};

export default WithAvatarsAndMultilineContent;
