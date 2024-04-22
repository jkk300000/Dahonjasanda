'use client';

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
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


const defaultTheme = createTheme();
export default function Logout() {

    useEffect(() => {
        logout();
    });


    // async : 비동기식 키워드, 
    const logout = async () => {
        try {
            const response = await axios.get('http://localhost/memberRest/logout',  { withCredentials: true });
            console.log(response)
            if(response.data.result === true){
                alert('로그아웃 되었습니다.');
                sessionStorage.removeItem('token');
                location.href ="/";
            }else{
                alert('로그아웃에 실패하였습니다.');
                location.href ="/";
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div></div>
    );
}