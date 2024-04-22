package com.multi.dahon.stock.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.multi.dahon.stock.model.vo.StockIndex;

@Repository
public interface StockIndexRepository extends JpaRepository<StockIndex, Integer>{
	
	@Query(value = "SELECT sino, clpr, gap, hipr, indexname, lopr, mkp, sdate "
			+ "FROM STOCKINDEX"
			, nativeQuery = true)
		List<StockIndex> findStockInfo();
	
	@Query(value = "SELECT count(*) "
			+ "FROM STOCKINDEX si WHERE "
			+ "si.indexname LIKE :searchValue "
			, nativeQuery = true)
	int stockSearchCount(
			@Param("searchValue") String searchValue);
	
	@Query(value = "SELECT * "
			+ "FROM STOCKINDEX si WHERE "
			+ "si.indexname LIKE :searchValue "
			, nativeQuery = true)
	List<StockIndex> stockSearch(
			@Param("searchValue") String searchValue);

}
