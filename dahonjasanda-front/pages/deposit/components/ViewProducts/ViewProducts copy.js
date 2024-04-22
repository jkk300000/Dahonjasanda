import React, { useState, useEffect, useContext } from 'react';
import { Box, Card, CardContent, CardMedia, Container, Divider, Grid, Typography, Pagination } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFilter } from "../FilterSearchManager/useFilter"; // 경로는 실제 구조에 맞게 조정해주세요
import {
  findDepositList,
  findTopInterestRateSavings,
  findTopInterestRateTermDeposits
} from "../../DepositsApiService";

const ViewProducts = (category) => {
  const theme = useTheme();

  const {
    searchTerm,
    sortField = 'intrRate', // 기본값 설정
    sortOrder = 'desc', // 기본값 설정
  } = useFilter(); // useFilter에서 상태 가져오기

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 검색 조건이 있는 경우 검색 API를 호출합니다.
        if (searchTerm) {
          const response = await findDepositList(`?searchTerm=${searchTerm}&sortField=${sortField}&sortOrder=${sortOrder}`);
          setProducts(response.data.content);
          setTotalPages(response.data.totalPages);
        } else {
          // 검색 조건이 없는 경우 기본 상품 목록을 가져옵니다.
          const savingsResponse = await findTopInterestRateSavings();
          console.log('Savings Response:', savingsResponse.data);
          const termDepositsResponse = await findTopInterestRateTermDeposits();
          console.log('Term Deposits Response:', termDepositsResponse.data);
          setProducts([...savingsResponse.data.content, ...termDepositsResponse.data.content].slice(0, 10));
          // 이 경우 총 페이지 수 설정이 필요 없을 수 있습니다.
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [searchTerm, sortField, sortOrder, currentPage]);

    // 페이지 변경 핸들러
    const handlePageChange = (event, page) => {
      setCurrentPage(page);
    };

    const getImageUrl = (finCoNo) => {
      return `/images/deposit/banks/${finCoNo}.png`;
    };

  return (
    <Container>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={12} key={index}>
            {/* <Link href={`/deposit/${index}`} passHref> */}
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
                {/* ProductName을 상단에 배치 */}
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={{ marginBottom: "1px" }}
                >
                  {product.finPrdtNm}
                </Typography>
              </Box>

                {/* 상품 이름과 상세 정보를 구분하는 선 */}
                <Divider sx={{ marginBottom: theme.spacing(2) }} /> {/* 필요에 따라 Divider에도 스타일을 적용 */}


                <Grid container spacing={2} alignItems="flex-start">
                  {/* 라벨 컨테이너 */}
                  <Grid item xs style={{ flex: 0.15 }}> {/* 라벨들에 대한 flex 비율 조정 */}
                    {/* 조건에 따른 라벨 렌더링이 아닌 공통 라벨 세트를 사용합니다. 
                        필요에 따라 조건부 렌더링을 추가할 수 있습니다. */}
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
                  
                  {/* 데이터 값 컨테이너 */}
                  <Grid item xs style={{ flex: 0.85 }}> {/* 데이터 값에 대한 flex 비율 조정 */}
                    {/* 공통 데이터 값 구조. 조건에 따라 데이터 값을 변경합니다. */}
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
              </CardContent>
            </Card>
            {/* </Link> */}
          </Grid>
        ))}
      </Grid>
      {/* 페이지네이션 */}
      <Box display="flex" justifyContent="center" marginTop={4}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
        />
      </Box>
    </Container>
  );
};

export default ViewProducts;