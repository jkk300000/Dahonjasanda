package com.multi.dahon.finance.parsing.parsingForm;

import lombok.Data;

@Data
public class SavingParsingForm {
    // 공시 연월
    private String dcls_month;
    // 은행 코드
    private String fin_co_no;

    // 상품 코드
    private String fin_prdt_cd;

    // 은행 이름
    private String kor_co_nm;

    // 상품 이름
    private String fin_prdt_nm;

    // 가입 방법
    private String join_way;

    // 만기 후 이자율
    private String mtrt_int;

    // 특별 우대 조건
    private String spcl_cnd;

    // 가입 거부 여부
    private String join_deny;

    // 가입 대상
    private String join_member;

    // 기타 사항
    private String etc_note;

    // 최대 한도
    private Long max_limit;

    // 공시 시작일
    private String dcls_strt_day;

    // 공시 종료일
    private String dcls_end_day;

    // 금융사 제출일
    private String fin_co_subm_day;

}
