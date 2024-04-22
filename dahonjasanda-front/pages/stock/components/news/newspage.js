import React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Container from "components/Container";
import NewsList from './components/list/newslist';

function NewsPage() {
    const category = 'business'

    return(
        <Container>
            <Box>
                <Typography variant="h3">오늘의 경제</Typography>
                <NewsList category={category}/>
            </Box>
        </Container>
    );
}

export default NewsPage;