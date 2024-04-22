import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
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
import { useRouter } from 'next/router';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const BlogArticle = ({onDetail}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const router = useRouter(); // 라우터 객체를 받아옴
  const { plantDetail } = router.query;  //쿼리 메개변수 가져옴 { }는 속성끝까지 들어가서 가져오는 것임
  const ptno =router.query.plantDetail; // ptno 사용안하는거같은데? 
  const { query } = router; // 이것도 사용 안하는중 

  console.log('쿼리 매개변수  plantDetail (ptno) :', plantDetail);


  // 아래에서 설장한 값으로  set 해주고 content로 넘기는 것
  const [detailData, setDetailData] = useState();
  const [randData, setRandData] = useState();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const test = router.query.plantDetail;
    console.log('effect 안에서 확인하는 매개변수', test);
    getPlantDetail();
    getRandPlant(); 
    
  }, [router.query.plantDetail])  // 매개변수가 들어올때 마다 실행 ??? => 다른게 선택 될때 마다.

    // router써서, url을 보낸 것이, 
    const getPlantDetail = async() => {
      const url = `http://localhost/plant/${plantDetail}`;
        console.log('@@@@@@@@@ptno@@@@@@', plantDetail);
        console.log('@@@@@@@@@ptno@@@@@@', url);
      const response = await axios.get(url);
      setDetailData(response.data.plantDetail);
      // 처음에는 아무것도 없었다가 이쪽을 타면서 setDetail에 상세정보가 담겨서 다시 content로 넘어간다// 그래서 처음엔 빈 것이 찍혔다가 다시 값이 찍힘
      // setSideData(response.data.plantDetail);

      // 응답으로 받은 상세 데이터를 이용하여 특정 작업을 수행합니다.
        console.log('상세 데이터 넘어 왔는데용?3@:', setDetailData);
        console.log('상세 데이터 넘어 왔는데용?3:', response);
        console.log('상세 데이터 넘어 왔는데용?4:', response.data.plantDetail);

        console.log('라우터 정보 확인Detail', plantDetail);
    }; // propsData가 변경될 때마다 useEffect가 실행되도록 설정
      
    // 몇개를 가져올 것인가
    const getRandPlant = async() => {
      const url = `http://localhost/plant?size=20`;
        console.log('url@@@@@@사이드바에 몇개 노출 시킬지 전체(랜덤)리스트@@@@', url);
      const map = await axios.get(url);
      setRandData(map.data.listsearchAll.content);

      // 응답으로 받은 상세 데이터를 이용하여 특정 작업을 수행합니다.
        console.log('상세 데이터 넘어 왔는데용?5:', map);
        console.log('상세 데이터 넘어 왔는데용?6:', map.data.listsearchAll.content);

        console.log('라우터 정보 확인Rand', plantDetail);
    }; // propsData가 변경될 때마다 useEffect가 실행되도록 설정
      
   
    //   useEffect(() => {
    //     console.log('라우터 정보 확인@@@@@@@@@', query);
    //     // 여기서 query를 사용한 로직을 구현할 수 있습니다.
    // }, [query]);


  // const [detailList, setDetailList] = useState();  // 전체 리스트 가져오기 위한 변수 할당
    
  // const handleReceiveData = (data) => {
  //   setReceiveData(data); // 검색 결과를 상태에 저장
  //   // 받은 데이터를 BlogArticles 컴포넌트로 전달
  //   console.log('다른 폴더로 데이터받음 @@@@@@@@', setReceiveData);
  // };
  // console.log('detailList@@@ :', detailList);
  // const handleDetail= (data) => { 
  //   setDetailList(data); // 검색 결과를 상태에 저장
  //   console.log('검증',data);
  //   console.log('검증 setDetailList 길이',setDetailList.length);
  //   console.log('검증 setDetailList 사이즈',setDetailList.size);
  //   console.log('검증 detailList 길이(여기서는 바뀌기 전 데이터 값이다.',Object.keys(detailList).length);
  //   console.log('검색 결과 데이터:', data);
  //   setDetailList(data);
  //   // setPageable(pageInfo); // 페이지 정보 설정
  // };
    // console.log('detailList@@@ :', detailList);
    // console.log('detailList :', detailList);
  // const displayList = searchResults.length > 0 ? searchResults : plantList;
  // 전체리스트가 보여지고있고, 검색 결과를 가져와서 그위에 검색리스트로 변환
  


  return (
    <Main colorInvert={true}>
      <Box>
        <Hero />
        <Container>
          <Grid container spacing={7}>
            <Grid item xs={2} md={8}>
              <Content detail={detailData} />
            </Grid>
            <Grid item xs={12} md={4}>
              {isMd ? (
                <Box marginBottom={4}>
                  <SidebarArticles rand={randData} detail={detailData}/>
                </Box>
              ) : null}
              {/* <SidebarNewsletter /> */}
            </Grid>
            {/* <Grid item xs={12} md={8}> */}
              <PopularNews detail={detailData} />
            {/* </Grid> */}
          </Grid>
        </Container>
      <Box bgcolor={'alternate.main'}>
        <Container>
          <SimilarStories/>
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

export default BlogArticle;
