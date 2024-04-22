package com.multi.dahon.finance.parsing.parsingForm;

import lombok.Data;

@Data
public class CreditLoanParsingForm {
    private String dcls_month;      // 공시월
    private String fin_co_no;       // 금융회사번호
    private String fin_prdt_cd;     // 금융상품코드
    private String crdt_prdt_type;  // 신용상품유형
    private String kor_co_nm;       // 금융회사한글명
    private String fin_prdt_nm;     // 금융상품명
    private String join_way;        // 가입경로
    private String cb_name;         // 협회명
    private String crdt_prdt_type_nm;  // 신용상품유형명
    private String dcls_strt_day;      // 공시시작일
    private String dcls_end_day;       // 공시종료일
    private String fin_co_subm_day;    // 금융회사제출일

}
