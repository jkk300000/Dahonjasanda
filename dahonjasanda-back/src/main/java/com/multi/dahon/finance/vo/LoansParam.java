package com.multi.dahon.finance.vo;

import java.util.List;

import lombok.Data;

@Data
public class LoansParam {
	private String lendRateType;
	private String rpayType;
	private String crdtPrdtType;
	private String crdtLendRateType;
	private String keyword;
	private List<String> companies;

	public boolean isEmpty() {
		if((lendRateType == null || lendRateType.isBlank()) && (rpayType == null ||rpayType.isBlank()) 
				&& (crdtPrdtType == null || crdtPrdtType.isBlank()) && (crdtLendRateType == null || crdtLendRateType.isBlank()) 
				&& (keyword == null || keyword.isBlank()) && (companies == null || companies.isEmpty())) {
			return true; 
		}
		return false;
	}
}
