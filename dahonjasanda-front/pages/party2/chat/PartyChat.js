
import { Button, Card, Col, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import { Main } from "../../../layouts";
import RightBalloon from './rightBalloonStyle';
import ImageLoader from "../../../components/ImageLoader";
import IconBox from "../../../components/IconBox";

const rightBalloonStyle = {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    marginBottom: '16px',
  };
  
  const rightBalloonBeforeStyle = {
    content: '',
    position: 'absolute',
    bottom: '100%',
    left: '100%',
    border: '12px solid transparent',
    borderRightColor: '#ffffff',
    transform: 'translateX(-50%)',
  };

  const leftBalloonStyle = {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    marginBottom: '16px',
  };
  
  const leftBalloonBeforeStyle = {
    content: '',
    position: 'absolute',
    bottom: '100%',
    right: '100%',
    border: '12px solid transparent',
    borderLeftColor: '#ffffff',
    transform: 'translateX(50%)',
  };

const PartyChat = () => {
    return (
        <>
            <Main>
                <Row>
                    <Col sm={3} lg={3}>
                        <div className="my-3">
                            <h5 className="text-center">대화 내용 찾기</h5>
                            <InputGroup>
                                <FormControl
                                    placeholder='Button on the right'
                                    aria-label='Example text input with button addon'
                                    aria-describedby='right-button-addon'
                                />
                                <Button variant="info" id='right-button-addon'>Button</Button>
                            </InputGroup>
                        </div>
                            <hr></hr>
                        <div className="my-3 text-center">
                            <h5>프로필 선택하기</h5>

                            <Row>
                                <Col xs={6}>
                                    <IconBox
                                    href='#'
                                    media='fi-meds'
                                    title='Border card'
                                    type='pill'
                                    className='mb-4'
                                    />
                                </Col>
                                <Col xs={6}>
                                    <IconBox
                                    href='#'
                                    media='fi-meds'
                                    title='Border card'
                                    type='pill'
                                    className='mb-4'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <IconBox
                                    href='#'
                                    media='fi-meds'
                                    title='Border card'
                                    type='pill'
                                    className='mb-4'
                                    />
                                </Col>
                                <Col xs={6}>
                                    <IconBox
                                    href='#'
                                    media='fi-meds'
                                    title='Border card'
                                    type='pill'
                                    className='mb-4'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <IconBox
                                    href='#'
                                    media='fi-meds'
                                    title='Border card'
                                    type='pill'
                                    className='mb-4'
                                    />
                                </Col>
                                <Col xs={6}>
                                    <IconBox
                                    href='#'
                                    media='fi-meds'
                                    title='Border card'
                                    type='pill'
                                    className='mb-4'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <IconBox
                                    href='#'
                                    media='fi-meds'
                                    title='Border card'
                                    type='pill'
                                    className='mb-4'
                                    />
                                </Col>
                                <Col xs={6}>
                                    <IconBox
                                    href='#'
                                    media='fi-meds'
                                    title='Border card'
                                    type='pill'
                                    className='mb-4'
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>


                    <Col sm={10} lg={7}>
                         <div style={{maxHeight: '500px', height: 'calc(100vh - 20px)', overflowY: 'auto', backgroundColor: '#36393f' }}>
                            <div className="m-4 text-white">
                                <div className="my-4">
                                    <Row>
                                        <Col xs={2}>
                                            <ImageLoader
                                            src='/images/components/01.jpg'
                                            width={40}
                                            height={40}
                                            alt='Circle image'
                                            className='rounded-circle'
                                            />
                                        </Col>
                                            <Col >
                                        <div style={{marginLeft : '-40px'}}>
                                                <Row className="align-items-center">
                                                <Col xs="auto"><b>이게 아이디</b></Col>
                                                <Col xs="auto">
                                                    <div style={{ fontSize: 'smaller', color: 'gray' }}>오늘 오전 4:51</div>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col>이게 채팅 내용이겠지</Col>
                                                </Row>
                                        </div>
                                            </Col>
                                    </Row>
                                </div>
                                <div className="my-4">
                                    <Row>
                                        <Col xs={2}>
                                            <ImageLoader
                                            src='/images/components/01.jpg'
                                            width={40}
                                            height={40}
                                            alt='Circle image'
                                            className='rounded-circle'
                                            />
                                        </Col>
                                            <Col >
                                        <div style={{marginLeft : '-40px'}}>
                                                <Row className="align-items-center">
                                                <Col xs="auto"><b>이게 아이디</b></Col>
                                                <Col xs="auto">
                                                    <div style={{ fontSize: 'smaller', color: 'gray' }}>오늘 오전 4:51</div>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col>이게 채팅 내용이겠지</Col>
                                                </Row>
                                        </div>
                                            </Col>
                                    </Row>
                                </div>
                                <div className="my-4">
                                    <Row>
                                        <Col xs={2}>
                                            <ImageLoader
                                            src='/images/components/01.jpg'
                                            width={40}
                                            height={40}
                                            alt='Circle image'
                                            className='rounded-circle'
                                            />
                                        </Col>
                                            <Col >
                                        <div style={{marginLeft : '-40px'}}>
                                                <Row className="align-items-center">
                                                <Col xs="auto"><b>이게 아이디</b></Col>
                                                <Col xs="auto">
                                                    <div style={{ fontSize: 'smaller', color: 'gray' }}>오늘 오전 4:51</div>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col>이게 채팅 내용이겠지</Col>
                                                </Row>
                                        </div>
                                            </Col>
                                    </Row>
                                </div>
                                <div className="my-4">
                                    <Row>
                                        <Col xs={2}>
                                            <ImageLoader
                                            src='/images/components/01.jpg'
                                            width={40}
                                            height={40}
                                            alt='Circle image'
                                            className='rounded-circle'
                                            />
                                        </Col>
                                            <Col >
                                        <div style={{marginLeft : '-40px'}}>
                                                <Row className="align-items-center">
                                                <Col xs="auto"><b>이게 아이디</b></Col>
                                                <Col xs="auto">
                                                    <div style={{ fontSize: 'smaller', color: 'gray' }}>오늘 오전 4:51</div>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col>이게 채팅 내용이겠지</Col>
                                                </Row>
                                        </div>
                                            </Col>
                                    </Row>
                                </div>
                                <div className="my-4">
                                    <Row>
                                        <Col xs={2}>
                                            <ImageLoader
                                            src='/images/components/01.jpg'
                                            width={40}
                                            height={40}
                                            alt='Circle image'
                                            className='rounded-circle'
                                            />
                                        </Col>
                                            <Col >
                                        <div style={{marginLeft : '-40px'}}>
                                                <Row className="align-items-center">
                                                <Col xs="auto"><b>이게 아이디</b></Col>
                                                <Col xs="auto">
                                                    <div style={{ fontSize: 'smaller', color: 'gray' }}>오늘 오전 4:51</div>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col>이게 채팅 내용이겠지</Col>
                                                </Row>
                                        </div>
                                            </Col>
                                    </Row>
                                </div>
                                <div className="my-4">
                                    <Row>
                                        <Col xs={2}>
                                            <ImageLoader
                                            src='/images/components/01.jpg'
                                            width={40}
                                            height={40}
                                            alt='Circle image'
                                            className='rounded-circle'
                                            />
                                        </Col>
                                            <Col >
                                        <div style={{marginLeft : '-40px'}}>
                                                <Row className="align-items-center">
                                                <Col xs="auto"><b>이게 아이디</b></Col>
                                                <Col xs="auto">
                                                    <div style={{ fontSize: 'smaller', color: 'gray' }}>오늘 오전 4:51</div>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col>이게 채팅 내용이겠지</Col>
                                                </Row>
                                        </div>
                                            </Col>
                                    </Row>
                                </div>
                                <div className="my-4">
                                    <Row>
                                        <Col xs={2}>
                                            <ImageLoader
                                            src='/images/components/01.jpg'
                                            width={40}
                                            height={40}
                                            alt='Circle image'
                                            className='rounded-circle'
                                            />
                                        </Col>
                                            <Col >
                                        <div style={{marginLeft : '-40px'}}>
                                                <Row className="align-items-center">
                                                <Col xs="auto"><b>이게 아이디</b></Col>
                                                <Col xs="auto">
                                                    <div style={{ fontSize: 'smaller', color: 'gray' }}>오늘 오전 4:51</div>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col>이게 채팅 내용이겠지</Col>
                                                </Row>
                                        </div>
                                            </Col>
                                    </Row>
                                </div>
                                <div className="my-4">
                                    <Row>
                                        <Col xs={2}>
                                            <ImageLoader
                                            src='/images/components/01.jpg'
                                            width={40}
                                            height={40}
                                            alt='Circle image'
                                            className='rounded-circle'
                                            />
                                        </Col>
                                            <Col >
                                        <div style={{marginLeft : '-40px'}}>
                                                <Row className="align-items-center">
                                                <Col xs="auto"><b>이게 아이디</b></Col>
                                                <Col xs="auto">
                                                    <div style={{ fontSize: 'smaller', color: 'gray' }}>오늘 오전 4:51</div>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col>이게 채팅 내용이겠지</Col>
                                                </Row>
                                        </div>
                                            </Col>
                                    </Row>
                                </div>

                                <div className="my-4">
                                    <Row>
                                        <Col xs={2}>
                                            <ImageLoader
                                            src='/images/components/01.jpg'
                                            width={40}
                                            height={40}
                                            alt='Circle image'
                                            className='rounded-circle'
                                            />
                                        </Col>
                                            <Col >
                                        <div style={{marginLeft : '-40px'}}>
                                                <Row className="align-items-center">
                                                <Col xs="auto"><b>이게 아이디</b></Col>
                                                <Col xs="auto">
                                                    <div style={{ fontSize: 'smaller', color: 'gray' }}>오늘 오전 4:51</div>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col>이게 채팅 내용이겠지</Col>
                                                </Row>
                                        </div>
                                            </Col>
                                    </Row>
                                </div>

                                <div className="sticky-bottom p-3 mt-3" style={{backgroundColor: '#36393f'}}>
                                    <InputGroup>
                                    <FormControl
                                        placeholder='Button on the right'
                                        aria-label='Example text input with button addon'
                                        aria-describedby='right-button-addon'
                                    />
                                    <Button variant="accent" id='right-button-addon'>Button</Button>
                                    </InputGroup>
                                </div>
                            </div>

                        </div>
                    </Col>






                    <Col sm={0}lg={2}>

                    <div className='text-center'> <h4>가입한 회원들</h4></div>
                           <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <Table responsive>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope='row'>1</th>
                                    <td>John</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>2</th>
                                    <td>Anna</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>3</th>
                                    <td>Kale</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>4</th>
                                    <td>Jane</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>1</th>
                                    <td>John</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>2</th>
                                    <td>Anna</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>3</th>
                                    <td>Kale</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>4</th>
                                    <td>Jane</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>1</th>
                                    <td>John</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>2</th>
                                    <td>Anna</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>3</th>
                                    <td>Kale</td>
                                    </tr>
                                    <tr>
                                    <th scope='row'>4</th>
                                    <td>Jane</td>
                                    </tr>
                                </tbody>
                            </Table>
                            </div>

                    </Col>

                </Row>
            </Main>
        </>
    )
}

export default PartyChat;