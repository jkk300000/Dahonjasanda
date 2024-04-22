package com.multi.dahon.stock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.dahon.stock.model.vo.StockIndex;
import com.multi.dahon.stock.model.vo.StockParam;
import com.multi.dahon.stock.model.vo.StockTime;
import com.multi.dahon.stock.repository.StockIndexRepository;

@Service
public class StockIndexService {
	
	@Autowired
	private StockIndexRepository sirepo;
	
	public List<StockIndex> findInfo() {
		return sirepo.findStockInfo();
	}
	
	public List<StockIndex> getStockList(StockParam param) {
	    return sirepo.stockSearch("%"+param.getSearchValue()+"%");
	}
	  
	public int getStockListCount(StockParam param) {
	    return sirepo.stockSearchCount("%"+param.getSearchValue()+"%");
	}

}
