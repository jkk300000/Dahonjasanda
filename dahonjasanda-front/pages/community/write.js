'use client';

import Main from "layouts/Main";
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
import Hero from "./components/Hero";


const inter = Inter({ subsets: ['latin'] })
const defaultTheme = createTheme();

export default function Write() {
    const router = useRouter();
    const [loginInfo, setLoginInfo] = useState(null);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        getCategory();
        getLoginInfo();
    }, [router.isReady]);


    const getCategory = async () => {
        try {
            var url = 'http://localhost/boardRest/getCategory';
            const response = await axios.get(url, { withCredentials: true });
            setCategoryList(response.data.categoryList);
        } catch (e) {
            console.log(e);
        }
    }

    // async : 비동기식 키워드, 
    const getLoginInfo = async () => {
        try {
            var response = await axios.get('http://localhost/memberRest/loginInfo', { withCredentials: true });
            if (response.data.result === true) {
                setLoginInfo(response.data.member);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onSubmitWrite = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        writeRequest(form);
    }

    const writeRequest = async (form) => {
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
            const response = await axios.post('http://localhost/boardRest/write', form, axiosConfig);
            if (response.data.result === true) {
                alert('글 작성에 성공하였습니다.');
                location.href = "/community/view?bno=" + response.data.board.bno;
                return;
            } else {
                alert('글 등록 실패!');
            }
        } catch (e) {
            console.log(e);
            alert('글 등록 실패!');
        }
        location.href = "/community";
    }

    const categorys = categoryList.map(item=>(
        <option key={item.orderno} value={item.type}>{item.name}</option>
    ));

    return (
        <Main>
            <Hero />
            <form action="/community/write" method="post" onSubmit={onSubmitWrite} >
                <br />
                <section id="board-write-container" className="board-write-container">
                    <h2 align="center">게시글 작성</h2>
                    <table id="tbl-board">
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td><input className="inputText" type="text" name="title" /></td>
                            </tr>
                            <tr>
                                <th>카테고리</th>
                                <td>
                                    <select name="type">
                                        {categorys}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>작성자</th>
                                <td>
                                    <input className="inputText" type="text" name="writerId" value={loginInfo != null &&
                                        loginInfo.memberId} readOnly />
                                </td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td><input type="file" multiple name="upfiles" /></td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td><textarea name="content" cols="50" rows="10"></textarea></td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <input type="submit" value="등록" />
                                    <input type="reset" value="취소" />
                                </th>
                            </tr>

                        </tbody>
                    </table>
                </section>
            </form>
        </Main>
    );
}