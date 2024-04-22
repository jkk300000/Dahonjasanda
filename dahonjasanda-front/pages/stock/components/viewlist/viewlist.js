import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function ViewList({ list }) {
    
    if(!list) {
        return null;
    }

    return(
        <TableContainer component={Paper}>
            <Typography variant="h6" align="center" style={{ borderBottom: '1px solid black' }}>
                외국인ㆍ기관
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
                            날짜
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography
                            color={'text.secondary'}
                            variant={'caption'}
                            fontWeight={700}
                            sx={{ textTransform: 'uppercase' }}
                            >
                            종가
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography
                            color={'text.secondary'}
                            variant={'caption'}
                            fontWeight={700}
                            sx={{ textTransform: 'uppercase' }}
                            >
                            전일비
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography
                            color={'text.secondary'}
                            variant={'caption'}
                            fontWeight={700}
                            sx={{ textTransform: 'uppercase' }}
                            >
                            외국인
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography
                            color={'text.secondary'}
                            variant={'caption'}
                            fontWeight={700}
                            sx={{ textTransform: 'uppercase' }}
                            >
                            기관
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.flist.map((item, i) => (
                        <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell align="center">
                                <Typography>{item.date}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography>{item.close.toLocaleString()}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                {list.flist && (
                                    <Typography style={{ color: item.gap.startsWith('상') ? 'red' : 'blue'}}>
                                        {item.gap.startsWith('상') ? '▲' : '▼'}
                                        {item.gap}
                                    </Typography>
                                )}
                            </TableCell>
                            <TableCell align="center">
                                {list.flist && (
                                    <Typography style={{ color: item.foreigner.startsWith('+')  ? 'red' : 'blue'}}>
                                        {item.foreigner}
                                    </Typography>
                                )}
                            </TableCell>
                            <TableCell align="center">
                                {list.flist && (
                                    <Typography style={{ color: item.organ.startsWith('+')  ? 'red' : 'blue'}}>
                                        {item.organ}
                                    </Typography>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

export default ViewList;