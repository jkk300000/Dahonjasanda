/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Container from "components/Container";

const mock = [
  "https://www.shinailbo.co.kr/news/thumbnail/202210/1609262_782036_3942_v150.jpg",
  "https://i.namu.wiki/i/IxqRYX1tFrrGrQbuDauqC0flne6-80P6BiOgLmMAVI1sJZdsd2zhCsqaoD5STqB7V9jUUc1GSM0u9QA15tN90w.svg",

  "https://www.kocca.kr/images/homepage/www/kocca/contents/public_data_use02_bg.png",
  "https://www.cheongdo.go.kr/portal/img/sub/sub01/24_logo.svg",
];

const WithLeftAlignedDescriptionBox = () => {
  const theme = useTheme();
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant={"h4"}
              gutterBottom
              sx={{ fontWeight: 700, fontSize: "2.5em" }}
            >
              다혼자산다 with 청약 DATA
            </Typography>
            <Typography variant={"h6"} component={"p"} color={"text.secondary"}>
              실시간으로 업데이트 되는 청약 데이터를 한눈에!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Box display="flex" flexWrap="wrap" justifyContent={"flex-start"}>
              {mock.map((item, i) => (
                <Box maxWidth={90} marginTop={2} marginRight={4} key={i}>
                  <Box
                    component="img"
                    height={1}
                    width={1}
                    src={item}
                    alt="..."
                    sx={{
                      filter:
                        theme.palette.mode === "dark"
                          ? "brightness(0) invert(0.7)"
                          : "none",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WithLeftAlignedDescriptionBox;
