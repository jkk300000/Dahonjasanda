import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

const images = [
  {
    url: "https://media.istockphoto.com/id/1398319735/vector/charts-abstract-background.jpg?s=612x612&w=0&k=20&c=mJuLq6DBaiYLsEI60oOXegdfjWX2AcOA0wjZ9Cqr_S0=",
    title: "청약 경쟁률 확인 ",
    width: "30%",
    link: "https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do", // 첫 번째 이미지의 링크
  },
  {
    url: "https://www.hapt.co.kr/news/photo/202305/158843_29118_1852.jpg",
    title: "청약 당첨자 확인",
    width: "40%",
    link: "https://www.applyhome.co.kr/wa/waa/selectAptPrzwinDescList.do", // 두 번째 이미지의 링크
  },
  {
    url: "https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/4Zii/image/7GxoXiPjDM5dIM67aa_IP0k5KAg.jpg",
    title: "청약-소통방",
    width: "30%",
    link: "https://www.applyhome.co.kr/cu/cua/selectNoticeListView.do#", // 세 번째 이미지의 링크
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const PopularArticles = ({ vertical = false, imageStyle = {}, marginTop = true }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: vertical ? 'column' : 'row',
        minWidth: 300,
        width: "100%",
        marginTop: marginTop ? 4 : 0,
      }}
    >
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: vertical ? '100%' : image.width, // Full width if vertical
            ...imageStyle, // Apply additional image styling
          }}
          href={image.link} // 이미지를 클릭하여 이동할 링크
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: "relative",
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                fontSize: "1.2em", // 폰트 크기를 키웁니다
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
};

export default PopularArticles;
