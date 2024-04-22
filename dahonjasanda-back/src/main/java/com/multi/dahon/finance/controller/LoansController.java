package com.multi.dahon.finance.controller;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.multi.dahon.finance.dto.CreditOptionAndProdDTO;
import com.multi.dahon.finance.dto.FinanceCompanyDTO;
import com.multi.dahon.finance.dto.MortgageOptionAndProdDTO;
import com.multi.dahon.finance.dto.RentHouseOptionAndProdDTO;
import com.multi.dahon.finance.service.LoansService;
import com.multi.dahon.finance.vo.LoansParam;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/finance/loans")
public class LoansController {
	
	private ConcurrentHashMap<String, Vector<FinanceCompanyDTO>> financeCompanies = new ConcurrentHashMap<>();
	
	private final LoansService service;

	public LoansController(LoansService service) {
		super();
		this.service = service;
	}
	
	@PostConstruct
	public void initFinanceCompanies() {
		List<String> list = Arrays.asList("020000", "030200","030300","050000","060000");
		list.forEach((code) -> financeCompanies.put(code, service.getFinanceCompanyList(code)));
	}
	
	@GetMapping(value = "/companies")
	public ResponseEntity<ConcurrentHashMap<String, Vector<FinanceCompanyDTO>>> getCompanyList() {
		return ResponseEntity.status(HttpStatus.OK).body(financeCompanies);
	}
	
    @GetMapping(value = "/mortgages")
    public ResponseEntity<Page<MortgageOptionAndProdDTO>> mortgageLoanList(@ModelAttribute LoansParam loansParam, Pageable pageable){
    	log.info("로그 정보 {}",loansParam);
    		return ResponseEntity.ok(service.findMortgageList(loansParam, pageable));
    }
    
    @GetMapping(value = "/credits")
    public ResponseEntity<Page<CreditOptionAndProdDTO>> creditLoanList(@ModelAttribute LoansParam loansParam, Pageable pageable){
    	log.info("로그 정보 {}",loansParam);
    	return ResponseEntity.ok(service.findCreditList(loansParam, pageable));
    }
    
    @GetMapping(value = "/rent-houses")
    public ResponseEntity<Page<RentHouseOptionAndProdDTO>> rentHouseLoanList(@ModelAttribute LoansParam loansParam, Pageable pageable){
    	log.info("로그 정보 {}",loansParam);
    	return ResponseEntity.ok(service.findRentHouseList(loansParam, pageable));
    }
    
    @GetMapping(value = "mortgages/{mortgageId}")
    public ResponseEntity<Object> mortgageDetail(@PathVariable("mortgageId") Long id){
    	try {
			return ResponseEntity.ok(service.getMortgageDetail(id).orElseThrow());
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청 값을 다시 확인해주세요");
		}
    }
    
    @GetMapping(value = "rent-houses/{rentHouseId}")
    public ResponseEntity<Object> rentHouseDetail(@PathVariable("rentHouseId") Long id){
    	try {
    		return ResponseEntity.ok(service.getRentHouseDetail(id).orElseThrow());
    	} catch (NoSuchElementException e) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청 값을 다시 확인해주세요");
    	}
    }

    @GetMapping(value = "credits/{creditId}")
    public ResponseEntity<Object> creditDetail(@PathVariable("creditId") Long id){
    	try {
    		return ResponseEntity.ok(service.getCreditDetail(id).orElseThrow());
    	} catch (NoSuchElementException e) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청 값을 다시 확인해주세요");
    	}
    }
    
}
