package com.multi.dahon.finance.parsing.parsingForm;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreditLoanOptionParsingForm {
    private String dcls_month;             // 공시월
    private String fin_co_no;              // 금융회사번호
    private String fin_prdt_cd;            // 금융상품코드
    private String crdt_prdt_type;         // 신용상품유형
    private String crdt_lend_rate_type;    // 대출금리유형
    private String crdt_lend_rate_type_nm; // 대출금리유형명
    private BigDecimal crdt_grad_1;            // 대출등급1
    private BigDecimal crdt_grad_4;            // 대출등급4
    private BigDecimal crdt_grad_5;            // 대출등급5
    private BigDecimal crdt_grad_6;            // 대출등급6
    private BigDecimal crdt_grad_10;           // 대출등급10
    private BigDecimal crdt_grad_11;           // 대출등급11
    private BigDecimal crdt_grad_12;           // 대출등급12
    private BigDecimal crdt_grad_13;           // 대출등급13
    private BigDecimal crdt_grad_avg;          // 대출등급평균

}
