import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";

function Clock(props) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isOpeningHour, setIsOpeningHour] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const isOpen = (currentHour === 9 && currentMinute >= 0) || (currentHour === 15 && currentMinute <= 30) || (currentHour > 9 && currentHour < 15);
        setIsOpeningHour(isOpen);

    }, [currentTime]);

    return (
        <Box>
            <Typography>
                {isOpeningHour ? '운영 시간: ' + currentTime.toLocaleTimeString() : '운영 시간: 종료'}
            </Typography>
        </Box>
    );
}

export default Clock;
