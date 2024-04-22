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
import PetsIcon from '@mui/icons-material/Pets';

const Content = ( {data} ) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  console.log('데이터 넘어왔나요? 상세데이터 확인@@@', data);
  console.log(typeof data);
  const dataSet = data || {};

  const mock = [
    {
      image: dataSet.popfile,
      noticeComment: dataSet.specialMark,
      kindCd: dataSet.kindCd,
      sexCd: dataSet.sexCd,
      age: dataSet.age,
      weight: dataSet.weight,
      color: dataSet.colorCd, // 
      happenDt: dataSet.happenDt,
      happenPlace: dataSet.happenPlace,
      orgNm: dataSet.orgNm, // 관할기관
      careNm : dataSet.careNm,
      careTel : dataSet.careTel,
      processState : dataSet.processState,
      author: {
        name: '식물 치료 센터 바로가기 ',
        avatar: 'data:image/jpeg;base64,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',
      },
      // date: '04 Aug',
    }]

  const photos = [
    {
      // 중간 이미지 4컷  (popfile이 더 선명함)
      src:  dataSet.popfile,
      rows: 1,
      cols: 2,
    },
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
        <PetsIcon fontSize='large' sx={{ fontSize: 40, color: "burlywood" }}>
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
        </PetsIcon>
        {/* 이렇게 활용해서 끌고올수 있나?>?? */}
        &nbsp; 유기동물 상세 정보
      </Typography>
      <Box width={1} height={1} marginY={4}>
        <Box marginY={-2}>
          <ImageList cols={1} style={{ overflow: 'hidden' }}
            variant="quilted"
            // cols={3}
            rowHeight={isMd ? 300 : 220}
            row={isMd ? 300 : 220}
            gap={isMd ? 16 : 8}
          >
            {photos.map((item, i) => (
              <ImageListItem key={i} >
                <img
                  height={'100%'}
                  width={'100%'}
                  src={dataSet.popfile}
                  alt="..."
                  loading="lazy"
                  style={{
                    maxHeight: 400,
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
                marginY={0}
                gutterBottom
                sx={{ color: 'common.black' }}
                fontWeight={'bold'}

              >
                <BadgeIcon fontSize='large' sx={{color: "dark" }}>
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
                &nbsp; 기본 정보 <br></br>
              </Typography>
              <Typography
                marginY={2}
                fontSize={16}
                fontWeight={'bold'}
                color={'black'}
              >
                품종 :  {item.kindCd} <br></br>
                성별 :  {item.sexCd} <br></br>
                나이 :  {item.age} <br></br>
                색상 :  {item.color} <br></br>
                몸무게 :  {item.weight} <br></br>
                발견 일자 :  {item.happenDt} <br></br>
                발견 장소 :  {item.happenPlace} <br></br>
                관할 기관 :  {item.orgNm} <br></br>
              </Typography>
              <br></br>
              <Typography
                fontWeight={'bold'}
                variant={'h5'}
                color="text.secondary"
                margin={0}
                marginY={1}
                sx={{ color: 'common.black', opacity: .8 }}
              >
                <DescriptionIcon fontSize='large'>
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
                &nbsp; 특이 사항 및 보호소 정보
              </Typography>
              <Typography
                padding={0}
                margin={0}
                marginY={2}
                fontSize={18}
                fontWeight={'bold'}
                color={'black'}>
                특이 사항 : {item.noticeComment}<br></br>
                보호 상황 : {item.processState}<br></br>
                보호소 명 : {item.careNm}<br></br>
                보호소 연락처 : {item.careTel}
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
    </Box>
  );
};

export default Content;
