package com.multi.dahon.finance.parsing.parsingForm;

import lombok.Data;

@Data
public class FinancialCompanyOptionParsingForm {
    private String dcls_month;  // 공시월
    private String fin_co_no;   // 금융회사코드
    private String area_cd;     // 지역 코드
    private String area_nm;     // 지역명
    private String exis_yn;     // 존재 여부
}
