package com.multi.dahon.finance.parsing.parsingForm;

import lombok.Data;

@Data
public class DepositParsingForm {
    private String dcls_month;  // 공시 월
    private String fin_co_no;  // 금융회사 번호
    private String fin_prdt_cd;  // 금융상품 코드
    private String kor_co_nm;  // 금융회사 한글명
    private String fin_prdt_nm;  // 금융상품 한글명
    private String join_way;  // 가입 방법
    private String mtrt_int;  // 약정 이자율
    private String spcl_cnd;  // 특별 조건
    private String join_deny;  // 가입 거절 여부
    private String join_member;  // 가입 대상
    private String etc_note;  // 기타 비고
    private Long max_limit;  // 최대 한도
    private String dcls_strt_day;  // 공시 시작일
    private String dcls_end_day;  // 공시 종료일
    private String fin_co_subm_day;  // 금융회사 제출일


}
