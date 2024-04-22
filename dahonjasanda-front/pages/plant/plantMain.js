import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { useState } from 'react';
import {
  Hero,
  SearchBox,
  LastStories,
  FeaturedArticle,
  CaseStudies,
  PopularArticles,
  Newsletter,
} from './components';
import axios from 'axios';

// const pid =router.query.plantDetail;

const plantMain = ({onData}) => {
    const [plantList, setPlantList] = useState([]);  // 전체 리스트 가져오기 위한 변수 할당

    const [searchList, setSearchList] = useState();  // 전체 리스트 가져오기 위한 변수 할당
    const [detailList, setDetailList] = useState();  // 전체 리스트 가져오기 위한 변수 할당
    
    const [resultList, setResultList] = useState([])
    const [pageable, setPageable] = useState();
    const [page, setPage] = useState(0)

  console.log('page@@@@@@ 확인 플랜트 메인입니다.@@@@@', page);

    useEffect(() => {
      axios.get('http://localhost/plant')  // 전체리스트 요청
      .then(map => {
        console.log('map :', map);
        console.log('plantList :', plantList);
          // setPlantList(map.data.listsearchAll.content); // 받아온 데이터로 변환
          // pageable : map.data.listsearchAll.pageable,

        const pageInfo = map.data.listsearchAll.pageable;

        setPageable({...pageInfo,  // key/value 값이 풀어져서 들어옴
        totalPages : map.data.listsearchAll.totalPages,
        totalElements : map.data.listsearchAll.totalElements
      });
      console.log('여기 찍힘')
      
    })
    .catch(error => {
      console.error('데이터가 안옴', error);
    });
    
  }, []);
  
  
  const theme = useTheme();
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
          <SearchBox  onSearch={setPlantList} page={page}  onChangePageHandler={setPage} setPageable={setPageable} />
          <Container paddingTop={'0 !important'}></Container>
        </Container>
        <Container paddingTop={'0 !important'}>
           {/* onChangePageHandler={setPage}  pageable={setPageable} */}                                                                        
          <LastStories  onChangePageHandler={setPage} pageNumber={page} totalPages={pageable&&pageable.totalPages} onDetail={setDetailList} data={plantList}/> {/*AllListView={AllListView}*/}
          {/* 서치박스에서 onSearch setPlantList함수를 통해 상태값이 변경된 PlantList는 전체 데이터가 아니라, 검색된 데이터가 들어옴 */}
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
    </Main>
  );
        };

export default plantMain;