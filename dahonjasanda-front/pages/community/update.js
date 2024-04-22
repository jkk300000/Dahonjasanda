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
import Hero from "./components/Hero";
import Main from "layouts/Main";


const inter = Inter({ subsets: ['latin'] })
const defaultTheme = createTheme();

export default function Update() {
    const router = useRouter();
    const [board, setBoard] = useState(null);
    const [loginInfo, setLoginInfo] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        getLoginInfo();
        const { bno } = router.query;
        getBoard(bno);
    }, [router.isReady]);


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

    const getBoard = async (bno) => {
        try {
            var url = 'http://localhost/boardRest/view'
            url = url + '?bno=' + bno;
            const response = await axios.get(url, { withCredentials: true });
            console.log(response.data);
            setBoard(response.data.board);
            setFiles(response.data.board.boardAttachFileList);
            setCategoryList(response.data.categoryList);
        } catch (e) {
            console.log(e);
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        updateRequest(form);
    }

    const updateRequest = async (form) => {
        try {
            let axiosConfig = {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
            console.log('form : ');
            console.log(form);
            const response = await axios.post('http://localhost/boardRest/update', 
                                                                        form, axiosConfig);
            console.log(response.data);
            if (response.data.result === true) {
                alert('글이 수정 되었습니다.');
            } else {
                alert('수정 실패!');
            }
        } catch (e) {
            console.log(e);
            alert('수정 실패!!!');
        }
        location.href ="/board/view?bno=" + board.bno;
    }

    const onChangeText = (e) => {
        var nextBoard = { ...board, [e.target.name]: e.target.value };
        setBoard(nextBoard);
    }

    const fileDown = (e) => {
        const url = "http://localhost/board/fileDown?fno=" + e.target.name;
        location.assign(url);
    }

    
    const fileList = files.map(item =>(
        <div key={item.fno}>
            <a href="#" name={item.fno} onClick={fileDown} >
                <img src="/images/file.png" width="20" height="20" />
                {item.renamedFilename}
            </a>
        </div>
    ));

    
    const categorys = categoryList.map(item=>(
        <option key={item.orderno} value={item.type}>{item.name}</option>
    ));


    return (
        <Main>
            <Hero />
            {board != null && (
                <form action="/board/write" method="post" onSubmit={onSubmit} >
                    <input type="hidden" name="bno" value={board.bno} />
                    <br />
                    <section id="board-write-container" className="board-write-container">
                        <h2 align="center">게시글 작성</h2>
                        <table id="tbl-board">
                            <tbody>
                                <tr>
                                    <th>제목</th>
                                    <td><input name="title" className="inputText" onChange={onChangeText} type="text" value={board.title} /></td>
                                </tr>
                                <tr>
                                    <th>카테고리</th>
                                    <td>
                                        <select name="type" defaultValue={board.boardCategory.type}>
                                            {categorys}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>작성자</th>
                                    <td>
                                        <input name="writerId" className="inputText" type="text" value={loginInfo.memberId} readOnly={true} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>첨부파일</th>
                                    <td><input type="file" multiple name="upfiles" /><br/>
                                        {files.length == 0 ? '파일 없음' : '기존 파일'}
                                        {fileList}
                                    </td>
                                </tr>
                                <tr>
                                    <th>내용</th>
                                    <td><textarea name="content" cols="50" rows="10" onChange={onChangeText} value={board.content}></textarea></td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>
                                        <input type="submit" value="등록" />
                                        <input type="reset" value="취소" />
                                    </th>
                                </tr>

                            </tbody>
                        </table>
                    </section>
                </form>
            )}
        </Main>
    );
}