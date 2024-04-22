package com.multi.dahon.finance.parsing.parsingForm;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DepositOptionParsingForm {

    // 공시월
    private String dcls_month;

    // 금융회사 번호
    private String fin_co_no;

    // 금융상품 코드
    private String fin_prdt_cd;

    // 이자율 종류
    private String intr_rate_type;

    // 이자율 종류명
    private String intr_rate_type_nm;

    // 저축 기간 (개월)
    private Integer save_trm;

    // 이율
    private BigDecimal intr_rate;

    // 이율2
    private BigDecimal intr_rate2;
}
