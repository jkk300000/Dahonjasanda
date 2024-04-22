import { useEffect, useState } from 'react'
import JobBoardAccountLayout from './components/MyJobBoardAccountLayout'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import PasswordToggle from '../../components/PasswordToggle'
import 'react-datepicker/dist/react-datepicker.css'
import { Main } from '../../layouts'
import axios from 'axios'

const AccountProfilePage = () => {


  const [loginInfo, setLoginInfo] = useState(null);

  // Email field state
  const [email, setEmail] = useState('')

  // Password field state
  const [password, setPassword] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');

  // Name field state
  const [name, setName] = useState('')

  // Phone field state
  const [phone, setPhone] = useState('')

  // Address field state
  const [address, setAddress] = useState('')

  const [hobbies, setHobbies] = useState([])


  useEffect(() => {
      getLoginInfo();
  },[]);

  // async : 비동기식 키워드, 
  const getLoginInfo = async () => {
      try {
          var response = await axios.get('http://localhost/memberRest/loginInfo', 
                                                          { withCredentials: true });
          if (response.data.result) {
              setLoginInfo(response.data.member);
              const {email, name, address, hobby, phone } = response.data.member
              setEmail(email)
              setName(name)
              setAddress(address)
              setPhone(phone)
              (hobby &&  setHobbies(hobby.split(',')))
          }else {
            alert('로그인이 되지 않았습니다.');
            location.href = "/";
          }
      } catch (e) {
          console.log(e);
      }
  }

  // Custom accordion toggle
  const CustomToggle = ({ eventKey }) => {
    const handleClick = useAccordionButton(eventKey, (e) => e.preventDefault())
    return (
      <OverlayTrigger
        placement='top'
        overlay={<Tooltip>Edit</Tooltip>}
      >
        <a
          href='#'
          className='nav-link py-0'
          onClick={handleClick}
        >
          <i className='fi-edit'></i>
        </a>
      </OverlayTrigger>
    )
  }

  const onPasswordUpdateHandler = (event) => {
    event.preventDefault();
    if(newPassword < 4 || newPassword !== confirmPassword) {
        alert('비밀번호를 확인해주세요')
        return;
    }
    passwordUpdateRequest(newPassword);
  }

  const passwordUpdateRequest = async (userPwd) => {
      try {
        const response = await axios.post('http://localhost/memberRest/updatePwd', {userPwd:userPwd}, { withCredentials: true });
          console.log(response);
          if (response.data.result === true) {
              alert('비밀번호가 수정되었습니다.');
          } else {
              alert('비밀번호 수정 실패!');

          }
      } catch (e) {
          console.log(e);
          alert('비밀번호 수정 실패!');
      }
  }

  const onSubmitMemberUpdate = (event) => {

    const formData = new FormData();

    formData.append('mno', loginInfo.mno)
    formData.append('memberId',loginInfo.memberId)
    formData.append('email', email);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('hobby', hobbies.join(','));

    console.log("폼데이타 좀 봐라",formData)
    memberUpdateRequest(formData);
    } 


    const memberUpdateRequest = async (form) => {
        try {
            let axiosConfig = {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            } 
            const response = await axios.post('http://localhost/memberRest/update', 
                                                                        form, axiosConfig);
            console.log(response);
            if (response.data.result === true) {
                alert('회원정보가 수정되었습니다.');
                setLoginInfo(response.data.member);
            } else {
                alert('회원정보 수정 실패!');

            }
        } catch (e) {
            console.log(e);
            alert('회원정보 수정 실패!');
        }
        // location.reload();
    }

    const memberDeleteRequest = async () => {
      try {
          const response = await axios.get('http://localhost/memberRest/delete', { withCredentials: true });
          console.log("딜리트 응답",response);
          if (response.data.result === true) {
              alert('회원탈퇴에 성공하였습니다.'+ response);
          } else {
              alert('회원탈퇴에 실패하였습니다.'+ response);

          }
      } catch (e) {
          console.log(e);
          alert('회원탈퇴에 실패하였습니다.');
      }
      location.href ="/";
  }

    const onChangeCheckBox = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            // 체크된 경우 해당 취미를 추가
            setHobbies(prevHobbies => [...prevHobbies, value]);
        } else {
            // 체크가 해제된 경우 해당 취미를 제거
            setHobbies(prevHobbies => prevHobbies.filter(hobby => hobby !== value));
        }
    }


        // 새 비밀번호 입력값 변경 이벤트 핸들러
        const handleNewPasswordChange = (e) => {
            setNewPassword(e.target.value);
        };

        // 비밀번호 확인 입력값 변경 이벤트 핸들러
        const handleConfirmPasswordChange = (e) => {
            setConfirmPassword(e.target.value);
        };




  return (
<Main>
    
    <div className='col-9 mx-auto'>
        <JobBoardAccountLayout userInfo = {loginInfo}>
        <Row className='pt-4 mt-3'>
          <Col xs={12} lg={3}>
            <h2 className='h4'>비밀번호</h2> 
          </Col>
          <Col xs={12} lg={9}>
            <Accordion>
              <div className='border rounded-3 p-3'>

                {/* Password */}
                <div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='pe-2'>
                      <h2 className='form-label fw-bold'>비밀번호 변경하기</h2>
                    </div>
                    <CustomToggle eventKey='password' />
                  </div>
                  <Accordion.Collapse eventKey='password'>
                    <>
                      <Row as={Form.Group} controlId='ap-new-password' className='gx-3 align-items-center my-3' >
                        <Form.Label column xs={12} sm={4} md={3}>
                        새비밀번호 : 
                        </Form.Label>
                        <Col xs={12} sm={8} md={9}>
                        <PasswordToggle
                            id='ap-new-password'
                            placeholder='변경할 비밀번호를 입력해주세요'
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                        </Col>
                      </Row>
                      <Row as={Form.Group} controlId='ap-new-password-confirm' className='gx-3 align-items-center' >
                        <Form.Label column xs={12} sm={4} md={3}>
                         비밀번호 확인 :
                        </Form.Label>
                        <Col xs={12} sm={8} md={9}>
                        <PasswordToggle
                            id='ap-new-password-confirm'
                            placeholder='비밀번호 확인'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        </Col>
                      </Row>
                      <Row>
                        <Button className='my-3' onClick={onPasswordUpdateHandler}> 비밀번호 변경</Button>
                      </Row>
                    </>
                  </Accordion.Collapse>
                </div>
              </div>
            </Accordion>
          </Col>
        </Row>

        {/* Personal details */}
        <Row className='pt-4 mt-3'>
          <Col xs={12} lg={3}>
            <h2 className='h4'>상세정보</h2>
          </Col>
          <Col xs={12} lg={9}>
            <Accordion>
              <div className='border rounded-3 p-3'>

                {/* Name */}
                <div className='border-bottom pb-3 mb-3'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='pe-2'>
                      <h2 className='form-label fw-bold'>이 름</h2>
                      <p className='mb-0'>{name ? name : 'Not specified'}</p>
                    </div>
                    <CustomToggle eventKey='name' />
                  </div>
                  <Accordion.Collapse eventKey='name'>
                    <FormControl
                      className='mt-3'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='이름을 입력해주세요'
                    />
                  </Accordion.Collapse>
                </div>

                {/* Email */}
                <div className='border-bottom pb-3 mb-3'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='pe-2'>
                      <h2 className='form-label fw-bold'>Email</h2>
                      <p className='mb-0'>{email ? email : 'Not specified'}</p>
                    </div>
                    <CustomToggle eventKey='email' />
                  </div>
                  <Accordion.Collapse eventKey='email'>
                    <FormControl
                      type='email'
                      className='mt-3'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='이메일을 입력해주세요'
                    />
                  </Accordion.Collapse>
                </div>



                {/* Phone number */}
                <div className='border-bottom pb-3 mb-3'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='pe-2'>
                      <h2 className='form-label fw-bold'>핸드폰</h2>
                      <p className='mb-0'>{phone ? phone : 'Not specified'}</p>
                    </div>
                    <CustomToggle eventKey='phone' />
                  </div>
                  <Accordion.Collapse eventKey='phone'>
                    <FormControl
                      type='tel'
                      className='mt-3'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='핸드폰을 입력해주세요'
                    />
                  </Accordion.Collapse>
                </div>

                {/* Address */}
                <div className='border-bottom pb-3 mb-3'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='pe-2'>
                      <h2 className='form-label fw-bold'>주소</h2>
                      <p className='mb-0'>{address ? address : 'Not specified'}</p>
                    </div>
                    <CustomToggle eventKey='address' />
                  </div>
                  <Accordion.Collapse eventKey='address'>
                    <FormControl
                      className='mt-3'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder='주소를 입력해주세요'
                    />
                  </Accordion.Collapse>
                </div>
                
                <div>
                    <h6>취미</h6>
                    <Form>
                        <div className="d-flex mx-3">
                            <div className="mx-3">
                                <Form.Check 
                                    type='checkbox'
                                    label='운동'
                                    id='hobby1'
                                    name="hobby"
                                    value="운동"
                                    onChange={onChangeCheckBox}
                                    checked = {hobbies.includes('운동')}
                                />
                            </div>
                            <div className="mx-3">
                                <Form.Check 
                                    type='checkbox'
                                    label='등산'
                                    id='hobby2'
                                    name="hobby"
                                    value="등산"
                                    onChange={onChangeCheckBox}
                                    checked = {hobbies.includes('등산')}
                                />
                            </div>
                            <div className="mx-3">
                                <Form.Check 
                                    type='checkbox'
                                    label='독서'
                                    id='hobby3'
                                    name="hobby"
                                    value="독서"
                                    onChange={onChangeCheckBox}
                                    checked = {hobbies.includes('독서')}
                                />
                            </div>
                            <div className="mx-3">
                                <Form.Check 
                                    type='checkbox'
                                    label='게임'
                                    id='hobby4'
                                    name="hobby"
                                    value="게임"
                                    onChange={onChangeCheckBox}
                                    checked = {hobbies.includes('게임')}
                                />
                            </div>
                            <div className="mx-3">
                                <Form.Check 
                                    type='checkbox'
                                    label='여행'
                                    id='hobby5'
                                    name="hobby"
                                    value="여행"
                                    onChange={onChangeCheckBox}
                                    checked = {hobbies.includes('여행')}
                                />
                            </div>
                        </div>
                    </Form>
                </div>


              </div>
            </Accordion>


          </Col>
        </Row>


        <Row className='pt-4 mt-2'>
          <Col xs={12} lg={{span: 9, offset: 3}}>
            <div className='d-flex align-items-center justify-content-between'>
              <Button variant='info rounded-pill' className='px-3 px-sm-4' type='submit' onClick={onSubmitMemberUpdate}>수  정</Button>
              <Button size='sm' variant='link' className='px-0' onClick={memberDeleteRequest}>
                <i className='fi-trash me-2'></i>
                회원 탈퇴
              </Button>
            </div>
          </Col>
        </Row>
        </JobBoardAccountLayout>
        </div>
        </Main>
  )
}

export default AccountProfilePage