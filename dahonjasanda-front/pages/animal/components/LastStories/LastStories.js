import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
import { Container } from 'react-bootstrap';
import PageComponent from '../../../loan/components/PageComponent';
import { useRouter } from 'next/router';
import axios from 'axios';
// 박스에 사진 및 텍스트 추가


// 박스 구성
const LastStories = ({ data, totalPages, pageNumber, onChangePageHandler, page, limit  }) => {
  console.log('LastStories 동물 전체데이터 data 시작!!!:', data);
  console.log(typeof data); // 전체데이터 
const [searchValue, setSearchValue] = useState();
const router = useRouter();


const processedData = data ? Object.values(data) : [];
const limitedData = limit ? processedData.slice(0, limit) : processedData;


const handleClick = async (anno) => {
  try {
    router.push({
      pathname: `/animal/${anno}`,  // 클릭을 하면 이런 주소(url)로  보내줄게. 그다음 받는 페이지에서 라우터를 받아야함
      // query : {jaemokgodja}
    });
    const { query } = router;

    console.log('라우터 정보 확인 (여기는 라우터를 설정한 곳)', query);
    // 받아온 데이터를 표시하거나 다른 작업을 수행할 수 있습니다.

  } catch (error) {
    console.log('상세 데이터를 불러오는 중 오류가 발생했습니다@@@:', error);
  }
};



  const theme = useTheme();
  // const [isJsh, setIsJsh] = useState(true);
  return (
    
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={4}
      >
              {/* {isJsh ? <div>장성희</div> : <div>김남훈</div>}
      <div onClick={() => setIsJsh((prev) => !prev)}>바꾼다</div> */}
        <Box>
          <Typography fontWeight={700} variant={'h6'} gutterBottom>
            가족을 기다리는 유기 동물들을 만나보세요,
          </Typography>
          <Typography color={'text.secondary'}>
            품종, 나이, 보호소명, 발견(실종)장소, 등으로 검색이 가능합니다.
          </Typography>
        </Box>
        <Box display="flex" marginTop={{ xs: 2, md: 0 }}>

          {/* viewAll 삭제 */}
          {/* <Box
            component={Button}
            variant="outlined"
            color="primary"
            size="large"
            marginLeft={2}
          >
          </Box> */}
        </Box>
      </Box>
      <Grid container spacing={4} >
        {/* mock 데이터를 갖고옴 */}
        {limitedData.map((item, index) => {
           return (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ marginBottom: -15}}>
            
            <Box 
              component={'a'}
              // href={''}
              display={'block'}
              width={1}  //? 0.8 이나..1?
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              
              <Box
                onClick={() => handleClick(item.anno)}
                component={Card}
                width={1}
                height={0.7}
                boxShadow={7}
                display={'flex'}
                flexDirection={'column'}
                sx={{ backgroundImage: 'none' }}
              >
                <CardMedia
                  image={item.popfile}
                
                  sx={{
                    height: { xs: 300, md: 360 },
                    position: 'relative',
                  }}
                >
                  <Box
                    component={'svg'}
                    viewBox="0 0 2880 480"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      color: theme.palette.background.paper,
                      transform: 'scale(2)',
                      height: 'auto',
                      width: 1,
                      transformOrigin: 'top center',
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z"
                      fill="currentColor"
                    />
                  </Box>
                </CardMedia>
                <br></br>
                <Box component={CardContent} position={'relative'}>
                <Typography variant='h6'  gutterBottom>품종 : {item.kindCd}</Typography>
                <Typography fontSize={16}  gutterBottom>나이 : {item.age}</Typography>
                <Typography fontSize={16}  gutterBottom>보호 상태  : {item.processState}</Typography>
                <Typography fontSize={16}  gutterBottom>보호소 명 : {item.careNm}</Typography>
                </Box>
                
              </Box>
              
            </Box>
            
             </Grid>
            )})}
        
        <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
        <Container className="my-5" style={{ display: 'flex', justifyContent: 'center' }}>
          <PageComponent totalPages={totalPages} currentPage={pageNumber} onPageChange={onChangePageHandler}/>
        </Container>
      </Grid>
    </Box>
  );
};

export default LastStories;
