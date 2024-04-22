package com.multi.dahon.finance.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter
public class FinancialCompanyOption {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String dclsMonth;
	
	@Column(nullable = false)
	private String finCoNo;
	
	@Column(nullable = false)
	private String areaCd;
	
	@Column(nullable = false)
	private String areaNm;
	
	@Column(nullable = false)
	private String exisYn;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "financial_company_id")
	private FinancialCompany financialCompany;

	protected FinancialCompanyOption() {
	}

	public FinancialCompanyOption(String dclsMonth, String finCoNo, String areaCd, String areaNm, String exisYn) {
		this.dclsMonth = dclsMonth;
		this.finCoNo = finCoNo;
		this.areaCd = areaCd;
		this.areaNm = areaNm;
		this.exisYn = exisYn;
	}

	// 연관관계 메소드
	public void setFinancialCompany(FinancialCompany financialCompany) {
		this.financialCompany = financialCompany;
		financialCompany.getOptions().add(this);
	}
}
