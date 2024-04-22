'use client';
import { useEffect, useState } from 'react';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


const defaultTheme = createTheme();



export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        login(form);
    };

     // async : 비동기식 키워드, 
     const login = async (form) => {
        try {
            const response = await axios.post('http://localhost/memberRest/login', 
                                                        form,  { withCredentials: true });
            console.log(response)
            if(response.data.result === true){
                alert('로그인 성공');
                sessionStorage.setItem('token', response.data.token);
                location.href ="/";
            }else{
                alert('로그인 실패');
            }
        } catch (e) {
            alert('로그인 실패');
            console.log(e);
        }
    }


    return (
        <ThemeProvider theme={defaultTheme} >
            <div style={{ height : '100%', backgroundImage: 'url(/images/myImages/loginBG.jpg)', backgroundSize: '140%'}} >
            <div className='col-5  my-2 mx-auto' style={{ backgroundColor: '#f0f0f0', borderRadius : "30px", height : '80%' }}>
            <Container component="main" maxWidth="xs" style={{height : '100%'}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h3" className='mt-4'>
                        로그인
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            label="아이디"
                            name="id"
                            autoComplete="id"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pwd"
                            name="pwd"
                            label="비밀번호"
                            type="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            로그인 하기
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    비밀번호를 잊으셨나요?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/member/signup" variant="body2">
                                    {"아직 가입하지 않으셨나요?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
                </div>
                </div>
        </ThemeProvider>
    );
}