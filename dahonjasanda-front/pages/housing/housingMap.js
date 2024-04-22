import { useEffect, useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import { useRouter } from 'next/router';
import Main from "layouts/Main"
import HousingView from './view';
import { IoCloseCircleOutline } from "react-icons/io5";
import DetailView from './detailView';
const MapComponent = () => {



  const router = useRouter();
  const [selectedTotSuplyHshldco, setSelectedTotSuplyHshldco] = useState();
  const [selectedBsnsMbyNm, setSelectedBsnsMbyNm] = useState();
  const [selectedHouseManageNo, setSelectedHouseManageNo] = useState();
  const [selectedHouseNm, setSelectedHouseNm] = useState();
  const [selectedHssplyAdres, setSelectedHssplyAdres] = useState();
  const [selectedhouseSecdNm, setSelectedHouseSecdNm] = useState();
  const [selectedCnstrctEntrpsNm, setSelectedCnstrctEntrpsNm] = useState();
  const [nestedRoute, setNestedRoute] = useState(null);
  const [housingList, setHousingList] = useState([])
  const [housingListCount, setHousingListCount] = useState([])
  const [transactionType, setTransactionType] = useState('transactionType');
  const [location, setLocation] = useState('Location');
  const [propertyType, setPropertyType] = useState('Property type');
  const [searchValue, setSearchValue] = useState();
  // const [houseManageNo, setHouseManageNo] = useState()
  const [geocoder, setGeocoder] = useState(null); // Added state for geocoder
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);
  const [showNestedLayout, setShowNestedLayout] = useState(false);


  useEffect(() => {
    const loadKakaoMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=bb83919493996c6c554671877067a90a&libraries=services,clusterer&autoload=false`;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    loadKakaoMapScript();

  }, []); // Load the Kakao Map script only once

  const initializeMap = () => {
    kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 5,
      };
      const newMap = new kakao.maps.Map(mapContainer, options);
      const geocoderInstance = new kakao.maps.services.Geocoder();
      setGeocoder(geocoderInstance); // Save geocoder instance in state
      setMap(newMap);

      // ... (rest of your initializeMap logic)
    });
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { searchValue, transactionType, location, propertyType } = router.query;

    setSearchValue(searchValue);
    setTransactionType(transactionType);
    setLocation(location);
    setPropertyType(propertyType);
    getHousingList(searchValue, transactionType, location, propertyType);

  }, [router.isReady]);

  const getHousingList = async (searchValue, transactionType, location, propertyType) => {
    try {
      var url = 'http://localhost/housingList';
      if (searchValue != null) {
          
        url = url + '?transactionType=' + transactionType;
        url = url + '&location=' + location;
        url = url + '&propertyType=' + propertyType;
        url = url + '&searchValue=' + searchValue;
      }

      if(searchValue == null && transactionType == null && location == null && propertyType == null && searchValue == null) {

        url = url + '?transactionType=' + "";
        url = url + '&location=' + "";
        url = url + '&propertyType=' + "";
        url = url + '&searchValue=' + "";
      }



      const response = await axios.get(url, {
        withCredentials: true,
      });

      setHousingList(response.data.list);
      setHousingListCount(response.data.listCount);
      //console.log(response.data.list)
    } catch (error) {
      console.error('Error fetching housing list:', error);
    }
  };



  console.log(housingList)







  useEffect(() => {
    if (geocoder && housingList.length > 0) {

      clearMarkers();
      clearInfoWindow();

      const addresses = housingList.map((item) => ({
        hssplyAdres: item.hssplyAdres,
        houseNm: item.houseNm,
        houseManageNo: item.houseManageNo,
        cnstrctEntrpsNm: item.cnstrctEntrpsNm,
        totSuplyHshldco: item.totSuplyHshldco,
        bsnsMbyNm: item.bsnsMbyNm,
        houseSecdNm: item.houseSecdNm,
        

      }));
      //console.log(addresses)

      addresses.forEach((address) => {

        //console.log(address.hssplyAdres);
        //console.log(address.houseNm);
        geocoder.addressSearch(address.hssplyAdres, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(result[0].y, result[0].x),
            });

            setMarkers((prevMarkers) => [...prevMarkers, marker]);
            marker.setMap(map);


            const iwContent = document.createElement('div');
            iwContent.style.padding = '5px';
            iwContent.style.width = '200px';

            const innerDiv = document.createElement('div');
            const link = document.createElement('a');
            link.id = 'infoWindowLink';

            link.style.color = 'blue';
            link.style.cursor = 'pointer';
            link.style.color = 'inherit';
            //console.log(address.cntrctCnclsBgnde);
            link.textContent = address.houseNm || 'House Name Unavailable';
            link.addEventListener('click', () => toggleNestedLayout(
              address.houseManageNo, 
              address.hssplyAdres, 
              address.houseNm,
              address.cnstrctEntrpsNm, 
              address.totSuplyHshldco, 
              address.bsnsMbyNm,
              address.houseSecdNm,  
              
              
      
            ));

            innerDiv.appendChild(link);
            iwContent.appendChild(innerDiv);

            const iwPosition = new kakao.maps.LatLng(result[0].y, result[0].x); //인포윈도우 표시 위치입니다

            const infowindow = new kakao.maps.InfoWindow({
              position: iwPosition,
              content: iwContent
            })

            setInfoWindows((prevInfoWindows) => [...prevInfoWindows, infowindow]);
            infowindow.open(map, marker)

            const moveLatLon = new kakao.maps.LatLng(37.5665, 126.9780);

            // 지도 중심을 이동 시킵니다
            map.setCenter(moveLatLon);
          }
        });
      });
    } else {
      clearMarkers();
      clearInfoWindow();
    }
  }, [geocoder, housingList]); // Load the markers when geocoder or housingList changes

  if (selectedHouseManageNo != null) {
    console.log("주택관리번호 :" + selectedHouseManageNo);
  }



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

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.get('')
    var url = '/housing/housingMap';

    if (searchValue !== null) {

      url = url + '?transactionType=' + data.get('transactionType') + '&location='
        + data.get('location') + '&propertyType=' + data.get('propertyType');
      url = url + '&searchValue=' + data.get('searchValue');



    }
    setSearchValue(data.get('searchValue'));
    setTransactionType(data.get('transactionType'));
    setLocation(data.get('location'));
    setPropertyType(data.get('propertyType'));
    router.push(url);



    getHousingList(data.get('searchValue'), data.get('transactionType'), data.get('location'), data.get('propertyType'));

  };





  const onChangeValue = (e) => {
    setSearchValue(e.target.value);
  };


  const onChangeTransactionType = (e) => {
    setTransactionType(e.target.value);
  };

  const onChangeLocation = (e) => {
    setLocation(e.target.value);
  };


  const onChangePropertyType = (e) => {
    setPropertyType(e.target.value);
  };


  const toggleNestedLayout = (houseManageNo, hssplyAdres, houseNm, cnstrctEntrpsNm, totSuplyHshldco, bsnsMbyNm, houseSecdNm) => {
    setSelectedHouseManageNo(houseManageNo);
    setSelectedHouseNm(houseNm);
    setSelectedCnstrctEntrpsNm(cnstrctEntrpsNm);
    setSelectedHssplyAdres(hssplyAdres);
    setSelectedTotSuplyHshldco(totSuplyHshldco);
    setSelectedBsnsMbyNm(bsnsMbyNm);
    setSelectedHouseSecdNm(houseSecdNm)
   

    setShowNestedLayout(!showNestedLayout);


    if (!showNestedLayout) {
      setNestedRoute('HousingView');

    } else {
      setNestedRoute(null);
    }

  };


  


  const removeNestedLayout = () => {
    setShowNestedLayout(false);


  };




   


  

  return (
    <Main>

      <hr />
      {/* Search property form group */}
      <div style={{ marginTop: '60px' }}>
        <Col xs={{ order: 3 }} lg={10} xl={8} className='position-relative mt-lg-n5 zindex-2' style={{ width: '60%' }}>
          <form className='d-block' name="searchForm" onSubmit={onSubmit}  >
            <Row className='g-0 ms-sm-n2'>
              <Col md={8} className='d-sm-flex align-items-center'>


                <div className='col-xl-4 col-md-6 mb-4' style={{ marginLeft: '130px' }}>
                  <select
                    className="selectpicker form-control"



                    value={transactionType}
                    id="transactionType"
                    name="transactionType"
                    onChange={onChangeTransactionType}

                  >
                    <option value="">거래 형태 선택</option>
                    <option value="분양주택">분양주택</option>
                    <option value="null">임대</option>
                  </select>
                </div>

                <hr className='d-sm-none my-2' />
                <div className='col-xl-4 col-md-6 mb-4' style={{ marginLeft: '30px' }}>

                  <select
                    className="selectpicker form-control"

                    // data-live-search="true" data-selected-text-format="count &gt; 1"
                    value={location}
                    id="location"
                    name="location"
                    onChange={onChangeLocation}

                  >
                    <option value="">지역 선택</option>
                    <option value="서울">서울</option>
                    <option value="경기">경기</option>
                    <option value="충청북도">충청북도</option>
                    <option value="충청남도">충청남도</option>
                    <option value="경상북도">경상북도</option>
                    <option value="경상남도">경상남도</option>
                    <option value="강원도">강원도</option>
                    <option value="인천">인천</option>
                    <option value="울산">울산</option>
                    <option value="광주">광주</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                  </select>
                </div>

                <hr className='d-sm-none my-2' />

                <div className='col-xl-4 col-md-6 mb-4' style={{ marginLeft: '30px' }}>
                  <select
                    className="selectpicker form-control"
                    value={propertyType}
                    id="propertyType"
                    name="propertyType"
                    onChange={onChangePropertyType}

                  >
                    <option value="">주택 종류 선택</option>
                    <option value="APT">아파트(분양)</option>
                    <option value="신혼희망타운">신혼희망타운(임대)</option>
                    <option value="공공지원민간임대">공공지원민간임대(임대)</option>
                    <option value="도시형">도시형/오피스텔/생활숙박시설/민간임대(임대)</option>
                    <option value="계약취소주택">계약취소주택(임대)</option>
                    <option value="무순위/잔여세대">무순위/잔여세대(임대)</option>
                    <option value="임의공급">임의공급(임대)</option>
                  </select>
                </div>
              </Col>

              <hr className='d-md-none mt-2' />
              <Col  md={4} className='d-sm-flex align-items-center pt-4 pt-md-0'>

                <div id="searchBar" className='col-xl-4 col-md-6 mb-4' style={{ marginLeft: "450px" }}>
                  <span className="blue_window">
                    <input type="text" id="searchValue" name="searchValue" onChange={onChangeValue} value={searchValue || ''} className="input_text" />
                  </span>
                </div>
                <hr className='d-md-none mt-2' />
                <Button className='col-xl-4 col-md-6 mb-4' type='submit' variant='primary btn-icon px-3 w-100 w-sm-auto flex-shrink-0' style={{ marginLeft: '240px' }}>
                  <i className='fi-search'></i>
                  <span className='d-sm-none d-inline-block ms-2'>Search</span>
                </Button>
              </Col>
            </Row>
          </form>
        </Col>
      </div>



      <div id="map" style={{ width: '1400px', height: '600px', marginLeft: '120px', border: "1px solid #ccc" }}>


        {showNestedLayout && (
          <div className="nested-layout left-side" style={{
            position: 'absolute', top: 0, left: 0, width: '430px',
            height: '100%', overflow: 'auto', zIndex: '1000', backgroundColor: '#fff', border: "1px solid #ccc", border: "black"
          }}>
            <div style={{ marginLeft: '390px', marginTop: '20px', width: '40px' }}><a onClick={removeNestedLayout}><IoCloseCircleOutline /></a></div>
            {nestedRoute === 'HousingView' && <HousingView houseManageNo={selectedHouseManageNo} houseNm={selectedHouseNm}
              hssplyAdres={selectedHssplyAdres} cnstrctEntrpsNm={selectedCnstrctEntrpsNm}
              totSuplyHshldco={selectedTotSuplyHshldco} bsnsMbyNm={selectedBsnsMbyNm}
              houseSecdNm={selectedhouseSecdNm}

            />}

          </div>
        )}

          

      </div>
    </Main>
  );
};

export default MapComponent;