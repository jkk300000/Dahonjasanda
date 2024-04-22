package com.multi.dahon.stock.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.multi.dahon.member.model.vo.Member;
import com.multi.dahon.stock.model.vo.StockParam;
import com.multi.dahon.stock.model.vo.StockWallet;
import com.multi.dahon.stock.service.StockWalletService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/stock/wallet")
@Tag(name = "StockWallet Rest API", description = "보유 종목에 대한 정보를 제공합니다.")
public class StockWalletController {
	
	@Autowired
	private StockWalletService service;
	
	@GetMapping(path = "/List")
	public ResponseEntity<Map<String, Object>> walletList(		
			@RequestParam(required = false) String searchValue)
	 {
		StockParam param = new StockParam();
		if(searchValue == null || searchValue.isEmpty()) {
			param.setSearchValue("");
		} else {
			param.setSearchValue(searchValue);
		}
		log.debug("@#@# stock list 요청 param : " + param);

		List<StockWallet> list = service.getWalletList(param);
		int listCount = service.getWalletListCount(param);
		Map<String, Object> map = new HashMap<>();
		
		map.put("list", list);
		map.put("listCount", listCount);
		map.put("param", param);
		System.out.println("리스트 = " + list);
		System.out.println("검색 결과 개수 = " + listCount);
		System.out.println("파라미터 = " + param);
		
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}
	
	@PostMapping(path = "/write", produces = "application/json; charset=utf8")
	public ResponseEntity<Map<String, Object>> wright(Model model, HttpSession session,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember,
			@RequestBody HashMap<String, String> paramMap)
			{
		StockWallet stockwallet = new StockWallet();
		stockwallet.setQuantity(Integer.parseInt(paramMap.get("quantity")));
		stockwallet.setPrice(Integer.parseInt(paramMap.get("price")));
		stockwallet.setSname(paramMap.get("sname"));
		
		stockwallet.setMember(loginMember);
		System.out.println(stockwallet);
		System.out.println(paramMap);
		
		
		StockWallet result = service.saveStockWallet(stockwallet);
		Map<String, Object> map = new HashMap<>();
		if(result != null) {
			map.put("result", true);
			map.put("stockwallet", result);
		} else {
			map.put("result", false);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}
	
	@PostMapping(path = "/update", produces = "application/json; charset=utf8")
	public ResponseEntity<Map<String, Object>> update(Model model, HttpSession session,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember,
			@RequestBody HashMap<String, String> paramMap) {
		StockWallet stockwallet = new StockWallet();
		stockwallet.setQuantity(Integer.parseInt(paramMap.get("quantity")));
		stockwallet.setPrice(Integer.parseInt(paramMap.get("price")));
		stockwallet.setSname(paramMap.get("sname"));
		
	    stockwallet.setMember(loginMember);
		StockWallet prevStockWallet = service.findByNo(stockwallet.getWno());
		StockWallet result = service.saveStockWallet(stockwallet);
		
		Map<String, Object> map = new HashMap<>();
		if(result != null) {
			map.put("result", true);
			map.put("stockwallet", result);
		} else {
			map.put("result", false);
		}
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}
	
//	@PostMapping(value = "/update")
//	public ResponseEntity<Map<String, Object>> update(Model model, HttpSession session,
//			@SessionAttribute(name = "loginMember", required = false) Member loginMember,
//			@ModelAttribute StockWallet stockwallet,
//			@RequestParam("quantity") String quantity,
//			@RequestParam("price") String price,
//			@RequestParam("sname") String sname,
//			@RequestParam("wno") int wno) {
//		log.info("## 지갑 수정 요청 : quantity " + quantity);
//		log.info("$$ 지갑 수정 요청 : price " + price);
//		log.info("@@ 지갑 수정 요청 : sname " + sname);
//		log.info("@@ 지갑 수정 요청 : wno " + wno);
//		
//		stockwallet.setMember(loginMember);
//		StockWallet prevStockWallet = service.findByNo(stockwallet.getWno());
//		StockWallet result = service.saveStockWallet(stockwallet);
//		
//		Map<String, Object> map = new HashMap<>();
//		if(result != null) {
//			map.put("result", true);
//			map.put("stockwallet", result);
//		} else {
//			map.put("result", false);
//		}
//		return ResponseEntity.status(HttpStatus.OK).body(map);
//	}
	
	@GetMapping(value = "/delete")
	public ResponseEntity<Map<String, Object>> delete(Model model,
			@SessionAttribute(name="loginMember", required=false) Member loginMember, int wno) throws Exception {
		System.out.println("삭제 요청 : " + wno);
		try {
            service.delete(wno);
            return ResponseEntity.ok(Map.of("result", true));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("result", false));
        }
	}
			


}
