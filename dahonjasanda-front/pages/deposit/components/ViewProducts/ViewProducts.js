import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Box, Pagination, Typography } from "@mui/material";
import ProductTable from './ProductTable'; // 각 상품 카드를 렌더링하는 컴포넌트
import { findDepositList, findTopInterestRateSavings, findTopInterestRateTermDeposits } from '../../DepositsApiService';

const ViewProducts = ({ category, searchTerm, checked, setChecked }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  // 카테고리에 따른 텍스트 매핑
  const categoryTitles = {
    default: '최고금리 상품 Top10 + Top10 (적금 + 예금)',
    'term-deposits': '예금',
    savings: '적금',
    'annuity-savings': '연금'
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let response;
        if (category === 'default') {
          const savingsResponse = await findTopInterestRateSavings();
          const termDepositsResponse = await findTopInterestRateTermDeposits();
          console.log("Savings response:", savingsResponse);
          console.log("Term deposits response:", termDepositsResponse);

          const savingsProducts = savingsResponse.data.content || [];
          const termDepositsProducts = termDepositsResponse.data.content || [];
          const combinedProducts = [...savingsProducts.slice(0, 10), ...termDepositsProducts.slice(0, 10)].slice(0, 20);

          console.log("Combined products:", combinedProducts);
          setProducts(combinedProducts);
          setTotalPages(1);
        } else {

          const searchParams = new URLSearchParams({
            keyword: searchTerm,
            page: currentPage - 1 // 0-based page index
          });
          
          Object.entries(checked).forEach(([key, values]) => {
            if (values.length) {
              // 배열의 각 값을 별도의 쿼리 파라미터로 추가
              values.forEach(value => searchParams.append(key, value));
            }
          });
          

          console.log(`Fetching products for category: ${category} with search params: '${searchParams.toString()}'...`);
          response = await findDepositList(`${category}?${searchParams.toString()}`);
          console.log(`Response for category '${category}':`, response);

          setProducts(response.data.content || []);
          setTotalPages(response.data.totalPages || 0);
        }
      } catch (error) {
        console.error(`Error fetching data for ${category}:`, error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, currentPage, searchTerm, checked]);

  const handlePageChange = (event, newValue) => {
    setCurrentPage(newValue);
    console.log(`Changing page to: ${newValue}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
          {categoryTitles[category]}
        </Typography>
      {/* Optionally, display loading/error states here */}
      <ProductTable products={products} category={category} />
      
      <Box display="flex" justifyContent="center" marginTop={4}>
        {category !== 'default' && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
            size="large"
          />
        )}
      </Box>
      <Box display="flex" justifyContent="center" marginTop={4}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            정보 이용시 유의사항 안내
          </Typography>
          <Typography variant="body2" color="text.secondary">
            본 비교공시 정보는 은행의 일부 중요상품의 금리와 수수료에 대해  <b>개략적으로 비교할 수 있도록 참고로 제공</b> 되고 있습니다.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            공시된 금리는 <b>세금공제전 금리</b>이며, 자세한 내용은 “상세정보”를 확인하여 주시기 바랍니다.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            <b>“전월취급 평균금리”</b> 는 저축 예정기간의 선택과 관계없이 12개월 기준으로 은행이 직전월 신규판매 상품의 평균값이며, 상품 만기시 적용되는 우대금리는 포함되지 않습니다. 또한, 공시의 시차 등으로 인해 전월취급 평균금리가 현재 공시되는 금리와 차이가 날 수 있으며, 우대금리 조건 제공시점 등에 따라 만기 시 적용받는 실제금리와는 다를 수 있음을 유의하여 주시기 바랍니다.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            은행과 연합회는 공시정보의 최신화를 위해 항상 노력하고 있지만, <b>정보의 변경과 공시의 시차로 다소 지연 공시될 수 있으므로 자세한 사항은 거래은행에 문의</b>하시기 바랍니다.
          </Typography>
        </CardContent>
      </Card>
    </Box>
    </Container>
  );
};

export default ViewProducts;