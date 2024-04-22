import React, { Suspense } from 'react';
import { Accordion, Col, Row, Table} from "react-bootstrap";
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



const PartyDetail = () => {
    return (
        <>
            <Main>
                <div className="col-9 mx-auto">
                    <h6 className="text-accent"><i className="fi-grid mx-2"></i>카테고리</h6>
                    <div fluid  className="d-flex justify-content-between">
                        <h1>대충 모임 이름 - 간단한 모임 정보</h1>
                        <Button variant='success'>가입하기</Button>
                    </div>
                    <Row className="col-10">
                        <Col><h6><i className="fi-map-pin mx-2" />오프라인 서울</h6></Col>
                        <Col><h6><i className="fi-users mx-2" />모임에 속한 인원 ( 12 명 )</h6></Col>
                        <Col><h6><i className="fi-paperclip mx-2" />상세 카테고리</h6></Col>
                    </Row>
                </div>

                <div className="col-9 mx-auto mt-3">
                    <Row>
                        <Col xs={3}>
                            <div className='img-thumbnail'>
                                <ImageLoader
                                    src='/images/components/02.jpg'
                                    width={256}
                                    height={256}
                                    alt='Rounded thumbnail'
                                />
                            </div>
                        </Col>
                        <Col xs={9} className='px-5'>
                            <Row className="my-4"><b>- 홍길동, 개발 15년 차 / 이제 for 문이 두렵지 않다!!</b></Row>
                            <hr></hr>
                            <Row className="my-4">
                                <p>
                                안녕하세요, 여러분!

저는 홍길동이라고 합니다. 개발을 시작한 지 벌써 15년이 되었습니다. 이제는 for 문을 보고도 두렵지 않습니다! 오랜 경험과 노력 끝에 이제는 자신감 있게 코드를 작성할 수 있게 되었습니다.

15년 동안의 개발 경험을 통해 많은 것을 배웠습니다. 새로운 기술과 도구에 대한 열정과 탐구심은 항상 제게 도전을 주었습니다. 또한, 프로젝트를 진행하면서 발생하는 다양한 문제들을 해결하면서 점점 더 성장해왔습니다.

개발의 길은 항상 새로움과 변화의 길입니다. 하지만 이제는 그 변화를 두려워하지 않습니다. 오히려 그것을 기대하며 새로운 도전에 임하고 있습니다.

앞으로도 더 많은 것을 배우고, 더 나은 코드를 작성하기 위해 노력할 것입니다. 개발자로서의 역량을 끊임없이 향상시키며, 더 나은 소프트웨어를 만들기 위해 노력할 것입니다.

감사합니다!

홍길동
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
                            <SwiperSlide>
                                <MyBlockquote author={{name: '리처드 파인만'}} align='center' style={{ height: '300px', backgroundColor: 'whitesmoke' }}>
                            파인만 알고리즘 <br></br><br></br>1. 풀고자 하는 문제를 적는다. <br></br>2.아주 열심히 생각한다.<br></br>3. 문제의 해답을 적는다.
                                </MyBlockquote>
                            </SwiperSlide>
                            <SwiperSlide>
                                <MyBlockquote author={{name: '마크 주커버그'}} align='center' style={{ height: '300px', backgroundColor: 'whitesmoke' }}>
                            대충 흑백에다가 글씨쓰면 명언처럼 보인다.111
                                </MyBlockquote>
                            </SwiperSlide>
                            <SwiperSlide>
                                <MyBlockquote author={{name: '마크 주커버그'}} align='center' style={{ height: '300px', backgroundColor: 'whitesmoke' }}>
                            대충 흑백에다가 글씨쓰면 명언처럼 보인다.111
                                </MyBlockquote>
                            </SwiperSlide>
                        </Swiper>
                        <div className='d-flex justify-content-center'>
                            <Button id='prev3' variant='prev' className='position-relative mx-2' />
                            <Button id='next3' variant='next' className='position-relative mx-2' />
                        </div>
                    </div>
                        </Col>
                        <Col>
                           <div className='text-center'> <h4>모임에 가입한 회원들</h4></div>
                           <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <Table responsive>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Position</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope='row'>1</th>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>CEO, Founder</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>2</th>
                                    <td>Anna</td>
                                    <td>Cabana</td>
                                    <td>Designer</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>3</th>
                                    <td>Kale</td>
                                    <td>Thornton</td>
                                    <td>Developer</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>4</th>
                                    <td>Jane</td>
                                    <td>Birkins</td>
                                    <td>Support</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>1</th>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>CEO, Founder</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>2</th>
                                    <td>Anna</td>
                                    <td>Cabana</td>
                                    <td>Designer</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>3</th>
                                    <td>Kale</td>
                                    <td>Thornton</td>
                                    <td>Developer</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>4</th>
                                    <td>Jane</td>
                                    <td>Birkins</td>
                                    <td>Support</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>1</th>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>CEO, Founder</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>2</th>
                                    <td>Anna</td>
                                    <td>Cabana</td>
                                    <td>Designer</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>3</th>
                                    <td>Kale</td>
                                    <td>Thornton</td>
                                    <td>Developer</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>4</th>
                                    <td>Jane</td>
                                    <td>Birkins</td>
                                    <td>Support</td>
                                    </tr>
                                </tbody>
                            </Table>
                            </div>
                        </Col>
                    </Row>
                </div>




                        <hr></hr>
                <div className="m-5 col-10 mx-auto">
                    <Row>
                        <h5>모임 소개</h5>
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
                                <ImageLoader src='/images/real-estate/catalog/20.jpg' width={720} height={329} alt='Image' />
                            </SwiperSlide>
                            <SwiperSlide className='d-flex'>
                                <ImageLoader src='/images/real-estate/catalog/10.jpg' width={720} height={329} alt='Image' />
                            </SwiperSlide>
                            <SwiperSlide className='d-flex'>
                                <ImageLoader src='/images/real-estate/catalog/12.jpg' width={720} height={329} alt='Image' />
                            </SwiperSlide>
                            </Swiper>
                        </Col>
                        <Col><p>어디서나 잘 자라는 고사리처럼 직장인 n년차 우리들의 씩씩한 삶 되돌아보기

                            영화와 등산, 그리고 직장생활 이 세 가지가 무슨 연결고리를 가지고 있냐구요?
                            오르락 내리락하는 것이 닮았구요.
                            이 세가지 다 좋아하는(좋아하게 될) 것이라는 게 닮았죠.
                            그리고 지금, 우리에게 새로운 연결고리로 다가왔다는 사실.

                            고사리 산악회를 클릭한 이 순간부터 직장인의 애환은 같이 나누고, 친구로 기쁨을 함께 나눌 수 있기를 바래봅니다. 산우여러분 여러분을 환영합니다.

                            * 2번의 등산 모임이 있어요. 등산화가 없으면 등산이 어려운 산에 갈 예정이에요.
                            * 입문반인 ‘새싹 산악회’ 멤버들과 다함께 만나는 가벼운 밋업을 준비하고 있어요. 모임 시작 후 일정을 조정해 모두 만나는 시간을 가지겠습니다.</p></Col>
                    </Row>
                </div>
                <hr></hr>

                <div className="m-5 col-9 mx-auto">
                    <h4>모임 정보</h4>
                    <Row style={{width:"100%"}}>
                        <Col>번호</Col>
                        <Col>날짜</Col>
                        <Col>위치</Col>
                        <Col>내용</Col>
                        <Col>회비</Col>
                        <Col>현재참석인원</Col>
                    </Row>

                    <Accordion defaultActiveKey=''>
                        <Accordion.Item eventKey='0'>
                            <Accordion.Header>
                                <Row style={{width:"100%"}}>
                                    <Col>1</Col>
                                    <Col>대충 3월 24일</Col>
                                    <Col>대충 홍대 어딘가</Col>
                                    <Col>치킨이나 뜯자</Col>
                                    <Col>일인당 15만원</Col>
                                    <Col>4명</Col>
                                </Row>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col xs={7}>
                                    <div>
                                        <b>제목: 3월 24일 홍대에서 치킨 파티! </b><br></br><br></br>

                                        안녕하세요, 여러분!<br></br>

                                        저희는 3월 24일에 홍대 어딘가에서 모여서 치킨 파티를 열려고 합니다. 치킨을 뜯으면서 함께 즐거운 시간을 보내고자 합니다.<br></br><br></br>
                                        <ol>
                                        <li>일시: 3월 24일 (목) 오후 7시</li>
                                        <li>장소: 홍대 어딘가</li>
                                        <li>내용: 치킨 파티</li>
                                        <li>회비: 15만원 (일인당)</li>
                                        </ol>
                                        더 많은 문의나 의견이 있으신 분들은 언제든지 연락 주시기 바랍니다.<br></br>

                                        감사합니다!<br></br><br></br>

                                        [작성자 이름] (모임장)<br></br>
                                    </div>

                                    </Col>
                                    <Col xs={3}>
                                        <div className="col-10 mx-auto text-center">
                                            <b>참석자 명단</b><hr></hr>
                                            <ul className="mt-2">
                                                <li>빌게이츠</li>
                                                <li>제프 딘</li>
                                                <li>남궁성</li>
                                                <li>김영한</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col xs={2}>
                                    <Button variant='success'>참석</Button>
                                    </Col>
                                </Row>
                            
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
              
                    <Accordion defaultActiveKey=''>
                        <Accordion.Item eventKey='0'>
                            <Accordion.Header>
                                <Row style={{width:"100%"}}>
                                    <Col>1</Col>
                                    <Col>대충 3월 24일</Col>
                                    <Col>대충 홍대 어딘가</Col>
                                    <Col>치킨이나 뜯자</Col>
                                    <Col>일인당 15만원</Col>
                                    <Col>4명</Col>
                                </Row>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col xs={7}>
                                    <div>
                                        <b>제목: 3월 24일 홍대에서 치킨 파티! </b><br></br>

                                        안녕하세요, 여러분!<br></br>

                                        저희는 3월 24일에 홍대 어딘가에서 모여서 치킨 파티를 열려고 합니다. 치킨을 뜯으면서 함께 즐거운 시간을 보내고자 합니다.<br></br><br></br>
                                        <ol>
                                        <li>일시: 3월 24일 (목) 오후 7시</li>
                                        <li>장소: 홍대 어딘가</li>
                                        <li>내용: 치킨 파티</li>
                                        <li>회비: 15만원 (일인당)</li>
                                        </ol>
                                        더 많은 문의나 의견이 있으신 분들은 언제든지 연락 주시기 바랍니다.<br></br>

                                        감사합니다!<br></br><br></br>

                                        [작성자 이름] (모임장)<br></br>
                                    </div>

                                    </Col>
                                    <Col xs={3}>
                                        <div className="col-10 mx-auto text-center">
                                            <b>참석자 명단</b><hr></hr>
                                            <ul className="mt-2">
                                                <li>빌게이츠</li>
                                                <li>제프 딘</li>
                                                <li>남궁성</li>
                                                <li>김영한</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col xs={2}>
                                    <Button variant='success'>참석</Button>
                                    </Col>
                                </Row>
                            
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
              
                    <Accordion variant='info' defaultActiveKey=''>
                        <Accordion.Item variant='info' eventKey='0'>
                            <Accordion.Header variant='info'>
                                <Row style={{width:"100%"}}>
                                    <Col>1</Col>
                                    <Col>대충 3월 24일</Col>
                                    <Col>대충 홍대 어딘가</Col>
                                    <Col>치킨이나 뜯자</Col>
                                    <Col>일인당 15만원</Col>
                                    <Col>4명</Col>
                                </Row>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col xs={7}>
                                    <div>
                                        <b>제목: 3월 24일 홍대에서 치킨 파티! </b><br></br>

                                        안녕하세요, 여러분!<br></br>

                                        저희는 3월 24일에 홍대 어딘가에서 모여서 치킨 파티를 열려고 합니다. 치킨을 뜯으면서 함께 즐거운 시간을 보내고자 합니다.<br></br><br></br>
                                        <ol>
                                        <li>일시: 3월 24일 (목) 오후 7시</li>
                                        <li>장소: 홍대 어딘가</li>
                                        <li>내용: 치킨 파티</li>
                                        <li>회비: 15만원 (일인당)</li>
                                        </ol>
                                        더 많은 문의나 의견이 있으신 분들은 언제든지 연락 주시기 바랍니다.<br></br>

                                        감사합니다!<br></br><br></br>

                                        [작성자 이름] (모임장)<br></br>
                                    </div>

                                    </Col>
                                    <Col xs={3}>
                                        <div className="col-10 mx-auto text-center">
                                            <b>참석자 명단</b><hr></hr>
                                            <ul className="mt-2">
                                                <li>빌게이츠</li>
                                                <li>제프 딘</li>
                                                <li>남궁성</li>
                                                <li>김영한</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col xs={2}>
                                    <Button variant='success'>참석</Button>
                                    </Col>
                                </Row>
                            
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
              
            
      


                </div>

                
            </Main>
        </>
    )
}

export default PartyDetail;