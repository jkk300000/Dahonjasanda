import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

const mock = [
  {
    image:
      "https://cdn.jjan.kr/data2/content/image/2023/03/19/.cache/512/20230319580278.jpg",
    description: "실시간으로 업데이트 되는 청약정보",
    title: "청약 게시판 +",
    link: "http://localhost:3000/housingBoard",
  },
  {
    image:
      "https://wannathis.co.kr/web/product/medium/202309/bbfa645fbea96422bd10cb8ea5a7d061.jpg",
    description: "이번달의 청약 정보를 확인해보기",
    title: "청약캘린더 +",
    link: "http://localhost:3000/calendar",
  },
  {
    image:
      "https://www.urbanbrush.net/web/wp-content/uploads/edd/2021/02/urbanbrush-20210220212407818839.jpg",
    description: "지도를 통해 한눈에 보는 지역 별 청약",
    title: "청약지도 +",
    link: "http://localhost:3000/housing/housingMap",
  },
];

const LastStories = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
        marginBottom={4}
      >
        <Box>
          <Typography fontWeight={600} variant={"h4"} gutterBottom>
            청약홈
          </Typography>
          <Typography variant={"h5"} color={"text.secondary"}>
            오늘의 청약 정보를 카테고리 별로 확인해보세요!
          </Typography>
        </Box>
        <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
          <Box
            component={Button}
            variant="outlined"
            color="primary"
            size="large"
            marginLeft={2}
          >
            모두보기
          </Box>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {mock.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box
              component={"a"}
              href={item.link} // 수정된 부분
              display={"block"}
              width={1}
              height={1}
              sx={{
                textDecoration: "none",
                transition: "all .2s ease-in-out",
                "&:hover": {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <Box
                component={Card}
                width={1}
                height={1}
                boxShadow={4}
                display={"flex"}
                flexDirection={"column"}
                sx={{ backgroundImage: "none" }}
              >
                <CardMedia
                  image={item.image}
                  title={item.title}
                  sx={{
                    height: { xs: 300, md: 360 },
                    position: "relative",
                  }}
                >
                  <Box
                    component={"svg"}
                    viewBox="0 0 2880 480"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      color: theme.palette.background.paper,
                      transform: "scale(2)",
                      height: "auto",
                      width: 1,
                      transformOrigin: "top center",
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z"
                      fill="currentColor"
                    />
                  </Box>
                </CardMedia>
                <Box component={CardContent} position={"relative"}>
                  <Typography variant={"h6"} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography
                    variant={"body1"}
                    color="text.secondary"
                    style={{ fontSize: "1.2em", marginBottom: "0.8em" }}
                  >
                    {item.description}
                  </Typography>
                </Box>

                <Box flexGrow={1} />
                <Box padding={2} display={"flex"} flexDirection={"column"}>
                  <Box marginBottom={2}>
                    <Divider />
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Box display={"flex"} alignItems={"center"}></Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LastStories;
