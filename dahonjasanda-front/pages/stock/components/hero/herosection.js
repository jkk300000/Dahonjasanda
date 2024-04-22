import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from 'components/Container';
import Typography from '@mui/material/Typography';

function HeroSection({ imageUrl }) {
    const theme = useTheme();

    return(
        <Box
            position={'relative'}
            sx={{
                backgroundImage:
                `url(${imageUrl})`,
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
                minHeight={{ xs: 200, sm: 300, md: 400 }}
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
                        다-혼자산다 주식
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
                        파이어족의 시작, 재테크의 끝
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
            ></Box>
        </Box>
    );
}

export default HeroSection;