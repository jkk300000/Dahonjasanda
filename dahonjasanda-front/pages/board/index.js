'use client';


import { Inter } from 'next/font/google'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Header from '../../components/header';
import Footer from '../../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ['latin'] })
const defaultTheme = createTheme();

export default function Home() {
  return (
    <>
      <Header />
      <section id="content">
        <br />
        <h3>React + Spring Boot의 Rest 구조로 개발된 게시판입니다.</h3>
        <br />
      </section>
      <Footer />
    </>
  )
}
