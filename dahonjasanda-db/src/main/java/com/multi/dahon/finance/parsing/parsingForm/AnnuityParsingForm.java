package com.multi.dahon.finance.parsing.parsingForm;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AnnuityParsingForm {
    private String dcls_month; // 공시월(YYYYMM)
    private String fin_co_no; // 금융회사번호
    private String fin_prdt_cd; // 금융상품코드
    private String kor_co_nm; // 한글회사명
    private String fin_prdt_nm; // 금융상품명
    private String join_way; // 가입기구
    private String pnsn_kind; // 연금종류
    private String pnsn_kind_nm; // 연금종류명
    private String sale_strt_day; // 판매시작일자(YYYYMMDD)
    private Long mntn_cnt; // 유지액수량
    private String prdt_type; // 상품유형
    private String prdt_type_nm; // 상품유형명
    private BigDecimal avg_prft_rate; // 평균수익률
    private String dcls_rate; // 공시이율 (nullable)
    private String guar_rate; // 보장비율 (nullable)
    private BigDecimal btrm_prft_rate_1; // 단기수익률1
    private BigDecimal btrm_prft_rate_2; // 단기수익률2
    private BigDecimal btrm_prft_rate_3; // 단기수익률3
    private String etc; // 기타
    private String sale_co; // 판매회사
    private String dcls_strt_day; // 공시시작일자(YYYYMMDD)
    private String dcls_end_day; // 공시종료일자(YYYYMMDD) (nullable)
    private String fin_co_subm_day; // 금융회사제출일시(YYYYMMDDHH24MI)
}
