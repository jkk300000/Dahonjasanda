import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Main from "layouts/Main";
import Card from '@mui/material/Card';
import Container from "components/Container";
import { Hero, AdvertisementCard, PollCard, EditorsPickCard, FilterSearchManager, ViewProducts} from "./components";


const DepositsPage = () => {
  const [activePanel, setActivePanel] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [checked, setChecked] = useState({});

  console.log("1. 카테고리 값 from DepositsPage:", activePanel);
  console.log("1. searchTerm 값 from DepositsPage:", searchTerm);
  console.log("1. checked 값 from DepositsPage:", checked);
  
  return (
    <Main>
      <Box bgcolor={'alternate.main'} position={'relative'}>
        <Hero >
          <Box 
          padding={{ xs: 3, sm: 6 }}
          width={1}
          component={Card}
          boxShadow={2}
          borderRadius={2}
          >
            <FilterSearchManager 
              activePanel={activePanel}
              setActivePanel={setActivePanel}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm} // 추가
              setChecked={setChecked} // 추가
              checked={checked} // 추가
            />
          </Box>
        </Hero>
        <Container>
          <Box display="flex" gap={2}>
            <Box flex={9}>
              <ViewProducts 
                category={activePanel}
                searchTerm={searchTerm} // 추가
                checked={checked} // 추가
                setChecked={setChecked}
              />
            </Box>
            <Box flex={3}>
                <AdvertisementCard />
                <PollCard />
                <EditorsPickCard />
            </Box>
          </Box>
        </Container>
      </Box>
    </Main>
  );
};

export default DepositsPage;
