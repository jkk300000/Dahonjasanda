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

import com.multi.dahon.finance.dto.AnnuitySavingOptionAndProdDTO;
import com.multi.dahon.finance.dto.FinanceCompanyDTO;
import com.multi.dahon.finance.dto.SavingOptionAndProdDTO;
import com.multi.dahon.finance.dto.TermDepositOptionAndProdDTO;
import com.multi.dahon.finance.service.DepositsService;
import com.multi.dahon.finance.vo.DepositsParam;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/finance/deposits")
public class DepositsController {
	
	private ConcurrentHashMap<String, Vector<FinanceCompanyDTO>> financeCompanies = new ConcurrentHashMap<>();
	
	private final DepositsService service;

	public DepositsController(DepositsService service) {
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
	
	@GetMapping(value = "/term-deposits")
	public ResponseEntity<Page<TermDepositOptionAndProdDTO>> termDepositList(@ModelAttribute DepositsParam depositsParam, Pageable pageable){
		log.info("로그 정보 {}",depositsParam);
		return ResponseEntity.ok(service.findTermDepositList(depositsParam, pageable));
	}
	
    @GetMapping(value = "/savings")
    public ResponseEntity<Page<SavingOptionAndProdDTO>> savingList(@ModelAttribute DepositsParam depositsParam, Pageable pageable){
    	log.info("로그 정보 {}",depositsParam);
    		return ResponseEntity.ok(service.findSavingList(depositsParam, pageable));
    }
    
    @GetMapping(value = "/annuity-savings")
    public ResponseEntity<Page<AnnuitySavingOptionAndProdDTO>> annuitySavingList(@ModelAttribute DepositsParam depositsParam, Pageable pageable){
    	log.info("로그 정보 {}",depositsParam);
    	return ResponseEntity.ok(service.findAnnuitySavingList(depositsParam, pageable));
    }
    
    @GetMapping(value = "term-deposits/{termDepositId}")
    public ResponseEntity<Object> termDepositDetail(@PathVariable("termDepositId") Long id){
    	try {
    		return ResponseEntity.ok(service.getTermDepositDetail(id).orElseThrow());
    	} catch (NoSuchElementException e) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청 값을 다시 확인해주세요");
    	}
    }
    
    @GetMapping(value = "savings/{savingId}")
    public ResponseEntity<Object> savingDetail(@PathVariable("savingId") Long id){
    	try {
			return ResponseEntity.ok(service.getSavingDetail(id).orElseThrow());
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청 값을 다시 확인해주세요");
		}
    }

    @GetMapping(value = "annuity-savings/{annuitySavingId}")
    public ResponseEntity<Object> annuitySavingDetail(@PathVariable("annuitySavingId") Long id){
    	try {
    		return ResponseEntity.ok(service.getAnnuitySavingDetail(id).orElseThrow());
    	} catch (NoSuchElementException e) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청 값을 다시 확인해주세요");
    	}
    }
    
    @GetMapping(value = "/term-deposits/top-interest-rates")
    public ResponseEntity<Page<TermDepositOptionAndProdDTO>> topInterestRateTermDeposits(Pageable pageable){
    	log.info("Top interest rate term deposits requested");
    	return ResponseEntity.ok(service.findTopInterestRateTermDeposits(pageable));
    }
    
    @GetMapping(value = "/savings/top-interest-rates")
    public ResponseEntity<Page<SavingOptionAndProdDTO>> topInterestRateSavings(Pageable pageable){
        log.info("Top interest rate savings requested");
        return ResponseEntity.ok(service.findTopInterestRateSavings(pageable));
    }

    
}
