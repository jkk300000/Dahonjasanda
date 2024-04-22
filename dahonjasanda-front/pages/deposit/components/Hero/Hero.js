import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Container from 'components/Container';

const Hero = ({
  children,
  backgroundImage,
  titleText = "나에게 맞는 금융 상품을 찾아보세요!",
  subtitleText = "한눈에 금융 정보를 확인하고, 나에게 맞는 상품을 찾아보세요.",
  subtitleText2 = "예금, 적금, 연금, 주택담보대출, 개인신용대출, 전세대출 등 다양한 금융 상품을 비교해보세요.",
  opacity = 0
}) => {
  const theme = useTheme();
  const defaultImage = '/images/img3.jpg'; // 'public/images/backgrounds' 폴더 안의 기본 이미지 경로로 변경
  const imageUrl = backgroundImage ? `/images/${backgroundImage}` : defaultImage; // backgroundImage prop이 제공되면, 해당 이미지 경로를 사용

  return (
    <Box
      minHeight={300}
      height={"auto"}
      position={'relative'}
      sx={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
          opacity: opacity,
        },
        '@media (min-width: 1600px)': {
          backgroundSize: '1600px auto',
          backgroundPosition: 'center center',
        },
      }}
    >
      <Container
        zIndex={3}
        position={'relative'}
        minHeight={{ xs: 300, sm: 400, md: 600 }}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box sx={{ width: '100%', maxWidth: 1000 }}>
          <Box marginBottom={2}>
            <Typography
              variant="h3"
              align={'center'}
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
              }}
            >
            {titleText}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              align={'center'}
              sx={{
                color: theme.palette.common.white,
              }}
            >
              {subtitleText}
              <br />
              {subtitleText2}
              <br />
              <br />
            </Typography>
          </Box>
          {children}
        </Box>
      </Container>
      
    </Box>
  );
};

export default Hero;
