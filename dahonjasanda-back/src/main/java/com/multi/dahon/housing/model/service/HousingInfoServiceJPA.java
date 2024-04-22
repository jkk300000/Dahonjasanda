package com.multi.dahon.housing.model.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.multi.dahon.housing.model.repository.HousingInfoRespository;
import com.multi.dahon.housing.model.vo.HousingInfoJPA;
import com.multi.dahon.housing.model.vo.HousingMapPram;

import jakarta.transaction.Transactional;

@Service
public class HousingInfoServiceJPA {
	
	

	@Autowired
	private HousingInfoRespository repo;
	
	
   
	
	@Transactional
	public int save(List<HousingInfoJPA> infoJPA) {
		repo.saveAll(infoJPA);
		return 0;
		
	}
	
	public int count() {
		return (int) repo.count();
		
	}
	
	

	

	  public List<HousingInfoJPA> getHousingList(HousingMapPram param) {
//		  System.out.println("주소 : " + param.getSearchValue());
//		  System.out.println("sql : " + repo.housingSearch(param.getSearchValue(), 
//				  param.getTransactionType(), param.getLocation(), param.getPropertyType()).toString());
	        return repo.housingSearch(param.getTransactionType(), param.getPropertyType(), param.getLocation(), param.getSearchValue());
	    }
    
	  
	  public int getHousingListCount(HousingMapPram param) {
//		  System.out.println("주소 : " + param.getSearchValue());
//		  System.out.println("sql : " + repo.housingSearch(param.getSearchValue(), 
//				  param.getTransactionType(), param.getLocation(), param.getPropertyType()).toString());
	        return repo.housingSearchCount( param.getTransactionType(), param.getPropertyType(), param.getLocation(), param.getSearchValue());
	    }
	  
	
	public List<HousingInfoJPA> getHousingListByManageNo(String houseManageNo) {
		return repo.housingSearchByManageNo(houseManageNo);
		
	}
	


	public int getHousingListByManageNoCount(String houseManageNo) {
		return repo.housingSearchByManageNoCount(houseManageNo);
	}

}
