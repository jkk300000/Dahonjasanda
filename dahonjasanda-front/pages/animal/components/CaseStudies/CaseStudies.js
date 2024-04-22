import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

// 하단 popular
const mock = [
  {
    //https://agro.seoul.go.kr/archives/46439 치료센터 링크;
    image: 'https://previews.123rf.com/images/yupiramos/yupiramos1812/yupiramos181200553/127275487-%EA%B0%9C-%EA%B2%80%EC%82%AC-%EB%8F%99%EB%AC%BC-%EB%B3%91%EC%9B%90-%EC%95%A0%EC%99%84-%EB%8F%99%EB%AC%BC-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8%EC%99%80-%ED%95%A8%EA%BB%98-%EC%9D%98%EC%82%AC.jpg',
    description:
      '반려 동물 병원에서 치료받으세요! ',
    title: '제 반려 동물이 아픈데 어떻게 하죠?',
    url: 'https://www.vipah.co.kr/kr/index.php',
    author: {
      name: '반려 동물 병원 바로가기 ',
      avatar: 'https://png.pngtree.com/template/20191005/ourlarge/pngtree-vector-logo-for-veterinary-clinic-logo-for-a-pet-shop-logo-image_314599.jpg',
    },
    // date: '04 Aug',
  },
  {
    image: 'https://i.pinimg.com/736x/f1/87/0b/f1870bcef137481345d8e626b8f6d14f.jpg',
    description:
      '향긋한 식물들과 가족이 되어, 초록색 힐링을 만끽하세요',
    title: '식물 좋아하시나요? 향기 가득한 가족을 만나보세요!',
    url: 'http://localhost:3000/plant',
    author: {
      name: '나의 반려 식물 알아보기',
      avatar: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/04/logoyogo-1-76.jpg',
    },
    // date: '12 Sep',
  },
];

const CaseStudies = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={1}
      >
        <Box>
          <Typography fontWeight={700} variant={'h6'} gutterBottom>
            새로운 가족을 위한 안내
          </Typography>
          <Typography color={'text.secondary'}>
            반려 식물, 치료 센터, 캘린더 등 가족을 위한 기타 안내 사항도 확인하세요!
          </Typography>
          <br></br>
        </Box>
        <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
          {/* <Box
            component={Button}
            variant="outlined"
            color="primary"
            size="large"
            marginLeft={2}
          >
            View all
          </Box> */}
        </Box>
      </Box>
      <Grid container spacing={4}>
        {mock.map((item, i) => (
          <Grid item xs={12} key={i}>
            <Box
              component={'a'}
              href={item.url}
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
                justifyContent={{
                  xs: 'center',
                  md: i % 2 === 1 ? 'flex-end' : 'flex-start',
                }}
                sx={{
                  minHeight: 300,
                  backgroundImage: `url("${item.image}")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  '&:after': {
                    position: 'absolute',
                    content: '" "',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 1,
                    background: '#161c2d',
                    opacity: 0.5,
                  },
                }}
              >
                <CardContent
                  sx={{
                    position: 'relative',
                    width: { xs: 1, md: '50%' },
                    height: 0,
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: 2,
                  }}
                >
                  <Box>
                    {/* 글 */}
                    <Typography
                      variant={'h5'}
                      margin={2}
                      gutterBottom
                      sx={{ color: 'common.white' }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      margin={2}
                      sx={{ color: 'common.white', opacity: .8 }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                  <Box>

                    <Divider
                      sx={{
                        marginX: 2,
                        marginY: 2,
                        borderColor: 'common.white',
                        opacity: 0.4,
                      }}
                    />
                    {/* 카드 하단 선 */}
                    <Box
                      margin={2}
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >

                      <Box display={'flex'} alignItems={'center'}>
                        <Avatar
                          src={item.author.avatar}
                          sx={{ marginRight: 1 }}
                        />
                        <Typography
                          color={'text.secondary'}
                          sx={{ color: 'common.white', opacity: 0.8 }}
                        >
                          {item.author.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CaseStudies;
