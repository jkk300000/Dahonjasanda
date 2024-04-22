import React from 'react';
import Container from "components/Container";

import { Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import WysiwygRoundedIcon from '@mui/icons-material/WysiwygRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function ViewInfo({ list }) {
    if(!list) {
        return null;
    }

    return(
        <Container>
            <Box sx={{ marginBottom: 5 }}>
                <Typography variant="h4">
                    투자 정보
                </Typography>
            </Box>
            <Box sx={{ minWidth: 275, marginBottom: 5}}>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <WorkRoundedIcon sx={{ fontSize: 48, color: 'primary.main' }}/>
                            </CardActions>
                            <CardContent>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    전일 : {list.list[0].yprice}
                                </Typography>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    거래량 : {list.list[0].volume}
                                </Typography>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    52주 최고 : {list.list[0].topprice}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <ContentPasteSearchRoundedIcon sx={{ fontSize: 48, color: 'secondary.main' }}/>
                            </CardActions>
                            <CardContent>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    시가 : {list.list[0].open}
                                </Typography>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    대금 : {list.list[0].onevolume}
                                </Typography>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    52주 최저 : {list.list[0].bottomprice}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <ErrorOutlineRoundedIcon sx={{ fontSize: 48, color: 'error.main' }}/>
                            </CardActions>
                            <CardContent>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    고가 : {list.list[0].high}
                                </Typography>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    시총 : {list.list[0].total}
                                </Typography>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    PER : {list.list[0].per}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <WysiwygRoundedIcon sx={{ fontSize: 48, color: 'success.main' }}/>
                            </CardActions>
                            <CardContent>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    저가 : {list.list[0].low}
                                </Typography>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    외인소진율 : {list.list[0].foreignapb}
                                </Typography>
                                <Typography variant="h6" fontSize="1rem" gutterBottom>
                                    EPS : {list.list[0].eps}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box borderBottom={1} borderColor="divider">
                <Stack sx={{ width: '100%', marginBottom: 2}} spacing={2}>
                    <Alert severity="info">회사 정보: {list.list[0].content}</Alert>
                    <Alert severity="error">제공하는 금융 정보는 콘텐츠 제공업체툴팁 보기로부터 받는 정보로 투자 참고사항이며, 오류가 발생하거나 지연될 수 있습니다. <br/>제공된 정보에 의한 투자결과에 법적책임을 지지 않습니다. 게시된 정보는 무단으로 배포할 수 없습니다.</Alert>
                </Stack>
            </Box>
        </Container>

    );
}

export default ViewInfo;