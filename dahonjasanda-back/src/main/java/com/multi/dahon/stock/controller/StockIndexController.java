package com.multi.dahon.stock.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.multi.dahon.stock.model.vo.StockIndex;
import com.multi.dahon.stock.model.vo.StockParam;
import com.multi.dahon.stock.service.StockIndexService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/stock/index")
@Tag(name = "StockIndex Rest API", description = "지수 정보에 대한 정보를 제공합니다.")
public class StockIndexController {
	
	private final StockIndexService service;
	
	@Autowired
	StockIndexController(StockIndexService service) {
		this.service = service;
	}
	
	@GetMapping(value = {"/Info"})
	public ResponseEntity<Map<String, Object>> getStockInfo() {
		List<StockIndex> list = service.findInfo();
		Map<String, Object> map = new HashMap<>();
		map.put("list", list);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}
	
	@GetMapping(path = "/List")
	public ResponseEntity<Map<String, Object>> stockList(		
			@RequestParam(required = false) String searchValue)
	 {
		StockParam param = new StockParam();
		if(searchValue == null || searchValue.isEmpty()) {
			param.setSearchValue("");
		} else {
			param.setSearchValue(searchValue);
		}
		log.debug("@#@# stock list 요청 param : " + param);

		List<StockIndex> list = service.getStockList(param);
		int listCount = service.getStockListCount(param);
		Map<String, Object> map = new HashMap<>();
		
		map.put("list", list);
		map.put("listCount", listCount);
		map.put("param", param);
		System.out.println("리스트 = " + list);
		System.out.println("검색 결과 개수 = " + listCount);
		System.out.println("파라미터 = " + param);
		
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

}
