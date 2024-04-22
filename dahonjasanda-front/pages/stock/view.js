import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';
import Main from "layouts/Main";
import Container from "components/Container";
import { useRouter } from 'next/router';

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ViewTitle from './components/title/stockviewtitle';
import ViewInfo from './components/viewinfo/stockviewinfo';
import Consensus from './components/consensus/consensus';
import Trends from './components/trend/trend';
import HeroSection from './components/hero/herosection';

export default function View() {
    const theme = useTheme();

    const router = useRouter();
    const [sname, setSname] = useState(null);
    const [page, setPage] = useState(null);
    const [view, setView] = useState(null);
    const [stockData, setStockData] = useState(null);
    const [viewData, setViewData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!router.isReady) {
            return;
        }
        
        const { page } = router.query;
        setPage(page);

    }, [router.isReady]);

    useEffect(() => {

        if (!router.isReady) {
            return;
        }

        const {searchValue} = router.query;
        if (searchValue) {
            setSname(searchValue);
        }
        fetchViewData(searchValue);
    }, [router.isReady]);

    const fetchViewData = async (searchValue) => {
        setLoading(true);
        try {
            var url = 'http://localhost/stock/List'
            if (!searchValue) {
                url += '?searchValue=';
            } else {
                url += '?searchValue=' + searchValue;
            }
            const response = await axios.get(url, {
                withCredentials: true,
            });


            let clist = [];
            for(let i = 0; i < 5; i++){
                let obj = {};
                obj['buyer'] = response.data.list[0]['buyname' + (i+1)];
                obj['bid'] = response.data.list[0]['buy' + (i+1)];
                obj['seller'] = response.data.list[0]['sellname' + (i+1)];
                obj['ask'] = response.data.list[0]['sell' + (i+1)];
                clist[i] = obj;
            }
    
            let flist = [];
            for(let i = 0; i < 6; i++){
                let obj = {};
                obj['date'] = response.data.list[0]['date' + (i+1)];
                obj['close'] = response.data.list[0]['valueprice' + (i+1)];
                obj['gap'] = response.data.list[0]['valuegap' + (i+1)];
                obj['foreigner'] = response.data.list[0]['valueforeigner' + (i+1)];
                obj['organ'] = response.data.list[0]['valueorgan' + (i+1)];
                flist[i] = obj;
            }
            
            let xlist = [];
            for(let i = 0; i < 200; i++) {
                let obj = {};
                obj['x'] = response.data.list[0].sprice[i]['sdate'];
                xlist[i] = obj;
            }

            let olist = [];
            for(let i = 0; i < 200; i++) {
                let obj = {};
                obj['o'] = response.data.list[0].sprice[i]['mkp'];
                olist[i] = obj;
            }

            let hlist = [];
            for(let i = 0; i < 200; i++) {
                let obj = {};
                obj['h'] = response.data.list[0].sprice[i]['hipr'];
                hlist[i] = obj;
            }

            let llist = [];
            for(let i = 0; i < 200; i++) {
                let obj = {};
                obj['l'] = response.data.list[0].sprice[i]['lopr'];
                llist[i] = obj;
            }

            let cllist = [];
            for(let i = 0; i < 200; i++) {
                let obj = {};
                obj['c'] = response.data.list[0].sprice[i]['clpr'];
                cllist[i] = obj;
            }

            let tempObj = response.data;
            tempObj['clist'] = clist;
            tempObj['flist'] = flist;
            tempObj['xlist'] = xlist;
            tempObj['olist'] = olist;
            tempObj['hlist'] = hlist;
            tempObj['llist'] = llist;
            tempObj['cllist'] = cllist;
            setViewData(tempObj);
            console.log("Viewdata@@@@@", tempObj);

        } catch (error) {
            console.error('Error fetching viewData:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Main colorInvert={true}>
            <Box>
                <HeroSection imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSArpdqfkhN75nrhWCbHxmvFiY7Ot0SujcbQ&usqp=CAU"/>
                <ViewTitle list={viewData}/>
                <ViewInfo list={viewData} />
                <Consensus list={viewData}/>
                <Trends list={viewData}/>
            </Box>
        </Main>
    );
}
