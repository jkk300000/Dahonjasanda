import React from 'react';
import Container from "components/Container";

import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import Clock from '../clock/clock';
import IndexGraph from '../IndexGraph';
import Card from '@mui/material/Card';
import Candle from '../candlechart/candlchart';

function ViewTitle({ list }) {

    if(!list) {
        return null;
    }

    const graph = list.list[0].sprice.map((item) => item.clpr);
    const graphx = list.list[0].sprice.map((item) => item.sdate);
    const grapho = list.list[0].sprice.map((item) => item.mkp);
    const graphh = list.list[0].sprice.map((item) => item.hipr);
    const graphl = list.list[0].sprice.map((item) => item.lopr);

    console.log("xxxx",graphx);
    console.log("oooo",grapho);
    console.log("hhhh",graphh);
    console.log("llll",graphl);

    const data = graphx.map((dateNumber, index) =>{
        const dateString = dateNumber.toString();
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
    
        const formattedDateString = `${year},${month},${day}`;
        return {
            x: formattedDateString,
            o: grapho[index],
            h: graphh[index],
            l: graphl[index],
            c: graph[index],
        };
    });

        
    return(
        <Container>
            <Box borderBottom={1} borderColor="divider">
                <Box>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={8}>
                            <Box>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Typography variant="h6" fontSize="1rem">
                                            &nbsp;{list.list[0].code}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6" fontWeight={200} fontSize="1rem">
                                            코스피
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography variant="h4">
                                    {list.list[0].sname}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h3">
                                    {list.list[0].price.toLocaleString()}원
                                </Typography>
                                <Grid container spcaing={3} alignItems="center">
                                    <Grid item>
                                        <CurrencyExchangeRoundedIcon fontSize="small" color={(list.list[0].price - list.list[0].yprice) >= 0 ? 'primary' : 'secondary'}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography color={(list.list[0].price - list.list[0].yprice) >= 0 ? 'blue' : 'red'}>
                                            &nbsp;&nbsp;{(list.list[0].price - list.list[0].yprice) >= 0 ? '▲' : '▼'} {(list.list[0].price - list.list[0].yprice).toLocaleString()}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography color={((list.list[0].price - list.list[0].yprice) / list.list[0].yprice) * 100 >= 0 ? 'blue' : 'red'}> 
                                            ({((list.list[0].price - list.list[0].yprice) / list.list[0].yprice) * 100 >= 0 ? '+' : ''}
                                            {(((list.list[0].price - list.list[0].yprice) / list.list[0].yprice) * 100).toFixed(2)}%)
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} alignItems="center" style={{ marginBottom: 10 }}>
                                    <Grid item>
                                        <AccessAlarmRoundedIcon fontSize="small" color={list.list[0].sdate.toString().includes('장중') ? 'success' : 'action'}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{ color: list.list[0].sdate.toString().includes('장중') ? 'green' : 'orange' }}>
                                            {list.list[0].sdate}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Clock />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box>
                                <IndexGraph data={graph} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Candle list={data}/>
        </Container>
    );
}

export default ViewTitle;