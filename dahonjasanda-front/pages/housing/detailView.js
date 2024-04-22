import { useEffect, useState } from 'react'
import RealEstatePageLayout from '../../components/partials/RealEstatePageLayout'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge'
import Collapse from 'react-bootstrap/Collapse'
import Card from 'react-bootstrap/Card'
import ImageLoader from '../../components/ImageLoader'
import StarRating from '../../components/StarRating'
import SocialButton from '../../components/SocialButton'
import PropertyCard from '../../components/PropertyCard'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Main } from '../../layouts'
import { Table } from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from 'axios'
import seun from '../../public/images/housingImage/seun.png';
import asan from '../../public/images/housingImage/asan.jpg';
import baekyangsan from '../../public/images/housingImage/baekyangsan.jpg';
import dangjin from '../../public/images/housingImage/dangjin.jpg';
import dongtan from '../../public/images/housingImage/dongtan.jpg';
import gumdan from '../../public/images/housingImage/gumdan.webp';
import gwangMyonghillState from '../../public/images/housingImage/gwangMyong-hillState.jpg';
import gwangMyong from '../../public/images/housingImage/gwangMyong.jpg';
import iksan from '../../public/images/housingImage/iksan.jpg';
import namguro from '../../public/images/housingImage/namguro.jpg';
import samsung from '../../public/images/housingImage/samsung.jpg';
import songdo from '../../public/images/housingImage/songdo.jpg';
import songpa from '../../public/images/housingImage/songpa.webp';
import sungnam from '../../public/images/housingImage/sungnam.png';
import suwon from '../../public/images/housingImage/suwon.jpeg';
import ulsan from '../../public/images/housingImage/ulsan.webp';
import umirin from '../../public/images/housingImage/umirin.jpg';
import unam from '../../public/images/housingImage/unam.png';
import wonjong from '../../public/images/housingImage/wonjong.jpg';
import o1 from  '../../public/images/real-estate/single/01.jpg'

