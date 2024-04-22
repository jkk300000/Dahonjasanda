import { useState, useEffect } from 'react';
import {
  findDepositList,
  findTopInterestRateSavings,
  findTopInterestRateTermDeposits,
} from "../../DepositsApiService";
import { sortProducts } from './SortUtils'; // 가정: 상품을 정렬하는 유틸리티 함수

const useProducts = (category, currentPage, pageSize, sortField, sortOrder) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!category) {
      const fetchDefaultProducts = async () => {
        try {
          const savingsResponse = await findTopInterestRateSavings();
          const termDepositsResponse = await findTopInterestRateTermDeposits();
          const combinedProducts = sortProducts([
            ...savingsResponse.data.content.slice(0, 5),
            ...termDepositsResponse.data.content.slice(0, 5),
          ]).slice(0, 10); // 최대 10개 제한
          
          setProducts(combinedProducts);
          // 'totalPages' 설정은 여기서는 적용되지 않음
        } catch (error) {
          console.error("Error fetching default high interest rate products:", error);
          setProducts([]);
        }
      };

      fetchDefaultProducts();
    } else {
      const fetchDeposits = async () => {
        try {
          const response = await findDepositList(`/${category}?page=${currentPage}&size=${pageSize}&sort=${sortField},${sortOrder}`);
          const { content, totalPages } = response.data;
          
          const sortedContent = sortProducts(content);
          setProducts(sortedContent);
          setTotalPages(totalPages);
        } catch (error) {
          console.error("Error fetching deposits data:", error);
          setProducts([]);
          setTotalPages(0);
        }
      };

      fetchDeposits();
    }
  }, [category, currentPage, pageSize, sortField, sortOrder]);

  return { products, totalPages, handlePageChange };
};

export default useProducts;