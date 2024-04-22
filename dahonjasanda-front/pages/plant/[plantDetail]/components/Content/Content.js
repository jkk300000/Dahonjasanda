/* eslint-disable react/no-unescaped-entities */
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import BadgeIcon from '@mui/icons-material/Badge';
import SpaIcon from '@mui/icons-material/Spa';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import YardIcon from '@mui/icons-material/Yard';
import GrassIcon from '@mui/icons-material/Grass';
import ForestIcon from '@mui/icons-material/Forest';
import DescriptionIcon from '@mui/icons-material/Description';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Content = ({detail}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  console.log('Detail 받아왔나???@@@@@@:', detail);
  console.log(typeof detail);
  const receivedData = detail || {};
  const imageData = receivedData.rtnFileUrl ? receivedData.rtnFileUrl.split('|') : [];
  const mainImageUrl = imageData[0]; // 첫 번째 이미지 URL
  const mainImageUrl2 = imageData[1]; // 첫 번째 이미지 URL

  const mock = [
    {
      image: 'https://images.chosun.com/resizer/5E4C922dJtUIZOBr1krGW0DTDsY=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/3FG6AZSKYRWAEHRSJVL62NAJ2Q.jpg',
      description: receivedData.fncltyInfo,
      description1: receivedData.adviseInfo,
      description2: receivedData.speclmanageInfo,

      description3: receivedData.grwhstleCodeNm,
      description4: receivedData.lefmrkCodeNm,
      description5: receivedData.lefcolrCodeNm,
      description6: receivedData.lefStleInfo,
      description7: receivedData.flclrCodeNm,
      description8: receivedData.smellCodeNm,
      description9: receivedData.toxctyInfo,
      description10: receivedData.ignSeasonCodeNm,
      description11: receivedData.grwtveCodeNm,
      description12: receivedData.orgplceInfo,
      description13: receivedData.managelevelCodeNm,

      title: receivedData.cntntsSj,
      // date: '04 Aug',
    }]

  const photos = [
    {
      // 중간 이미지 4컷
      src: mainImageUrl,
      rows: 1,
      cols: 2,
    },
    {
      src: mainImageUrl2,
      rows: 1,
      cols: 1,
    }
    // {
    //   src: 'https://www.nongsaro.go.kr/cms_contents/301/14699_MF_REPR_ATTACH_01.jpg',
    //   rows: 1,
    //   cols: 1,
    // },
    // {
    //   src: 'https://www.nongsaro.go.kr/cms_contents/301/14699_MF_ATTACH_03.jpg',
    //   rows: 1,
    //   cols: 2,
    // },
  ];
  <svg data-testid="LocalFloristIcon"></svg>

  return (
    <Box>

      <Typography
        variant={'h5'}
        color={'rosybrown'}
        align={'left'}
        fontWeight={'bold'}
      >

        {/* 이렇게 활용해서 끌고올수 있나?>?? */}

        {/* 몸과 마음을 위한 힐링 파트너로써 이 식물은 어떨까요? */}
      </Typography>
      {/* <Typography variant={'h5'} gutterBottom >
           
        </Typography> */}
      <Typography
        variant={'h5'}
        color={'black'}
        align={'left'}
        fontWeight={'bold'}
      >
       <LocalFloristIcon fontSize='large' sx={{ fontSize: 40, color: "olivedrab" }}>
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
      </LocalFloristIcon >
        {/* 이렇게 활용해서 끌고올수 있나?>?? */}
        &nbsp;식물명 : {receivedData.cntntsSj} | 영문명 : {receivedData.plntbneNm}
        {/* {receivedData.cntntsSj} */}
      </Typography>
      <Box width={1} height={1} marginY={4}>
        {/* <img
            height={'100%'}
            width={'100%'}
            // 오버뷰 아래 메인 이미지
            // src={'https://www.nongsaro.go.kr/portal/imgView.do?ep=a5gb/CMEYLclIUPoWw9/DbB57gkFsTGen/BoRw@@FvI1y0fGLKb5X4NQ2uaoJr/oVJfVLXCV1eYyTFHg31nAnw!!'}
            alt="Remote working"
            loading="lazy"
            style={{
              filter:
                theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
              objectFit: 'cover',
              borderRadius: 8,
              width: '100%',
              height: '100%',
              maxHeight: 400,
            }}
          /> */}
        <Box marginY={-2}>
          <ImageList
            variant="quilted"
            cols={3}
            rowHeight={isMd ? 300 : 220}
            gap={isMd ? 16 : 8}
          >
            {photos.map((item, i) => (
              <ImageListItem key={i} cols={item.cols || 2} rows={item.rows || 1}>
                <img
                  height={'100%'}
                  width={'100%'}
                  src={item.src}
                  alt="..."
                  loading="lazy"
                  style={{
                    objectFit: 'cover',
                    cursor: 'poiner',
                    borderRadius: 8,
                    filter:
                      theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        {mock.map((item, i) => (
          <Grid item xs={12} key={i}>
            <Box>
              <br></br>
              {/* 글 */}
              <Typography
                variant={'h5'}
                margin={0}
                gutterBottom
                sx={{ color: 'common.black' }}
                fontWeight={'bold'}
                
              ><BadgeIcon fontSize='large'>
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
            </BadgeIcon>
                {/* 제목 */}
                &nbsp;식물 정보 <br></br>

              </Typography>
              <Typography  
              marginY={2}
              fontSize={16}
              fontWeight={'bold'}
              color={'black'}>
                생육 형태 : {item.description3}   <br></br>
                {/* // 생육 형태 grwhstleCodeNm */}
                잎 무늬 : {item.description4}   <br></br>
                 {/* // 잎 무늬 lefmrkCodeNm */}
                잎 색 : {item.description5}  <br></br>
                {/* // 잎 색 lefcolrCodeNm */}
                잎 형태 : {item.description6}  <br></br>
                {/* // 잎 형태 lefStleInfo */}
                꽃 색 : {item.description7}  <br></br>
                {/* // 잎 색 lefcolrCodeNm */}
                냄새 및 독성 : {item.description8},{item.description9}   <br></br>
                {/* // 잎 색 lefcolrCodeNm */}
                발화 계절 : {item.description10}   <br></br>
                {/* // 발 화 계절 ignSeasonCodeNm */}
                생장 속도 : {item.description11}   <br></br>
                {/* // 생장 속도 grwtveCodeNm */}
                원산지 정보 : {item.description12}   <br></br>
                {/* // 원산지 정보 */}
                관리 수준 요구도 : {item.description13}   
                {/* // 관리 수준 요구도 managelevelCodeNm */}
                </Typography>
              <br></br>
              <Typography
                fontWeight={'bold'}
                variant={'h5'}
                color="text.secondary"
                margin={0}
                marginY={1}
                sx={{ color: 'common.black', opacity: .8 }}
              > <DescriptionIcon fontSize='large'>
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
            </DescriptionIcon>
            &nbsp;상세 설명
              </Typography>
              <Typography 
              marginY={2}
              fontSize={16}
              fontWeight={'bold'}
              color={'black'}>
              1. 조언 정보 : {item.description1}<br></br><br></br>
              2. 기능성 정보 : {item.description}<br></br><br></br>
              3. 특별 관리 정보 :  {item.description2}
              </Typography>
            </Box>
          </Grid>

        ))}
        {/* 오버뷰 끌고오면 아래는 삭제 */}
        {/* <Box paddingX={{ xs: 0, sm: 4, md: 6 }}>
        <Typography variant={'subtitle1'}>
          여기는 식물 overview가 들어가야하는데 말이죠
        </Typography>
        </Box> */}

        {/* <Box marginY={4}>
          <Typography variant={'h5'} gutterBottom>
            Big heading for a new topic
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
          <Box marginTop={2}>
            <ul>
              <li>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
              </li>
              <li>
                <Typography>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </li>
            </ul>
          </Box>
        </Box>
      </Box>
      
      <Box paddingX={{ xs: 0, sm: 4, md: 6 }} paddingBottom={4}>
        <Box>
          <Typography variant={'h5'} gutterBottom>
            Small heading for a smaller transition
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
        </Box> */}
      </Box>
      {/* <Box
        component={Card}
        boxShadow={2}
        display={'flex'}
        flexDirection={{ xs: 'column', md: 'row-reverse' }}
        sx={{ backgroundImage: 'none' }}
      >
        <Box
          sx={{
            width: { xs: 1, md: '50%' },
            position: 'relative',
          }}
        >
          <Box
            component={'img'}
            height={1}
            width={1}
            src={'https://assets.maccarianagency.com/backgrounds/img1.jpg'}
            alt="..."
            loading="lazy"
            sx={{
              objectFit: 'cover',
              maxHeight: 360,
              filter:
                theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
            }}
          />
          <Box
            component={'svg'}
            viewBox="0 0 112 690"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            sx={{
              position: 'absolute',
              bottom: 0,
              top: '-50%',
              left: 0,
              right: 0,
              color: theme.palette.background.paper,
              transform: 'scale(2)',
              height: 1,
              width: 'auto',
              transformOrigin: 'top center',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <path
              d="M0 0h62.759v172C38.62 384 112 517 112 517v173H0V0z"
              fill="currentColor"
            />
          </Box>
        </Box>
        <CardContent
          sx={{
            position: 'relative',
            width: { xs: 1, md: '50%' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant={'h6'} gutterBottom>
                  Download our sturtup giude
                </Typography>
                <Typography color={'text.secondary'}>
                  Small heading for a smaller transition
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Name *"
                  variant="outlined"
                  name={'name'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email *"
                  variant="outlined"
                  name={'email'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  size={'large'}
                  fullWidth
                  variant={'contained'}
                  type={'submit'}
                  sx={{ height: 54 }}
                >
                  Download
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Box> */}
      {/* <Box paddingX={{ xs: 0, sm: 4, md: 6 }} paddingY={4}>
        <Typography color={'text.secondary'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Typography>
      </Box> */}
      {/* <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
      </Box> */}
    </Box>
  );
};

export default Content;
