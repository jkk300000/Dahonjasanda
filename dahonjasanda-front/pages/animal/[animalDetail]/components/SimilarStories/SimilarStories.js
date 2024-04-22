import React from 'react';
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
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';

const mock = [
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img23.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    title: 'Eiusmod tempor incididunt',
    author: {
      name: 'Clara Bertoletti',
      avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg',
    },
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img24.jpg',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus',
    title: 'Sed ut perspiciatis',
    author: {
      name: 'Jhon Anderson',
      avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg',
    },
    date: '02 Aug',
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img25.jpg',
    description:
      'Qui blanditiis praesentium voluptatum deleniti atque corrupti',
    title: 'Unde omnis iste natus',
    author: {
      name: 'Chary Smith',
      avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
    },
    date: '05 Mar',
  },
];

const SimilarStories = (data) => {
  console.log('데이터 넘어왔나요? 전체 / 랜덤 데이터 확인@@@', data);
  console.log(typeof data);
  const dataSet = data || {};

  const theme = useTheme();
  return (
    <Box marginY={-5}>
      <Typography variant={'h4'} gutterBottom fontWeight={'bold'} textAlign={'center'}>
      <SmartDisplayIcon   sx={{ fontSize: 55, color: "red" }}>
          {/* credit: plus icon from https://heroicons.com/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
            />
          </svg>
        </SmartDisplayIcon>
      
        &nbsp; Youtube &nbsp;반려 동물과 더 가까워 질 수 있는 Tip 3
          </Typography>
        <br></br>
        <br></br>
      <Grid container spacing={4}>
        <Grid item lg={4} md={4} sm={6} xs={4}>
          <Typography variant={'h6'} gutterBottom>
            #반려동물을 위한 백색소음
          </Typography>
          <Box
            component={'a'}
            href={''}
            width={1}
            height={1}
            sx={{
              textDecoration: 'none',
              transition: 'all .2s ease-in-out',
              '&:hover': {
                transform: `translateY(-${theme.spacing(1 / 2)})`,
              },
            }}
          >
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Ot_ipiWPM6E?si=EHO3SVqd43XZgDr6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
          </Box>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={4}>
          <Typography variant={'h6'} gutterBottom>
            #가성비 좋은 강아지용품 BEST 10
          </Typography>
          <Box
            component={'a'}
            href={''}
            width={1}
            height={1}
            sx={{
              textDecoration: 'none',
              transition: 'all .2s ease-in-out',
              '&:hover': {
                transform: `translateY(-${theme.spacing(1 / 2)})`,
              },
            }}
          >
            <iframe width="560" height="315" src="https://www.youtube.com/embed/dR9kkMq7WVo?si=P8Ng1rZ74uv-WZFt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </Box>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={4}>
          <Typography variant={'h6'} gutterBottom>
            #유기견 입양, 꼭 알아야 할 꿀팁!!
          </Typography>
          <Box
            component={'a'}
            href={''}
            width={1}
            height={1}
            sx={{
              textDecoration: 'none',
              transition: 'all .2s ease-in-out',
              '&:hover': {
                transform: `translateY(-${theme.spacing(1 / 2)})`,
              },
            }}
          >
            <iframe width="560" height="315" src="https://www.youtube.com/embed/7eIi-vyiYDc?si=0CoH9cQ0GXscoH8a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </Box>
        </Grid>
      </Grid>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <hr></hr>
    </Box>
  );
};

export default SimilarStories;
