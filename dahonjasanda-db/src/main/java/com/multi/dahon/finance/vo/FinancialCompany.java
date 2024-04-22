package com.multi.dahon.finance.vo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class FinancialCompany {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String dclsMonth;
	
	@Column(nullable = false)
	private String finCoNo;
	
	@Column(nullable = false)
	private String korCoNm;
	
	@Column(nullable = false)
	private String dclsChrgMan;
	
	@Column(nullable = false)
	private String homeUrl;
	
	@Column(nullable = false)
	private String calTel;
	
	@Column
	private String companyType;
	
	@OneToMany(mappedBy = "financialCompany", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<FinancialCompanyOption> options = new HashSet<>();

	protected FinancialCompany() {
	}

	public FinancialCompany(String dclsMonth, String finCoNo, String korCoNm, String dclsChrgMan, String homeUrl, String calTel, String companyType) {
		this.dclsMonth = dclsMonth;
		this.finCoNo = finCoNo;
		this.korCoNm = korCoNm;
		this.dclsChrgMan = dclsChrgMan;
		this.homeUrl = homeUrl;
		this.calTel = calTel;
		this.companyType = companyType;
	}
}
