package com.multi.dahon.finance.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import com.multi.dahon.finance.dto.MortgageOptionAndProdDTO.Option;
import com.multi.dahon.finance.vo.CreditLoan;
import com.multi.dahon.finance.vo.CreditLoanOption;
import com.multi.dahon.finance.vo.FinancialCompany;
import com.multi.dahon.finance.vo.MortgageLoanOption;

import lombok.Data;

@Data
public class CreditOptionAndProdDTO {

	private Long id;
	private String dclsMonth;
	private String finCoNo;
	private String finPrdtCd;
	private String crdtPrdtType;
	private String crdtLendRateType;
	private String crdtLendRateTypeNm;
	private BigDecimal crdtGrad1; // Can be null
	private BigDecimal crdtGrad4; // Can be null
	private BigDecimal crdtGrad5; // Can be null
	private BigDecimal crdtGrad6; // Can be null
	private BigDecimal crdtGrad10; // Can be null
	private BigDecimal crdtGrad11; // Can be null
	private BigDecimal crdtGrad12; // Can be null
	private BigDecimal crdtGrad13; // Can be null
	private BigDecimal crdtGradAvg; // Can be null
	
	private String korCoNm;
	private String finPrdtNm;
	private String joinWay;
	private String cbName;
	private String crdtPrdtTypeNm;
	private LocalDate dclsStrtDay;
	private LocalDate dclsEndDay; // Can be null
	private LocalDateTime finCoSubmDay;
	
	private String dclsChrgMan;
	private String homeUrl;
	private String calTel;
	
	private Set<Option> options;
	
	public CreditOptionAndProdDTO(CreditLoanOption co) {
		super();
		CreditLoan c = co.getCreditLoan();
		this.id = co.getId();
		this.dclsMonth = co.getDclsMonth();
		this.finCoNo = co.getFinCoNo();
		this.finPrdtCd = co.getFinPrdtCd();
		this.crdtPrdtType = co.getCrdtPrdtType();
		this.crdtLendRateType = co.getCrdtLendRateType();
		this.crdtLendRateTypeNm = co.getCrdtLendRateTypeNm();
		this.crdtGrad1 = co.getCrdtGrad1();
		this.crdtGrad4 = co.getCrdtGrad4();
		this.crdtGrad5 = co.getCrdtGrad5();
		this.crdtGrad6 = co.getCrdtGrad6();
		this.crdtGrad10 = co.getCrdtGrad10();
		this.crdtGrad11 = co.getCrdtGrad11();
		this.crdtGrad12 = co.getCrdtGrad12();
		this.crdtGrad13 = co.getCrdtGrad13();
		this.crdtGradAvg = co.getCrdtGradAvg();
		
		this.korCoNm = c.getKorCoNm();
		this.finPrdtNm = c.getFinPrdtNm();
		this.joinWay = c.getJoinWay();
		this.cbName = c.getCbName();
		this.crdtPrdtTypeNm = c.getCrdtPrdtTypeNm();
		this.dclsStrtDay = c.getDclsStrtDay();
		this.dclsEndDay = c.getDclsEndDay();
		this.finCoSubmDay = c.getFinCoSubmDay();
	}
	
	public CreditOptionAndProdDTO(CreditLoanOption co, CreditLoan c) {
		super();
		this.id = co.getId();
		this.dclsMonth = co.getDclsMonth();
		this.finCoNo = co.getFinCoNo();
		this.finPrdtCd = co.getFinPrdtCd();
		this.crdtPrdtType = co.getCrdtPrdtType();
		this.crdtLendRateType = co.getCrdtLendRateType();
		this.crdtLendRateTypeNm = co.getCrdtLendRateTypeNm();
		this.crdtGrad1 = co.getCrdtGrad1();
		this.crdtGrad4 = co.getCrdtGrad4();
		this.crdtGrad5 = co.getCrdtGrad5();
		this.crdtGrad6 = co.getCrdtGrad6();
		this.crdtGrad10 = co.getCrdtGrad10();
		this.crdtGrad11 = co.getCrdtGrad11();
		this.crdtGrad12 = co.getCrdtGrad12();
		this.crdtGrad13 = co.getCrdtGrad13();
		this.crdtGradAvg = co.getCrdtGradAvg();
		
		this.korCoNm = c.getKorCoNm();
		this.finPrdtNm = c.getFinPrdtNm();
		this.joinWay = c.getJoinWay();
		this.cbName = c.getCbName();
		this.crdtPrdtTypeNm = c.getCrdtPrdtTypeNm();
		this.dclsStrtDay = c.getDclsStrtDay();
		this.dclsEndDay = c.getDclsEndDay();
		this.finCoSubmDay = c.getFinCoSubmDay();
	}

