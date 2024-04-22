package com.multi.dahon.housing.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.multi.dahon.api.apiParsing;
import com.multi.dahon.housing.model.repository.HousingInfoRespository;
import com.multi.dahon.housing.model.service.HousingInfoByTypeServiceJPA;
import com.multi.dahon.housing.model.service.HousingInfoServiceJPA;
import com.multi.dahon.housing.model.vo.HouseCalendarParam;
import com.multi.dahon.housing.model.vo.HousingInfoByTypeJPA;
import com.multi.dahon.housing.model.vo.HousingInfoJPA;
import com.multi.dahon.housing.model.vo.HousingMapPram;

import jakarta.transaction.Transactional;
import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, maxAge = 5000)
public class HousingRestController {


		@Autowired
		private HousingInfoServiceJPA infoService;
		
		@Autowired
		private HousingInfoByTypeServiceJPA typeService;
		
		@Autowired
	    private HousingInfoRespository housingInfoRepository;
	
		List<HousingInfoJPA> infoList = apiParsing.allOfInfo();
		List<HousingInfoByTypeJPA> typeList = apiParsing.allOfInfoByType();
		
		@Transactional
		@GetMapping("/housing")
		public String home(Locale locale, Model model, @RequestParam(required = false) String command) {
			System.out.println(command);
//			if(command != null && command.contains("init")) {
//				System.out.println(command);
//				init();
//			}
			if(infoService.count() == 0 && typeService.count() == 0) {
				init();
			}
			
			return "home";
		}
		
		public void init() {
			infoService.save(infoList);
			typeService.save(typeList);
		}
		
		  

		@GetMapping("/calendar/list")
		public List<HouseCalendarParam> getAllHousingInfo() {
		    return housingInfoRepository.findAllHousingInfo().stream()
		            .map(data -> new HouseCalendarParam(
		                    (String) data[0],
		                    (String) data[1],
		                    (String) data[2],
		                    (String) data[3])) // Corrected placement of parenthesis
		            .collect(Collectors.toList());
		}

		
		
		@GetMapping(path = "/housingList")
		public ResponseEntity<Map<String, Object>> housingList(		
				@RequestParam(required = false) String searchValue,
				@RequestParam(required = false) String transactionType,
				@RequestParam(required = false) String location,
				@RequestParam(required = false) String propertyType)
		 {
			HousingMapPram param = new HousingMapPram();
			param.setSearchValue(searchValue);
			param.setTransactionType(transactionType);
			param.setLocation(location);
			param.setPropertyType(propertyType);
			log.debug("@@ housing list 요청 param : " + param);

			List<HousingInfoJPA> list = infoService.getHousingList(param);
			int listCount = infoService.getHousingListCount(param);
			Map<String, Object> map = new HashMap<>();
			
			map.put("list", list);
			map.put("listCount", listCount);
			map.put("param", param);
			System.out.println("리스트 = " + list);
			System.out.println("검색 결과 개수 = " + listCount);
			System.out.println("파라미터 = " + param);
			
			
			return ResponseEntity.status(HttpStatus.OK).body(map);
		}
		
		
		@GetMapping(path = "/housingType")
		public ResponseEntity<Map<String, Object>> housingTypeList(		
				@RequestParam(required = false) String houseManageNo)
		 {
			
			
			List<HousingInfoByTypeJPA> list = typeService.getHousingTypeList(houseManageNo);
			int listCount = typeService.getHousingTypeListCount(houseManageNo);
			Map<String, Object> map = new HashMap<>();
			
			map.put("list", list);
			map.put("listCount", listCount);
			map.put("houseManageNo", houseManageNo);
			System.out.println("리스트 = " + list);
			System.out.println("검색 결과 개수 = " + listCount);
			System.out.println("파라미터 = " + houseManageNo);
			
			
			return ResponseEntity.status(HttpStatus.OK).body(map);
		
 }
		
		@GetMapping(path = "/housingListByManageNo") 
		public ResponseEntity<Map<String, Object>> housingListByManageNo(		
				@RequestParam(required = false) String houseManageNo)
		 {
			
			
			List<HousingInfoJPA> list = infoService.getHousingListByManageNo(houseManageNo);
			int listCount = infoService.getHousingListByManageNoCount(houseManageNo);
			Map<String, Object> map = new HashMap<>();
			
			map.put("list", list);
			map.put("listCount", listCount);
			map.put("houseManageNo", houseManageNo);
			System.out.println("리스트 = " + list);
			System.out.println("검색 결과 개수 = " + listCount);
			System.out.println("파라미터 = " + houseManageNo);
			
			
			return ResponseEntity.status(HttpStatus.OK).body(map);
			
		}


}
