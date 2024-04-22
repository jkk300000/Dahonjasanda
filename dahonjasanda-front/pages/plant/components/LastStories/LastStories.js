import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
import { Container } from 'react-bootstrap';
import PageComponent from '../PageComponent';
import { useRouter } from 'next/router';

const LastStories = ({ data, totalPages, pageNumber, onChangePageHandler, pageable, onDetail, limit  }) => {
  console.log('LastStories 전체데이터 data 시작!!!:', data);
  console.log(typeof data); // 전체데이터 
  
  const limitedData = limit ? Object.keys(data).slice(0, limit).map(key => data[key]) : data;
  const router = useRouter();


  const handleClick = async (ptno) => {
    try {
      router.push({
        pathname: `/plant/${ptno}`,  // 주소 
      });
      const {query} = router;

      console.log('라우터 정보 확인 (여기는 라우터를 설정한 곳)', query);

    } catch (error) {
      console.log('상세 데이터를 불러오는 중 오류가 발생했습니다@@@:', error);
    }
  };

  const theme = useTheme();

  return (

    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={4}
      >
        <Box>
          <Typography fontWeight={700} variant={'h6'} gutterBottom>
            다양한 반려 식물을 만나보세요 
          </Typography>
          <Typography color={'text.secondary'}>
            식물 종류, 잎의 색상 등 다양하게 검색이 가능합니다.  
            {/* {totalElements} 개의 결과 */}
          </Typography>
        </Box>
        <Box display="flex" marginTop={{ xs: 2, md: 0 }}>

        </Box>
      </Box>
      <Grid container spacing={4}  >
        {limitedData.map((item, index) => {
          const imageUrls = item.rtnFileUrl.split('|');
          return (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ marginBottom: -15}} >
            <Box
              component={'a'}
              display={'block'}
              width={1}  //? 0.8 이나..1?
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <Box
                onClick={() => handleClick(item.ptno)}
                component={Card}
                width={1}
                height={0.7}
                boxShadow={7}
                display={'flex'}
                flexDirection={'column'}
                sx={{ backgroundImage: 'none', marginY: ''}}
              > 
              {console.log('이미지 확인', imageUrls[0])}
                <CardMedia
                  image={imageUrls[0]} 
                  title={item.cntntsSj}
                  sx={{
                    height: { xs: 300, md: 360 },
                    position: 'relative',
                  }}
                >
                  <Box
                    component={'svg'}
                    viewBox="0 0 2880 480"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      color: theme.palette.background.paper,
                      transform: 'scale(2)',
                      height: 'auto',
                      width: 1,
                      transformOrigin: 'top center',
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z"
                      fill="currentColor"
                    />
                  </Box>
                </CardMedia>
                <Box component={CardContent} position={'relative'} marginY={0}>
                  <Typography variant={'h6'} gutterBottom>
                    {item.cntntsSj}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.plntbneNm}
                  </Typography>
                  <Typography color="text.secondary" fontWeight={'bold'} textAlign={'right'}><br></br>
                    {item.fmlCodeNm}
                  </Typography>
                </Box>
                <Box flexGrow={1} />

              </Box>

            </Box>

          </Grid>
        )})}
      </Grid>
        <Container className="my-5" style={{ display: 'flex', justifyContent: 'center' }}>
          <PageComponent totalPages={totalPages} currentPage={pageNumber} onPageChange={onChangePageHandler}/>
        </Container>
    </Box>
  );
}
export default LastStories;