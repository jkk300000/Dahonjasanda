package com.multi.dahon.finance.parsing;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DBInjectionController {

    private final DBinjectionService service;

    public DBInjectionController(DBinjectionService service) {
        this.service = service;
    }
//
//    @GetMapping("/mortgage")
//    public ResponseEntity<String> injectionMortgageDB() {
//        service.parsingAndSavingMortgage();
//        return ResponseEntity.ok("Mortgage data injected successfully.");
//    }
//
//    @GetMapping("/renthouse")
//    public ResponseEntity<String> injectionRenthouseDB() {
//        // DB에 대한 작업 수행
//        service.parsingAndSavingForRentalHouse();
//        return ResponseEntity.ok("Rental house data injected successfully.");
//    }
//
//    @GetMapping("/credit")
//    public ResponseEntity<String> injectionCreditDB() {
//        // DB에 대한 작업 수행
//        service.parsingAndSavingForCredit();
//        return ResponseEntity.ok("Credit data injected successfully.");
//    }
//
//
//    @GetMapping("/deposit")
//    public ResponseEntity<String> injectionDepositDB() {
//        // DB에 대한 작업 수행
//        service.parsingAndSavingDeposit();
//        return ResponseEntity.ok("Deposit data injected successfully.");
//    }
//
//    @GetMapping("/saving")
//    public ResponseEntity<String> injectionSavingDB() {
//        // DB에 대한 작업 수행
//        service.parsingAndSavingSaving();
//        return ResponseEntity.ok("Saving data injected successfully.");
//    }
//
//    @GetMapping("/annuity")
//    public ResponseEntity<String> injectionAnnuityDB() {
//        // DB에 대한 작업 수행
//        service.parsingAndSavingAnnuitySaving();
//        return ResponseEntity.ok("AnnuitySaving data injected successfully.");
//    }
//
//
//    @GetMapping("/company")
//    public ResponseEntity<String> injectionCompanyDB() {
//        // DB에 대한 작업 수행
//        service.parsingAndSavingForCompany();
//        return ResponseEntity.ok("Company data injected successfully.");
//    }

    @GetMapping("/finance")
    public ResponseEntity<String> injectionAllInOne(){
        service.parsingAndSavingMortgage();
        service.parsingAndSavingForRentalHouse();
        service.parsingAndSavingForCredit();
        service.parsingAndSavingDeposit();
        service.parsingAndSavingSaving();
        service.parsingAndSavingAnnuitySaving();
        // 반드시 회사를 마지막에 해야한다.
        service.parsingAndSavingForCompany();
        return ResponseEntity.ok("All injected successfully. 대충 주입 성공했다는 내용");
    }
}
