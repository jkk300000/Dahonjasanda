import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import React, { useState, onSearch, response, useEffect } from 'react';
import { Checkbox, FormControlLabel} from '@mui/material';
import { Typography, FormControl, Select, MenuItem } from '@mui/material';
import axios from 'axios';

//생육 형태
const growthTypeC= [
  '직립형',
  '관목형',
  '덩굴성',
  '풀모양',
  '로제트형',
  '다육형',
];
//꽃 피는 계절
const floweringSeasonC = [
  '봄',
  '여름',
  '가을',
  '겨울',
];

// 잎 무늬
const leafPatternC = [
  '줄무늬',
  '점무늬',
  '잎 가장자리 무늬',
  '기타(무늬 없음 등)',
];

// 잎색
const leafColorC = [
  '녹색,연두색',
  '금색,노란색',
  '흰색,크림색',
  '은색,회색',
  '빨강,분홍,자주색',
  '여러색혼합',
  '기타',
];
// 꽃색
const flowerColorC = [
  '녹색,연두색',
  '금색,노란색',
  '흰색,크림색',
  '은색,회색',
  '빨강,분홍,자주색',
  '여러색혼합',
  '기타',
];

// 관리요구도
const managementRequirementC = [
  '초보자',
  '경험자',
  '전문가'
];
// , onPage
const SearchBox = ({onSearch, page, setPageable, onChangePageHandler}) => {
  // 사용할 변수(조건)들 할당 
  // const [Pageable, setPageable] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [growthType, setGrowthType] = useState([]);
  const [floweringSeason, setFloweringSeason] = useState([]);
  const [leafPattern, setLeafPattern] = useState([]);
  const [leafColor, setLeafColor] = useState([]);
  const [flowerColorType, setFlowerColorType] = useState([]);
  const [managementRequirement, setManagementRequirement] = useState([]);

  // const growthTypeString = Array.isArray(growthType) ? growthType.join('&growthType=') : growthType;
  // const floweringSeasonString = Array.isArray(floweringSeason) ? floweringSeason.join('&floweringSeason=') : floweringSeason;
  // const leafPatternString = Array.isArray(leafPattern) ? leafPattern.join('&leafPattern=') : leafPattern;
  // const leafColorString = Array.isArray(leafColor) ? leafColor.join('&leafColor=') : leafColor;
  // const flowerColorString = Array.isArray(flowerColor) ? flowerColor.join('&flowerColor=') : flowerColor;
  // const managementRequirementString = Array.isArray(managementRequirement) ? managementRequirement.join('&managementRequirement=') : managementRequirement;

  console.log('@@@@@@@@@@@@@@@@@@@@@@@', typeof onSearch);

  // 체크박스 체크 해제 및 중복체크 기능
  const handleGrowthTypeCToggle = (item) => {
    if (growthType.includes(item)) {
      setGrowthType(growthType.filter((selectedItem) => selectedItem !== item));
    } else {
      setGrowthType([...growthType, item]);
    }
  };
  const handleFloweringSeasonCToggle = (item) => {
    if (floweringSeason.includes(item)) {
      setFloweringSeason(floweringSeason.filter((selectedItem) => selectedItem !== item));
    } else {
      setFloweringSeason([...floweringSeason, item]);
    }
  };
  const handleLeafPatternCToggle = (item) => {
    if (leafPattern.includes(item)) {
      setLeafPattern(leafPattern.filter((selectedItem) => selectedItem !== item));
    } else {
      setLeafPattern([...leafPattern, item]);
    }
  };
  const handleLeafColorCToggle = (item) => {
    if (leafColor.includes(item)) {
      setLeafColor(leafColor.filter((selectedItem) => selectedItem !== item));
    } else {
      setLeafColor([...leafColor, item]);
    }
  };
  const handleFlowerColorCToggle = (item) => {
    if (flowerColorType.includes(item)) {
      setFlowerColorType(flowerColorType.filter((selectedItem) => selectedItem !== item));
    } else {
      setFlowerColorType([...flowerColorType, item]);
    }
  };
  const handleManagementRequirementCToggle = (item) => {
    if (managementRequirement.includes(item)) {
      setManagementRequirement(managementRequirement.filter((selectedItem) => selectedItem !== item));
    } else {
      setManagementRequirement([...managementRequirement, item]);
    }
  };

  // 검색 조건
  // const [searchData, setSearchData] = useState({
  //   searchValue,
  //   growthTypeC,
  //   floweringSeasonC,
  //   leafPatternC,
  //   leafColorC,
  //   flowerColorC,
  //   managementRequirementC,
  //   growthType,
  //   floweringSeason,
  //   leafPattern,
  //   leafColor,
  //   flowerColor,
  //   managementRequirement,
  // });

  // 위 검색 조건들로 서버로 요청 보냄 
  console.log('page@@@@@@@@확인@@@@@SearchBox@@@@', page)

  const handleSubmit = async () => {
    let url2 = 'dkdkdkdkdk@@@@@@@@@@';
    console.log('여기는 서치 박스 들어오는 곳!');
    try {
      // 체크박스나 검색어를 쳐서, 다시 검색을 눌렀을 때, 페이지 0으로 초기화 (돌아가야함, -> 검색해도 현재 페이지(ex. 6)그대로면 랜더링이 안됌
      
      var url = 'http://localhost/plant'
          url = url + '?page=0';
      if (searchValue != null) {
          url = url + '&searchValue=' + searchValue;
      }
      if(growthType != null && growthType.length > 0){
          for(let i = 0; i < growthType.length; i++){
              url = url + '&growthType=' + growthType[i];
          }
      }
      if(floweringSeason != null && floweringSeason.length > 0){
          for(let i = 0; i < floweringSeason.length; i++){
              url = url + '&floweringSeason=' + floweringSeason[i];
          }
      }
      if(leafPattern != null && leafPattern.length > 0){
          for(let i = 0; i < leafPattern.length; i++){
              url = url + '&leafPattern=' + leafPattern[i];
          }
      }
      if(leafColor != null && leafColor.length > 0){
          for(let i = 0; i < leafColor.length; i++){
              url = url + '&leafColor=' + leafColor[i];
          }
      }
      if(flowerColorType != null && flowerColorType.length > 0){
          for(let i = 0; i < flowerColorType.length; i++){
              url = url + '&flowerColorType=' + flowerColorType[i];
          }
      }
      if(managementRequirement != null && managementRequirement.length > 0){
          for(let i = 0; i < managementRequirement.length; i++){
              url = url + '&managementRequirement=' + managementRequirement[i];
          }
      }
  
      
      // 검색 조건을 URL 쿼리 문자열에 포함하여 URL 구성
      // url = `http://localhost/plantSearch?searchValue=${searchValue}&growthType=${growthTypeString}&floweringSeason=${floweringSeasonString}&leafPattern=${leafPatternString}&leafColor=${leafColorString}&flowerColorType=${flowerColorString}&managementRequirement=${managementRequirementString}`;
      // url = `http://localhost/plantSearch`;
        //  console.log('url@@@@@@@@',url);
      // 서버로 GET 요청 보내기
      // const map = await axios.get(url);
      const map = await axios.get(url);

      console.log('map확인 1차', map);

      onSearch(map.data.listsearchAll.content);

      const pageInfo = map.data.listsearchAll.pageable;

      onChangePageHandler(map.data.listsearchAll.pageable.pageNumber);
      setPageable({...pageInfo, // 
        totalPages : map.data.listsearchAll.totalPages,
        totalElements : map.data.listsearchAll.totalElements
      });

      // 서버로부터 받은 응답 처리
      // console.log(map.data.list2); // 받은 데이터 처리
      // console.log('서치 데이터 온다!!!!');
      console.log('서치 부분 ', url);
      // console.log('map 확인 @@@@@@@@',map.data);
      // console.log('page 확인 @@@@@@@@',map.data.listsearchAll.pageable);
    } catch (error) {
      // console.log('@@@@',url);
      console.log('서치 데이터 안온다!!!!', error);
    }
  };

  const handleSubmitPage = async () => {
    let url2 = 'dkdkdkdkdk@@@@@@@@@@';
    console.log('여기는 서치 박스 들어오는 곳!');
    try {
      // 이미 검색은 됐거나 검색이 안됐거나, 페이지를 눌렀을 때 거기에 맞는 페이지 번호로 이동한다!!!
      var url = 'http://localhost/plant'
      if (page != null) {
          url = url + '?page=' + page;
      } else {
          url = url + '?page=0';
      }
      if (searchValue != null) {
          url = url + '&searchValue=' + searchValue;
      }
      if(growthType != null && growthType.length > 0){
          for(let i = 0; i < growthType.length; i++){
              url = url + '&growthType=' + growthType[i];
          }
      }
      if(floweringSeason != null && floweringSeason.length > 0){
          for(let i = 0; i < floweringSeason.length; i++){
              url = url + '&floweringSeason=' + floweringSeason[i];
          }
      }
      if(leafPattern != null && leafPattern.length > 0){
          for(let i = 0; i < leafPattern.length; i++){
              url = url + '&leafPattern=' + leafPattern[i];
          }
      }
      if(leafColor != null && leafColor.length > 0){
          for(let i = 0; i < leafColor.length; i++){
              url = url + '&leafColor=' + leafColor[i];
          }
      }
      if(flowerColorType != null && flowerColorType.length > 0){
          for(let i = 0; i < flowerColorType.length; i++){
              url = url + '&flowerColorType=' + flowerColorType[i];
          }
      }
      if(managementRequirement != null && managementRequirement.length > 0){
          for(let i = 0; i < managementRequirement.length; i++){
              url = url + '&managementRequirement=' + managementRequirement[i];
          }
      }
          // 검색 조건을 URL 쿼리 문자열에 포함하여 URL 구성
      // url = `http://localhost/plantSearch?searchValue=${searchValue}&growthType=${growthTypeString}&floweringSeason=${floweringSeasonString}&leafPattern=${leafPatternString}&leafColor=${leafColorString}&flowerColorType=${flowerColorString}&managementRequirement=${managementRequirementString}`;
      // url = `http://localhost/plantSearch`;
        //  console.log('url@@@@@@@@',url);
      // 서버로 GET 요청 보내기
      // const map = await axios.get(url);
      const map = await axios.get(url);

      console.log('map확인 1차', map);
      onSearch(map.data.listsearchAll.content);
      const pageInfo = map.data.listsearchAll.pageable;
      onChangePageHandler(map.data.listsearchAll.pageable.pageNumber);
      setPageable({...pageInfo,
        totalPages : map.data.listsearchAll.totalPages,
        totalElements : map.data.listsearchAll.totalElements
      });
      // 서버로부터 받은 응답 처리
      // console.log(map.data.list2); // 받은 데이터 처리
      // console.log('서치 데이터 온다!!!!');
      console.log('서치 부분 ', url);
      // console.log('map 확인 @@@@@@@@',map.data);
      // console.log('page 확인 @@@@@@@@',map.data.listsearchAll.pageable);
    } catch (error) {
      // console.log('@@@@',url);
      console.log('서치 데이터 안온다!!!!', error);
    }
  };

  useEffect(()=>{
    // handleSubmit();
    handleSubmitPage();
  },[page]);

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
                placeholder="나의 새로운 가족, 반려 식물을 찾아보세요"
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
              <Button onClick={handleSubmit}
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
      
      <Typography variant="h6" >
        생육 형태</Typography>
      {growthTypeC.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
            checked={growthType.includes(item)}
                onChange={() => handleGrowthTypeCToggle(item)}
                name={growthType}
                value={item}
            />
          }
          label={item}
        />
        ))}
        <br></br>
        {/* 글씨와 체크박스 포문 및 중복 체크 기능 */}
        <Typography variant="h6" >
          꽃피는 계절
          </Typography>
      {floweringSeasonC.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={floweringSeason.includes(item)}
              onChange={() => handleFloweringSeasonCToggle(item)}
              name={floweringSeason}
            value={item}
            />
          }
          label={item}
        />
        ))}
        <br></br>
        <Typography variant="h6" >
        잎 무늬
        </Typography>
      {leafPatternC.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
            checked={leafPattern.includes(item)}
            onChange={() => handleLeafPatternCToggle(item)}
            name={leafPattern}
            value={item} // 변경된 부분: value를 item으로 설정하여 해당 값이 서버로 전송될 때 반영되도록 함
          />
          }
          label={item}
        />
        ))}
        <br></br>
        <Typography variant="h6" >
        잎 색<br></br>
        </Typography>
      {leafColorC.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={leafColor.includes(item)}
              onChange={() => handleLeafColorCToggle(item)}
              name={leafColor}
              value={item}
            />
          }
          label={item}
        />
        ))}
         <Typography variant="h6" >
        꽃 색</Typography>
      {flowerColorC.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={flowerColorType.includes(item)}
              onChange={() => handleFlowerColorCToggle(item)}
              name={flowerColorType}
            value={item}
            />
          }
          label={item}
        />
        ))}
        <Typography variant="h6" >
        관리 요구도</Typography>
      {managementRequirementC.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={managementRequirement.includes(item)}
              onChange={() => handleManagementRequirementCToggle(item)}
              name={managementRequirement}
            value={item}
            />
          }
          label={item}
        />
        ))}

      </Box>
      </form>
    </Box>
  );
};

export default SearchBox;