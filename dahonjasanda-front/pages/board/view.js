'use client';

import { Inter } from 'next/font/google'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Header from '../../components/header';
import Footer from '../../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { Main } from '../../layouts';


const inter = Inter({ subsets: ['latin'] })
const defaultTheme = createTheme();

export default function View() {
    const router = useRouter();
    const [board, setBoard] = useState(null);
    const [typeMap, setTypeMap] = useState([]);
    const [loginInfo, setLoginInfo] = useState(null);
    const [replies, setReplies] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        const { bno } = router.query;
        getBoard(bno);
        getLoginInfo();
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
            console.log(response);
            setBoard(response.data.board);
            setTypeMap(response.data.typeMap);
            if (response.data.board.replyList != null 
                                && response.data.board.replyList.length > 0) {
                setReplies(response.data.board.replyList);
            }
            if (response.data.board.boardAttachFileList != null 
                                && response.data.board.boardAttachFileList.length > 0) {
                setFiles(response.data.board.boardAttachFileList);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onClickReplyDelete = (e) => {
        deleteReplyRequest(board.bno, e.target.value);
    }

    const deleteReplyRequest = async (boardNo, replyNo) => {
        try {
            let url = 'http://localhost/boardRest/replyDel'
            url = url +'?boardNo=' + boardNo;
            url = url +'&replyNo=' + replyNo;

            const response = await axios.get(url, { withCredentials: true });
            if (response.data.result === true) {
                alert('리플 삭제에 성공하였습니다.');
            } else {
                alert('리플 삭제에 실패하였습니다.');
            }
        } catch (e) {
            console.log(e);
            alert('리플 삭제에 실패하였습니다!');
        }
        location.reload();
    }

    const onSubmitWriteRepley = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        replyRequest(form);
    }

    const replyRequest = async (form) => {
        try {
            let axiosConfig = {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.post('http://localhost/boardRest/reply', form, 
                                                                             axiosConfig);
            if (response.data.result === true) {
                alert('리플 작성에 성공하였습니다.');
                location.reload();
            } else {
                alert('리플 등록 실패!');
            }
        } catch (e) {
            console.log(e);
            alert('리플 등록 실패!');
        }
    }

    const fileDown = (e) => {
        const url = "http://localhost/board/fileDown?fno=" + e.target.name;
        location.assign(url);
    }


    const onClickUpdate = (e) => {
        location.href = '/board/update?bno=' + board.bno;
    }

    const onClickDelete = (e) => {
        deleteRequest(board.bno);
    }
    const deleteRequest = async (boardNo) => {
        try {
            const response = await axios.get('http://localhost/boardRest/delete?boardNo=' + boardNo, { withCredentials: true });
            if (response.data.result === true) {
                alert('게시글 삭제에 성공하였습니다.');
                location.href = '/board/list';
            } else {
                alert('게시글 삭제에 실패하였습니다.');
            }
        } catch (e) {
            console.log(e);
            alert('게시글 삭제에 실패하였습니다!');
        }
    }

    
    const replyList = replies.map(item => (
        <tr key={item.rno}>
            <td>
                <sub className="comment-writer">{item.member.name}&nbsp;&nbsp;</sub>
                <sub className="comment-date">
                    {new Date(item.createDate).toLocaleDateString()}&nbsp;
                    {new Date(item.createDate).toLocaleTimeString()}
                </sub>
                <br />
                {item.content}
            </td>
            <td>
                {
                    loginInfo != null && (loginInfo.memberId == item.member.memberId || loginInfo.role == 'ROLE_ADMIN') &&
                    (<button className="btn-delete" value={item.rno} onClick={onClickReplyDelete} >삭제</button>)
                }
            </td>
        </tr>
    ));

    const fileList = files.map(item =>(
        <div key={item.fno}>
            <a href="#" name={item.fno} onClick={fileDown} >
                <img src="/images/file.png" width="20" height="20" />
                {item.renamedFilename}
            </a>
            <br />
            <img className="imageSize" src={'http://localhost/board/file/' + item.renamedFilename} />
        </div>
    ));

    return (
        <>
            <Main >
            {board != null &&
                <section id="board-write-container" className="board-write-container">
                    <br />
                    <h2 align="center">게시글 상세조회</h2>
                    <table id="tbl-board">
                        <tbody>
                            <tr>
                                <th>글번호</th>
                                <td> {board.bno} </td>
                            </tr>
                            <tr>
                                <th>제 목</th>
                                <td> {board.title} </td>
                            </tr>
                            <tr>
                                <th>타 입</th>
                                <td> {typeMap[board.boardCategory.type]} </td>
                            </tr>
                            <tr>
                                <th>작성자</th>
                                <td> {board.member.memberId} </td>
                            </tr>
                            <tr>
                                <th>조회수</th>
                                <td> {board.readCount} </td>
                            </tr>
                            <tr>
                                <th>작성 시간</th>
                                <td> {new Date(board.createDate).toLocaleDateString()}&nbsp;
                                    {new Date(board.createDate).toLocaleTimeString()} </td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td>
                                    {fileList == null ? '-':fileList}
                                </td>
                            </tr>

                            <tr>
                                <th>내 용</th>
                                <td><textarea rows="8" cols="50" readOnly={'readOnly'} value={board.content} ></textarea></td>
                            </tr>

                            <tr>
                                <th colSpan={2}>
                                    {loginInfo != null && (loginInfo.memberId == board.member.memberId || loginInfo.role == 'ROLE_ADMIN') && (
                                        <div>
                                            <button type="button" id="btnUpdate" onClick={onClickUpdate}>수정</button>
                                            &nbsp; <button type="button" id="btnDelete" onClick={onClickDelete}>삭제</button>
                                        </div>

                                    )}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <br />

                    {
                        loginInfo != null && (
                            <div id="comment-container">
                                <div className="comment-editor" align="center">
                                    <form action="/board/reply" method="post" onSubmit={onSubmitWriteRepley}>
                                        <input type="hidden" name="bno" value={board.bno} />
                                        <input type="hidden" name="writerId" value={loginInfo.memberId} />
                                        <textarea name="content" id="replyContent" cols="55" rows="2"></textarea>
                                        <button type="submit" id="btn-insert">등록</button>
                                    </form>
                                </div>
                            </div>
                        )
                    }

                    <table id="tbl-comment">
                        <tbody>
                            {replyList}
                        </tbody>
                    </table>
                </section>
            }
            {/* <Footer /> */}
            </Main>
        </>
    );
}