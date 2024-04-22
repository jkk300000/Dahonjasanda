import { useState, useEffect } from 'react';
import {
  findDepositList,
  findTopInterestRateSavings,
  findTopInterestRateTermDeposits,
} from "../../DepositsApiService";
import { useFilter } from "../FilterSearchManager/useFilter";

const useProducts = (category, currentPage, searchTerm) => {
    
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (category === "search" && searchTerm) {
          response = await findDepositList(`?searchTerm=${searchTerm}&sortField=intrRate&sortOrder=desc&page=${currentPage}`);
        } else if (category === "savings") {
          response = await findTopInterestRateSavings();
        } else {
          response = await findTopInterestRateTermDeposits();
        }
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages || 1); // Some responses might not have totalPages
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotalPages(0);
      }
    };
    fetchProducts();
  }, [category, currentPage, searchTerm]);

  return { products, totalPages };
};

export default useProducts;