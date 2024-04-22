package com.multi.dahon.finance.parsing.parsingForm;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class MortgageParsingForm {

    // 공급일자
    private String dcls_month;

    // 금융회사 코드
    private String fin_co_no;

    // 금융상품 코드
    private String fin_prdt_cd;

    // 한글 회사명
    private String kor_co_nm;

    // 금융상품명
    private String fin_prdt_nm;

    // 가입 방법
    private String join_way;

    // 대출 소요 경비
    private String loan_inci_expn;

    // 조기 상환 수수료
    private String erly_rpay_fee;

    // 연체 이율
    private String dly_rate;

    // 대출 한도
    private String loan_lmt;

    // 공급 시작일
    private String dcls_strt_day;

    // 공급 종료일
    private String dcls_end_day;

    // 금융 회사 제출일
    private String fin_co_subm_day;

}