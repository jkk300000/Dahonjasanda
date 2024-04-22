package com.multi.dahon.stock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.dahon.stock.model.vo.Stock;
import com.multi.dahon.stock.model.vo.StockParam;
import com.multi.dahon.stock.repository.StockRepository;

@Service
public class StockService {
	
	@Autowired
	private StockRepository repo;
	
	public long count() {
		return repo.count();
	}
	
	public List<Stock> getStockList(StockParam param) {
	    return repo.stockSearch("%"+param.getSearchValue()+"%");
	}
	  
	public int getStockListCount(StockParam param) {
	    return repo.stockSearchCount("%"+param.getSearchValue()+"%");
	}

	public List<Stock> findAll() {
		return repo.findAll();
	}
	
	public List<Stock> findInfo() {
		return repo.findStockInfo();
	}
	
}
