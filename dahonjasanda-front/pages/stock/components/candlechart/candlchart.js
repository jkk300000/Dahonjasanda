import React from 'react';
import dynamic from 'next/dynamic';

import Box from "@mui/material/Box";

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });


function Candle({list, item}) {
    console.log("candl!@#!@#",item);
    // const candle_day_x = item.item[0].sprice.map((item) => item.sdate);
    const options = {
        chart: {
            type: 'candlestick',
            height: 350,
            width: 800,
            toolbar: {
                show: true
            },
            
        },
        xaxis: {
            type: 'datetime',
            categories: list.map(item => item.x),
        },
        yaxis: {
            tooltip: {
                enabled: false
            }
        },
        plotOptions: {
            candlestick: {
                wick: {
                    useFillColor: true,
                },
            },
        }
    };

    const series = list ? [{
        data: list.map(item => ({
            x: item.x,
            y: [item.o, item.h, item.l, item.c]
        }))
    }] : [];

    return(
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Box style={{ width: '80%' }}>
                <ApexChart options={options} series={series} type="candlestick" />
            </Box>
        </Box>
    );
}

export default Candle;