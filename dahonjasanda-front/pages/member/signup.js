"use client";

import { Inter } from "next/font/google";
import * as React from "react";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
// import './globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });
const defaultTheme = createTheme();

export default function Signup() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    logout();
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    console.log("서밋할때 뭐 날아갈까",event)
    console.log("서밋할때 뭐 날아갈까222",event.currentTarget)
    signupRequest(form);
  };

  const onClickCheckDuplicate = (event) => {
    checkDuplicate(memberId);
  };

  const onChangeMemberId = (event) => {
    setMemberId(event.target.value);
  };

  const checkDuplicate = async (memberId) => {
    try {
      console.log(memberId);
      const response = await axios.get(
        "http://localhost/memberRest/idCheck?memberId=" + memberId,
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.validate === false) {
        alert(memberId + "는 사용 가능합니다.");
      } else {
        alert("중복된 아이디 입니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signupRequest = async (form) => {
    try {
      let axiosConfig = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        "http://localhost/memberRest/enroll",
        form,
        axiosConfig
      );
      if (response == null) {
        alert("회원가입 실패");
      }
      if (response.data.result === true) {
        alert("회원가입 성공");
        location.href = "/";
      } else {
        alert("회원가입 실패");
        location.href = "/";
      }
    } catch (e) {
      alert("회원가입 실패");
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get("http://localhost/memberRest/logout", {
        withCredentials: true,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
     <ThemeProvider theme={defaultTheme} >
        {/* <form id="enroll-container" name="memberEnrollFrm" onSubmit={handleSubmit} >
                    <table>
                        <tbody>
                            <tr>
                                <th>아이디</th>
                                <td>
                             
                                    <input type="text" onChange={onChangeMemberId} name="memberId" id="newId" placeholder="아이디 (4글자 이상)" required />
                                    <input type="button" id="checkDuplicate" onClick={onClickCheckDuplicate} value="중복검사" />
                                </td>
                            </tr>
                            <tr>
                                <th>패스워드</th>
                                <td>
                                    <input type="password" name="password" id="pass1" required />
                                </td>
                            </tr>
                            <tr>
                                <th>패스워드 확인</th>
                                <td>
                                    <input type="password" id="pass2" required />
                                </td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>
                                    <input type="text" name="name" required />
                                </td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>
                                    <input type="tel" name="phone" maxLength={11}  placeholder="(-없이)01012345678" />
                                </td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>
                                    <input type="email" name="email" />
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>
                                    <input type="text" name="address" />
                                </td>
                            </tr>
                            <tr>
                                <th>취미</th>
                                <td>
                                    <label><input type="checkbox" name="hobby" value="운동" />운동</label>
                                    <label><input type="checkbox" name="hobby" value="등산" />등산</label>
                                    <label><input type="checkbox" name="hobby" value="독서" />독서</label>
                                    <label><input type="checkbox" name="hobby" value="게임" />게임</label>
                                    <label><input type="checkbox" name="hobby" value="여행" />여행</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="submit" id="enrollSubmit" value="가입" />
                    <input type="reset" value="취소" />
                </form> */}


                <div style={{ height : '150%', backgroundImage: 'url(/images/myImages/loginBG.jpg)', backgroundSize: '140%'}} >
          <div
            className=" col-6 p-5 m-auto my-5"
            style={{ backgroundColor: '#f0f0f0', borderRadius : "30px", height : '80%' }}
          >
            <h3 align="center" className="mb-5">
              회원가입 정보
            </h3>
            <Form
              id="enroll-container"
              name="memberEnrollFrm"
              onSubmit={handleSubmit}
            >
              <Row className="mb-3">
                <Form.Group as={Row} controlId="newId">
                  <Form.Label column sm="3">
                    아이디
                  </Form.Label>
                  <Col sn="7">
                    <Form.Control
                      type="text"
                      name="memberId"
                      placeholder="아이디 (4글자 이상)"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                      required
                    />
                  </Col>
                  <Col sm="2">
                    <Form.Group
                      controlId="checkDuplicate"
                      className="d-flex align-items-end"
                    >
                      <Button variant="primary" onClick={onClickCheckDuplicate}>
                        중복검사
                      </Button>
                    </Form.Group>
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Row} controlId="pass1">
                  <Form.Label column sm="3">
                    패스워드
                  </Form.Label>
                  <Col sn="9">
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Row} controlId="pass2">
                  <Form.Label column sm="3">
                    패스워드 확인
                  </Form.Label>
                  <Col sn="9">
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Row} controlId="name">
                  <Form.Label column sm="3">
                    이름
                  </Form.Label>
                  <Col sn="9">
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Row} controlId="phone">
                  <Form.Label column sm="3">
                    전화번호
                  </Form.Label>
                  <Col sn="9">
                    <Form.Control
                      type="tel"
                      name="phone"
                      maxLength={11}
                      placeholder="(-없이)01012345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Row} controlId="email">
                  <Form.Label column sm="3">
                    이메일
                  </Form.Label>
                  <Col sn="9">
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Row} controlId="address">
                  <Form.Label column sm="3">
                    주소
                  </Form.Label>
                  <Col sn="9">
                    <Form.Control
                      type="text"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Row} controlId="hobby">
                  <Form.Label column sm="3">
                    취미
                  </Form.Label>
                  <Col sm="9">
                    <Form.Check
                      inline
                      id="운동"
                      name="hobby"
                      label="운동"
                      type="checkbox"
                      value="운동"
                      onChange={(e) => setHobbies([...hobbies, e.target.value])}
                    />
                    <Form.Check
                      inline
                      id="등산"
                      name="hobby"
                      label="등산"
                      type="checkbox"
                      value="등산"
                      onChange={(e) => setHobbies([...hobbies, e.target.value])}
                    />
                    <Form.Check
                      inline
                      id="독서"
                      name="hobby"
                      label="독서"
                      type="checkbox"
                      value="독서"
                      onChange={(e) => setHobbies([...hobbies, e.target.value])}
                    />
                    <Form.Check
                      inline
                      id="게임"
                      name="hobby"
                      label="게임"
                      type="checkbox"
                      value="게임"
                      onChange={(e) => setHobbies([...hobbies, e.target.value])}
                    />
                    <Form.Check
                      inline
                      id="여행"
                      name="hobby"
                      label="여행"
                      type="checkbox"
                      value="여행"
                      onChange={(e) => setHobbies([...hobbies, e.target.value])}
                    />
                  </Col>
                </Form.Group>
              </Row>
              <div className="text-center">
                <Row className="my-5">
                    <Col>
                    <Button variant="primary" type="submit" id="enrollSubmit" style={{ minWidth: '100px' }}>
                        가입
                    </Button>{" "}
                    <Button variant="secondary" type="reset"  style={{ minWidth: '100px' }} onClick={() => window.location.href = '/'}>
                        취소
                    </Button>
                    </Col>
                </Row>
              </div>
            </Form>
          </div>
        </div>
        </ThemeProvider>
    </>
  );
}
