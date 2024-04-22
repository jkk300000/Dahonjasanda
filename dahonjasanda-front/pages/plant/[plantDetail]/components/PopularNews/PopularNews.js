/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import EventNoteIcon from '@mui/icons-material/EventNote';


const PopularNews = ( {detail} ) => {

  console.log('Detail(아래입력내용) 받아왔나???@@@@@@:', detail);
  console.log(typeof detail);
  const receivedData = detail || {};
  const imageData = receivedData.rtnFileUrl ? receivedData.rtnFileUrl.split('|') : [];
  const regex = /,\s*(?![^()]*\))/g; // 괄호 안의 쉼표는 무시하는 정규식
  const lightCode = receivedData.lighttdemanddoCodeNm ? receivedData.lighttdemanddoCodeNm.split(regex) : [];
  const setCode = receivedData.postngplaceCodeNm ? receivedData.postngplaceCodeNm.split(regex) : [];
  const mainImageUrl = imageData[0]; // 첫 번째 이미지 URL
  const mainImageUrl2 = imageData[1]; // 첫 번째 이미지 URL

  const title = [
    {title: receivedData.cntntsSj,
  }
  ]
  
  const mock = [
    {
      image: 'https://previews.123rf.com/images/shmakova/shmakova2111/shmakova211100113/178616023-%ED%86%A0%EB%A7%88%ED%86%A0-%EC%84%B1%EC%9E%A5-%EB%8B%A8%EA%B3%84-%EC%A0%95%EC%9B%90-%EC%8B%9D%EB%AC%BC-%EC%9E%AC%EB%B0%B0-%EC%8B%9D%EB%AC%BC-%EA%B4%80%EB%A6%AC-%ED%94%8C%EB%9E%AB-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4.jpg',
      description:
        receivedData.watercycleSprngCodeNm,
      description2:
        receivedData.watercycleSummerCodeNm,
      description3:
        receivedData.watercycleAutumnCodeNm,
      description4:
        receivedData.watercycleWinterCodeNm,
      description5: // 광도
        receivedData.lighttdemanddoCodeNm,
      description6: // 위치
        receivedData.postngplaceCodeNm,
      title: '물 주기 관리 정보', //건들지말기
      // watercycleSummerCode , lighttdemanddoCodeNm, postngplaceCodeNm:, grwhTpCodeNm, winterLwetTpCodeNm, frtlzrInfo등 다양한 데이터 끌고오기
      tags: ['봄', '여름', '가을', '겨울'],
      author: {
        name: 'Clara Bertoletti',
        avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
      },
      date: '04 Aug',
    },
  ];
  
  const mock2 = [
    {
      image: 'https://img.freepik.com/premium-vector/flowers-store-and-plants-shop-with-florists-care-organic-natural-products-for-home-garden-green-decoration-in-flat-background-vector-illustration_2175-2809.jpg?w=360',
      description7: receivedData.soilInfo, // 토양정보 soilInfo
      description8: receivedData.dlthtsManageInfo, // 병충해 정보 dlthtsManageInfo
      description9: receivedData.hdcode,// 습도 정보 hdcode
      description10: receivedData.frtlzrInfo, // 비료 정보 frtlzrInfo
      description11: receivedData.grwhTpCodeNm,// 생육 온도 grwhTpCodeNm
      description12: receivedData.prpgtmthCodeNm,// 번식 방법grwhTpCodeNm
      title: '성장 및 관리 정보',
      // watercycleSummerCode , lighttdemanddoCodeNm, postngplaceCodeNm:, grwhTpCodeNm, winterLwetTpCodeNm, frtlzrInfo등 다양한 데이터 끌고오기
      tags: ['토양', '비료', '병충해', '키우기 온도'],
      author: {
        name: 'Clara Bertoletti',
        avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
      },
      date: '04 Aug',
    },
  ];
  const mock3 = [
    {
      image: 'https://img.freepik.com/premium-vector/man-caring-about-potted-house-plants-young-guy-spraying-water-on-houseplants-leaf-happy-person-growing-green-home-decoration-and-cute-cat-flat-vector-illustration-isolated-on-white-background_633472-1105.jpg',
      description12:
        receivedData.winterLwetTpCodeNm, // 겨울 철온도 winterLwetTpCodeNm
      title: '광 요구도, 온도 식물 배치 ',
      // watercycleSummerCode , lighttdemanddoCodeNm, postngplaceCodeNm:, grwhTpCodeNm, winterLwetTpCodeNm, frtlzrInfo등 다양한 데이터 끌고오기
      tags: ['햇빛', '광도', '위치', '실내'],
      author: {
        name: 'Clara Bertoletti',
        avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
      },
      date: '04 Aug',
    },
  ];
  
  const theme = useTheme();
  return (
  <Grid container spacing={4}>
    {title.map((item, i) => (
      <Grid item xs={12} key={i}>
          <Box marginBottom={4}>
          
          <Typography
            variant="h4"
            data-aos={'fade-up'}
            align={'center'}
            gutterBottom
            sx={{fontWeight: 700,}}
          >
                {/* 제목 */}
                {/* [반려식물 관리 방법] <br></br>  */}
                <br></br>
                <EventNoteIcon fontSize='large' sx={{ color: "brown" }}>
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
        </EventNoteIcon>
                {item.title}, 이렇게 관리하세요!!
          </Typography>
        </Box>
    
          <Typography
            variant="h6"
            color={'text.secondary'}
            align={'center'}
            data-aos={'fade-up'}
          >
            <br />
          </Typography>
          {/* 식물 상세 데이터 갖고와서 넣기 */}
        <Grid container spacing={4}>
            <Grid key={i} item xs={12}>
          {mock.map((item, i) => (
              <Box
                component={Card}
                width={1}
                height={1}
                borderRadius={0}
                boxShadow={0}
                display={'flex'}
                flexDirection={{
                  xs: 'column',
                  md: i % 2 === 0 ? 'row-reverse' : 'row',
                }}
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
                    src={item.image}
                    alt="..."
                    sx={{
                      paddingX: { xs: 1, sm: 2, md: 5 },
                      objectFit: 'cover',
                      maxHeight: 290,
                      borderRadius: 1,
                      filter:
                        theme.palette.mode === 'dark'
                          ? 'brightness(0.7)'
                          : 'none',
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    paddingX: { xs: 1, sm: 2, md: 8 },
                    paddingY: { xs: 2, sm: 0 },
                    width: { xs: 1, md: '50%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Box marginX={2} >
                    {item.tags.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        component="a"
                        href=""
                        clickable
                        size={'small'}
                        color={'primary'}
                        sx={{ marginBottom: 1, marginRight: 1 }}
                      />
                    ))}
                  </Box>
                  <Typography marginX={2}
                    variant={'h6'}
                    fontWeight={700}
                    sx={{ textTransform: 'uppercase'}}
                  >
                    {item.title} 
                  </Typography>
                  <Box marginY={1} marginX={2}>
                    <Typography
                      // variant={''}
                      // color={'text.secondary'}
                      // component={'i'}
                    >
                      봄 철 물주기 방식 : {item.description}<br></br>
                      여름철 물주기 방식 : {item.description2}<br></br>
                      가을철 물주기 방식 : {item.description3}<br></br>
                      겨울철 물주기 방식 : {item.description4}<hr></hr>
                    </Typography>
                  </Box>
                  {/* <Typography color="text.secondary" marginX={2}>
                     기능성 정보 : {item.description}
                  </Typography>
                  <Typography color="text.secondary" marginX={2}>
                     기능성 정보 : {item.description}
                  </Typography>
                  <Typography color="text.secondary" marginX={2}>
                     기능성 정보 : {item.description}
                  </Typography> */}
                  <Box marginTop={2} display={'flex'} justifyContent={'flex-end'}>
                  </Box>
                </CardContent>
              </Box>
          ))}
          </Grid>
        </Grid>
        <br></br>
          <Grid container spacing={4}>
          {mock2.map((item, i) => (
            <Grid key={i} item xs={12}>
              <Box marginX={2}
                component={Card}
                width={1}
                height={1}
                borderRadius={0}
                boxShadow={0}
                display={'flex'}
                flexDirection={{
                  xs: 'column',
                  md: i % 1 === 0 ? 'row' : 'row-reverse',
                }}
                sx={{ backgroundImage: 'none', bgcolor: 'transparent' }}
              >
                <Box
                  sx={{
                    width: { xs: 1, md: '50%' },
                  }}
                ><br></br>
                  <Box
                    component={'img'}
                    loading="lazy"
                    height={1}
                    width={1}
                    src={item.image}
                    alt="..."
                    sx={{
                      paddingX: { xs: 1, sm: 2, md: 5 },
                      objectFit: 'cover',
                      maxHeight: 250,
                      borderRadius: 2,
                      filter:
                        theme.palette.mode === 'dark'
                          ? 'brightness(0.7)'
                          : 'none',
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    paddingX: { xs: 1, sm: 2, md: 8 },
                    paddingY: { xs: 2, sm: 0 },
                    width: { xs: 1, md: '50%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Box>
                    {item.tags.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        component="a"
                        href=""
                        clickable
                        size={'small'}
                        color={'primary'}
                        sx={{ marginBottom: 1, marginRight: 1 }}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant={'h6'}
                    fontWeight={700}
                    sx={{ textTransform: 'uppercase'}}
                  >
                    {item.title} 
                  </Typography>
                  <Box marginY={1}>
                    <Typography
                      // variant={'caption'}
                      // color={'text.secondary'}
                      // component={'i'}
                    >
                     토양 정보 : {item.description7}<br></br>
                     병충해 정보 : {item.description8}<br></br>
                     습도 정보 : {item.description9}<br></br>
                     비료 정보 : {item.description10}<br></br>
                     생육 온도 : {item.description11}<br></br>
                     번식 방법 : {item.description12}<br></br>
                    </Typography>
                  </Box>
                  <Box marginTop={2} display={'flex'} justifyContent={'flex-end'}>
                  </Box>
                </CardContent>
              </Box>
            </Grid>
          ))}
        </Grid>
        <br></br>
        <br></br>
        
         <Grid key={i} item xs={12}>
          {mock3.map((item, i) => (
              <Box
                component={Card}
                width={1}
                height={1}
                borderRadius={0}
                boxShadow={0}
                display={'flex'}
                flexDirection={{
                  xs: 'column',
                  md: i % 2 === 0 ? 'row-reverse' : 'row',
                }}
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
                    src={item.image}
                    alt="..."
                    sx={{
                      paddingX: { xs: 1, sm: 2, md: 5 },
                      objectFit: 'cover',
                      maxHeight: 290,
                      borderRadius: 1,
                      filter:
                        theme.palette.mode === 'dark'
                          ? 'brightness(0.7)'
                          : 'none',
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    paddingX: { xs: 1, sm: 2, md: 8 },
                    paddingY: { xs: 2, sm: 0 },
                    width: { xs: 1, md: '50%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Box marginX={2} >
                    {item.tags.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        component="a"
                        href=""
                        clickable
                        size={'small'}
                        color={'primary'}
                        sx={{ marginBottom: 1, marginRight: 1 }}
                      />
                    ))}
                  </Box>
                  <Typography marginX={2}
                    variant={'h6'}
                    fontWeight={700}
                    sx={{ textTransform: 'uppercase'}}
                  >
                    {item.title} 
                  </Typography>
                  <Box marginY={1} marginX={2}>
                    <Typography
                      // variant={''}
                      // color={'text.secondary'}
                      // component={'i'}
                    >
                      광 요구도 (광도)  : <br></br>
                      &nbsp;&nbsp; -  {lightCode[0]}<br></br>
                      &nbsp;&nbsp; -   {lightCode[1]}<br></br>
                      &nbsp; &nbsp;-  {lightCode[2]}<br></br>
                      식물 배치 장소    : <br></br>
                      &nbsp;&nbsp; -  {setCode[0]}<br></br>
                      &nbsp;&nbsp; -  {setCode[1]}<br></br>
                      &nbsp;&nbsp; - {setCode[2]}<br></br>
                      &nbsp;&nbsp; -  {setCode[3]}
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
          ))}
          </Grid>
      </Grid>
      
    ))}
    </Grid>
  );
};

export default PopularNews;
