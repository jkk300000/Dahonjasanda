import { useState, useEffect } from 'react';
import { findDepositList, findCompanyList, findDepositDetail, findTopInterestRateSavings, findTopInterestRateTermDeposits } from '../../DepositsApiService';
// Assuming the API functions are imported here or are available globally
// import { findDepositList, findCompanyList, findDepositDetail, findTopInterestRateSavings, findTopInterestRateTermDeposits } from './apiClient';

const useProducts = (category, checked, searchTerm) => {
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // 페이지당 항목 수, 필요에 따라 조정 가능
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 페이지 변경 핸들러
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  
  // 상위 금리 상품을 가져오는 함수
  const fetchDefaultProducts = async () => {
    setIsLoading(true);
    try {
      const savingsResponse = await findTopInterestRateSavings();
      const termDepositsResponse = await findTopInterestRateTermDeposits();

      const savingsProducts = savingsResponse.data.products || [];
      const termDepositsProducts = termDepositsResponse.data.products || [];

      const combinedProducts = [...savingsProducts.slice(0, 5), ...termDepositsProducts.slice(0, 5)].slice(0, 10);

      setProducts(combinedProducts);
      setTotalPages(1); // 예시: 페이징이 필요없으므로 1로 설정
    } catch (error) {
      console.error('Error fetching default products:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Fetching data for category: ${category}, page: ${currentPage}`);
      if(category === 'default') {
        await fetchDefaultProducts();
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        let response;
        // URL 쿼리 파라미터 생성
        const queryParams = new URLSearchParams({
          page: currentPage,
          keyword: searchTerm,
          ...Object.keys(checked).reduce((acc, key) => {
            // 각 카테고리의 선택된 항목들을 쿼리 파라미터에 추가
            acc[key] = checked[key].join(',');
            return acc;
          }, {})
        }).toString();

        console.log(`queryParams for ${category}:`, queryParams);

        switch(category) {
          case '예금':
          case '적금':
          case '연금':
            response = await findDepositList(`${category}?page=${currentPage}&keyword=${searchTerm}`);
            console.log(`Response for ${category}:`, response);
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
            break;
          default:
            console.log('Unknown category:', category);
            setError(new Error('Unknown category'));
            setIsLoading(false);
            return;
        }
      } catch (error) {
        console.error(`Error fetching data for ${category}:`, error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, currentPage, searchTerm]);

  return { products, totalPages, isLoading, error };
};

export default useProducts;