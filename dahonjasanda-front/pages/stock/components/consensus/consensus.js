import React from 'react';
import Container from "components/Container";

import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import Grid from '@mui/material/Grid';
import { ProductionQuantityLimitsRounded } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import styles from './consensus.module.css';

function Consensus({ list }) {
    if (!list) {
        return null;
    }
    
    const iNum = Math.round(parseFloat(list.list[0].investinfo));
    const buttonColor1 = iNum ===1 ? '#1976d2' : '#9e9e9e';
    const buttonColor2 = iNum ===2 ? '#2196f3' : '#9e9e9e';
    const buttonColor3 = iNum ===3 ? '#4caf50' : '#9e9e9e';
    const buttonColor4 = iNum ===4 ? '#ff9800' : '#9e9e9e';
    const buttonColor5 = iNum ===5 ? '#f44336' : '#9e9e9e';
    const t1 = iNum ===1 ? list.list[0].investinfo.slice(0,4) : '';
    const t2 = iNum ===2 ? list.list[0].investinfo.slice(0,4) : '';
    const t3 = iNum ===3 ? list.list[0].investinfo.slice(0,4) : '';
    const t4 = iNum ===4 ? list.list[0].investinfo.slice(0,4) : '';
    const t5 = iNum ===5 ? list.list[0].investinfo.slice(0,4) : '';

    return(
        <Container>
            <Box sx={{ marginBottom: '20px'}}>
                <Typography variant="h4">
                    컨센서스
                </Typography>
            </Box>
            <Stack direction="row" spacing={5} sx={{ marginBottom: '70px' }}>
                <Box sx={{ width: '100%' }}>
                    {list && (
                        <Tooltip title={t1} open={true} classes={{ tooltip: styles.strongsell }}>
                            <Button variant="contained" 
                                sx={{ width: '20%', bgcolor: buttonColor1,
                                    '&:hover': {
                                        bgcolor: buttonColor1
                                    }
                                }}
                                startIcon={<ZoomOutRoundedIcon/>}
                            >
                                적극매도
                            </Button>
                        </Tooltip>
                    )}
                    {list && (
                        <Tooltip title={t2} open={true} classes={{ tooltip: styles.sell }}>
                            <Button variant="contained" 
                                sx={{ width: '20%', bgcolor: buttonColor2,
                                    '&:hover': {
                                        bgcolor: buttonColor2
                                    }
                                }}
                                startIcon={<ProductionQuantityLimitsRounded/>}
                            >
                                매도
                            </Button>
                        </Tooltip>
                    )}
                    {list && (
                        <Tooltip title={t3} open={true} classes={{ tooltip: styles.neutral }}>
                            <Button variant="contained"
                                sx={{ width: '20%', bgcolor: buttonColor3,
                                    '&:hover': {
                                        bgcolor: buttonColor3
                                    }
                                }}
                            >
                                중립
                            </Button>
                        </Tooltip>
                    )}
                    {list && (
                        <Tooltip title={t4} open={true} classes={{ tooltip: styles.buy }}>
                            <Button variant="contained"
                                sx={{ width: '20%', bgcolor: buttonColor4, 
                                    '&:hover': {
                                        bgcolor: buttonColor4
                                    }
                                }}
                                endIcon={<AddShoppingCartRoundedIcon/>}
                            >
                                매수
                            </Button>
                        </Tooltip>
                    )}
                    {list && (
                        <Tooltip title={t5} open={true} classes={{ tooltip: styles.strongbuy }}>
                            <Button variant="contained"
                                sx={{ width: '20%', bgcolor: buttonColor5, 
                                    '&:hover': {
                                        bgcolor: buttonColor5
                                    }
                                }}
                                endIcon={<ZoomInRoundedIcon />}
                            >
                                적극매수
                            </Button>
                        </Tooltip>
                    )}
                </Box>
            </Stack>
            <Box borderBottom={1} borderColor="divider">
                <Typography variant="h5" textAlign="center">
                    목표주가
                </Typography>
                <Typography variant="h4" textAlign="center">
                    {list.list[0].targetprice.toLocaleString()}원
                </Typography>
                <Typography variant="h6" fontWeight="light" textAlign="center" fontSize="0.8rem" sx={{ marginBottom: '20px'}}>
                    {list.list[0].sdate} 기준ㆍ에프엔가이드 제공
                </Typography>
            </Box>
        </Container>

    );
}

export default Consensus;