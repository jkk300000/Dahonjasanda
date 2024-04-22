/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Container from "components/Container";

const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Box
      position={"relative"}
      sx={{
        backgroundColor: "skyblue",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item container alignItems={"center"} xs={12} md={6}>
            <Box>
              <Box marginBottom={2}>
                <Typography
                  variant="h2"
                  color="text.primary"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    component={"span"}
                    variant={"inherit"}
                    color={"white"}
                    sx={{
                      background: `linear-gradient(180deg, transparent 82%, ${alpha(
                        theme.palette.secondary.main,
                        0.3
                      )} 0%)`,
                      fontSize: "1.13em", // 폰트 크기 키움
                    }}
                  >
                    다-혼자산다 청약홈
                  </Typography>
                </Typography>
              </Box>
              <Box marginBottom={3}>
                <Typography
                  variant="h6"
                  component="p"
                  color="text.secondary"
                  sx={{ fontWeight: 400, fontSize: "2em" }}
                >
                  청약정보도 다혼자산다와 함께
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretched", sm: "flex-start" }}
              >
                <Box
                  marginTop={{ xs: 2, sm: 0 }}
                  marginLeft={{ sm: 2 }}
                  width={{ xs: "100%", md: "auto" }}
                ></Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              height={1}
              width={1}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box height={1} width={1} maxWidth={500}>
                <Box
                  component={"img"}
                  src={
                    "https://cdni.iconscout.com/illustration/premium/thumb/family-moving-to-new-house-4521312-3757064.png?f=webp"
                  }
                  width={1}
                  height={1}
                  sx={{
                    filter:
                      theme.palette.mode === "dark"
                        ? "brightness(0.8)"
                        : "none",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        component={"svg"}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100.1"
        sx={{
          width: "100%",
          marginBottom: theme.spacing(-1),
        }}
      >
        <path
          fill={theme.palette.background.paper}
          d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
        ></path>
      </Box>
    </Box>
  );
};

export default Hero;
