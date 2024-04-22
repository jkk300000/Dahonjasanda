package com.multi.dahon.stock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.dahon.stock.model.vo.Stock;
import com.multi.dahon.stock.model.vo.StockParam;
import com.multi.dahon.stock.model.vo.StockTime;
import com.multi.dahon.stock.repository.StockTimeRepository;

@Service
public class StockTimeService {
	@Autowired
	private StockTimeRepository strepo;
	
	public List<StockTime> findInfo() {
		return strepo.findStockInfo();
	}
	
	public List<StockTime> getStockList(StockParam param) {
	    return strepo.stockSearch("%"+param.getSearchValue()+"%");
	}
	  
	public int getStockListCount(StockParam param) {
	    return strepo.stockSearchCount("%"+param.getSearchValue()+"%");
	}
	

}
