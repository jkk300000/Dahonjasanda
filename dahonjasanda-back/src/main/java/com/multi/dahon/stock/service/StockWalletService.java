package com.multi.dahon.stock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.multi.dahon.stock.model.vo.StockParam;
import com.multi.dahon.stock.model.vo.StockWallet;
import com.multi.dahon.stock.repository.StockWalletRepository;



@Service
public class StockWalletService {
	
	@Autowired
	private StockWalletRepository repo;
	
	@Transactional(rollbackFor = Exception.class)
	public StockWallet saveStockWallet(StockWallet stockwallet) {
		return repo.save(stockwallet);
	}
	
	@Transactional(rollbackFor = Exception.class)
	public StockWallet findByNo(int wno) {
		StockWallet stockwallet = repo.findById(wno).get();
		repo.save(stockwallet);
		return stockwallet;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void delete(int wno) throws Exception {
		repo.deleteById(wno);
	}
	
	public List<StockWallet> getWalletList(StockParam param) {
	    return repo.walletSearch("%"+param.getSearchValue()+"%");
	}
	  
	public int getWalletListCount(StockParam param) {
	    return repo.walletSearchCount("%"+param.getSearchValue()+"%");
	}
	
}
