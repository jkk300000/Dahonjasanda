package com.multi.dahon.plant.model.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.multi.dahon.api.apiParsingPlant;
import com.multi.dahon.plant.model.repository.PlantQuery;
import com.multi.dahon.plant.model.repository.PlantRespository;
import com.multi.dahon.plant.model.vo.Plant;
import com.multi.dahon.plant.model.vo.PlantParam;

import jakarta.transaction.Transactional;

@Service
public class PlantService {
//	public static void main(String[] args) {
//		saveParse();
//	}
	@Autowired
	private PlantRespository repo;
	
//	@Transactional
//	public int save() {
//		int result = 0;
//		
//		// 디테일 파싱 데이터 삽입
//		List<Plant> list = apiParsingPlant.parse();
//		for(int i = 0; i< list.size(); i++) {						
//			Plant plant = apiParsingPlant.saveParsedData(null, null, list.get(i));
//																	
//			
//			list.set(i, plant); 										
//		}
//		
//		System.out.println(list.toString().replace("],","],\n"));
//		return result;
//		
//	}
	@Transactional
	public int saveParse() {
		int result = 0;
		
		// 디테일 파싱 데이터 삽입
		List<Plant> list = apiParsingPlant.parse();
		for(int i = 0; i< list.size(); i++) {						
			Plant plant = apiParsingPlant.DetailParse(list.get(i));
//			System.out.println("@@@@@@@@" + list.get(0));
			
			list.set(i, plant); 		// 객체 재구성								
		}
		
		System.out.println(list.toString().replace("],","],\n"));
		repo.saveAll(list);
		return result;
		
	}
	
	public int count() {
		return (int) repo.count();
		
	}
	
	
	public List<Plant> findAllSortByPtnoDesc() {
//		return repo.findFirstByOrderByBnoDesc();
		// Sort 객체 사용방법
		Sort sort = Sort.by("Ptno").descending();
		return repo.findAll(sort);
	}
	
	public Page<Plant> searchAll(PlantParam param, Pageable pageable){
		return repo.findAll(PlantQuery.QuerySearchPlant(param), pageable);
	}
	
    public Plant findDetailPtno(Integer ptno) {
        return repo.selectByPtno(ptno);
    }

//	public Plant findDetailPtno(long ptno) {
//		return repo.findByPtno(ptno);
//	}

	
	
//	 public List<Plant> getPlantSearchList(PlantParam param) {
//		 Sort sort = Sort.by("ptno").descending();
//		 return (List<Plant>) repo.plantSearchList(param.getSearchValue(), param.getGrowthType(), param.getFlowerColorType(), param.getLeafColor(), param.getLeafPattern(), param.getFloweringSeason(), param.getManagementRequirement());
//	 
//	 public int getPlantSearchCount(PlantParam param) {
//		 Sort sort = Sort.by("ptno").descending();
//		 return repo.plantSearchCount(param.getSearchValue(), param.getGrowthType(), param.getLeafColor(), param.getLeafPattern(), param.getFloweringSeason(), param.getFlowerColorType(), param.getManagementRequirement()); 
//	 }
	

}
