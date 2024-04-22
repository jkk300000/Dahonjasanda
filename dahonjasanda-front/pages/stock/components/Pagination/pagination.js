import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";

export default function Paging({currentPage, onPageChange, count}) {
  const handlePageChange = (event, newPage)=>{
    onPageChange(newPage);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    }}> 
      <Pagination 
        count={count}
        color="primary" 
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
        />
    </Box>
  );
}