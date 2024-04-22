/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

// 우측 그림 이미지 및 디스크립션 = selectAll 랜덤으로 데이터 추출

const SidebarArticles = ( { data }) => {
  console.log('데이터 넘어왔나요? 전체 / 랜덤 데이터 확인@@@', data);
  console.log(typeof data);
  const router = useRouter();

  // 여기서도 클릭하면 주소 이동하게 만들어줌 
  const handleClick2 = (anno)=>{
    router.push({
      // getDetailData(value, searchValue);
      pathname: `/animal/${anno}`,
    });
    // getRandPlant(value, number);
  };

  const theme = useTheme();
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
        그 외 관련 유기동물
      </Typography>
      
      <Grid container spacing={2}>
      {data && Object.keys(data).slice(0,20).map((key, index) => {
          const item = data[key]
           return (
          <Grid  item xs={12}>
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
                  src={item.popfile}
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
                <Typography fontWeight={700}>{item.kindCd}</Typography>
                <Box marginY={1 / 7}>
                  <Typography
                    variant={'caption'}
                    color={'text.secondary'}
                    component={'i'}
                  >
                    발견 일자 - {item.happenDt}<br></br>
                    발견 장소 - {item.happenPlace}
                  </Typography>
                </Box>
                <Button onClick={() => handleClick2(item.anno)} size={'small'}>자세히 보기</Button>
              </CardContent>
            </Box>
            </Grid>
      )})}
      </Grid>
    </Box>
  );
};

export default SidebarArticles;
