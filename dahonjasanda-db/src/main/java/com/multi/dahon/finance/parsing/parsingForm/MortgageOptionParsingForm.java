package com.multi.dahon.finance.parsing.parsingForm;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MortgageOptionParsingForm {

    // 공급일자
    private String dcls_month;

    // 금융회사 코드
    private String fin_co_no;

    // 금융상품 코드
    private String fin_prdt_cd;

    // 담보 유형
    private String mrtg_type;

    // 담보 유형명
    private String mrtg_type_nm;

    // 상환 유형
    private String rpay_type;

    // 상환 유형명
    private String rpay_type_nm;

    // 대출 금리 유형
    private String lend_rate_type;

    // 대출 금리 유형명
    private String lend_rate_type_nm;

    // 최소 대출 금리
    private BigDecimal lend_rate_min;

    // 최대 대출 금리
    private BigDecimal lend_rate_max;

    // 평균 대출 금리
    private BigDecimal lend_rate_avg;

}