const DetailView = () => {

  const router = useRouter();
  const {houseManageNo} = router.query;

  const [housingType, setHousingType] = useState([]);
  const [housingListByManageNo, setHousingListByManageNo] = useState([]);
  
console.log(houseManageNo);


useEffect(() => {
  if (!router.isReady) {
    return;
  }
  //console.log(houseManageNo);


  getHousingType(houseManageNo);
  getHousingListByManageNo(houseManageNo);

}, [router.isReady]);


const getHousingType = async (houseManageNo) => {
  try {
    var url = 'http://localhost/housingType'
    if (houseManageNo != null) {
      url = url + '?houseManageNo=' + houseManageNo;
      console.log(houseManageNo);
      const response = await axios.get(url, { withCredentials: true });
      console.log(response.data.list);
      setHousingType(response.data.list);

    }

  } catch (e) {
    console.log(e);
  }
}

console.log(housingType);


const housingTypeList = housingType.map(item => (
  ({
    
    houseTy : item.houseTy ,
    suplyAr : item.suplyAr ,
    cntrctAr : item.cntrctAr ,
    excluseAr : item.excluseAr , 
    suplyHshldco : item.suplyHshldco ,
    houseManageNo : item.houseManageNo ,
    lttotTopAmount : item.lttotTopAmount
  })

))

const getHousingListByManageNo = async (houseManageNo) => {
  try {
    var url = 'http://localhost/housingListByManageNo'
    if (houseManageNo != null) {
      url = url + '?houseManageNo=' + houseManageNo;
      console.log(houseManageNo);
      const response = await axios.get(url, { withCredentials: true });
      console.log(response.data.list);
      setHousingListByManageNo(response.data.list);

    }

  } catch (e) {
    console.log(e);
  }
}

console.log(housingListByManageNo);


const housingListByManageNoList = housingListByManageNo.map(item => (
  ({
    
    houseNm : item.houseNm ,
    hssplyAdres : item.hssplyAdres ,
    cntrctCnclsBgnde : item.cntrctCnclsBgnde ,
    gnrlRnk1CrspareaRceptPd : item.gnrlRnk1CrspareaRceptPd ,
    gnrlRnk1EtcGgRcptdePd : item.gnrlRnk1EtcGgRcptdePd,
    gnrlRnk2EtcAreaRcptdePd : item.gnrlRnk2EtcAreaRcptdePd, 
    przwnerPresnatnDe : item.przwnerPresnatnDe ,
    rcritPblancDe : item.rcritPblancDe,
    spsplyRceptBgnde : item.spsplyRceptBgnde ,
    gnrlRnk1EtcAreaRcptdePd : item.gnrlRnk1EtcAreaRcptdePd , 
    gnrlRnk2CrspareaRceptPd : item.gnrlRnk2CrspareaRceptPd ,
    gnrlRnk2EtcGgRcptdePd : item.gnrlRnk2EtcGgRcptdePd

  })

))

housingListByManageNoList.push(housingTypeList);

console.log(housingListByManageNoList)


const houseNm = housingListByManageNo.length > 0 ? housingListByManageNo[0].houseNm : null;

// const houseNm = housingListByManageNoList.map(item => (

//   item.houseNm
// ))


const hssplyAdres = housingListByManageNo.length > 0 ? housingListByManageNo[0].hssplyAdres : null;


const rcritPblancDe = housingListByManageNo.length > 0 ? housingListByManageNo[0].rcritPblancDe : null;

console.log(rcritPblancDe)

const przwnerPresnatnDe = housingListByManageNo.length > 0 ? housingListByManageNo[0].przwnerPresnatnDe : null;

const cntrctCnclsBgnde = housingListByManageNo.length > 0 ? housingListByManageNo[0].cntrctCnclsBgnde : null;


const spsplyRceptBgnde = housingListByManageNoList.map(item => (
  
  item.spsplyRceptBgnde !== "null" ? item.spsplyRceptBgnde : ""
));

const gnrlRnk1CrspareaRceptPd = housingListByManageNoList.map(item => (
  
  item.gnrlRnk1CrspareaRceptPd !== "null" ? item.gnrlRnk1CrspareaRceptPd : ""
  
));

const gnrlRnk1EtcGgRcptdePd = housingListByManageNoList.map(item => (
  
  item.gnrlRnk1EtcGgRcptdePd !== "null" ? item.gnrlRnk1EtcGgRcptdePd : ""
));

const gnrlRnk1EtcAreaRcptdePd = housingListByManageNoList.map(item => (
  
  item.gnrlRnk1EtcAreaRcptdePd !== "null" ? item.gnrlRnk1EtcAreaRcptdePd : ""
));

const gnrlRnk2CrspareaRceptPd = housingListByManageNoList.map(item => (
  item.gnrlRnk2CrspareaRceptPd !== "null" ? item.gnrlRnk2CrspareaRceptPd : ""

));

const gnrlRnk2EtcGgRcptdePd = housingListByManageNoList.map(item => (
  item.gnrlRnk2EtcGgRcptdePd !== "null" ? item.gnrlRnk2EtcGgRcptdePd : ""

));

const gnrlRnk2EtcAreaRcptdePd = housingListByManageNoList.map(item => (
  item.gnrlRnk2EtcAreaRcptdePd !== "null" ? item.gnrlRnk2EtcAreaRcptdePd : ""

));

console.log("houseNm :" + houseNm)
const imageLoad = () => {
 // console.log("houseNm :" + houseNm)
  
  if (houseNm == "세운 푸르지오 헤리시티 무순위(2차)") {

    return seun;

  } 

  if (houseNm == "부천 원종 아이원시티 (임의공급 4차) [잔여세대 할인분양]") {

    return wonjong;

  } 

  if (houseNm == "성남판교대장 A-10블록 신혼희망타운(공공분양) 잔여세대") {

    return sungnam;

  } 

  if (houseNm == "세운 푸르지오 헤리시티 무순위(2차)") {

    return seun;

  } 

  if (houseNm == "수원당수 A-4블럭 신혼희망타운(공공분양) 잔여세대 추가입주자모집공고") {

    return suwon;

  } 

  if (houseNm == "송도자이풍경채 그라노블 5단지") {

    return songdo;

  } 

  if (houseNm == "대전 성남 우미린 뉴시티") {

    return umirin;

  } 

  if (houseNm == "백양산롯데캐슬골드센트럴") {

    return baekyangsan;

  } 

  if (houseNm == "당진 대덕수청 중흥S-클래스 포레힐") {

    return dangjin;

  } 

  if (houseNm == "성산 삼정그린코아 웰레스트") {

    return samsung;

  } 

  if (houseNm == "서울 우남 w컨템포287 도시형생활주택") {

    return unam;

  } 

  if (houseNm == "아산탕정일반산업단지 D1-1BL 호반써밋 그랜드마크Ⅰ") {

    return asan;

  } 

  if (houseNm == "세운 푸르지오 헤리시티 무순위(2차)") {

    return seun;

  } 

  if (houseNm == "울산 지웰시티 자이 2단지") {

    return ulsan;

  } 

  if (houseNm == "힐스테이트 익산더퍼스트") {

    return iksan;

  } 

  if (houseNm == "더샵 송파루미스타(임의공급 1차)") {

    return songpa;

  } 

  if (houseNm == "힐스테이트 동탄포레") {

    return dongtan;

  } 

  if (houseNm == "검단 한신더휴 어반파크") {

    return gumdan;

  } 

  if (houseNm == "광명자이힐스테이트SKVIEW") {

    return gwangMyonghillState;

  } 

  if (houseNm == "트리우스 광명 (임의공급 2차)") {

    return gwangMyong;

  } 


  if (houseNm == "남구로역 동일 센타시아") {

    return namguro;

  } 

  return o1;
}

console.log(imageLoad());

console.log(seun)

  // Gallery component (Swiper slider with custom thumbnails and slides count)  
  const SwiperGallery = () => {

  

    return (
      <>

        
        <a>
        <ImageLoader className='rounded-3' src={imageLoad()} width={1000} height={600} alt='Image' />
        {/* <img src={seun}></img> */}
        </a>
      </>
    )
  }




  
  return (
    <Main>


      {/* Post content */}
      <Container as='section' className='mt-5 mb-lg-5 mb-4 pt-5 pb-lg-5'>



        <Row>
          <Col lg={7} className='pt-lg-2 mb-5 mb-lg-0'>
            <div className='d-flex flex-column'>

              {/* Gallery */}
              <div className='order-lg-1 order-2' style={{ marginLeft: '200px', width: '1400px' }}>
                <SwiperGallery />
              </div>

              {/* Page title + Amenities */}
              <div className='order-lg-2 order-1 pt-lg-2' style={{ marginLeft: '200px', width: '1400px' }}>
                <div className='text-nowrap'>
                  <OverlayTrigger
                    placement='top'
                    overlay={<Tooltip>Add to Wishlist</Tooltip>}
                  >
                    <Button size='xs' variant='icon btn-light-primary shadow-sm rounded-circle ms-2 mb-2'>
                      <i className='fi-heart'></i>
                    </Button>
                  </OverlayTrigger>
                  <Dropdown className='d-inline-block'>
                    <OverlayTrigger
                      placement='top'
                      overlay={<Tooltip>Share</Tooltip>}
                    >
                      <Dropdown.Toggle variant='icon btn-light-primary btn-xs shadow-sm rounded-circle ms-2 mb-2'>
                        <i className='fi-share'></i>
                      </Dropdown.Toggle>
                    </OverlayTrigger>
                    <Dropdown.Menu align='end' className='my-1'>
                      <Dropdown.Item as='button'>
                        <i className='fi-facebook fs-base opacity-75 me-2'></i>
                        Facebook
                      </Dropdown.Item>
                      <Dropdown.Item as='button'>
                        <i className='fi-twitter fs-base opacity-75 me-2'></i>
                        Twitter
                      </Dropdown.Item>
                      <Dropdown.Item as='button'>
                        <i className='fi-instagram fs-base opacity-75 me-2'></i>
                        Instagram
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
            
                <h1 className='h2 mb-2'>{houseNm}</h1>
                <p className='mb-2 pb-1 fs-lg'>{hssplyAdres}</p>
                <ul className='d-flex mb-4 pb-lg-2 list-unstyled'>
                  <li className='me-3 pe-3 border-end'>
                    <b className='me-1'>4</b>
                    <i className='fi-bed mt-n1 lead align-middle text-muted'></i>
                  </li>
                  <li className='me-3 pe-3 border-end'>
                    <b className='me-1'>2</b>
                    <i className='fi-bath mt-n1 lead align-middle text-muted'></i>
                  </li>
                  <li className='me-3 pe-3 border-end'>
                    <b className='me-1'>2</b>
                    <i className='fi-car mt-n1 lead align-middle text-muted'></i>
                  </li>
                  <li>
                    <b>56 </b>
                    sq.m
                  </li>
                </ul>

              </div>

            </div>
            <div style={{ marginLeft: '200px', width: '1000px'}} >
              
              <Card className='border-0 bg-secondary mb-4'>
                <Card.Body>
                  <h5 className='mb-0 pb-3' style={{ textAlign: 'center' }}>청약일정</h5>
                  <Table className="text-sm mb-0" style={{}}>
                  
          
                      
                    <tbody>

                      <tr>
                        <th style={{}}>
                          모집공고일
                        </th>
                        <td>
                          {rcritPblancDe}
                        </td>
                      </tr>

                      <tr>
                        <th style={{}}>
                          당첨자 발표일
                        </th>
                        <td>
                          {przwnerPresnatnDe}
                        </td>
                      </tr>

                      <tr>
                        <th style={{}}>
                          계약일
                        </th>
                        <td>
                          {cntrctCnclsBgnde}
                        </td>
                      </tr>
                    </tbody>
                   
                  </Table>

                </Card.Body>
              </Card>
            </div>

            
            <div style={{marginLeft: '200px', width: '1000px' }}>
            <Card className='border-0 bg-secondary mb-4'>
                <Card.Body>
                    <h6 style={{ textAlign: 'center' }}>청약접수</h6>
                    <Table className="text-sm mb-0" style={{ height: '70px' }}>

                      <thead>
                        <tr align="center" bgcolor="white">

                          <th>구분</th>
                          <th>해당지역</th>
                          <th>경기지역</th>
                          <th>기타지역</th>
                          <th>접수장소</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr align="center" bgcolor="white">
                          <th>특별공급</th>
                          <td>{spsplyRceptBgnde}</td>
                          <td></td>
                          <td></td>
                          <td>인터넷</td>


                        </tr>
                        <tr align="center" bgcolor="white">
                          <th>1순위</th>
                          <td>{gnrlRnk1CrspareaRceptPd}</td>
                          <td>{gnrlRnk1EtcGgRcptdePd}</td>
                          <td>{gnrlRnk1EtcAreaRcptdePd}</td>
                          <td>인터넷</td>
                        </tr>

                        <tr align="center" bgcolor="white">
                          <th>2순위</th>
                          <td>{gnrlRnk2CrspareaRceptPd }</td>
                          <td>{gnrlRnk2EtcGgRcptdePd}</td>
                          <td>{gnrlRnk2EtcAreaRcptdePd }</td>
                          <td>인터넷</td>
                        </tr>


                      </tbody>
                    </Table>
                    </Card.Body>
              </Card>
                  </div>
              

            <div style={{ marginLeft: '200px', width: '1000px' }}>
              <Card className='border-0 bg-secondary mb-4'>
                <Card.Body>
                  <h5 className='mb-0 pb-3' style={{ textAlign: 'center' }}>공급대상</h5>
                  <Table className="text-sm mb-0" style={{ height: '70px' }}>

                    <thead>
                      <tr align="center" bgcolor="white">

                        <th>주택형</th>
                        <th>공급면적</th>
                        <th>계약면적</th>
                        <th>전용면적</th>
                        <th>공급세대수</th>
                        <th>주택관리번호</th>
                        <th>공급금액(최고가/만원)</th>
                      </tr>
                    </thead>

                    <tbody>
                      {housingTypeList.map(item =>(
                        
                        <tr align="center" bgcolor="white" key={item.tno}>
                        
                        <td>{item.houseTy !== "null" ? item.houseTy : "" && item.houseTy !== null ? item.houseTy : "" }</td>
                        <td>{item.suplyAr !== "null" ? item.suplyAr : "" }</td>
                        <td>{item.cntrctAr !== "null" ? item.cntrctAr : "" }</td>
                        <td>{item.excluseAr !== "null" ? item.excluseAr : "" }</td>
                        <td>{item.suplyHshldco !== "null" ? item.suplyHshldco : "" }</td>
                        <td>{houseManageNo}</td>
                        <td>{item.lttotTopAmount !== "null" ? item.lttotTopAmount : "" }</td>
                         </tr>
                      ))}
                     
                    </tbody>
                  </Table>


                </Card.Body>
              </Card>
            </div>

            {/* Amenities card */}







          </Col>

        </Row>
      </Container>


     
    </Main>
  )
}

export default DetailView
