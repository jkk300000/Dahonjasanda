import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { Main } from "../../../../layouts";
import { categories, area } from "../../categoryButton";
// import { FilePond } from "react-filepond";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ImageLoader from "../../../../components/ImageLoader";

const Update = () => {
  const router = useRouter();

  const [detail, setDetail] = useState();
  const [briefIntroduction, setBriefIntroduction] = useState();
  const [leaderIntroductionTitle, setLeaderIntroductionTitle] = useState();
  const [leaderIntroduction, setLeaderIntroduction] = useState();
  const [groupIntroductionTitle, setGroupIntroductionTitle] = useState();
  const [groupIntroduction, setGroupIntroduction] = useState();
  const [currentThumbnail, setCurrentThumbnail] = useState();
  const [currentLeaderIntroductionImage, setCurrentLeaderIntroductionImage] = useState();
  const [currentGroupIntroductionImage, setCurrentGroupIntroductionImage] = useState();




  const pid  = router.query.detail

  useEffect(()=> {
    if(!router.isReady){
      return;
    }
    getPartyDetail()
  },[router.isReady])

  const getPartyDetail = async (routerQuery) => {
    console.log(`http://localhost/parties/${pid}`)
    try {
        const response = await axios.get(`http://localhost/parties/${pid}`, 
                                                            { withCredentials: true });
        console.log("파티 정보 받아오기",response)
        if (response.data.result) {
          const { briefIntroduction, leaderIntroductionTitle, leaderIntroduction, partyIntroductionTitle,
            partyIntroduction, thumbnail, leaderProfileImage, partyIntroductionImage } = response.data.data;
            setDetail(response.data.data)
            setBriefIntroduction(briefIntroduction)
            setLeaderIntroductionTitle(leaderIntroductionTitle)
            setLeaderIntroduction(leaderIntroduction)
            setGroupIntroductionTitle(partyIntroductionTitle)
            setGroupIntroduction(partyIntroduction)
            setCurrentThumbnail(thumbnail)
            setCurrentLeaderIntroductionImage(leaderProfileImage)
            setCurrentGroupIntroductionImage(partyIntroductionImage)

        } else {
            alert("잘못된 요청입니다.")
            location.href = "/party"
        }
    } catch (e) {
        console.log("파티 정보 에러",e)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    const formData = new FormData(event.currentTarget);

    // formData.append('briefIntroduction', briefIntroduction);
    // formData.append('leaderIntroductionTitle', leaderIntroductionTitle);
    // formData.append('leaderIntroduction', leaderIntroduction);
    // formData.append('groupIntroductionTitle', groupIntroductionTitle);
    // formData.append('groupIntroduction', groupIntroduction);
    // formData.append('thumbnail', thumbnail);
    // formData.append('leaderIntroductionImage', leaderIntroductionImage);
    // formData.append('groupIntroductionImage', groupIntroductionImage);
    // 여기에서 양식 데이터를 가져와 처리합니다.
    // 예: 서버에 데이터 전송, 상태 업데이트 등
    console.log("여기 이벤트 보자", event);
    for (const pair of formData.entries()) {
      console.log("여기 폼데이타 보자 : " + pair[0] + ', ' + pair[1]);
    }
    console.log("briefIntroduction:", briefIntroduction);
console.log("leaderIntroductionTitle:", leaderIntroductionTitle);
console.log("leaderIntroduction:", leaderIntroduction);
console.log("groupIntroductionTitle:", groupIntroductionTitle);
console.log("groupIntroduction:", groupIntroduction);
console.log("thumbnail:", thumbnail);
console.log("leaderIntroductionImage:", leaderIntroductionImage);
console.log("groupIntroductionImage:", groupIntroductionImage);

    updateParty(formData)
  };


  const updateParty = async (form) => {
    try {

        let axiosConfig = {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        const response = await axios.patch(`http://localhost/parties/${pid}`, form, axiosConfig);
        if (response.data.result === true) {
            console.log(response)
            alert('모임 수정 성공');
            // location.href = "/board/view?bno=" + response.data.board.bno;
            location.href = "/party";
            return;
        } else {
          console.log("리스판스 리절트가 진실이 아닐떄 ", response)
            alert(response.data.data);
        }
    } catch (e) {
        console.log(e);
        alert('글 수정 실패!');
    }
    // location.href = "/party2";
}
  

    return (
        <Main>
            
            {detail &&<div className="col-8 mx-auto m-5 p-5 bg-secondary" style={{ borderRadius: '30px' }}>
            <h2 className="my-3 text-center">모임 정보 수정하기</h2>
            <div className="my-5">
            <Row>
              <h3>현재 등록된 이미지들</h3>
                            <Col xs={4}>
                                <div className='img-thumbnail'  style={{ maxHeight: '400px' }}>
                                  
                                    {currentThumbnail ? <ImageLoader
                                        // src='/images/components/02.jpg'
                                        src={currentThumbnail &&  `http://localhost/parties/images/${currentThumbnail}`}
                                        width={400}
                                        height={300}
                                        alt='Rounded thumbnail'
                                    /> : <h1>등록된 썸네일이 없습니다</h1>}
                                </div>
                               

                            </Col>
                            <Col xs={4}>
                                <div className='img-thumbnail'  style={{ maxHeight: '400px' }}>
                                  
                                    {currentLeaderIntroductionImage ?  <ImageLoader
                                        // src='/images/components/02.jpg'
                                        src={currentLeaderIntroductionImage &&  `http://localhost/parties/images/${currentLeaderIntroductionImage}`}
                                        width={400}
                                        height={300}
                                        alt='Rounded thumbnail'
                                    />: <h2>등록된 리더 이미지가 없습니다</h2>}
                                </div>
                               
                            </Col>
                            <Col xs={4}>
                                <div className='img-thumbnail'  style={{ maxHeight: '400px' }}>
                                  
                                    {currentGroupIntroductionImage ? <ImageLoader
                                        // src='/images/components/02.jpg'
                                        src={currentGroupIntroductionImage &&  `http://localhost/parties/images/${currentGroupIntroductionImage}`}
                                        width={400}
                                        height={300}
                                        alt='Rounded thumbnail'
                                    /> : <h2>등록된 모임 이미지가 없습니다</h2>}
                                </div>
                               

                            </Col>
                            </Row>
                            </div>
                  <Row
                    as={Form}
                    noValidate
                  //   validated={validated}
                    onSubmit={handleSubmit}
                    sm={2}
                    xs={1}
                    className='gy-sm-4 gy-3'
                  >
 <Col as={Form.Group} xs={12} controlId='thumbnail' className="w-100">
                      {/* 여기에 섬네일 첨부파일 넣으면 됩니다 */}
                      <Form.Label>썸네일</Form.Label>
                         {/* <input name="thumbnail" className="mx-5" type="file" accept="image/*" /> */}
                         <div className="d-flex align-items-center">
                          <Form.Control name="thumbnail" type="file" accept="image/*" />
                          <Button variant="danger" size="sm" onClick={() => {
                            // 파일 입력 요소의 값을 초기화합니다.
                            document.getElementById('thumbnail').value = '';
                          }}>취소</Button>
                        </div>
                    </Col>
                    <Col  as={Form.Group} controlId='leaderIntroductionImage' className="w-100">
                          {/* 이 부분에 모임장 프로필오면 좋을듯 */}
                          <Form.Label>모임장 프로필 이미지</Form.Label>
                         {/* <input name="leaderIntroductionImage" className="mx-5" type="file" accept="image/*" /> */}
                         <div className="d-flex align-items-center">
                          <Form.Control name="leaderIntroductionImage" type="file" accept="image/*" />
                          <Button variant="danger" size="sm" onClick={() => {
                            // 파일 입력 요소의 값을 초기화합니다.
                            document.getElementById('leaderIntroductionImage').value = '';
                          }}>취소</Button>
                        </div>
                    </Col>
                    <Col as={Form.Group} controlId='groupIntroductionImage' className="w-100">
                          {/* 이 부분이 모임 소개 사진 */}
                          <Form.Label>모임 소개 이미지</Form.Label>
                         {/* <input name="groupIntroductionImage" className="mx-5" type="file" accept="image/*" /> */}
                         <div className="d-flex align-items-center">
                          <Form.Control name="groupIntroductionImage" type="file" accept="image/*" />
                          <Button variant="danger" size="sm" onClick={() => {
                            // 파일 입력 요소의 값을 초기화합니다.
                            document.getElementById('groupIntroductionImage').value = '';
                          }}>취소</Button>
                        </div>
                    </Col>

                    <Col as={Form.Group} controlId='title'>
                      <Form.Label>소모임 이름 </Form.Label>
                      <Form.Control name="title" size='lg' value={detail.title} disabled/>
                      <Form.Control.Feedback type='invalid'>
                        Please enter your name.
                      </Form.Control.Feedback>
                    </Col>
                    <Col as={Form.Group} controlId='activityArea'>
                    <Form.Label>활동 지역</Form.Label>
                    <Form.Control name="title" size='lg' value={detail.activityArea} disabled/>
                    </Col>
                    <Col as={Form.Group} controlId='category'>
                      <Form.Label>카테고리</Form.Label>
                      <Form.Control name="title" size='lg' value={detail.category} disabled/>
                      <Form.Control.Feedback type='invalid'>
                        Please choose the subject.
                      </Form.Control.Feedback>
                    </Col>
                    <Col as={Form.Group} controlId='categoryDetail'>
                      <Form.Label>카테고리 상세</Form.Label>
                      <Form.Control name="title" size='lg' value={detail.categoryDetail} disabled/>
                    </Col>

                 
                    
                    <Col as={Form.Group} xs={12} controlId='briefIntroduction' className='w-100'>
                      <Form.Label>모임에 대해 간단한 소개</Form.Label>{briefIntroduction}
                      <Form.Control name="briefIntroduction" as='textarea' rows='1' required value={briefIntroduction} // briefIntroduction 상태를 값으로 설정
    onChange={(e) => setBriefIntroduction(e.target.value)} />
                      <Form.Control.Feedback type='invalid'>
                        Please enter your message.
                      </Form.Control.Feedback>
                    </Col>
                          
                    <Col as={Form.Group} controlId='leaderIntroductionTitle'  className='w-100'>
                      <Form.Label>모임장 소개글 제목</Form.Label>{leaderIntroductionTitle} 
                      <Form.Control name="leaderIntroductionTitle" as='textarea' rows='1' size='lg' value={leaderIntroductionTitle} // briefIntroduction 상태를 값으로 설정
    onChange={(e) => setLeaderIntroductionTitle(e.target.value)}/>
                    </Col>
                    
                    <Col as={Form.Group} xs={12} controlId='leaderIntroduction' className='w-100'>
                      <Form.Label>모임장에 대한 소개글 상세</Form.Label>{leaderIntroduction} 
                      <Form.Control name="leaderIntroduction" as='textarea' rows='4' required  value={leaderIntroduction} // briefIntroduction 상태를 값으로 설정
    onChange={(e) => setLeaderIntroduction(e.target.value)}/>
                      <Form.Control.Feedback type='invalid'>
                        Please enter your message.
                      </Form.Control.Feedback>
                    </Col>

                    <Col as={Form.Group} controlId='groupIntroductionTitle'  className='w-100'>
                      <Form.Label>모임에 대한 소개글 제목</Form.Label>{groupIntroductionTitle}
                      <Form.Control name="groupIntroductionTitle" as='textarea' rows={1} size='lg' value={groupIntroductionTitle} // briefIntroduction 상태를 값으로 설정
    onChange={(e) => setGroupIntroductionTitle(e.target.value)}/>
                    </Col>

                  
                    <Col as={Form.Group} xs={12} controlId='groupIntroduction' className='w-100'>
                      <Form.Label>모임에 대한 소개글 상세</Form.Label>{groupIntroduction} 
                      <Form.Control name="groupIntroduction" as='textarea' rows='6' required value={groupIntroduction} // briefIntroduction 상태를 값으로 설정
    onChange={(e) => setGroupIntroduction(e.target.value)} />
                      <Form.Control.Feedback type='invalid'>
                        Please enter your message.
                      </Form.Control.Feedback>
                    </Col>

                    <Col xs={10} className='w-100'>
                      <Button type='submit' size='lg' variant='info w-sm-auto w-100 mt-2'>수정하기</Button>
                    </Col>
                    
                  </Row>
                </div>}
                
        </Main>
    )
}

export default Update;