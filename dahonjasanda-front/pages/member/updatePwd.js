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

    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('userPwd') !== data.get('userPwd2')){
            alert('패스워드가 일치하지 않습니다.')
            return;
        }
        passwordUpdateRequest(data.get('userPwd'));
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
        self.close();
    }

    const onChangeText = (e) => {
        var nextLoginInfo = { ...loginInfo, [e.target.name]: e.target.value };
        setLoginInfo(nextLoginInfo);
    }
    const onClickExit = (e) => {
        self.close();
    }

    return (
        <>
            <div id="updatePassword-container">
                <form name="pwdForm" method="post" onSubmit={onSubmit} >
                    <table>
                        <tbody>

                            <tr>
                                <th>변경할 비밀번호</th>
                                <td>
                                    <input type="password" name="userPwd" id="pass1" required />
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호확인</th>
                                <td>
                                    <input type="password" name="userPwd2" id="pass2" />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <input type="submit" value="변경" id="updateSubmit" />
                                    &nbsp;
                                    <input type="button" value="닫기" onClick={onClickExit} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
}