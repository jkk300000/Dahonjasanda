/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Container from 'components/Container';



const PopularNews = ({ data }) => {

  console.log('데이터 넘어왔나요? 상세데이터 확인@@@', data);
  console.log(typeof data);
  const dataSet = data || {};

  const title = [
    {
      careNm: dataSet.careNm,  // 보호수 이름
      careTel: dataSet.careTel, //보호소 전화번호
      careaddr: dataSet.careAddr, //보호소 주소
    }
  ]
  const theme = useTheme(
  );

//  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
//  const [geocoder, setGeocoder] = useState(null); // Added state for geocoder
  const [infoWindows, setInfoWindows] = useState([]);
  const [isInit, setInit] = useState(false);
  const [address, setAddress] = useState();
  
  
  useEffect(() => {
    console.log('************데이터***************', dataSet.careAddr);
    if(dataSet.careAddr === undefined || dataSet.careAddr == null){
      alert('맵이 없음');  // 여기서 뭔가 수정하고 저장해야 돌아감;;;
        return;
    }
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=bb83919493996c6c554671877067a90a&libraries=services,clusterer&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        const container = document.getElementById("map");
        
        let housingList = [];
        housingList[0] = {
          hssplyAdres : dataSet.careAddr,
          houseNm : dataSet.careNm,
        };
        // alert('!!');
        const mapContainer = document.getElementById('map');
          // const options = {
          //   center: new kakao.maps.LatLng(37.5665, 126.9780),
          //   level: 5,
          // };
          
          // let geocoder = new kakao.maps.services.Geocoder();
          // alert(housingList[0].hssplyAdres); // 여기까지 주소 들어옴
          const addresses = housingList.map((item) => ({
            hssplyAdres: item.hssplyAdres,
            houseNm: item.houseNm,
            houseManageNo: item.houseManageNo,
            cnstrctEntrpsNm: item.cnstrctEntrpsNm,
            totSuplyHshldco: item.totSuplyHshldco,
            bsnsMbyNm: item.bsnsMbyNm,
            houseSecdNm: item.houseSecdNm,
          }));

          console.log('************주소***************', housingList[0].hssplyAdres); // 여기까지 주소 들어옴
        let options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 초기 중심 좌표 (위도, 경도)
          level: 3, // 지도 확대 레벨
        };
        // alert(addresses.hssplyAdres);
        addresses.forEach((address) => {
        geocoder.addressSearch(address.hssplyAdres, (result, status) => { 
         console.log('***************************', result);  // undefined
          if (status === window.kakao.maps.services.Status.OK) {
          // alert(result[0].y, result[0].x);  // undefined
            let markerPosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            options.center = markerPosition;

            var marker = new window.kakao.maps.Marker({
                position: markerPosition
            });
            
            var map = new window.kakao.maps.Map(container, options);
            marker.setMap(map);
        }else{
            new window.kakao.maps.Map(container, options);
        }});

      });
    });
  })}, []);


  // useEffect(() => {
  //   const loadKakaoMapScript = () => {
  //     const script = document.createElement('script');
  //     script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=bb83919493996c6c554671877067a90a&libraries=services,clusterer&autoload=false`;
  //     script.async = true;
  //     script.onload = initializeMap;
  //     document.head.appendChild(script);
  //   };

  //   loadKakaoMapScript();
  // }, []); // Load the Kakao Map script only once

  // const initializeMap = () => {
  //   kakao.maps.load(() => {
  //     // setGeocoder(geocoderInstance); // Save geocoder instance in state
  //     // setMap(newMap);
  //     // ... (rest of your initializeMap logic)
  //   });
  // };


  // useEffect(() => {
   
  //   if(dataSet.careAddr == undefined){
  //     return;
  //   }
    
    // let housingList = [];
    // housingList[0] = {
    //   hssplyAdres : dataSet.careAddr,
    //   houseNm : dataSet.careNm,
    // };
    // alert('!!');
    // const mapContainer = document.getElementById('map');
    //   const options = {
    //     center: new kakao.maps.LatLng(37.5665, 126.9780),
    //     level: 5,
    //   };
      
    //   let geocoder = new kakao.maps.services.Geocoder();
      
    //   const addresses = housingList.map((item) => ({
    //     hssplyAdres: item.hssplyAdres,
    //     houseNm: item.houseNm,
    //     houseManageNo: item.houseManageNo,
    //     cnstrctEntrpsNm: item.cnstrctEntrpsNm,
    //     totSuplyHshldco: item.totSuplyHshldco,
    //     bsnsMbyNm: item.bsnsMbyNm,
    //     houseSecdNm: item.houseSecdNm,
    //   }));
      //console.log(addresses)

  //     addresses.forEach((address) => {

  //       // alert(address.houseNm);
  //       geocoder.addressSearch(address.hssplyAdres, (result, status) => {
  //         if (status === kakao.maps.services.Status.OK) {
  //           const marker = new kakao.maps.Marker({
  //             position: new kakao.maps.LatLng(result[0].y, result[0].x),
  //           });

  //           setMarkers((prevMarkers) => [...prevMarkers, marker]);
  //           marker.setMap(map);

  //           const iwContent = document.createElement('div');
  //           iwContent.style.padding = '5px';
  //           iwContent.style.width = '200px';

  //           const innerDiv = document.createElement('div');
  //           const link = document.createElement('a');
  //           link.id = 'infoWindowLink';

  //           link.style.color = 'blue';
  //           link.style.cursor = 'pointer';
  //           link.style.color = 'inherit';
  //           //console.log(address.cntrctCnclsBgnde);
  //           link.textContent = address.houseNm || 'House Name Unavailable';

  //           innerDiv.appendChild(link);
  //           iwContent.appendChild(innerDiv);

  //           const iwPosition = new kakao.maps.LatLng(result[0].y, result[0].x); //인포윈도우 표시 위치입니다

  //           const infowindow = new kakao.maps.InfoWindow({
  //             position: iwPosition,
  //             content: iwContent
  //           })

  //           setInfoWindows((prevInfoWindows) => [...prevInfoWindows, infowindow]);
  //           infowindow.open(map, marker)

  //           const moveLatLon = new kakao.maps.LatLng(result[0].y, result[0].x);

  //           // 지도 중심을 이동 시킵니다
  //           map.setCenter(moveLatLon);
  //         } else{
  //           alert('fail!!!');
  //         }
  //       });
  //     });
    
  // }, [dataSet]); // Load the markers when geocoder or housingList changes

  
  // Helper function to clear existing markers
  const clearMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null); // Remove the marker from the map
    });

    // Clear the markers from the state variable
    setMarkers([]);
  };

  const clearInfoWindow = () => {
    infoWindows.forEach((infowindow) => {
      infowindow.open(null, null); // Remove the marker from the map
    });

    // Clear the markers from the state variable
    setMarkers([]);
  };

  const LeftSide = () => {
    return (
      <Grid container spacing={-13} marginY={-19}>

        {title.map((item, i) => (
          <Grid item xs={12} key={i}>

            <Typography
              marginTop={0}
              variant="h4"
              data-aos={'fade-up'}
              align={'center'}
              gutterBottom
              sx={{ fontWeight: 700, }}
            >
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
              {dataSet.careNm}, 위치 안내

            </Typography>
            <br />

            <Box marginBottom={1}>

            </Box>
            <Typography
              fontSize={17.5}
              color={'black'}
              align={'left'}
              data-aos={'fade-up'}
              fontWeight={'bold'}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;보호시설명 <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;[{item.careNm}]<br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;시설 연락처<br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;[{item.careTel}] <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;시설 주소 <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;[{item.careaddr}] <br></br>
            </Typography>

          </Grid>
        ))}
      </Grid>

    );
  };

  const RightSide = () => {

    return (
      <Box>
        <div id='map' style={{ width: '100%', height: '50%', minHeight: 300, margin: 0, border:'ridge'}} />
      </Box>
      // <iframe
      //   width="50%"
      //   height="50%"
      //   frameBorder="0"
      //   title="map"
      //   marginHeight={0}
      //   marginWidth={0}
      //   scrolling="no"
      //   src='https://dapi.kakao.com/v2/maps/sdk.js?appkey=bb83919493996c6c554671877067a90a&libraries=services,clusterer&autoload=false'
      //   style={{
      //     minHeight: 300,
      //     filter:
      //       theme.palette.mode === 'dark'
      //         ? 'grayscale(0.5) opacity(0.7)'
      //         : 'none',
      //   }}
      // />
    );
  };

  return (

    <Box
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >

      <Container marginY={-0} paddingX={0} paddingY={0} maxWidth={{ sm: 1, md: 1236 }}>
        <Box
          display={'flex'}
          flexDirection={{ xs: 'column', md: 'row' }}
          position={'relative'}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            width={1}
            order={{ xs: 1, md: 2 }}
          >
            <Container>
              <LeftSide />
            </Container>
          </Box>
          <Box
            sx={{
              flex: { xs: '0 0 100%', md: '0 0 50%' },
              position: 'relative',
              maxWidth: { xs: '100%', md: '100%' },
              minHeight: { xs: 100, md: 50 },
              order: { xs: 1, md: 2 },
            }}
          >
            <RightSide />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PopularNews;
