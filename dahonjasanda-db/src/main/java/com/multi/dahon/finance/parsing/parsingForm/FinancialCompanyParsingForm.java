package com.multi.dahon.finance.parsing.parsingForm;

import lombok.Data;

@Data
public class FinancialCompanyParsingForm {
    private String dcls_month;  // 공시월
    private String fin_co_no;   // 금융회사코드
    private String kor_co_nm;   // 금융회사명
    private String dcls_chrg_man;  // 공시담당자
    private String homp_url;    // 홈페이지 주소
    private String cal_tel;     // 전화번호
    private String companyType;
}
