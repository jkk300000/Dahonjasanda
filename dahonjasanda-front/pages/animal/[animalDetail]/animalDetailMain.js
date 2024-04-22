import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  Content,
  PopularNews,
  Hero,
  SidebarArticles,
  SidebarNewsletter,
  SimilarStories,
} from './components';
import axios from 'axios';

const animalDetailMain = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const router = useRouter(); // 라우터 객체를 받아옴
  const { animalDetail } = router.query; // 라우터 쿼리를 { } 를 쓰면 끝까지 가져올 수 있음 
  console.log('쿼리 매개변수  animalDetail (anno) :', animalDetail); // check 

  const [detailAnimal, setDetailAnimal] = useState();
  const [allRandData, setAllRandData] = useState();


  useEffect(() => {
    if (!router.isReady) {  // 요게 없으면 라우터 객체가 준비되지 않아서 오류 발생!, 초기화하지 않았다는 의미 (길안내를 하기 위한 준비가 안되어있으면 오류남)
      return;                 // 라우터가 준비 상태가 아니라면 리턴; 꼭 같이 사용하도록 하자. 받아주는 의미로
    }
    // const test = router.query.plantDetail;
    // console.log('effect 안에서 확인하는 매개변수', test);
    getAnimalDetail();
    getAnimalAllRand(); 
    
  }, [router.query.animalDetail])  // 매개변수가 들어올때 마다 실행 ??? => 다른게 선택 될때 마다.



    // 상세 페이지 데이터 가져오기 (anno)
    const getAnimalDetail = async() => {   // 함수 실행 시켜줘야함
      const url = `http://localhost/animal/${animalDetail}`;  //  ${plantDetail} = 쿼리 매개변수 = anno
        console.log('@@@@@@@@@ anno 번호 확인 @@@@@@', animalDetail);
        console.log('@@@@@@@@@ anno url 확인 @@@@@@', url);
      const map = await axios.get(url);
      setDetailAnimal(map.data.animalDetail);
      // 처음에는 아무것도 없었다가 이쪽을 타면서 setDetail에 상세정보가 담겨서 다시 content로 넘어간다// 그래서 처음엔 빈 것이 찍혔다가 다시 값이 찍힘
      // setSideData(response.data.plantDetail);

      // 응답으로 받은 상세 데이터를 이용하여 특정 작업을 수행합니다.
        console.log('상세 데이터 넘어 왔는지 확인 필요@@ 동물 @@:', setDetailAnimal);
        console.log('상세 데이터 넘어 왔는지 확인 필요@@ 동물 @@:', map.data.animalDetail);

    }; // propsData가 변경될 때마다 useEffect가 실행되도록 설정
      

     // 전체 데이터 혹은 랜덤 데이터 가져오기 그런데, 몇개를 가져올 지 설정 해야 사이드바에서 잘 보여짐
     const getAnimalAllRand = async() => {
      const url = `http://localhost/animal?size=20`;
        console.log('url@@@@@@ 사이드바에 몇개 노출 시킬지 전체or 랜덤)리스트@@@@', url);
      const map = await axios.get(url);
      setAllRandData(map.data.listsearchAll.content);

      // 응답으로 받은 상세 데이터를 이용하여 특정 작업을 수행합니다.
        console.log('상세 데이터 넘어 왔는데용?5:', map);
        console.log('상세 데이터 넘어 왔는데용?6:', map.data.listsearchAll.content);

        // console.log('라우터 정보 확인 확인', plantDetail);
    }; // propsData가 변경될 때마다 useEffect가 실행되도록 설정
      

  return (
    <Main colorInvert={true}>
      <Box>
        <Hero />
        <Container>
          <Grid container spacing={7}>
            <Grid item xs={2} md={8}>
              <Content data={detailAnimal}/>
            
            </Grid>
            <Grid item xs={12} md={4}>
              {isMd ? (
                <Box marginBottom={4}>
                  <SidebarArticles data={allRandData}/>
                </Box>
              ) : null}
              {/* <SidebarNewsletter /> */}
            </Grid>
            <Container></Container>
            {/* <Grid item xs={12} md={8}> */}
              <PopularNews data={detailAnimal}/>
            {/* </Grid> */}
          </Grid>
        </Container>
        {/* <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            marginBottom: -1,
            width: 1,
          }}
        >
          <path
            fill={theme.palette.alternate.main}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box> */}
      <Box bgcolor={'alternate.main'}>
        <Container>
          <SimilarStories />
        </Container>
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            marginBottom: -1,
            width: 1,
          }}
        >
          <path
            fill={theme.palette.background.paper}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
      </Box>
      </Box>
    </Main>
  );
};

export default animalDetailMain;
