import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  Hero,
  SearchBox,
  LastStories,
  FeaturedArticle,
  CaseStudies,
  PopularArticles,
  // Newsletter,
} from './components';
import axios from 'axios';

const animalMain = () => {
  const theme = useTheme();
  const [animalList, setAnimalList] = useState();
  const [animaDetailList, setAnimalDetailList] = useState();
  const [data, setData] = useState();
  

  // 페이징 처리 
  const [pageable, setPageable] = useState();
  const [page, setPage] = useState(0)


  useEffect(() => {
    axios.get('http://localhost/animal')  // 전체리스트 요청
    .then(map => {
      console.log('animal 메인 페이지에서 전체리스트 받은 것 map :', map);
      console.log('animalList :', animalList); // 이대로 넘겨주기 data로 
      setAnimalList(map.data.listsearchAll.content);  //setData에 넣어서 data를 바꿔준 다음 전달
        // setPlantList(map.data.listsearchAll.content); // 받아온 데이터로 변환
        // pageable : map.data.listsearchAll.pageable,

      const pageInfo = map.data.listsearchAll.pageable;

      setPageable({...pageInfo,  // key/value 값이 풀어져서 들어옴
      totalPages : map.data.listsearchAll.totalPages, // 객체? 값이 단일? 이라서
      totalElements : map.data.listsearchAll.totalElements
    })
  })
    .catch(error => {
      console.error('데이터가 안옴', error);
    });
    
}, []);

  return (
    <Main colorInvert={true}>
      <Box bgcolor={'alternate.main'} position={'relative'}>
        <Hero />
        <Container
          sx={{
            marginTop: '-5rem',
            position: 'relative',
            zIndex: 3,
            paddingY: '0 !important',
          }}
        > 
        {/* set함수를 넘겨주고 searchBox에서 onsearch로 전체리스트를 상세리스트로 바꿔주기 (여기선 필요없나..?)   */}
        {/* onSearch={setAnimalList} */}
          <SearchBox onSearch={setAnimalList} page={page} onChangePageHandler={setPage} setPageable={setPageable}/>
          <Container paddingTop={'0 !important'}></Container>
        </Container>
        <Container paddingTop={'0 !important'}>
          {/* setPage를 이 이름으로된 함수로 넘겨주고, pageNumber 정보보냄 토탈 페이지 정보 보냄 */}
          <LastStories onChangePageHandler={setPage} pageNumber={page} totalPages={pageable&&pageable.totalPages} data={animalList}/>
        </Container>
        <Container paddingTop={'0 !important'}>
          <CaseStudies />
        </Container>
        <Box paddingBottom={{ xs: 2, sm: 3, md: 4 }}>
        <Container>
          <FeaturedArticle />
        </Container>
        <Container>
          <PopularArticles />
          </Container>
        </Box>
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            transform: 'translateY(50%)',
            zIndex: 2,
            width: 1,
          }}
        >
        </Box>
      </Box>
      {/* <Container> */}
        {/* <Newsletter /> */}
      {/* </Container> */}
    </Main>
  );
}

export default animalMain;
