package com.multi.dahon.animal.model.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.multi.dahon.animal.model.repository.AnimalQuery;
import com.multi.dahon.animal.model.repository.AnimalRespository;
import com.multi.dahon.animal.model.vo.Animal;
import com.multi.dahon.animal.model.vo.AnimalParam;
import com.multi.dahon.api.apiParsingAnimal;
import com.multi.dahon.api.apiParsingAnimal2;

import jakarta.transaction.Transactional;

@Service
public class AnimalService {
//	public static void main(String[] args) {
//		saveParse();
//	}
	@Autowired
	private AnimalRespository repo;
	
	
	@Transactional
	public int saveParse2() {
		int result = 0;
		
		// 디테일 파싱 데이터 삽입
		List<Animal> list = apiParsingAnimal2.DetailParse4();
		for(int i = 0; i< list.size(); i++) {						
			Animal animal = apiParsingAnimal2.parse(list.get(i));
//			System.out.println("@@@@@@@@" + list.get(0));
			
			list.set(i, animal); 		// 객체 재구성								
		}
		for(int i = 0; i< list.size(); i++) {						
			Animal animal2 = apiParsingAnimal.DetailParse1(list.get(i));
//			System.out.println("@@@@@@@@" + list.get(0));
			
			list.set(i, animal2); 		// 객체 재구성								
		}
		
		for(int i = 0; i< list.size(); i++) {						
			Animal animal3 = apiParsingAnimal.DetailParse2(list.get(i));
//			System.out.println("@@@@@@@@" + list.get(0));
			
			list.set(i, animal3); 		// 객체 재구성								
		}
		
		System.out.println(list.toString().replace("],","],\n"));
		repo.saveAll(list);
		return result;
		
	}
	
	public int count() {
		return (int) repo.count();
		
	}
	
	// 현재 사용하지않음
//	public List<Animal> findAllSortByAnnoRand() {
////		return repo.findFirstByOrderByBnoDesc();
//		// Sort 객체 사용방법
//		Sort sort = Sort.by("anno").descending();
//		return repo.findFirstByOrderByAnnoDesc();
//	}
	
	
	// 전체 검색 및 서치 검
	public Page<Animal> searchAll(AnimalParam param, Pageable pageable){
		return repo.findAll(AnimalQuery.QuerySearchAnimal(param), pageable);
	}
//	
	//상세 검색 (anno) 
    public Animal findDetailAnno(Integer anno) {
        return repo.selectByAnno(anno);
    }

	
	
//	 public List<Plant> getPlantSearchList(PlantParam param) {
//		 Sort sort = Sort.by("ptno").descending();
//		 return (List<Plant>) repo.plantSearchList(param.getSearchValue(), param.getGrowthType(), param.getFlowerColorType(), param.getLeafColor(), param.getLeafPattern(), param.getFloweringSeason(), param.getManagementRequirement());
//	 
//	 public int getPlantSearchCount(PlantParam param) {
//		 Sort sort = Sort.by("ptno").descending();
//		 return repo.plantSearchCount(param.getSearchValue(), param.getGrowthType(), param.getLeafColor(), param.getLeafPattern(), param.getFloweringSeason(), param.getFlowerColorType(), param.getManagementRequirement()); 
//	 }
	

}
