import React, { useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import Container from 'components/Container';

const Hero = () => {
  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll('.jarallax');
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await import('jarallax');
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    jarallaxInit();
  });

  return (
    <Box
      className={'jarallax'}
      data-jarallax
      data-speed="0.2"
      position={'relative'}
      minHeight={{ xs: 400, sm: 500, md: 600 }}
      display={'flex'}
      marginTop={-13}
      paddingTop={13}
      alignItems={'center'}
      id="agency__portfolio-item--js-scroll"
    >
      <Box
        className={'jarallax-img'}
        sx={{
          position: 'absolute',
          objectFit: 'cover',
          /* support for plugin https://github.com/bfred-it/object-fit-images */
          fontFamily: 'object-fit: cover;',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundImage:
            'url(https://blog.kakaocdn.net/dn/cB1d7G/btq6JwMtJPi/ueDSH0Bxauu0qmeAofHP30/img.jpg)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 1,
          height: 1,
          background: alpha('#161c2d', 0.6),
          zIndex: 1,
        }}
      />
      <Container position={'relative'} zIndex={2}>
        <Box>
          <Typography
            variant="h3"
            sx={{
              // position:'centers',
              fontWeight: 450,
              color: 'common.white',
              marginBottom: 3,
              marginLeft: 20,
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 프로필, 보호 시설, 특징 등<br></br>
             예비 가족을 위해 조금 더 자세히 알아보아요!
          </Typography>
          {/* <Box display={'flex'} alignItems={'center'}>
            <Avatar
              sx={{ width: 60, height: 60, marginRight: 2 }}
              src={'https://assets.maccarianagency.com/avatars/img3.jpg'}
            />
            <ListItemText
              sx={{ margin: 0 }}
              primary={'Jhon Anderson'}
              secondary={'May 19, 2021'}
              primaryTypographyProps={{
                variant: 'h6',
                sx: { color: 'common.white' },
              }}
              secondaryTypographyProps={{
                sx: { color: alpha('#ffffff', 0.8) },
              }}
            />
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
