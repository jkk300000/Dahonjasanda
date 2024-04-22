import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";

const MiniBulletinBoard = () => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: "16px",
        width: "40%",
        margin: "auto",
        marginTop: "20px",
        border: "1px solid rgba(0, 0, 0, 0.2)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>청약 게시판</h1>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>제목</TableCell>
            <TableCell>등록일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>첫번째 게시글입니다.</TableCell>
            <TableCell>2020-10-25</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>두번째 게시글입니다.</TableCell>
            <TableCell>2020-10-25</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>세번째 게시글입니다.</TableCell>
            <TableCell>2020-10-25</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>네번째 게시글입니다.</TableCell>
            <TableCell>2020-10-25</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>다섯번째 게시글입니다.</TableCell>
            <TableCell>2020-10-25</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
        href="/your-link-url"
      >
        +
      </Button>
    </Paper>
  );
};

export default MiniBulletinBoard;
