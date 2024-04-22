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
    image: 'https://images.chosun.com/resizer/5E4C922dJtUIZOBr1krGW0DTDsY=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/3FG6AZSKYRWAEHRSJVL62NAJ2Q.jpg',
    description:
      '반려 식물 전문 치료 센터에서 치료받으세요! ',
    title: '제 반려 식물이 아픈데 어떻게 하죠?',
    url: 'https://agro.seoul.go.kr/archives/46439',
    author: {
      name: '식물 치료 센터 바로가기 ',
      avatar: 'data:image/jpeg;base64,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',
    },
    // date: '04 Aug',
  },
  {
    image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcB1d7G%2Fbtq6JwMtJPi%2FueDSH0Bxauu0qmeAofHP30%2Fimg.jpg',
    description:
      '나에게도 새로운 가족이, 유기 동물에게도 새로운 가족이 되어주세요',
    title: '반려 동물 좋아하시나요? 새로운 가족을 만나보세요!',
    url: 'http://localhost:3000/animal',
    author: {
      name: '유기 동물 페이지 바로가기',
      avatar: 'https://previews.123rf.com/images/editiinkamu/editiinkamu2008/editiinkamu200800001/155129220-%EC%95%A0%EC%99%84%EB%8F%99%EB%AC%BC-%EA%B0%80%EA%B2%8C-%EA%B1%B4%EB%AC%BC-%EB%B2%A1%ED%84%B0-%EC%95%84%EC%9D%B4%EC%BD%98-%EA%B7%B8%EB%A6%BC-%EA%B1%B4%EB%AC%BC-%EB%B0%8F-%EB%9E%9C%EB%93%9C%EB%A7%88%ED%81%AC-%EC%95%84%EC%9D%B4%EC%BD%98-%EA%B0%9C%EB%85%90.jpg',
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
        marginBottom={4}
      >
        <Box>
        <Typography fontWeight={700} variant={'h6'} gutterBottom>
            새로운 가족을 위한 안내
          </Typography>
          <Typography color={'text.secondary'}>
            반려 동물, 치료 센터, 캘린더 등 가족을 위한 기타 안내 사항도 확인하세요!
          </Typography>
        </Box>
        <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
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
                      <Typography
                        color={'text.secondary'}
                        sx={{ color: 'common.white', opacity: 0.8 }}
                      >
                        {item.date}
                      </Typography>
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
