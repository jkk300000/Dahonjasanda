import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';

import Container from 'components/Container';
import InsertForm from './components/form/form';


const InsertStock = ({slist, wlist}) => {

    return(
        <Container>
            <Box marginBottom={5}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight={700} textAlign="center">
                        보유한 주식을 입력하세요!
                        </Typography>
                        <Card>
                            <CardMedia
                                sx={{ height: 400}}
                                image="/images/stock/thumb.png"
                                alt="thumb"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <InsertForm slist={slist} wlist={wlist}/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default InsertStock;