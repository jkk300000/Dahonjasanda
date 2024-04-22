'use client';

import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({ children }) {

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="My First Static Website" />
        <meta name="keywords" content="nextjs,static,website" />

      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
