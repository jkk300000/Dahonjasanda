import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Divider, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ProductCard = ({ product, category }) => {
  const theme = useTheme();

  // Function to return the image URL or a fallback if not available
  const getImageUrl = (finCoNo) => `/images/deposit/banks/${finCoNo}.png`;

  return (
    <Card
        sx={{
            width: 1,
            height: 1,
            boxShadow: 4,
            display: "flex",
            flexDirection: "column", // Change to row
            transition: "all .2s ease-in-out",
            "&:hover": {
            transform: `translateY(-${theme.spacing(1 / 2)})`,
            },
            height: "100%",
        }}
    >
      <CardContent
        sx={{
            width: "100%", // 전체 카드 대비 내용 영역의 너비 설정
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(2), // CardContent에 padding 추가
          }}
      >
        <Box
          sx={{
            width: "100%", // 이미지와 같은 너비 설정
            display: "flex", // 인라인 블록으로 설정하여 텍스트와 올바르게 정렬
            boxSizing: "border-box", // 패딩을 포함한 총 너비 유지
            justifyContent: "flex-start", // 로고를 왼쪽으로 이동
            paddingTop: theme.spacing(2), // Divider 위에 padding 추가
            paddingBottom: theme.spacing(2), // Divider 아래에 padding 추가
          }}
        >
          <CardMedia
            component="img"
            src={getImageUrl(product.finCoNo)}
            alt={`${product.korCoNm} 로고`}
            onError={(e) => (e.target.src = "../images/deposit/banks/Citi.png")}
            sx={{
              width: "160px", // 감싸는 컨테이너에 맞게 너비 조정
              height: "33px", // 필요한 경우 높이 조정
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ marginBottom: "1px" }}
          >
            {product.finPrdtNm}
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: theme.spacing(2) }} />


        <Grid container spacing={2} sx={{ marginTop: theme.spacing(2) }}>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs style={{ flex: 0.15 }}>
                    <Typography color="text.secondary">
                        {category === 'annuity-savings' ? '월 납입금액' : '기본 금리'}
                    </Typography>
                    <Typography color="text.secondary">
                        {category === 'annuity-savings' ? '납입 기간' : '최고 우대 금리'}
                    </Typography>
                    <Typography color="text.secondary">
                        {category === 'annuity-savings' ? '연금 수령 금액' : '저축 기간'}
                    </Typography>
                    <Typography color="text.secondary">
                        {category === 'annuity-savings' ? '수령 시작 나이' : '만기후 이자율'}
                    </Typography>
                </Grid>
                <Grid item xs style={{ flex: 0.85 }}>
                <Grid
                      item
                      xs={12} // 전체 너비 사용
                      sx={{
                        borderLeft: 2, // 테두리 두께 설정
                        borderColor: "divider", // 테두리 색상 설정
                        paddingLeft: "24px", // 내용과 테두리 사이에 간격 추가
                      }}
                    >
                      <Typography color="text.primary">
                        {category === 'annuity-savings' ? product.monPaymAtmNm : `${product.intrRate}%`}
                      </Typography>
                      <Typography color="text.primary">
                        {category === 'annuity-savings' ? product.paymPrdNm : `${product.intrRate2}%`}
                      </Typography>
                      <Typography color="text.primary">
                        {category === 'annuity-savings' ? product.pnsnRecpTrmNm : `${product.saveTrm}개월`}
                      </Typography>
                      <Typography color="text.primary">
                        {category === 'annuity-savings' ? product.pnsnStrtAgeNm : product.mtrtInt}
                      </Typography>
                    </Grid>
                </Grid>
          </Grid>
          {/* Additional product details can be added here */}
          {/* Example: Term, Special Conditions, etc., based on the 'category' prop */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductCard;