import React, { Suspense, useEffect, useState } from 'react';
import { Accordion, Col, Form, Modal, Row, Table} from "react-bootstrap";
import { Main } from "../../../layouts";
import ImageLoader from "../../../components/ImageLoader";
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Button from 'react-bootstrap/Button'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Blockquote from '../../../components/Blockquote'
import MyBlockquote from '../components/MyBlockquote';
import axios from 'axios';
import { useRouter } from 'next/router';

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

const PartyDetail = () => {
    const router = useRouter();

    const [show, setShow] = useState(false);
    const [scheduleShow, setScheduleShow] = useState(false);
    const [updateshow, setUpdateShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleScheduleClose = () => setScheduleShow(false);
    const handleScheduleShow = () => setScheduleShow(true);

    const handleUpdateClose = () => setUpdateShow(false);
    const handleUpdateShow = () => setUpdateShow(true);

    const [partyId, setPartyId] = useState();
    const [loginInfo, setLoginInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [areYouJoined, setAreYouJoined] = useState(false);
    const [memberRole, setMemberRole] = useState();
    const [partyInfo, setPartyInfo] = useState();
    const [partyMemberInfo, setPartyMemberInfo] = useState();
    const [partyScheduleInfo, SetPartyScheduleInfo] = useState();
    const [introductionState, setIntroductionState] = useState('');
    const [updateIntroductionState, setUpdateIntroductionState] = useState('');
    const [scheduleFormData, setScheduleFormData] = useState({
        title: '',
        date: '',
        location: '',
        summary: '',
        fee: '',
        description: ''
    });
    const [attendedSchedules, setAttendedSchedules] = useState();

    const pid =router.query.detail;


  useEffect(() => {
    if (!router.isReady) {
        return;
    }
    setPartyId(router.query.detail);
    getLoginInfo();
    getPartyInfo(router.query.detail);
  },[router.isReady, router.query.detail, isLoggedIn]);

  useEffect(() => {
    if (!router.isReady) {
        return;
    }
    getPartyMemberInfo();
    getPartyScheduleInfo();
  },[partyId])

  useEffect(() => {
    if (!router.isReady){
        return;
    }
    if(areYouJoined) {
        {loginInfo && partyInfo && loginInfo.mno === partyInfo.leaderId ? setMemberRole("LEADER") : setMemberRole("NORMAL") }
        getAttendedSchedules();
    }

  }, [loginInfo, areYouJoined, partyInfo])

  // async : 비동기식 키워드, 
  const getLoginInfo = async () => {
      try {
        const response = await axios.get('http://localhost/memberRest/loginInfo', 
                                                          { withCredentials: true });
          console.log("로그인 정보",response)
          if (response.data.result === true) {
              setLoginInfo(response.data.member);
              setIsLoggedIn(true);
              getJoinedInfo();
          } else {
            setIsLoggedIn(false);
          }
      } catch (e) {
          console.log("로그인 정보 쪽 에러",e);
      }
  }

  const getJoinedInfo = async () => {
    try {
        const response = await axios.get(`http://localhost/parties/${router.query.detail}/enrollment`,
                                                            { withCredentials: true });
        console.log("가입여부 체크 ",response)
        if(response.data.data){
            setAreYouJoined(true)
        } else {
            setAreYouJoined(false)
        }
    } catch (e) {
        console.log("모임 가입여부 체크 에러");
    }
  }

  const getPartyInfo = async (routerQuery) => {
    try {
        const response = await axios.get(`http://localhost/parties/${routerQuery}`, 
                                                            { withCredentials: true });
        console.log("파티 정보 받아오기",response)
        if (response.data.result) {
            setPartyInfo(response.data.data);
        } else {
            alert("잘못된 요청입니다.")
            location.href = "/party"
        }
    } catch (e) {
        console.log("파티 정보 에러",e)
    }
  }

  const getPartyMemberInfo = async () => {
    try {
        const response = await axios.get(`http://localhost/parties/${router.query.detail}/members`,
                                                            { withCredentials: true });
        console.log("파티멤버 정보", response.data.data);
        if (response.data.result) {
            setPartyMemberInfo(response.data.data);
        }
    } catch (e) {
        console.log("멤버 인포 에러", e)
    }
  }

  const getPartyScheduleInfo = async () => {
    try {
        const response = await axios.get(`http://localhost/parties/${router.query.detail}/schedules`,
                                                            { withCredentials: true });
        console.log("스케쥴 정보", response)
        if(response.data.result) {
            SetPartyScheduleInfo(response.data.data);
        }
    } catch (error) {
        console.log("스케쥴 가져오다가 에러")
    }
  }

  const handleSubmit = async () => {
    try {
        const formData = { introduction : introductionState };
        const axiosConfig = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post(
            `http://localhost/parties/${router.query.detail}/members`,
                formData, axiosConfig);
        console.log("핸들 서밋에서 받은 응답", response);
        alert("가입에 성공하셨습니다.")
        handleClose();
        getPartyMemberInfo();
        getJoinedInfo();
        setIntroductionState('')

    } catch (e) {
        console.log("파티 가입 실패",e)
        alert("가입에 실패하셨습니다.")
    }
};


const handleUpdateSubmit = async () => {
    try {
        const formData = { introduction : updateIntroductionState };
        const axiosConfig = {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const response = await axios.patch(
            `http://localhost/parties/${router.query.detail}/members/${loginInfo.mno}`,
                formData, axiosConfig);
        console.log("핸들 서밋에서 받은 응답", response);
        alert("수정에 성공하셨습니다.")
        handleUpdateClose();
        getPartyMemberInfo();
        setUpdateIntroductionState('')

    } catch (e) {
        console.log("파티 가입 실패",e)
        alert("가입에 실패하셨습니다.")
    }
};

    const handleWithdraw = () => {
        const confirmWithdraw = window.confirm('탈퇴하시겠습니까?');
        if (confirmWithdraw) {

            const leavingTheParty = async () => {
                try {
                    const response = await axios.delete(`http://localhost/parties/${router.query.detail}/members/${loginInfo.mno}`, { withCredentials: true })
                    console.log("파티 탈퇴에서 받은 응답", response);
                    if(response.data.result){
                        alert("파티를 탈퇴하셨습니다.");
                        allDeleteAttendeesSchedule();
                        getPartyMemberInfo();
                        getJoinedInfo();
                    }

                } catch (e) {
                    console.log("파티 탈퇴 실패")
                    alert("파티 탈퇴에 실패하였습니다.")
                }
            }
          
            leavingTheParty();
            console.log('탈퇴합니다.');
        }
    };

    const handleDeletePrompt = () => {
        const confirmWithdraw = window.confirm('파티를 삭제하시겠습니까?');
        if (confirmWithdraw) {
        console.log(`주소 http://localhost/parties/${pid}`);

            const deleteTheParty = async () => {
                try {
                    const response = await axios.delete(`http://localhost/parties/${pid}`, { withCredentials: true })
                    console.log("파티 삭제 응답",response);
                    alert("파티가 삭제됐습니다.");
                    location.href = "/party";
                } catch (e) {
                    alert("파티 삭제에 실패하였습니다.")
                }
            }
            deleteTheParty();
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScheduleFormData({
            ...scheduleFormData,
        [name]: value
        });
    };

    const handleScheduleSubmit = async (e) => {
        e.preventDefault();
        // const formData = { partyScheduleForm : scheduleFormData}
        const formData = {...scheduleFormData}
        console.log(formData)
        
        try{
            const axiosConfig = {
                withCredentials: true,
                headers: {
                    "Content-Type" : "application/x-www-form-urlencoded",
                },
                // headers: {
                //     "Content-Type": "application/json",
                // },
            };
            const response = await axios.post(
                `http://localhost/parties/${router.query.detail}/schedules`,
                // `http://localhost/parties/example`,
                formData, axiosConfig);
                    console.log("스케쥴 등록 데이터 ",response);
            if(response.data.result){
                alert("스케쥴 생성 성공");
                getPartyScheduleInfo();
                handleScheduleClose();
            } else {
                alert(response.data.data);
            }
        }catch(e){
            console.log("스케쥴 생성 실패", e)
        }

    };

    const allDeleteAttendeesSchedule = async () => {
        try {
            const response = await axios.delete(`http://localhost/parties/${router.query.detail}/members/${loginInfo.mno}/schedules`, { withCredentials: true } )
            console.log("참석한 모임들 지우기 응답",response)
            getPartyScheduleInfo();
        } catch (e) {
            console.log("참석한 모임에서 지우기 에러")
        }
    }

    const handleAttendeesCancel = async (scheduleId) => {
        try {
            const response = await axios.delete(`http://localhost/parties/${router.query.detail}/members/${loginInfo.mno}/schedules/${scheduleId}`, { withCredentials: true });
            console.log("모임 참석 취소 응답",response);                         
            getAttendedSchedules();
            getPartyScheduleInfo();
        } catch (e) {
            console.log("모임 참석 취소 중 에러", e)
        }
    }

    const handleAttendees = async (scheduleId) => {
        try {
            const response = await axios.post(`http://localhost/parties/${router.query.detail}/members/${loginInfo.mno}/schedules/${scheduleId}`, null, { withCredentials: true });
            console.log("모임 참석 응답",response);
            getAttendedSchedules();
            getPartyScheduleInfo();
        } catch (e) {
            console.log("모임 참석중 에러", e)
        }
    }


    const getAttendedSchedules = async () => {
        try {
            const response = await axios.get(`http://localhost/parties/${router.query.detail}/members/${loginInfo.mno}/schedules`, { withCredentials: true });
            console.log("참가 스케쥴 응답", typeof [response.data.data]);
            console.log("참가스케쥴 ",response);
            setAttendedSchedules(response.data.data)
        } catch (e) {
            console.log("참가 스케쥴 검색중 에러", e)
        }
    }


 
    return (
        <>
            <Main>
    
                <div style={{ position: "fixed", top: "80%", right: "20px", transform: "translateY(-50%)", zIndex:"100"}}>
                    {areYouJoined && <Button variant='info' style={{ height: "120px", width: "120px" }} onClick={() => location.href = `/party/${pid}/chat`}>채팅방 들어가기</Button>}
                </div>
                    <div className="col-9 mx-auto">
                        <h6 className="text-info"><i className="fi-grid mx-2"></i>카테고리 - {partyInfo && partyInfo.category}</h6>
                        <div className="d-flex justify-content-between">
                            {/* <h1>{partyInfo && partyInfo.title} - {partyInfo && partyInfo.briefIntroduction}</h1> */}
                            <h1>
                            {partyInfo && partyInfo.title} -{" "}
                            {partyInfo && partyInfo.briefIntroduction && partyInfo.briefIntroduction.length > 15
                                ? partyInfo.briefIntroduction.slice(0, 15) + "..."
                                : partyInfo && partyInfo.briefIntroduction}
                            </h1>
                            {!isLoggedIn && <h4>가입하려면 로그인이 필요합니다.</h4>}
                            {isLoggedIn && ( !areYouJoined ?( <Button variant='success'  onClick={handleShow}>가입하기</Button>
                                ) : (
                                    memberRole === "NORMAL" ? (<div><h4>회원</h4><Button onClick={handleWithdraw} variant='warning'>탈퇴하기</Button></div>
                                    ) : (
                                    <div><h4>파티 리더</h4>
                                    <Button onClick={()=> location.href=`/party/${pid}/update`} variant='secondary'>수정하기</Button>
                                    <Button onClick={handleDeletePrompt} variant='primary'>파티삭제</Button></div>) 
                            )
                            )}
                        </div>
                        <Row className="col-10">
                            <Col><h6><i className="fi-map-pin mx-2" />활동지역 : {partyInfo && partyInfo.activityArea}</h6></Col>
                            <Col><h6><i className="fi-users mx-2" />회원수 :   {partyMemberInfo && partyMemberInfo.length} 명</h6></Col>
                            <Col><h6><i className="fi-paperclip mx-2" />{partyInfo && partyInfo.categoryDetail}</h6></Col>
                        </Row>
                    </div>

                    <div className="col-9 mx-auto mt-3" style={{height : "350px"}}>
                        <Row>
                            <Col xs={5}>
                                <div className='img-thumbnail'>
                                  
                                    {partyInfo && <ImageLoader
                                        // src='/images/components/02.jpg'
                                        src={partyInfo && partyInfo.leaderProfileImage ? `http://localhost/parties/images/${partyInfo.leaderProfileImage}` : "/images/myImages/defaultImage.jpeg"}
                                        width={400}
                                        height={300}
                                        alt='Rounded thumbnail'
                                    />}
                                </div>
                            </Col>
                            <Col xs={7} className='px-5'  style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                <Row className="m"><b>- {partyInfo && partyInfo.leaderIntroductionTitle}</b></Row>
                                <hr></hr>
                                <Row className="m">
                                    <p>
                                    {partyInfo && partyInfo.leaderIntroduction}
                                    </p>

                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <hr></hr>

                    <div className='col-10 mx-auto'>
                        <Row>
                            <Col xs={5}>
                            <div className="m-5 col-10 mx-auto">
                            <div className='text-center'><h5>함께하는 멤버들의 한 줄 소개</h5></div>
                            {/* Center slide carousel */}

                            <Swiper
                                modules={[Navigation]}
                                slidesPerView={1}
                                navigation={{
                                    prevEl: '#prev3',
                                    nextEl: '#next3'
                                }}
                                pagination={{
                                    el: '#pagination2',
                                    clickable: true
                                }}
                                loop
                                grabCursor
                                >
                                    {partyMemberInfo && (
                                        Object.keys(partyMemberInfo).map((key, indx) => {
                                            const member= partyMemberInfo[key]

                                            return (
                                            <SwiperSlide key={indx}>
                                                <MyBlockquote author={{name: member.name}} align='center' style={{ height: '300px', backgroundColor: 'whitesmoke' }}>
                                            {/* {member.introduction} */}
                                                    {member.introduction && member.introduction.split('\n').map((line, index) => (
                                                        <React.Fragment key={index}>
                                                            {line}
                                                            <br />
                                                        </React.Fragment>
                                                    ))}
                                                </MyBlockquote>
                                            </SwiperSlide>
                                            )
                                        })
                                        )}
               
                            </Swiper>
                            <div className='d-flex justify-content-center'>
                                <Button id='prev3' variant='prev' className='position-relative mx-2' />
                                <Button id='next3' variant='next' className='position-relative mx-2' />
                            </div>
                           {areYouJoined && <Button onClick={handleUpdateShow}>내 한줄 소개 수정하기</Button>}
                        </div>
                            </Col>
                            <Col>
                            <div className='text-center m-5'> <h4>회원 목록</h4></div>
                            <div className=' col-10 mx-auto' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>회원명</th>
                                        <th>직책</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {partyMemberInfo && 
                                            Object.keys(partyMemberInfo).map((key, indx) => {
                                                const member = partyMemberInfo[key];
                                                return (
                                                    <tr key={indx}>
                                                        <th scope='row'>{indx + 1}</th>
                                                        <td>{member.name}</td>
                                                        <td>{member.role === "LEADER" ? '파티리더' : '회원'}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                </div>
                            </Col>
                        </Row>
                    </div>




                            <hr></hr>
                    <div className="m-5 col-10 mx-auto">
                        <Row>
                            <h5>모임 소개 - {partyInfo && partyInfo.partyIntroductionTitle}</h5>
                            <Col xs={5}>
                                <Swiper
                                modules={[Navigation, Pagination]}
                                navigation
                                pagination={{clickable: true}}
                                spaceBetween={16}
                                loop
                                grabCursor
                                className='swiper-nav-onhover swiper-pagination-light'
                                >
                                <SwiperSlide className='d-flex'>
                                    {partyInfo && <ImageLoader src={partyInfo.thumbnail ? `http://localhost/parties/images/${partyInfo.thumbnail}` : '/images/real-estate/recent/02.jpg'} width={720} height={500} alt='Image' />}
                                </SwiperSlide>

                                <SwiperSlide className='d-flex'>
                                    {partyInfo && <ImageLoader src={partyInfo.partyIntroductionImage ? `http://localhost/parties/images/${partyInfo.partyIntroductionImage}` : '/images/real-estate/recent/02.jpg'} width={720} height={500} alt='Image' />}
                                </SwiperSlide>
                              
                                </Swiper>
                            </Col>
                            <Col><p>{partyInfo && partyInfo.partyIntroduction}</p></Col>
                        </Row>
                    </div>
                    <hr></hr>

                    <div className="m-5 col-9 mx-auto">
                        <Row>
                            <Col xs={10}><h4>모임 정보</h4></Col>
                            <Col xs={2}>{memberRole === 'LEADER' && <Button variant='accent' onClick={handleScheduleShow}>모임 스케쥴 작성</Button>}</Col>
                            
                        </Row>
                        <Row style={{width:"100%"}}>
                            <Col>날짜</Col>
                            <Col>위치</Col>
                            <Col>내용</Col>
                            <Col>회비</Col>
                            <Col>현재참석인원</Col>
                        </Row>

                        {partyScheduleInfo && 
                            Object.keys(partyScheduleInfo).map((key, indx) => {
                                const partySchedule = partyScheduleInfo[key];
                              return ( <Accordion defaultActiveKey='' key={indx}>
                                <Accordion.Item eventKey='0'>
                                    <Accordion.Header>
                                        <Row style={{width:"100%"}}>
                                            <Col>{formatDateTime(partySchedule.date)}</Col>
                                            <Col>{partySchedule.location}</Col>
                                            <Col>{partySchedule.summary}</Col>
                                            <Col>{partySchedule.fee}</Col>
                                            <Col>{partySchedule.partyAttendees? partySchedule.partyAttendees?.length : 0} 명</Col>
                                        </Row>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col xs={7}>
                                            <div>
                                                <b>{partySchedule.title}</b><br></br><br></br>
                                                {partySchedule.description}
                                                
                                                <ol>
                                                <li>일시: {formatDateTime(partySchedule.date)}</li>
                                                <li>장소: {partySchedule.location}</li>
                                                <li>내용: {partySchedule.summary}</li>
                                                <li>회비: {partySchedule.fee}</li>
                                                </ol>
                                                더 많은 문의나 의견이 있으신 분들은 리더에게 연락 주시기 바랍니다.<br></br>

                                                감사합니다!<br></br><br></br>

                                                <br></br>
                                            </div>

                                            </Col>
                                            <Col xs={3}>
                                                <div className="col-10 mx-auto text-center">
                                                    <b>참석자 명단</b><hr></hr>
                                                    <ul className="mt-2">
                                                        {partySchedule.partyAttendees && 
                                                        (Object.values(partySchedule.partyAttendees).map((member, indx) => {
                                                            return (<li key={indx}>{member.attendeeName}</li>)
                                                        })
                                                            
                                                        )}
                                                       
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xs={2}>
                                            {areYouJoined && attendedSchedules &&  (Object.values(attendedSchedules).includes(partySchedule.id) ? (
                                                <Button onClick={() => handleAttendeesCancel(partySchedule.id)} variant='warning'>참석취소</Button>
                                                ) : (
                                                <Button onClick={() => handleAttendees(partySchedule.id)} variant='success'>참석</Button>
                                                ))}
                                            </Col>
                                        </Row>
                                    
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>)
                            }
                            
                         )}     


                    </div>

                    <Modal show={show} onHide={handleClose}  style={{ position: 'fixed', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <Modal.Header closeButton>
                        <Modal.Title>모임 가입하기</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group
                            className="mb-3"
                            controlId="introduction"
                            name="introduction"
                            >
                            <Form.Label>간단한 소개글</Form.Label>
                            <Form.Control as="textarea" rows={3}   value={introductionState}
                                onChange={(e) => setIntroductionState(e.target.value)} />
                            </Form.Group>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            취소
                        </Button>
                        <Button variant="info" onClick={handleSubmit}>
                           가입하기
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={updateshow} onHide={handleUpdateClose}  style={{ position: 'fixed', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <Modal.Header closeButton>
                        <Modal.Title>한줄 소개 수정</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group
                            className="mb-3"
                            controlId="introduction"
                            name="introduction"
                            >
                            <Form.Label>간단한 소개글</Form.Label>
                            <Form.Control as="textarea" rows={3}   value={updateIntroductionState}
                                onChange={(e) => setUpdateIntroductionState(e.target.value)} />
                            </Form.Group>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleUpdateClose}>
                            취소
                        </Button>
                        <Button variant="info" onClick={handleUpdateSubmit}>
                           가입하기
                        </Button>
                        </Modal.Footer>
                    </Modal>



                    <Modal show={scheduleShow} onHide={handleScheduleClose} size="md"  style={{height:"500px", position: 'fixed', top: '70%', left: '50%', transform: 'translate(-50%, -70%)' }}>
                        <Modal.Header closeButton>
                            <Modal.Title>새 모임 일정 만들기</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleScheduleSubmit} name='partyScheduleForm'>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>제목</Form.Label>
                                    <Form.Control type="text" name="title" value={scheduleFormData.title} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formDateTime">
                                    <Form.Label>날짜와 시간</Form.Label>
                                    <Form.Control type="datetime-local" name="date" value={scheduleFormData.date} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formLocation">
                                    <Form.Label>장소</Form.Label>
                                    <Form.Control type="text" name="location" value={scheduleFormData.location} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formSummary">
                                    <Form.Label>간략 내용</Form.Label>
                                    <Form.Control as="textarea" rows={1} name="summary" value={scheduleFormData.summary} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formFee">
                                    <Form.Label>회비</Form.Label>
                                    <Form.Control type="text" name="fee" value={scheduleFormData.fee} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>상세 내용</Form.Label>
                                    <Form.Control as="textarea" rows={5} name="description" value={scheduleFormData.description} onChange={handleChange} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleScheduleClose}>
                            취소
                        </Button>
                        <Button variant="info" onClick={handleScheduleSubmit}>
                            일정 등록
                        </Button>
                        </Modal.Footer>
                    </Modal>

                
            </Main>
        </>
    )
}

export default PartyDetail;