	public CreditOptionAndProdDTO(CreditLoanOption co, CreditLoan c, FinancialCompany fc) {
		super();
		this.id = co.getId();
		this.dclsMonth = co.getDclsMonth();
		this.finCoNo = co.getFinCoNo();
		this.finPrdtCd = co.getFinPrdtCd();
		this.crdtPrdtType = co.getCrdtPrdtType();
		this.crdtLendRateType = co.getCrdtLendRateType();
		this.crdtLendRateTypeNm = co.getCrdtLendRateTypeNm();
		this.crdtGrad1 = co.getCrdtGrad1();
		this.crdtGrad4 = co.getCrdtGrad4();
		this.crdtGrad5 = co.getCrdtGrad5();
		this.crdtGrad6 = co.getCrdtGrad6();
		this.crdtGrad10 = co.getCrdtGrad10();
		this.crdtGrad11 = co.getCrdtGrad11();
		this.crdtGrad12 = co.getCrdtGrad12();
		this.crdtGrad13 = co.getCrdtGrad13();
		this.crdtGradAvg = co.getCrdtGradAvg();
		
		this.korCoNm = c.getKorCoNm();
		this.finPrdtNm = c.getFinPrdtNm();
		this.joinWay = c.getJoinWay();
		this.cbName = c.getCbName();
		this.crdtPrdtTypeNm = c.getCrdtPrdtTypeNm();
		this.dclsStrtDay = c.getDclsStrtDay();
		this.dclsEndDay = c.getDclsEndDay();
		this.finCoSubmDay = c.getFinCoSubmDay();
		
		this.dclsChrgMan = fc.getDclsChrgMan();
		this.homeUrl = fc.getHomeUrl();
		this.calTel = fc.getCalTel();
		
		this.options = optionSetToDtoSet(c.getOptions());
	}
	
	private Set<Option> optionSetToDtoSet(Set<CreditLoanOption> creditOptionSet){
		 return creditOptionSet.stream().filter(option -> option.getId() != this.id)
				 .map(Option::new).collect(Collectors.toSet());
	}
	
	@Data
	class Option {
		private Long optionId;
		private String dclsMonth;
		private String finCoNo;
		private String finPrdtCd;

	    private String crdtPrdtType;
	    private String crdtLendRateType;
	    private String crdtLendRateTypeNm;
	    private BigDecimal crdtGrad1; 
	    private BigDecimal crdtGrad4; 
	    private BigDecimal crdtGrad5;
	    private BigDecimal crdtGrad6; 
	    private BigDecimal crdtGrad10; 
	    private BigDecimal crdtGrad11; 
	    private BigDecimal crdtGrad12;
	    private BigDecimal crdtGrad13; 
	    private BigDecimal crdtGradAvg;
	    
		public Option(CreditLoanOption co) {
			super();
			this.optionId = co.getId();
			this.dclsMonth = co.getDclsMonth();
			this.finCoNo = co.getFinCoNo();
			this.finPrdtCd = co.getFinPrdtCd();
			this.crdtPrdtType = co.getCrdtPrdtType();
			this.crdtLendRateType = co.getCrdtLendRateType();
			this.crdtLendRateTypeNm = co.getCrdtLendRateTypeNm();
			this.crdtGrad1 = co.getCrdtGrad1();
			this.crdtGrad4 = co.getCrdtGrad4();
			this.crdtGrad5 = co.getCrdtGrad5();
			this.crdtGrad6 = co.getCrdtGrad6();
			this.crdtGrad10 = co.getCrdtGrad10();
			this.crdtGrad11 = co.getCrdtGrad11();
			this.crdtGrad12 = co.getCrdtGrad12();
			this.crdtGrad13 = co.getCrdtGrad13();
			this.crdtGradAvg = co.getCrdtGradAvg();
		} 
	    
	}
	
}
