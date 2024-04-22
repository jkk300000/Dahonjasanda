import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import axios from 'axios';

const mock = [
  '실내 식물',
  '반려 식물',
  '햇빛에 강한',
  '실내 청정',
  '향기로운',
  '아름다운',
];

const SearchBox = ( {onSearch, page, setPageable, onChangePageHandler} ) => {
  const [searchValue, setSearchValue] = useState();



const HandleSummit = async () => {
  console.log('여기는 서치 박스 들어오는 곳!');
  try {
    // 체크박스나 검색어를 쳐서, 다시 검색을 눌렀을 때, 페이지 0으로 초기화 (돌아가야함, -> 검색해도 현재 페이지(ex. 6)그대로면 랜더링이 안됌
    
    var url = 'http://localhost/animal'
        url = url + '?page=0';
    if (searchValue != null) {
        url = url + '&searchValue=' + searchValue;
    }
    const map = await axios.get(url);  // 검색 url  이대로 보내니까, 페이지0 에 맞는 데이터만 가지고오는 것
    console.log('anmal search map확인 1차 페이지', url);
    console.log('anmal search map확인 1차 페이지 넘버 안붙음', map);
    onSearch(map.data.listsearchAll.content); // onSearch(내장된 set 함수))로 상세 리스트로 변경하기 -> main에서 animal 리스트가 바꼈을거임

    // 페이징 처리, 
    const pageInfo = map.data.listsearchAll.pageable;
    onChangePageHandler(map.data.listsearchAll.pageable.pageNumber);
    setPageable({...pageInfo,
        totalPages : map.data.listsearchAll.totalPages,
        totalElements : map.data.listsearchAll.totalElement
      });
      
    console.log('anmal url map확인 1차', map);
    console.log('서치 부분 ', url);  // 서치 요청한 url 확인
  } catch (error) {

    console.log('동물 서치 데이터 안온다!!!!', error);
  }
};
useEffect(()=>{
  // handleSubmit();
  HandleSummitMainPage();
},[page]);  // page가 들어올때 마다 실행됌. , 번호가 바뀔떄마다 아래 실행


const HandleSummitMainPage = async () => {
  console.log('여기는 페이징 처리, 페이지 넘버 넘어오는지 확인 필요');
  try {
    // 체크박스나 검색어를 쳐서, 다시 검색을 눌렀을 때, 페이지 0으로 초기화 (돌아가야함, -> 검색해도 현재 페이지(ex. 6)그대로면 랜더링이 안됌
    var url = 'http://localhost/animal'
    if (page != null) {
        url = url + '?page=' + page;
    } else {
        url = url + '?page=0';
    }
    if (searchValue != null) {
        url = url + '&searchValue=' + searchValue;
    }
    
    const map = await axios.get(url);  // 검색 url  
    console.log('anmal page map확인 2차 = page 넘버',url);
    console.log(page);
    console.log('anmal page map확인 2차 = page 넘버 가 붙음', map);
    // onSearch(map.data.listsearchAll.content); // onSearch(내장된 set 함수))로 상세 리스트로 변경하기 -> main에서 animal 리스트가 바꼈을거임
    onSearch(map.data.listsearchAll.content);
    // 페이징 처리, 
    const pageInfo = map.data.listsearchAll.pageable;
    onChangePageHandler(map.data.listsearchAll.pageable.pageNumber);
    setPageable({...pageInfo,
        totalPages : map.data.listsearchAll.totalPages,
        totalElements : map.data.listsearchAll.totalElement
      });
      
    console.log('anmal url map확인 1차', map);
    console.log('서치 부분 ', url);  // 서치 요청한 url 확인
  } catch (error) {

    console.log('동물 page 데이터 안온다!!!!', error);
  }
};


  return (
    <Box>
      <form noValidate autoComplete="off">
      <Box
        padding={2}
        width={1}
        component={Card}
        boxShadow={4}
        marginBottom={4}
      >
        
          <Box display="flex" alignItems={'center'}>
            <Box width={1} marginRight={1}>
            <TextField
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{
                  height: 54,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '0 !important',
                  },
                }}
                variant="outlined"
                color="primary"
                size="medium"
                placeholder="나의 새로운 가족, 반려 동물을 찾아보세요, (품종, 나이, 보호소명, 발견(실종)장소, 등으로 검색이 가능합니다.)"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        component={'svg'}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={24}
                        height={24}
                        color={'primary.main'}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <Button onClick={HandleSummit}
                sx={{ height: 54, minWidth: 100, whiteSpace: 'nowrap' }}
                variant="contained"
                color="primary"
                size="medium"
                fullWidth
              >
                식물 검색
              </Button>
            </Box>
          </Box>
       
      </Box>
      <Box>
        {mock.map((item) => (
          <Chip
            key={item}
            label={item}
            component="a"
            href=""
            clickable
            sx={{ margin: 0.5 }}
          />
        ))}
      </Box>
      </form>
    </Box>
  );
};

export default SearchBox;
