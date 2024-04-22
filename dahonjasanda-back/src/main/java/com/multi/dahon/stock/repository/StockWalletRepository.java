package com.multi.dahon.stock.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.multi.dahon.stock.model.vo.StockWallet;

@Repository
public interface StockWalletRepository extends JpaRepository<StockWallet, Integer>{

	@Query(value = "SELECT * "
			+ "FROM STOCKWALLET sw WHERE "
			+ "sw.sname LIKE :searchValue "
			, nativeQuery = true)
	List<StockWallet> walletSearch(
			@Param("searchValue") String searchValue);
	
	@Query(value = "SELECT count(*) "
			+ "FROM STOCKWALLET sw WHERE "
			+ "sw.sname LIKE :searchValue "
			, nativeQuery = true)
	int walletSearchCount(
			@Param("searchValue") String searchValue);
	
	void deleteByWno(int wno);
	
}
