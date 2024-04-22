import React from 'react';
import Container from "components/Container";

import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import ViewList from '../viewlist/viewlist';
import ViewList2 from '../viewlist2/viewlist2';

function Trends({ list }) {
    return(
        <Container>
            <Box>
                <Typography variant="h4" sx={{ marginBottom: '1rem'}}>
                    투자자별 매매동향
                </Typography>
                <Box sx={{ marginBottom: '40px' }}>
                    <ViewList list={list}/>
                </Box>
                <ViewList2 list={list}/>
            </Box>
        </Container>

    );
}

export default Trends;