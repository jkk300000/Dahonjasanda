import React, { useState, useEffect } from "react";

import axios from 'axios';
import Main from "layouts/Main";
import HeroSection from "./components/hero/herosection";
import SearchBox from "./components/searchbox";
import CardWithAddButton from "./components/CardWithAddButton";
import WithAvatarsAndMultilineContent from "./components/WithAvatarsAndMultilineContent";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Container from "components/Container";
import { useRouter } from 'next/router';

function StockPage() {
    const theme = useTheme();
    const router = useRouter();
    const [share, setShare] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [stockList, setStockList] = useState([]);
    const [stockListCount, setStockListCount] = useState([]);
    const [indexList, setIndexList] = useState([]);
    const [indexListCount, setIndexListCount] = useState([]);

    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        if (!router.isReady) {
          return;
        }
      
        const { searchValue } = router.query;
      
        setSearchValue(searchValue);
      
    }, [router.isReady]);

    useEffect(() => {
        getStockList(searchValue);
    }, [searchValue]);

    useEffect(() => {
        getIndexList(searchValue);
    }, [searchValue]);

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

    const getIndexList = async (searchValue) => {
        try {
            var url = 'http://localhost/stock/index/List';
            if (!searchValue) {
                url += '?searchValue=';
            } else {
                url += '?searchValue=' + searchValue;
            }

            const response = await axios.get(url, {
                withCredentials: true,
            });

            setIndexList(response.data.list);
            setIndexListCount(response.data.listCount);
        } catch (error) {
            console.error('Error fetching index list:', error);
        }
    };

    return (
        <Main colorInvert={true}>
            <Box bgcolor={"alternate.main"} position={"relative"}>
                <HeroSection imageUrl="https://img.hankyung.com/photo/202308/01.34142085.1.jpg"/>
                <Container>
                    <Box sx={{
                        borderBottom: '1px solid #ddd',
                        marginBottom: '20px',
                    }}>
                        <Typography variant="h4" sx={{ mb: 2}}>지수 정보</Typography>
                    </Box>
                    <CardWithAddButton list={indexList}/>
                    <Box sx={{
                        borderBottom: '1px solid #ddd',
                        marginBottom: '20px',
                    }}>
                        <Typography variant="h4" sx={{ mb: 2}}>주식 정보</Typography>
                    </Box>
                    <SearchBox list={stockList} setFilteredList={setFilteredList}/>
                    <WithAvatarsAndMultilineContent list={filteredList.length > 0 ? filteredList : stockList}/>
                </Container>
            </Box>
        </Main>
    );
}

export default StockPage;