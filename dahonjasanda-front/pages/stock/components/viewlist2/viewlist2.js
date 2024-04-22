import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function ViewList2({ list }) {
    
    if(!list) {
        return null;
    }

    return(
        <TableContainer component={Paper}>
            <Typography variant="h6" align="center" style={{ borderBottom: '1px solid black' }}>
                거래원 정보
            </Typography>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead sx={{ bgcolor: 'alternate.main' }}>
                    <TableRow>
                        <TableCell align="center">
                            <Typography
                            color={'text.secondary'}
                            variant={'caption'}
                            fontWeight={700}
                            sx={{ textTransform: 'uppercase' }}
                            >
                            매도 상위
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography
                            color={'text.secondary'}
                            variant={'caption'}
                            fontWeight={700}
                            sx={{ textTransform: 'uppercase' }}
                            >
                            거래량
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography
                            color={'text.secondary'}
                            variant={'caption'}
                            fontWeight={700}
                            sx={{ textTransform: 'uppercase' }}
                            >
                            매수상위
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography
                            color={'text.secondary'}
                            variant={'caption'}
                            fontWeight={700}
                            sx={{ textTransform: 'uppercase' }}
                            >
                            거래량
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.clist.map((item, i) => (
                        <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell align="center">
                                <Typography>{item.seller}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography>{item.ask}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography>
                                    {item.buyer}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography>
                                    {item.bid}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

export default ViewList2;