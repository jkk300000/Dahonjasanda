import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";


function WordList() {
  const router = useRouter();
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const fetchData = async (page) => {
      try {
        const response = await axios.get(`http://localhost/boardRest/list?types=ECONOMY&page=${page}`, { withCredentials: true });
        setBoardList(response.data.list);
        setPageInfo(response.data.pageInfo);
      } catch (error) {
        console.error('오류:', error);
      }
    };

    fetchData(currentPage);
  }, [router.isReady, currentPage]); 

  const handleChange = async (event, value) => {
    setCurrentPage(value);
  };

  return(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">No</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boardList.map((item) => (
            <TableRow
              key={item.bno}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{item.bno}</TableCell>
              <TableCell component="th" scope="row" >
                {item.title}
              </TableCell>
              <TableCell align="center">{item.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
            page={currentPage}
            siblingCount={5}
            boundaryCount={1}
            onChange={handleChange}
          />
        )}
      </Box>
    </TableContainer>
  );
}

export default WordList;
