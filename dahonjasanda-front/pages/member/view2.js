'use client';

import { Inter } from 'next/font/google'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Header from '../../components/header';
import Footer from '../../components/footer';
// import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })
const defaultTheme = createTheme();

export default function memberView() {
    const router = useRouter();
    const [loginInfo, setLoginInfo] = useState(null);

    useEffect(() => {
        getLoginInfo();
    }, []);

    // async : 비동기식 키워드, 
    const getLoginInfo = async () => {
        try {
            var response = await axios.get('http://localhost/memberRest/loginInfo', 
                                                                 { withCredentials: true });
            console.log(response.data.member);
            if (response.data.result === true) {
                if(response.data.member.hobby == null 
                         || response.data.member.hobby.length == 0){
                    response.data.member.hobby = [];
                } else {
                    response.data.member.hobby = response.data.member.hobby.split(',');
                }
                setLoginInfo(response.data.member);
            } else {
                alert('로그인이 되지 않았습니다.');
                location.href = "/";
            }
        } catch (e) {
            alert('에러가 발생했습니다.');
            console.log(e);
        }
    }

    const onSubmitMemberUpdate = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        memberUpdateRequest(form);
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

    const onChangeText = (e) => {
        var nextLoginInfo = { ...loginInfo, [e.target.name]: e.target.value };
        setLoginInfo(nextLoginInfo);
    }

    const onChangeCheckBox = (e) => {
        var checkHobby = loginInfo.hobby;
        if (e.target.checked == true) {
            checkHobby.push(e.target.value);
        } else {
            checkHobby = checkHobby.filter((element) => element !== e.target.value);
        }
        var nextLoginInfo = { ...loginInfo, hobby: checkHobby };
        setLoginInfo(nextLoginInfo);
    }

    const onClickPwUpdate = (e)=>{
        const url = "/member/updatePwd";
        const status = "left=500px,top=200px,width=400px,height=210px"
        open(url, "", status);
    }

    const onClickDelete = (e)=>{
        memberDeleteRequest();
    }

    const memberDeleteRequest = async () => {
        try {
            const response = await axios.get('http://localhost/memberRest/delete', { withCredentials: true });
            console.log(response);
            if (response.data.result === true) {
                alert('회원탈퇴에 성공하였습니다.');
            } else {
                alert('회원탈퇴에 실패하였습니다.');

            }
        } catch (e) {
            console.log(e);
            alert('회원탈퇴에 실패하였습니다.');
        }
        location.href ="/";
    }

    return (
        <>
            <Header />
            {loginInfo != null &&
                (
                    <section id="content">
                        <br />
                        <h3 align="center">회원정보 조회/수정</h3>
                        <br />
                        <form id="enroll-container"  onSubmit={onSubmitMemberUpdate}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>아이디</th>
                                        <td>
                                            <input type="text" name="memberId" readOnly={true} value={loginInfo.memberId} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>이름</th>
                                        <td>
                                            <input type="text" name="name" onChange={onChangeText} value={loginInfo.name} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>전화번호</th>
                                        <td>
                                            <input type="tel" name="phone" onChange={onChangeText} value={loginInfo.phone} maxLength={11} placeholder="(-없이)01012345678" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>이메일</th>
                                        <td>
                                            <input type="email" name="email" onChange={onChangeText} value={loginInfo.email} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>주소</th>
                                        <td>
                                            <input type="text" name="address" onChange={onChangeText} value={loginInfo.address} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>취미</th>
                                        <td>
                                            <label><input type="checkbox" name="hobby" value="운동"
                                                onChange={onChangeCheckBox}
                                                checked={loginInfo.hobby.includes('운동')}
                                            />운동</label>
                                            <label><input type="checkbox" name="hobby" value="등산"
                                                onChange={onChangeCheckBox}
                                                checked={loginInfo.hobby.includes('등산')}
                                            />등산</label>
                                            <label><input type="checkbox" name="hobby" value="독서"
                                                onChange={onChangeCheckBox}
                                                checked={loginInfo.hobby.includes('독서')}
                                            />독서</label>
                                            <label><input type="checkbox" name="hobby" value="게임"
                                                onChange={onChangeCheckBox}
                                                checked={loginInfo.hobby.includes('게임')}
                                            />게임</label>
                                            <label><input type="checkbox" name="hobby" value="여행"
                                                onChange={onChangeCheckBox}
                                                checked={loginInfo.hobby.includes('여행')}
                                            />여행</label>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <br />
                            <input type="button" id="updatePwd" value="비밀번호변경" onClick={onClickPwUpdate} />
                            <input type="submit" value="정보수정" />
                            <input type="button" id="deleteMember" onClick={onClickDelete} value="탈퇴" />
                        </form>
                    </section>
                )}
            <Footer />
        </>
    );
}