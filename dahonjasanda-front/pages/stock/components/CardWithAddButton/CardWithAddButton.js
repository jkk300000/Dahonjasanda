import React, { useEffect, useState } from 'react';
import IndexGraph from '../IndexGraph';

import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

import Container from 'components/Container';

export const graph = [863, 854, 867, 869, 870, 864, 866, 858, 858, 859,
                      853, 845, 827, 812, 807, 808, 815, 799, 799, 819,
                      819, 837, 824, 836, 840, 840, 843, 840, 833, 855,
                      860, 868, 883, 875, 885, 879];
export const graph1 = [2652, 2625, 2647, 2668, 2664, 2653, 2658, 2680, 2649, 2614,
                      2620, 2650, 2620, 2610, 2576, 2591, 2615, 2542, 2497, 2499,
                      2501, 2479, 2470, 2470, 2479, 2464, 2473, 2440, 2436, 2498,
                      2526, 2525, 2540, 2542, 2561, 2568];
export const graph2 = [1814.19, 1804.95, 1841.44, 1824.93, 1815.73, 1802.17, 1817.69, 1792.35, 1789.84, 1795.11,
                      1813.93, 1785.57, 1792.85, 1769.76, 1783.06, 1802.13, 1796.36, 1786.58, 1790.09,
                      1812.42, 1785.82, 1767.5, 1769.26, 1793.1, 1773.78, 1770.26, 1746.92, 1777.04, 1717.31,
                      1717.31, 1691.46, 1699.99, 1702.76, 1682.18, 1681.67, 1680.67, 1688.7];

const CardWithAddButton = ({ list }) => {
  const theme = useTheme();

  const kosdaqList = list.filter(item => item.indexname === '코스닥');
  const kosdaqClprList = kosdaqList.map(item => item.clpr);
  const kospiList = list.filter(item => item.indexname === '코스피');
  const kospiClprList = kospiList.map(item => item.clpr);
  const kospi200List = list.filter(item => item.indexname === '코스피 200 선물지수');
  const kospi200ClprList = kospi200List.map(item => item.clpr);
  const kospidateList = kospiList.map(item => item.sdate);
  const kosdaqdateList = kosdaqList.map(item => item.sdate);
  const kospi200dateList = kospi200List.map(item => item.sdate);
  
  const pvalue = kospiClprList[kospiClprList.length -1];
  const dvalue = kosdaqClprList[kosdaqClprList.length -1];
  const prvalue = kospi200ClprList[kospi200ClprList.length -1];
  const pchangeValue = kospiClprList[kospiClprList.length -2] - pvalue;
  const dchangeValue = kosdaqClprList[kosdaqClprList.length -2] - dvalue;
  const prchangeValue = kospi200ClprList[kospi200ClprList.length -2] - prvalue;
  const prate = ((pchangeValue / pvalue) * 100).toFixed(2)
  const drate = ((dchangeValue / dvalue) * 100).toFixed(2)
  const prrate = ((prchangeValue / prvalue) * 100).toFixed(2)
  const pdate = kospidateList[0];
  const ddate = kosdaqdateList[0];
  const prdate = kospi200dateList[0];

  return (
    <Box bgcolor={'alternate.main'}>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Card sx={{ p: { xs: 4, md: 4 }, height: '100%', width: '45%', border: '1px solid #ccc' }}>
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', sm: 'row' }}
              flex={'1 1 100%'}
              justifyContent={{ sm: 'space-between' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              marginBottom={4}
            >
              <Box marginBottom={{ xs: 2, sm: 0 }} flex={'1 1 100%'}>
                <Typography variant={'h3'} fontWeight={400}>
                  코스피
                </Typography>
                <Typography variant={'h4'} color={pchangeValue <= 0 ? 'blue' : 'red'}>
                  {pvalue}
                </Typography>
                <Typography variant={'h6'} color={pchangeValue <= 0 ? 'blue' : 'red'}>
                  {prate}% {pchangeValue.toFixed(2)}p
                </Typography>
                <IndexGraph data={kospiClprList}/>
                <Typography variant={'h6'} fontWeight={100} sx={{ textAlign: 'right' }}>
                  {pdate}기준
                </Typography>
              </Box>
            </Box>
          </Card>
          <Card sx={{ p: { xs: 4, md: 4 }, height: '100%', width: '45%', border: '1px solid #ccc' }}>
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', sm: 'row' }}
              flex={'1 1 100%'}
              justifyContent={{ sm: 'space-between' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              marginBottom={4}
              height={'100%'}
            >
              <Box marginBottom={{ xs: 2, sm: 0 }} flex={'1 1 100%'} >
                <Typography variant={'h3'} fontWeight={400}>
                  코스닥
                </Typography>
                <Typography variant={'h4'} color={dchangeValue <= 0 ? 'blue' : 'red'}>
                  {dvalue}
                </Typography>
                <Typography variant={'h6'} color={dchangeValue <= 0 ? 'blue' : 'red'}>
                  {drate}% {dchangeValue.toFixed(2)}p
                </Typography>
                <IndexGraph data={kosdaqClprList} height={100}/>
                <Typography variant={'h6'} fontWeight={100} sx={{ textAlign: 'right'}}>
                  {ddate}기준
                </Typography>
              </Box>
            </Box>
          </Card>
          <Card sx={{ p: { xs: 4, md: 4 }, height: '100%', width: '45%', border: '1px solid #ccc' }}>
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', sm: 'row' }}
              flex={'1 1 100%'}
              justifyContent={{ sm: 'space-between' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              marginBottom={4}
              height={'100%'}
            >
              <Box marginBottom={{ xs: 2, sm: 0 }} flex={'1 1 100%'} >
                <Typography variant={'h3'} fontWeight={400}>
                  코스피 선물
                </Typography>
                <Typography variant={'h4'} color={prchangeValue <= 0 ? 'blue' : 'red'}>
                  {prvalue}
                </Typography>
                <Typography variant={'h6'} color={prchangeValue <= 0 ? 'blue' : 'red'}>
                  {prrate}% {prchangeValue.toFixed(2)}p
                </Typography>
                <IndexGraph data={kospi200ClprList} height={100}/>
                <Typography variant={'h6'} fontWeight={100} sx={{ textAlign: 'right'}}>
                  {prdate}기준
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default CardWithAddButton;
