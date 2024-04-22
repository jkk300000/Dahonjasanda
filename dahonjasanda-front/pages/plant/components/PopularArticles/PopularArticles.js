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
import Pagination from '@mui/material/Pagination';

const mock = [
  {
    image: 'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/970/6e20693d0ed9457568b95a9e8dd72951_res.jpeg',
    title:
      '[일반글] 우리 식물이를 소개 합니다!!!',
    title2: 'Eiusmod tempor incididunt',
    url2 : 'http://localhost:3000/plantBoard/view?bno=51',
    url : 'http://localhost:3000/plantBoard',
    author: {
      name: 'Clara Bertoletti',
      avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg',
    },
  },
  {
    image: 'https://thumb.mtstarnews.com/06/2023/04/2023042018142885465_1.jpg/dims/optimize',
    title: '[질문] 식물 영양제 가격 얼마인가요?',
    title2: 'Sed ut perspiciatis',
    url2 : 'http://localhost:3000/plantBoard/view?bno=53',
    author: {
      name: 'Jhon Anderson',
      avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg',
    },
    date: '02 Aug',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmUCBLuP9hHezOTuldb6QttQ26bHYDPmIo_Q&usqp=CAU',
    title:
      '[일반글] 제가 기르는 식물 한번 보고 가세요!',
    title2: 'Unde omnis iste natus',
    url2 : 'http://localhost:3000/plantBoard/view?bno=38',
    author: {
      name: 'Chary Smith',
      avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
    },
    date: '05 Mar',
  },
];

const PopularArticles = () => {
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
            인기 게시글
          </Typography>
          <Typography color={'text.secondary'}>
            1인 가구 회원들이 올려놓은 식물 소개글입니다
          </Typography>
        </Box>
        <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
          <Box
            href='http://localhost:3000/plantBoard'
            component={Button}
            variant="outlined"
            color="primary"
            size="large"
            marginLeft={2}
          >
            전체보기
          </Box>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {mock.map((item, i) => (
          <Grid item xs={12} sm={i === 0 ? 12 : 6} md={i < 2 ? 4 : 4} key={i}>
            <Box
              component={'a'}
              href={item.url2}
              display={'block'}
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
              <Box
                component={Card}
                width={1}
                height={1}
                boxShadow={4}
                display={'flex'}
                flexDirection={'column'}
                sx={{ backgroundImage: 'none' }}
              >
                <CardMedia
                  image={item.image}
                  title={item.title}
                  sx={{
                    height: { xs: 300, md: 360 },
                    position: 'relative',
                  }}
                >
                  <Box
                    component={'svg'}
                    viewBox="0 0 0 480"
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
                  </Box>
                </CardMedia>
                <Box component={CardContent} position={'relative'}>
                  <Typography variant={'h7'} gutterBottom>
                    {item.title}
                  </Typography>
                </Box>
                <Box flexGrow={1} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularArticles;
