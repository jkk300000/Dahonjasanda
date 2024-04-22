import React, { useState, useEffect } from "react";

import Main from "layouts/Main";
import Container from "components/Container";
import { useRouter } from 'next/router';
import axios from 'axios';

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

import PieChart from "./components/piechart";
import LabTabs from "./components/tabpanel/tabpanel";
import HeroSection from "./components/hero/herosection";

function MyStock() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [stockList, setStockList] = useState([]);
  const [stockListCount, setStockListCount] = useState([]);
  const [wallet, setWallet] = useState([]);
  const [walletCount, setWalletCount] = useState([]);

  const router = useRouter();
  const [page, setPage] = useState(null);
  const [loginInfo, setLoginInfo] = useState(null);
  const [myWallet, setMyWallet] = useState([]);

  useEffect(() => {
      
    if (!router.isReady) {
      return;
    }
      
    const { page } = router.query;
    setPage(page);
    getLoginInfo();

  }, [router.isReady]);

  useEffect(() => {
    getStockList(searchValue);
  }, [searchValue]);

  useEffect(() => {
    getWallet(searchValue);
  }, [searchValue]);

  const getLoginInfo = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost/memberRest/loginInfo', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }); 
        if (response.data.result === true) {
            setLoginInfo(response.data.member);
        }
      } else {
        router.push("/member/signin");
      }
    } catch (e) {
        console.log(e);
    }
  }

  const getStockList = async (searchValue) => {
    try {
        var url = 'http://localhost/stock/List';
        if (!searchValue) {
            url += '?searchValue=';
        } else {
            url += '?searchValue=' + searchValue;
        }
  
        const response = await axios.get(url, {
            withCredentials: true,
        });

        setStockList(response.data.list);
        setStockListCount(response.data.listCount);
    } catch (error) {
        console.error('Error fetching stock list:', error);
    }
  };

  const getWallet = async (searchValue) => {
    try {
      var url = 'http://localhost/stock/wallet/List';
      if (!searchValue) {
        url += '?searchValue=';
      } else {
        url += '?searchValue=' + searchValue;
      }
  
      const response = await axios.get(url, {
        withCredentials: true,
      });
  
      setWallet(response.data.list);
      setWalletCount(response.data.listCount);

    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.get('http://localhost/memberRest/loginInfo', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      })
      .then(response => {
        if (response.data.result === true) {
          setLoginInfo(response.data.member);
          const mno = response.data.member.mno;
          const filteredList = wallet.filter(item => item.member.mno === mno);
          setMyWallet(filteredList);
        } else {
          console.log('Failed to fetch login info');
        }
      })
      .catch(error => {
        console.error('Error fetching login info:', error);
      });
    }
  }, [wallet]);

  const labels = myWallet.map(item=>item.sname);
  const series = myWallet.map(item=>item.quantity);

  const totalPrice = myWallet.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalPresent = myWallet.reduce((total, item) => {
    const findStock = stockList.find(stock => stock.sname === item.sname);
    if (findStock) {
      return total + (findStock.price * item.quantity);
    }
  }, 0);

  const profit = totalPresent - totalPrice;
  const profitColor = profit >=0 ? "red" : "blue";
  const profitIcon = profit >=0 ? "▲" : "▼";
  const profitRate = (totalPresent - totalPrice) / totalPrice * 100;

  return(
    <Main colorInvert={true}>
      <HeroSection imageUrl="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbVeNAZ%2FbtrOvf3iz2z%2FyWLsUt3j2QKEW6yWzoDlt1%2Fimg.png"/>
      <Container>
        {loginInfo != null ? (
          <Box sx={{ borderBottom: '1px solid #ccc', mb: 2 }}>
            <Box bgcolor={"alternate.main"} position={"relative"} sx={{ pb: 2 }}>
              {myWallet.length > 0 ? (
                <>
                  <Typography variant="h4">나의 총 자산</Typography>
                  <Typography variant="h4">₩{parseInt(totalPresent).toLocaleString()}</Typography>
                  <Typography variant="h5" style={{ color: profitColor}}>
                    평가손익 {profit.toLocaleString()}({profitIcon}{profitRate.toFixed(2)}%)
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4">나의 총 자산</Typography>
                  <Typography variant="h6">등록된 자산이 없습니다. 매수 등록 하세요</Typography>
                </>
              )}
            </Box>
          </Box>
        ) : null}
        {loginInfo != null && (
          <Box sx={{ borderBottom: '1px solid #ccc', pb: 2, mb: 3 }}>
            <Box>
              <PieChart labels={labels} series={series} />
            </Box>
          </Box>
        )}
        {loginInfo != null && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LabTabs slist={stockList} wlist={myWallet} />
        </Box>
        )}
      </Container>
    </Main>
  );
}

export default MyStock;