/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
// 우측 그림 이미지 및 디스크립션 = selectAll 랜덤으로 데이터 추출

const SidebarArticles = ({rand}) => {
  const theme = useTheme();
  console.log('Rand(전체리스트) 받아왔나???여기는 사이드 바 입니다. 데이터 넘겨받은 곳@@@@@@:', rand);
  console.log(typeof rand); 
  const router = useRouter();

  // 여기서도 클릭하면 주소 이동하게 만들어줌 
  const handleClick2 = (ptno)=>{
    router.push({
      // getDetailData(value, searchValue);
      pathname: `/plant/${ptno}`,
    });
    // getRandPlant(value, number);
  };

  return (
    <Box component={Card} variant={'outlined'} padding={2} sx={{ maxHeight: 600, overflowY: 'auto' }}>
      <Typography
        variant="h6"
        data-aos={'fade-up'}
        sx={{
          fontWeight: 700,
          marginBottom: 5,
        }}
      >
        그 외 관련 식물
      </Typography>
      <Grid container spacing={2}>
      {rand && Object.keys(rand).slice(0,20).map((key, index) => {
          const item = rand[key]
           const imageUrls = item.rtnFileUrl.split('|');
           return (
          <Grid item xs={12}>
            {/* key={i}  */}
            <Box
              component={Card}
              width={1}
              height={1}
              boxShadow={0}
              borderRadius={0}
              display={'flex'}
              flexDirection={{ xs: 'column', md: 'row' }}
              sx={{ backgroundImage: 'none', bgcolor: 'transparent' }}
            >
              <Box
                sx={{
                  width: { xs: 1, md: '50%' },
                }}
              >
                <Box
                  component={'img'}
                  loading="lazy"
                  height={1}
                  width={1}
                  src={imageUrls[0]}
                  alt="..."
                  sx={{
                    objectFit: 'cover',
                    maxHeight: 120,
                    borderRadius: 2,
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(0.7)'
                        : 'none',
                  }}
                />
              </Box>
              <CardContent
                sx={{ padding: 1, '&:last-child': { paddingBottom: 1 } }}
              >
                <Typography fontWeight={700}>{item.fmlCodeNm}</Typography>
                <Box marginY={1 / 4}>
                  <Typography
                    variant={'caption'}
                    color={'text.secondary'}
                    component={'i'}
                  >
                    {item.cntntsSj}
                  </Typography>
                </Box>
                <Button 
                 onClick={() => handleClick2(item.ptno)}
                size={'small'} 
                >자세히 보기</Button>
              </CardContent>
            </Box>
          </Grid>
        )})}
      </Grid>
    </Box>
  );
};

export default SidebarArticles;
