package com.multi.dahon.finance.parsing.parsingForm;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AnnuityOptionParsingForm {
    private String dcls_month; // 공시월(YYYYMM)
    private String fin_co_no; // 금융회사번호
    private String fin_prdt_cd; // 금융상품코드
    private String pnsn_recp_trm; // 연금수령조건
    private String pnsn_recp_trm_nm; // 연금수령조건명
    private Integer pnsn_entr_age; // 연금가입나이
    private String pnsn_entr_age_nm; // 연금가입나이명
    private BigDecimal mon_paym_atm; // 월납입금액
    private String mon_paym_atm_nm; // 월납입금액명
    private Integer paym_prd; // 납입기간
    private String paym_prd_nm; // 납입기간명
    private Integer pnsn_strt_age; // 연금개시나이
    private String pnsn_strt_age_nm; // 연금개시나이명
    private Long pnsn_recp_amt; // 연금수령금액
}
