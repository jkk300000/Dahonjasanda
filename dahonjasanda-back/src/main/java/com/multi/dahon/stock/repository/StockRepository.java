package com.multi.dahon.stock.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.multi.dahon.stock.model.vo.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Integer> {
	
	List<Stock> findAll(Sort sort);
	
	
	Page<Stock> findAll(Pageable pageable);
	Page<Stock> findBySnameContaining(String sname, Pageable pageable);
	
	@Query(value = "SELECT * "
			+ "FROM STOCK s WHERE "
			+ "s.sname LIKE :searchValue "
			, nativeQuery = true)
	List<Stock> stockSearch(
			@Param("searchValue") String searchValue);
	
	@Query(value = "SELECT count(*) "
			+ "FROM STOCK s WHERE "
			+ "s.sname LIKE :searchValue "
			, nativeQuery = true)
	int stockSearchCount(
			@Param("searchValue") String searchValue);
	
	@Query(value = "SELECT sno, sdate, sgap, scode, sname, clpr, mkp, hipr, lopr, code, "
			+ "price, yprice, open, high, low, volume, onevolume, total, foreignapb, investinfo, "
			+ "targetprice, topprice, bottomprice, per, eps, content, sellname1, sellname2, sellname3, sellname4, "
			+ "sellname5, sell1, sell2, sell3, sell4, sell5, buyname1, buyname2, buyname3, buyname4, "
			+ "buyname5, buy1, buy2, buy3, buy4, buy5, foreignsell, foreigngap, foreignbuy, date1, "
			+ "date2, date3, date4, date5, date6, valueprice1, valuegap1, valueforeigner1, valueorgan1, valueprice2, "
			+ "valuegap2, valueforeigner2, valueorgan2, valueprice3, valuegap3, valueforeigner3, valueorgan3, valueprice4, valuegap4, valueforeigner4, "
			+ "valueorgan4, valueprice5, valuegap5, valueforeigner5, valueorgan5, valueprice6, valuegap6, valueforeigner6, valueorgan6 "
			+ "FROM STOCK"
			, nativeQuery = true)
	List<Stock> findStockInfo();
	
	
	
}

	



