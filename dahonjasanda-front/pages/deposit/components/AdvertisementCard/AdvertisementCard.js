import React from "react";

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

const AdvertisementCard = () => {
    const adImagePath = `/images/DepositAd.jpg`; // 'public/images' 폴더 안의 이미지 경로 설정

    return (
        <Card>
            <CardContent>
                <img src={adImagePath} alt="Advertisement" style={{ width: '300px', height: 'auto', objectFit: 'contain' }} />
            </CardContent>
        </Card>
    );
};

export default AdvertisementCard;

