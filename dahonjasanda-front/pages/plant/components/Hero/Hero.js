import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { ReactTyped } from "react-typed";
import Container from 'components/Container';
import { MergeTypeRounded } from '@mui/icons-material';
import Typed from "react-typed";
// import React, { useState, useEffect } from 'react';

// const strings=["초로색 힐링", "따뜻한 가족", "향긋한 힐링"]
// const [text, setText] = useState('');
// const [count, setCount] = useState(0);

// useEffect(() =>{
//   const interval = setInterval(()=>{
//     setText(text + txt[count]);
//     setCount(count + 1);
//   }, 100);
//   if(count === txt.length){
//     clearInterval(interval);
//   }
//   return () => clearInterval(interval);
// })

const Hero = () => {
  const theme = useTheme();
  return (
    <Box
      position={'relative'}
      sx={{
        backgroundImage:
          'url("https://cdn.sisaweek.com/news/photo/202301/202000_202310_040.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: -13,
        paddingTop: 13,
        '&:after': {
          position: 'absolute',
          content: '" "',
          width: '100%',
          height: '100%',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
          background: '#161c2d',
          opacity: 0.6,
        },
      }}
    >

      <Container
        zIndex={3}
        position={'relative'}
        minHeight={{ xs: 300, sm: 400, md: 600 }}
        maxHeight={600}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box>
          <Box marginBottom={2}>
            <Typography
              variant="h2"
              align={'center'}
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
              }}
            >
              {/* <Typography
              variant="h2"
              align={'center'}
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
              }} */}
              {/* > */}
              지친 몸과 마음에게,
              {/* </Typography> */}
              {/* <ReactTyped strings={["지친 몸과 마음에게"]} typeSpeed={40} type />
                <br /> */}
              <br></br>
              <ReactTyped
                strings={[
                  "초록색 즐거움", "향긋한 힐링", "따뜻한 가족",
                ]}
                typeSpeed={100}
                backSpeed={50}
                attr="placeholder"

                loop
              >
                <input type="text" style={{ width: '340px', height: '77px', textAlign: 'center', fontWeight: 'bold' }} />
              </ReactTyped>
              을 선물하다
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              align={'center'}
              sx={{
                color: theme.palette.common.white,
              }}
            >
              1인 가구, 새로운 가족 [

              <ReactTyped
                strings={[
                  "반려식물",
                ]}
                typeSpeed={200}
                backSpeed={50}
                attr="placeholder"

                loop
              >
                <input type="text" style={{ width: '80px', height: '25px', textAlign: 'center', fontWeight: 'bold', background: 'none', border: 'none', WebkitTextFillColor: 'white' }} />
              </ReactTyped>
              ]을 만나다.
            </Typography>
            <Typography
              variant="h6"
              align={'center'}
              sx={{
                color: theme.palette.common.white,
              }}
            >
            </Typography>
          </Box>
        </Box>
      </Container>
      <Box
        component={'svg'}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100.1"
        width={1}
        maxHeight={120}
        bottom={0}
        position={'absolute'}
        zIndex={2}
      >
        {/* <path
          fill={theme.palette.alternate.main}
          d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
        ></path> */}
      </Box>
    </Box>
  );
};

export default Hero;
