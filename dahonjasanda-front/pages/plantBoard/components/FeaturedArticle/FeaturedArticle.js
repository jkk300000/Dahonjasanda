"use client";
import { Inter } from "next/font/google";
import * as React from "react";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Card from "@mui/material/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box, Button, Grid } from "@mui/material";
import { margin } from "@mui/system";

// 게시판/업데이트.글쓰기 등등 다추가해야함

const inter = Inter({ subsets: ["latin"] });
const defaultTheme = createTheme();

export default function List() {
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [board, setBoard] = useState({});
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loginInfo, setLoginInfo] = useState(null);
  const [types, setTypes] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    console.log("router.query");
    console.log(router.query);

    const { page } = router.query;
    const { types } = router.query;
    const { searchType } = router.query;
    const { searchValue } = router.query;
    setPage(page);
    setSearchType(searchType);
    setSearchValue(searchValue);
    setTypes(types == undefined ? [] : types);
    getLoginInfo();
    getBoardList(page, searchType, searchValue, types);
  }, [router.isReady]);

  const getLoginInfo = async () => {
    try {
      var response = await axios.get("http://localhost/memberRest/loginInfo", {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.result === true) {
        setLoginInfo(response.data.member);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getBoardList = async (page, searchType, searchValue, types) => {
    try {
      var url = "http://localhost/boardRest/list?types=PLANT&types=ANIMAL";
      if (page != null) {
        url = url + "&page=" + page;
      } else {
        url = url + "&page=1";
      }
      if (searchValue != null) {
        url = url + "&searchType=" + searchType;
        url = url + "&searchValue=" + searchValue;
      }
      if (types != null && types.length > 0) {
        for (let i = 0; i < types.length; i++) {
          url = url + "&types=" + types[i];
        }
      }

      const response = await axios.get(url, { withCredentials: true });
      console.log(response);
      setBoard(response.data);
      setCategoryList(response.data.categoryList);
      setBoardList(response.data.list);
      setPageInfo(response.data.pageInfo);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event, value) => {
    var url = "/board/List";
    url = url + "?page=" + value;
    url = url + "&searchType=" + searchType;
    url = url + "&searchValue=" + searchValue;
    router.push(url, undefined, { shallow: false });
    getBoardList(value, searchType, searchValue, types);
  };

  const onClickWrite = (e) => {
    router.push("/board/write", undefined, { shallow: false });
  };

  const onChangeValue = (e) => {
    setSearchValue(e.target.value);
  };
  const onChangeSearchType = (e) => {
    setSearchType(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    var url = "/board/list";
    url = url + "?page=" + data.get("page");
    if (searchValue != null) {
      if (searchType == null) {
        url = url + "&searchType=all";
      } else {
        url = url + "&searchType=" + data.get("searchType");
      }
      url = url + "&searchValue=" + data.get("searchValue");
    }
    const types2 = data.getAll("type");
    if (types2 != null && types2.length > 0) {
      for (let i = 0; i < types2.length; i++) {
        url = url + "&types=" + types2[i];
      }
    }
    setPage(data.get("page"));
    setSearchValue(data.get("searchValue"));
    setSearchType(data.get("searchType"));
    router.push(url);
    getBoardList(
      data.get("page"),
      data.get("searchType"),
      data.get("searchValue"),
      types
    );
  };

  const onChangeType = (e) => {
    if (e.target.checked == true) {
      setTypes([...types, e.target.value]);
    } else {
      setTypes(
        types.filter((data) => {
          data == e.target.value;
        })
      );
    }
  };

  const categories = categoryList.map((item) => (
    <label key={item.type}>
      <input
        type="checkbox"
        style={{ marginRight: 1 }}
        name="types"
        value={item.type}
        onChange={onChangeType}
      />
      {item.name}
      &nbsp;&nbsp;
    </label>
  ));

  const boards = boardList.map((item) => (
    <tr
      key={item.bno}
      style={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
    >
      <td style={{ padding: "10px", borderBottom: "none" }}>{item.bno}</td>
      <td style={{ padding: "10px", borderBottom: "none" }}>
        {board.typeMap[item.boardCategory.type]}
      </td>
      <td style={{ padding: "10px", borderBottom: "none" }}>
        <a
          href={"/plantBoard/view?bno=" + item.bno}
          style={{ textDecoration: "none", color: "black" }}
        >
          {item.title}
        </a>
      </td>
      <td style={{ padding: "10px", borderBottom: "none" }}>
        {item.member.memberId}
      </td>
      <td style={{ padding: "10px", borderBottom: "none" }}>
        {new Date(item.createDate).toLocaleDateString()}
      </td>
      <td style={{ padding: "10px", borderBottom: "none" }}>
        {item.boardAttachFileList != null &&
        item.boardAttachFileList.length > 0 ? (
          <img
            src="/images/file.png"
            alt="첨부파일"
            style={{ width: "20px", height: "20px" }}
          />
        ) : (
          <span>-</span>
        )}
      </td>
      <td style={{ padding: "10px", borderBottom: "none" }}>
        {item.readCount}
      </td>
    </tr>
  ));

  return (
    <>
      <div
        id="board-list-container"
        style={{
          backgroundColor: "white",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          동식물 게시판
        </h2>
        <form
          name="searchForm"
          onSubmit={onSubmit}
          style={{ marginBottom: "10px", textAlign: "center" }}
        >
          <input type="hidden" name="page" value={page == null ? 1 : page} />
          <div style={{ textAlign: "center", marginBottom: "10px" }}></div>
          <Box
            className="searchInput"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="searchType"
                value="all"
                onChange={onChangeSearchType}
                checked={searchType == null || searchType == "all"}
              />{" "}
              전체&nbsp;
            </label>
            <label style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="searchType"
                value="title"
                onChange={onChangeSearchType}
                checked={searchType == "title"}
              />{" "}
              제목&nbsp;
            </label>
            <label style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="searchType"
                value="content"
                onChange={onChangeSearchType}
                checked={searchType == "content"}
              />{" "}
              내용&nbsp;
            </label>
            <label style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="searchType"
                value="writer"
                onChange={onChangeSearchType}
                checked={searchType == "writer"}
              />{" "}
              작성자&nbsp;
            </label>
            <span className="blue_window" style={{ marginRight: "5px" }}>
              <input
                type="text"
                id="searchValue"
                name="searchValue"
                onChange={onChangeValue}
                value={searchValue || ""}
                className="input_text"
                style={{ padding: "5px" }}
              />
            </span>
            <Button
              variant="contained"
              color="secondary" // 분홍색으로 변경
              size="medium"
              type="submit"
              className="sch_smit"
              style={{ padding: "8px" }}
            >
              검색
            </Button>
          </Box>
        </form>
        {loginInfo != null && (
          <Button
            style={{ marginBottom: "10px", display: "block", margin: "0 auto" }}
            variant="contained"
            type="button"
            id="btn-add"
            onClick={onClickWrite}
          >
            글쓰기
          </Button>
        )}
        <table
          id="tbl-board"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            marginBottom: "20px", // 추가: 아래 여백 추가
          }}
        >
          <tbody>
            <tr>
              <th
                style={{
                  backgroundColor: "lightgreen", // 변경: 헤더 색상 변경
                  padding: "10px",
                }}
              >
                번호
              </th>
              <th
                style={{
                  backgroundColor: "lightgreen", // 변경: 헤더 색상 변경
                  padding: "10px",
                }}
              >
                타입
              </th>
              <th
                style={{
                  backgroundColor: "lightgreen", // 변경: 헤더 색상 변경
                  padding: "10px",
                }}
              >
                제목
              </th>
              <th
                style={{
                  backgroundColor: "lightgreen", // 변경: 헤더 색상 변경
                  padding: "10px",
                }}
              >
                작성자
              </th>
              <th
                style={{
                  backgroundColor: "lightgreen", // 변경: 헤더 색상 변경
                  padding: "10px",
                }}
              >
                작성일
              </th>
              <th
                style={{
                  backgroundColor: "lightgreen", // 변경: 헤더 색상 변경
                  padding: "10px",
                }}
              >
                첨부파일
              </th>
              <th
                style={{
                  backgroundColor: "lightgreen", // 변경: 헤더 색상 변경
                  padding: "10px",
                }}
              >
                조회수
              </th>
            </tr>
            {boards}
          </tbody>
        </table>
      </div>
      <div
        className="pageInfo"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {pageInfo != null && (
            <Pagination
              shape="rounded"
              count={pageInfo.maxPage}
              defaultPage={pageInfo.currentPage}
              siblingCount={5}
              boundaryCount={1}
              onChange={handleChange}
            />
          )}
        </Box>
      </div>
    </>
  );
}
