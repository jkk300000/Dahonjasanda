package com.multi.dahon.housing.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.dahon.housing.model.repository.HousingInfoByTypeRespository;
import com.multi.dahon.housing.model.vo.HousingInfoByTypeJPA;


@Service
public class HousingInfoByTypeServiceJPA {

	@Autowired
	private HousingInfoByTypeRespository repo;
	
	public int save(List<HousingInfoByTypeJPA> infoJPA) {
		repo.saveAll(infoJPA);
		return 0;
		
	}
	
	public int count() {
		return (int) repo.count();
		
	}
	
	public List<HousingInfoByTypeJPA> getHousingTypeList(String houseManageNo) {
		System.out.println(repo.housingTypeSearch("관리번호 : " + houseManageNo).toString());
		  
		  return repo.housingTypeSearch(houseManageNo);
	}

	 public int getHousingTypeListCount(String houseManageNo) {
		  System.out.println(repo.housingTypeSearch(houseManageNo).toString());
		  
		  return repo.housingTypeSearchCount(houseManageNo);
		  
	  }



}
