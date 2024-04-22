import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import VenueCard from './components/MyVenueCard'
import 'simplebar/dist/simplebar.min.css'

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear() % 100; // 년도에서 뒤의 두 자리만 가져옴
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const ampm = hour >= 12 ? '오후' : '오전';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  
  const formattedDateTime = `${year} 년 ${month < 10 ? '0' + month : month}월 ${day < 10 ? '0' + day : day}일 ${ampm}${hour12}시`;
  return formattedDateTime;
}


const TileLayer = dynamic(() => 
  import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
)
const CustomMarker = dynamic(() => 
  import('../../../components/partials/CustomMarker'),
  { ssr: false }
)
const Popup = dynamic(() => 
  import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
)
import 'leaflet/dist/leaflet.css'
import { Main } from '../../../layouts'
import PropertyCard from '../../../components/PropertyCard'
import PartyCard from '../components/PartyCard'
import axios from 'axios'
import { SwiperSlide } from 'swiper/react'
import { Accordion } from 'react-bootstrap'

const CatalogPage = () => {
  const [loginInfo, setLoginInfo] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();

  const [myParties, setMyParties] = useState();
  const [myInterestedParties, setMyInterestedParties] = useState();
  const [mySchedules, setMySchedules] = useState();
  const [attendedSchedules, setAttendedSchedules] = useState();

  useEffect(() => {
    const getLoginInfo = async () => {
        try {
            const response = await axios.get('http://localhost/memberRest/loginInfo', 
                                                            { withCredentials: true });
            console.log(response)
            if (response.data.result === true) {
                setLoginInfo(response.data.member);
                setIsLoggedIn(true)
                console.log("여기 찍혔나???")
            } else {
              setIsLoggedIn(false)
            }
        } catch (e) {
            console.log(e);
        }
    }
    getLoginInfo();
  },[]);

  useEffect(() => {
   
   
    if(isLoggedIn) {
      getMyParties();
      getMySchedules();
      getMyInterestedParties();
    }
  }, [loginInfo])
  
  const getMyParties = async () => {
    try {
      const response = await axios.get(`http://localhost/parties/members/${loginInfo.mno}/parties`, 
                                                                      { withCredentials: true });
      console.log("나의 파티정보", response)
      setMyParties(response.data.data);
    } catch (e) {
        console.log("나의 파티 에러",e)
    }
  } 
  
  const getMySchedules = async () => {
    try {
      const response = await axios.get(`http://localhost/parties/members/${loginInfo.mno}/schedules?sort=date,asc`, 
                                                                      { withCredentials: true });
      console.log("나의 스케쥴 정보", response)
      setMySchedules(response.data.data);
      setAttendedSchedules(response.data.data.map(item => item.id))
    } catch (e) {
        console.log("스케쥴 에러 ", e)
    }
  } 

  const getMyInterestedParties = async () => {
    try {
      const response = await axios.get(`http://localhost/parties/members/${loginInfo.mno}/interested-parties`, 
                                                                      { withCredentials: true });
      console.log("나의 관심 정보", response)
      setMyInterestedParties(response.data.data);
    } catch (e) {
        console.log("나의 관심 에러",e)
    }
  } 

  const handleAttendeesCancel = async (scheduleId) => {
    try {
        const response = await axios.delete(`http://localhost/parties/members/${loginInfo.mno}/schedules/${scheduleId}`, { withCredentials: true });
        console.log("모임 참석 취소 응답",response);                         

        getMySchedules();
    } catch (e) {
        console.log("모임 참석 취소 중 에러", e)
    }
}

const handleAttendees = async (scheduleId) => {
    try {
        const response = await axios.post(`http://localhost/parties/members/${loginInfo.mno}/schedules/${scheduleId}`, null, { withCredentials: true });
        console.log("모임 참석 응답",response);

        getMySchedules();
    } catch (e) {
        console.log("모임 참석중 에러", e)
    }
}


const deleteInterestedParty = async (partyId) => {
  try {
       const response = await axios.delete(`http://localhost/parties/members/${loginInfo.mno}/interested-parties/${partyId}`,  { withCredentials: true });
       console.log("좋아요 해제 응답",response)
       getMyInterestedParties();
  } catch (e) {
       console.log("좋아요 해제 도중 에러", e)
  }
   
}



  return (
    <Main>
      {/* Page container */}
      <Container fluid className="mt-2 pt-2 p-0">
        <Row className="">
          <div className="col-10 mx-auto">
            <h1>- 나의 모임</h1>
          </div>

          {/* Filters sidebar (Offcanvas on screens < 992px) */}
          <Col
            lg={12}
            xl={12}
            className="border-top-lg border-end-lg shadow-sm px-3 px-xl-4 px-xxl-5 pt-lg-2"
          >
            <div className="col-10 mx-auto">
              {/* Nav tabs */}
              <div className="my-5">
                <h4>가입한 모임 </h4>

                <SwiperSlide
                  className="d-flex"
                  scrollbar={{ draggable: true }}
                  style={{ maxWidth: "100%", overflowX: "auto" }}
                >
                  {myParties &&
                    Object.keys(myParties).map((key) => {
                      const subgroup = myParties[key];
                      return (
                        <Col key={key} xs={6} md={3} xl={3} className="my-3">
                          <PartyCard className={"mx-2"}
                            onClick={e => location.href = `/party/${subgroup.id}`}
                            key={key}
                            subgroupId={subgroup.id}
                            images={
                              subgroup.thumbnail
                                ? [
                                    [
                                      `http://localhost/parties/images/${subgroup.thumbnail}`,
                                      300,
                                      200,
                                      "Image",
                                    ],
                                  ]
                                : // Add more images to the array to display a carousel
                                  [
                                    [
                                      "/images/job-board/about/faq.jpg",
                                      300,
                                      200,
                                      "Image",
                                    ],
                                  ]
                            }
                            title={subgroup.title}
                            price={
                              subgroup.category +
                              " - " +
                              subgroup.categoryDetail
                            }
                            location={subgroup.activityArea}
                            isLoggedIn={isLoggedIn}
                            footer={
                              <div
                                style={{ overflowY: "auto", maxHeight: "50px" }}
                              >
                                {subgroup.briefIntroduction}
                              </div>
                            } // 스크롤처리
                            style={{ maxHeight: "350px", cursor: "pointer" }}
                          />
                        </Col>
                      );
                    })}
                </SwiperSlide>
              </div>

              <div>
                <h4>나의 스케쥴</h4>
                <Row style={{ width: "100%" }}>
                  <Col>모임이름</Col>
                  <Col>날짜</Col>
                  <Col>위치</Col>
                  <Col>내용</Col>
                  <Col>회비</Col>
                  <Col>현재참석인원</Col>
                </Row>

                {mySchedules && Object.keys(mySchedules).length > 0 ? (
                  Object.keys(mySchedules).map((key, indx) => {
                    const partySchedule = mySchedules[key];
                    return (
                      <Accordion defaultActiveKey="" key={indx}>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            <Row style={{ width: "100%" }}>
                              <Col>{partySchedule.partyName}</Col>
                              <Col>{formatDateTime(partySchedule.date)}</Col>
                              <Col>{partySchedule.location}</Col>
                              <Col>{partySchedule.summary}</Col>
                              <Col>{partySchedule.fee}</Col>
                              <Col>
                                {partySchedule.partyAttendees
                                  ? partySchedule.partyAttendees?.length
                                  : 0}{" "}
                                명
                              </Col>
                            </Row>
                          </Accordion.Header>
                          <Accordion.Body>
                            <Row>
                              <Col xs={7}>
                                <div>
                                  <b>{partySchedule.title}</b>
                                  <br></br>
                                  <br></br>
                                  {partySchedule.description}
                                  <ol>
                                    <li>
                                      일시: {formatDateTime(partySchedule.date)}
                                    </li>
                                    <li>장소: {partySchedule.location}</li>
                                    <li>내용: {partySchedule.summary}</li>
                                    <li>회비: {partySchedule.fee}</li>
                                  </ol>
                                  더 많은 문의나 의견이 있으신 분들은 리더에게
                                  연락 주시기 바랍니다.<br></br>
                                  감사합니다!<br></br>
                                  <br></br>
                                  <br></br>
                                </div>
                              </Col>
                              <Col xs={3}>
                                <div className="col-10 mx-auto text-center">
                                  <b>참석자 명단</b>
                                  <hr></hr>
                                  <ul className="mt-2">
                                    {partySchedule.partyAttendees &&
                                      Object.values(
                                        partySchedule.partyAttendees
                                      ).map((member, indx) => {
                                        return (
                                          <li key={indx}>
                                            {member.attendeeName}
                                          </li>
                                        );
                                      })}
                                  </ul>
                                </div>
                              </Col>
                              <Col xs={2}>
                                {attendedSchedules &&
                                  (Object.values(attendedSchedules).includes(
                                    partySchedule.id
                                  ) ? (
                                    <Button
                                      onClick={() =>
                                        handleAttendeesCancel(partySchedule.id)
                                      }
                                      variant="warning"
                                    >
                                      참석취소
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleAttendees(partySchedule.id)
                                      }
                                      variant="success"
                                    >
                                      참석
                                    </Button>
                                  ))}
                              </Col>
                            </Row>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    );
                  })
                ) : (
                  <div className="my-3">
                    <h5>스케줄이 없습니다.</h5>
                  </div>
                )}
              </div>

              <div className='my-5 py-5'>
                <h4>관심 모임</h4>
                {/* Filters tab */}
                <Row xs={1} sm={3} xl={3} className="gy-4 gx-3 gx-xxl-4 py-4">
                  {myInterestedParties && Object.keys(myInterestedParties).map((key, indx) => {
                    const item = myInterestedParties[key]
                    return (
                      <Col key={indx} className="pb-sm-2">
                      <VenueCard
                        href= {`/party/${item.id}`}
                        img={{
                          src : item.thumbnail ? `http://localhost/parties/images/${item.thumbnail}` : "/images/job-board/about/faq.jpg",
                          width: 504,
                          height: 300,
                          alt: item.title,
                        }}
                        title= {item.title}
                        price={item.category}
                        location= {item.activityArea}
                        wishlistButton={{
                          tooltip: "관심 해제하기",
                          props: {
                            onClick: (e) =>
                            deleteInterestedParty(item.id)
                          },
                        }}
                      />
                    </Col>
                    )
                  })}
                </Row>
              </div>
            </div>
          </Col>

          {/* Content */}
        </Row>
      </Container>

    </Main>
  );
}

export default CatalogPage
