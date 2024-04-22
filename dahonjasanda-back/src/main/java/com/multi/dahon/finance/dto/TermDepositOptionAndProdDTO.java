package com.multi.dahon.finance.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import com.multi.dahon.finance.vo.FinancialCompany;
import com.multi.dahon.finance.vo.TermDeposit;
import com.multi.dahon.finance.vo.TermDepositOption;

import lombok.Data;

@Data
public class TermDepositOptionAndProdDTO {
	
	private Long id;
	private String dclsMonth;
	private String finCoNo;
	private String finPrdtCd;
	private String intrRateType;
	private String intrRateTypeNm;
	private int saveTrm;
	private BigDecimal intrRate;
	private BigDecimal intrRate2;
	
	private String korCoNm;
    private String finPrdtNm;
    private String joinWay;
    private String mtrtInt;
    private String spclCnd;
    private String joinDeny;
    private String joinMember;
    private String etcNote;
    private Long maxLimit;
    private LocalDate dclsStrtDay;
    private LocalDate dclsEndDay;
    private LocalDateTime finCoSubmDay;
    
	private String dclsChrgMan;
	private String homeUrl;
	private String calTel;
	
	private Set<Option> options;
    
	public TermDepositOptionAndProdDTO(TermDepositOption to) {
		super();
		TermDeposit t = to.getTermDeposit();
		this.id = to.getId();
		this.dclsMonth = to.getDclsMonth();
		this.finCoNo = to.getFinCoNo();
		this.finPrdtCd = to.getFinPrdtCd();
		this.intrRateType = to.getIntrRateType();
		this.intrRateTypeNm = to.getIntrRateTypeNm();
		this.saveTrm = to.getSaveTrm();
		this.intrRate = to.getIntrRate();
		this.intrRate2 = to.getIntrRate2();
		
		this.korCoNm = t.getKorCoNm();
		this.finPrdtNm = t.getFinPrdtNm();
		this.joinWay = t.getJoinWay();
		this.mtrtInt = t.getMtrtInt();
		this.spclCnd = t.getSpclCnd();
		this.joinDeny = t.getJoinDeny();
		this.etcNote = t.getEtcNote();
		this.maxLimit = t.getMaxLimit();
		this.dclsStrtDay = t.getDclsStrtDay();
		this.dclsEndDay = t.getDclsEndDay();
		this.finCoSubmDay = t.getFinCoSubmDay();
	}
    
	public TermDepositOptionAndProdDTO(TermDepositOption to, TermDeposit t) {
		super();
		this.id = to.getId();
		this.dclsMonth = to.getDclsMonth();
		this.finCoNo = to.getFinCoNo();
		this.finPrdtCd = to.getFinPrdtCd();
		this.intrRateType = to.getIntrRateType();
		this.intrRateTypeNm = to.getIntrRateTypeNm();
		this.saveTrm = to.getSaveTrm();
		this.intrRate = to.getIntrRate();
		this.intrRate2 = to.getIntrRate2();
		
		this.korCoNm = t.getKorCoNm();
		this.finPrdtNm = t.getFinPrdtNm();
		this.joinWay = t.getJoinWay();
		this.mtrtInt = t.getMtrtInt();
		this.spclCnd = t.getSpclCnd();
		this.joinDeny = t.getJoinDeny();
		this.etcNote = t.getEtcNote();
		this.maxLimit = t.getMaxLimit();
		this.dclsStrtDay = t.getDclsStrtDay();
		this.dclsEndDay = t.getDclsEndDay();
		this.finCoSubmDay = t.getFinCoSubmDay();
	}
	
	public TermDepositOptionAndProdDTO(TermDepositOption to, TermDeposit t, FinancialCompany fc) {
		super();
		this.id = to.getId();
		this.dclsMonth = to.getDclsMonth();
		this.finCoNo = to.getFinCoNo();
		this.finPrdtCd = to.getFinPrdtCd();
		this.intrRateType = to.getIntrRateType();
		this.intrRateTypeNm = to.getIntrRateTypeNm();
		this.saveTrm = to.getSaveTrm();
		this.intrRate = to.getIntrRate();
		this.intrRate2 = to.getIntrRate2();
		
		this.korCoNm = t.getKorCoNm();
		this.finPrdtNm = t.getFinPrdtNm();
		this.joinWay = t.getJoinWay();
		this.mtrtInt = t.getMtrtInt();
		this.spclCnd = t.getSpclCnd();
		this.joinDeny = t.getJoinDeny();
		this.etcNote = t.getEtcNote();
		this.maxLimit = t.getMaxLimit();
		this.dclsStrtDay = t.getDclsStrtDay();
		this.dclsEndDay = t.getDclsEndDay();
		this.finCoSubmDay = t.getFinCoSubmDay();
		
		this.dclsChrgMan = fc.getDclsChrgMan();
		this.homeUrl = fc.getHomeUrl();
		this.calTel = fc.getCalTel();
		
		this.options = optionSetToDtoSet(t.getOptions());
	}
	
	private Set<Option> optionSetToDtoSet(Set<TermDepositOption> termDepositOptionSet){
		 return termDepositOptionSet.stream().filter(option -> option.getId() != this.id)
				 .map(Option::new).collect(Collectors.toSet());
	}
	
	@Data
	class Option {
		private Long optionId;
		private String dclsMonth;
		private String finCoNo;
		private String finPrdtCd;
		private String intrRateType;
		private String intrRateTypeNm;
		private String rsrvType;
		private String rsrvTypeNm;
		private int saveTrm;
		private BigDecimal intrRate;
		private BigDecimal intrRate2;
		
		public Option(TermDepositOption to) {
			super();
			this.optionId = to.getId();
			this.dclsMonth = to.getDclsMonth();
			this.finCoNo = to.getFinCoNo();
			this.finPrdtCd = to.getFinPrdtCd();
			this.intrRateType = to.getIntrRateType();
			this.intrRateTypeNm = to.getIntrRateTypeNm();
			this.saveTrm = to.getSaveTrm();
			this.intrRate = to.getIntrRate();
			this.intrRate2 = to.getIntrRate2();
		}
		
	}

}
