import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { Main } from "../../../layouts";
import { categories, area } from "../categoryButton";
// import { FilePond } from "react-filepond";
import { useState } from "react";
import axios from "axios";

const Create = () => {
  const [profile, setProfile] = useState([])
  // const [formData, setFormData] = useState({
  //   title: '',
  //   activityArea: '',
  //   category: '',
  //   categoryDetail: '',
  //   thumbnail: '',
  //   briefIntroduction: '',
  //   leaderIntroductionTitle: '',
  //   leaderIntroduction: '',
  //   groupIntroductionTitle: '',
  //   groupIntroduction: ''
  // });

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    
    const formData = new FormData(event.currentTarget);
  
    // 여기에서 양식 데이터를 가져와 처리합니다.
    // 예: 서버에 데이터 전송, 상태 업데이트 등
    console.log("여기 이벤트 보자", event);
    console.log("여기 폼데이타 보자", formData);
    createParty(formData)
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  const createParty = async (form) => {
    try {

        // 순수 Json으로 전송할때
        // let board = {board:form.get('title'),board:form.get('content')}
        // const response = await axios.post('http://localhost/boardRest/write', board, {withCredentials: true});

        let axiosConfig = {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        const response = await axios.post('http://localhost/parties', form, axiosConfig);
        if (response.data.result === true) {
            console.log(response)
            alert('모임 만들기 성공');
            // location.href = "/board/view?bno=" + response.data.board.bno;
            location.href = "/party";
            return;
        } else {
          console.log("리스판스 리절트가 진실이 아닐떄 ", response)
            alert(response.data.data);
        }
    } catch (e) {
        console.log(e);
        alert('글 등록 실패!');
    }
    // location.href = "/party2";
}
  

    return (
        <Main>
            
            <div className="col-8 mx-auto m-5 p-5 bg-secondary" style={{ borderRadius: '30px' }}>
            <h2 className="my-3 text-center">나만의 모임 만들기</h2>
                  <Row
                    as={Form}
                    noValidate
                  //   validated={validated}
                    onSubmit={handleSubmit}
                    sm={2}
                    xs={1}
                    className='gy-sm-4 gy-3'
                  >
                    <Col as={Form.Group} controlId='title'>
                      <Form.Label>소모임 이름 (3글자 이상 입력해주세요)</Form.Label>
                      <Form.Control name="title" size='lg' required/>
                      <Form.Control.Feedback type='invalid'>
                        Please enter your name.
                      </Form.Control.Feedback>
                    </Col>
                    <Col as={Form.Group} controlId='activityArea'>
                    <Form.Label>활동 지역</Form.Label>
                      <Form.Select name="activityArea" size='lg' required>
                        {area.map((value, indx) => {
                          return (
                            <option key={indx} value={value}>{value}</option>
                          )
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>
                        Please choose the subject.
                      </Form.Control.Feedback>
                    </Col>
                    <Col as={Form.Group} controlId='category'>
                      <Form.Label>카테고리</Form.Label>
                      <Form.Select name="category" size='lg' required>
                          {Object.keys(categories).map((category, indx)=>{
                            return (
                            <option key={indx} value={category}>{category}</option>
                            )
                          })}
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>
                        Please choose the subject.
                      </Form.Control.Feedback>
                    </Col>
                    <Col as={Form.Group} controlId='categoryDetail'>
                      <Form.Label>카테고리 상세</Form.Label>
                      <Form.Control name="categoryDetail" size='lg'/>
                    </Col>

                    <Col as={Form.Group} xs={12} controlId='thumbnail' className="w-100">
                      {/* 여기에 섬네일 첨부파일 넣으면 됩니다 */}
                      <Form.Label>썸네일 (최대 1MB)</Form.Label>
                         {/* <input name="thumbnail" className="mx-5" type="file" accept="image/*" /> */}
                         <div className="d-flex align-items-center">
                          <Form.Control name="thumbnail" type="file" accept="image/*" />
                          <Button variant="danger" size="sm" onClick={() => {
                            // 파일 입력 요소의 값을 초기화합니다.
                            document.getElementById('thumbnail').value = '';
                          }}>취소</Button>
                        </div>
                    </Col>

                    
                    <Col as={Form.Group} xs={12} controlId='briefIntroduction' className='w-100'>
                      <Form.Label>모임에 대해 간단한 소개</Form.Label>
                      <Form.Control name="briefIntroduction" as='textarea' rows='1' required />
                      <Form.Control.Feedback type='invalid'>
                        Please enter your message.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={12} className="w-100 my-4">
                      <hr></hr>
                      <h5 className="text-center">상세 정보</h5>
                    </Col>
                          
                    <Col as={Form.Group} controlId='leaderIntroductionTitle'  className='w-100'>
                      <Form.Label>모임장 소개글 제목</Form.Label>
                      <Form.Control name="leaderIntroductionTitle" as='textarea' rows='1' size='lg'/>
                    </Col>
                    
                    <Col as={Form.Group} controlId='leaderSummary'  className='w-100'>
                      <Form.Label>모임장 간단 소개글</Form.Label>
                      <Form.Control name="leaderSummary" as='textarea' rows='2' size='lg'/>
                    </Col>
                    
                    <Col  as={Form.Group} controlId='leaderIntroductionImage' className="w-100">
                          {/* 이 부분에 모임장 프로필오면 좋을듯 */}
                          <Form.Label>모임장 프로필 이미지(최대 1MB)</Form.Label>
                         {/* <input name="leaderIntroductionImage" className="mx-5" type="file" accept="image/*" /> */}
                         <div className="d-flex align-items-center">
                          <Form.Control name="leaderIntroductionImage" type="file" accept="image/*" />
                          <Button variant="danger" size="sm" onClick={() => {
                            // 파일 입력 요소의 값을 초기화합니다.
                            document.getElementById('leaderIntroductionImage').value = '';
                          }}>취소</Button>
                        </div>
                    </Col>

                    <Col as={Form.Group} xs={12} controlId='leaderIntroduction' className='w-100'>
                      <Form.Label>모임장에 대한 소개글 상세</Form.Label>
                      <Form.Control name="leaderIntroduction" as='textarea' rows='4' required />
                      <Form.Control.Feedback type='invalid'>
                        Please enter your message.
                      </Form.Control.Feedback>
                    </Col>

                    <Col as={Form.Group} controlId='groupIntroductionTitle'  className='w-100'>
                      <Form.Label>모임에 대한 소개글 제목</Form.Label>
                      <Form.Control name="groupIntroductionTitle" as='textarea' rows={1} size='lg'/>
                    </Col>

                    <Col as={Form.Group} controlId='groupIntroductionImage' className="w-100">
                          {/* 이 부분이 모임 소개 사진 */}
                          <Form.Label>모임 소개 이미지(최대 1MB)</Form.Label>
                         {/* <input name="groupIntroductionImage" className="mx-5" type="file" accept="image/*" /> */}
                         <div className="d-flex align-items-center">
                          <Form.Control name="groupIntroductionImage" type="file" accept="image/*" />
                          <Button variant="danger" size="sm" onClick={() => {
                            // 파일 입력 요소의 값을 초기화합니다.
                            document.getElementById('groupIntroductionImage').value = '';
                          }}>취소</Button>
                        </div>
                    </Col>

                    <Col as={Form.Group} xs={12} controlId='groupIntroduction' className='w-100'>
                      <Form.Label>모임에 대한 소개글 상세</Form.Label>
                      <Form.Control name="groupIntroduction" as='textarea' rows='6' required />
                      <Form.Control.Feedback type='invalid'>
                        Please enter your message.
                      </Form.Control.Feedback>
                    </Col>

                    <Col xs={10} className='w-100'>
                      <Button type='submit' size='lg' variant='info w-sm-auto w-100 mt-2'>모임 만들기</Button>
                    </Col>
                    
                  </Row>
                </div>
                
        </Main>
    )
}

export default Create;