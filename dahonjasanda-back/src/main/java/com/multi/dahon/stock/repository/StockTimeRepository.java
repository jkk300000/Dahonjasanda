package com.multi.dahon.stock.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.multi.dahon.stock.model.vo.StockTime;

@Repository
public interface StockTimeRepository extends JpaRepository<StockTime, Integer>{
	@Query(value = "SELECT stno, create_date, price, scode, sdate, sname, sno "
            + "FROM STOCK_TIME "
            , nativeQuery = true)
		List<StockTime> findStockInfo();
	
	@Query(value = "SELECT count(*) "
			+ "FROM STOCK_TIME st WHERE "
			+ "st.sname LIKE :searchValue "
			, nativeQuery = true)
	int stockSearchCount(
			@Param("searchValue") String searchValue);
	
	@Query(value = "SELECT * "
			+ "FROM STOCK_TIME st WHERE "
			+ "st.sname LIKE :searchValue "
			, nativeQuery = true)
	List<StockTime> stockSearch(
			@Param("searchValue") String searchValue);

}
