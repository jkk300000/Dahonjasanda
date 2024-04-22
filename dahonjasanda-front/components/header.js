'use client'

import * as React from 'react';
import { Button } from '../lib/mui';
import { Inter } from 'next/font/google'
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Header = () => {
    const [loginInfo, setLoginInfo] = useState(null);
    const [loginName, setLoginName] = useState(null);

    useEffect(() => {
        getLoginInfo();
    },[]);

    // async : 비동기식 키워드, 
    const getLoginInfo = async () => {
        try {
            var response = await axios.get('http://localhost/memberRest/loginInfo', 
                                                            { withCredentials: true });
            console.log(response)
            if (response.data.result === true) {
                setLoginInfo(response.data.member);
                setLoginName(response.data.member.name)
            } else {
                setLoginName('false');
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <header id="header">
            <h2>Spring Boot BBS</h2>
            <div className="login-container pt-2">
                {loginName == null && (
                    <div>
                        <CircularProgress />
                    </div>
                )}
                {loginName != null && loginName === 'false' &&
                    (
                        <div>
                            <Button className="m-2" variant="contained" onClick={(e) => {
                                location.href = '/member/signin'
                            }} >Login</Button> 
                            <Button variant="contained" onClick={(e) => {
                                location.href = '/member/signup'
                            }} >회원가입</Button>
                        </div>
                    )
                }
                {loginName != null && loginName !== 'false' &&
                    (<div className="container align-items-center">
                        {loginName}({loginInfo.memberId})님 환영합니다.<br />
                        <Button className="m-2" variant="contained" onClick={(e) => {
                            location.href = '/member/logout'
                        }}>Logout</Button> 
                        <Button variant="contained" onClick={(e) => {
                            location.href = '/member/view'
                        }}>회원정보</Button>
                    </div>
                    )}
            </div>
            <nav>
                <ul className="main-nav">
                    <li className="home"><a href="/">Home</a></li>
                    <li className="notice"><a>공지사항</a></li>
                    <li className="board"><a href="/board/list">게시판</a></li>
                    <li className="board"><a href="/housingFront/index">청약맵</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;