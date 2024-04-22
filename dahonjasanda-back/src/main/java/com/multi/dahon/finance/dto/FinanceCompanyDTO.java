package com.multi.dahon.finance.dto;

import com.multi.dahon.finance.vo.FinancialCompany;

import lombok.Data;

@Data
public class FinanceCompanyDTO {
	private Long id;
	
	private String korCoNm;
	
	private String dclsChrgMan;
	
	private String homeUrl;
	
	private String calTel;
	
	private String companyType;
	
	private String finCoNo;

	
	public FinanceCompanyDTO(FinancialCompany company) {
		super();
		this.id = company.getId();
		this.korCoNm = company.getKorCoNm();
		this.dclsChrgMan = company.getDclsChrgMan();
		this.homeUrl = company.getHomeUrl();
		this.calTel = company.getCalTel();
		this.companyType = company.getCompanyType();
		this.finCoNo = company.getFinCoNo();
	}
	
	

}
