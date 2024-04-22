package com.multi.dahon.animal.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.multi.dahon.animal.model.service.AnimalService;
import com.multi.dahon.animal.model.vo.Animal;
import com.multi.dahon.animal.model.vo.AnimalParam;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, maxAge = 5000)  // 우리 도메인
public class AnimalRestController {


		@Autowired
		private AnimalService animalService;
		
		//		@PostConstruct   서버올라갈떄마다 실행됌 ㅡㅡ
		// 파싱 및 서버 저
		@GetMapping("/animalList")
		public void init() {
			animalService.saveParse2();
		}
		
		
////		@GetMapping(path = "/plant")
//		public ResponseEntity<Map<String, Object>> plant(){
//			List<Plant> list = plantService.findAllSortByPtnoDesc();
//			int listCount = plantService.count();
//			
//			  // 반환할 맵 객체를 생성합니다.
//	        Map<String, Object> response = new HashMap<>();
//	        response.put("plantList", list); // Plant 데이터 목록을 맵에 추가합니다.
//	        response.put("plantCount", listCount); // Plant 데이터 목록의 개수를 맵에 추가합니다.
//	        
//	        // 맵 객체와 HttpStatus.OK를 반환합니다.
//	        return ResponseEntity.status(HttpStatus.OK).body(response);
//		}
		
		@GetMapping(path = "/animal")  // 서치 및 전체 검색
		public ResponseEntity<Map<String, Object>> AnimalSearchList(		
				@RequestParam(required = false) String searchValue,
				Pageable pageable){
			
			AnimalParam param = new AnimalParam();
			param.setSearchValue(searchValue);
			 // findAll 메서드로 데이터를 가져오고, 없으면 findAllSortByPtnoDesc 메서드로 가져옴
		    Page<Animal> searchAll = animalService.searchAll(param, pageable);
//			int searchCount = plantService.getPlantSearchCount(param);
		  
		    log.info("파람 정보 확인 { }", searchValue);
		    
			Map<String, Object> map = new HashMap<>();
			
			map.put("list2", searchAll.getContent());
			map.put("listsearchAll", searchAll);
			map.put("listCount", searchAll.getTotalElements());
//			map.put("pageable", pageable);
			map.put("param2", param);
			System.out.println("리스트 = " + searchAll);
//			System.out.println("검색 결과 개수 = " +));
			System.out.println("파라미터 = " + param);
			System.out.println("파라미터2 = " + map.get("list2"));
			
			
			return ResponseEntity.status(HttpStatus.OK).body(map);
		}
		
		  @GetMapping("/animal/{anno}")
		    public ResponseEntity<Map<String, Object>> AnimalDetailList(
		            @PathVariable("anno") Integer anno
		    ) {
		        Map<String, Object> map = new HashMap<>();

		        Animal animalDetail = animalService.findDetailAnno(anno);

		        map.put("animalDetail", animalDetail);
				System.out.println("animail Detail 리스트 = " + animalDetail);
				System.out.println("파라미터(anno) = " + anno);
//				System.out.println("검색 결과 개수 = " +));

//		        List<PartyDTOForList> myParties = service.getMyParties(memberId).stream()
//                .map((party) -> new PartyDTOForList(party.getId(), party.getTitle(), party.getCategory(), party.getCategoryDetail(), party.getBriefIntroduction(),
//                        party.getActivityArea(), party.getThumbnail(), party.getCreatedTime())).toList();
		        return ResponseEntity.status(HttpStatus.OK).body(map);
		    }
					

}
