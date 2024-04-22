package com.multi.dahon.finance.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import com.multi.dahon.finance.vo.FinancialCompany;
import com.multi.dahon.finance.vo.Saving;
import com.multi.dahon.finance.vo.SavingOption;

import lombok.Data;

@Data
public class SavingOptionAndProdDTO {
	
	private Long id;
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
    
	public SavingOptionAndProdDTO(SavingOption so) {
		super();
		Saving s = so.getSaving();
		this.id = so.getId();
		this.dclsMonth = so.getDclsMonth();
		this.finCoNo = so.getFinCoNo();
		this.finPrdtCd = so.getFinPrdtCd();
		this.intrRateType = so.getIntrRateType();
		this.intrRateTypeNm = so.getIntrRateTypeNm();
		this.rsrvType = so.getRsrvType();
		this.rsrvTypeNm = so.getRsrvTypeNm();
		this.saveTrm = so.getSaveTrm();
		this.intrRate = so.getIntrRate();
		this.intrRate2 = so.getIntrRate2();
		
		this.korCoNm = s.getKorCoNm();
		this.finPrdtNm = s.getFinPrdtNm();
		this.joinWay = s.getJoinWay();
		this.mtrtInt = s.getMtrtInt();
		this.spclCnd = s.getSpclCnd();
		this.joinDeny = s.getJoinDeny();
		this.etcNote = s.getEtcNote();
		this.maxLimit = s.getMaxLimit();
		this.dclsStrtDay = s.getDclsStrtDay();
		this.dclsEndDay = s.getDclsEndDay();
		this.finCoSubmDay = s.getFinCoSubmDay();
	}
    
	public SavingOptionAndProdDTO(SavingOption so, Saving s) {
		super();
		this.id = so.getId();
		this.dclsMonth = so.getDclsMonth();
		this.finCoNo = so.getFinCoNo();
		this.finPrdtCd = so.getFinPrdtCd();
		this.intrRateType = so.getIntrRateType();
		this.intrRateTypeNm = so.getIntrRateTypeNm();
		this.rsrvType = so.getRsrvType();
		this.rsrvTypeNm = so.getRsrvTypeNm();
		this.saveTrm = so.getSaveTrm();
		this.intrRate = so.getIntrRate();
		this.intrRate2 = so.getIntrRate2();
		
		this.korCoNm = s.getKorCoNm();
		this.finPrdtNm = s.getFinPrdtNm();
		this.joinWay = s.getJoinWay();
		this.mtrtInt = s.getMtrtInt();
		this.spclCnd = s.getSpclCnd();
		this.joinDeny = s.getJoinDeny();
		this.etcNote = s.getEtcNote();
		this.maxLimit = s.getMaxLimit();
		this.dclsStrtDay = s.getDclsStrtDay();
		this.dclsEndDay = s.getDclsEndDay();
		this.finCoSubmDay = s.getFinCoSubmDay();
	}
	
	public SavingOptionAndProdDTO(SavingOption so, Saving s, FinancialCompany fc) {
		super();
		this.id = so.getId();
		this.dclsMonth = so.getDclsMonth();
		this.finCoNo = so.getFinCoNo();
		this.finPrdtCd = so.getFinPrdtCd();
		this.intrRateType = so.getIntrRateType();
		this.intrRateTypeNm = so.getIntrRateTypeNm();
		this.rsrvType = so.getRsrvType();
		this.rsrvTypeNm = so.getRsrvTypeNm();
		this.saveTrm = so.getSaveTrm();
		this.intrRate = so.getIntrRate();
		this.intrRate2 = so.getIntrRate2();
		
		this.korCoNm = s.getKorCoNm();
		this.finPrdtNm = s.getFinPrdtNm();
		this.joinWay = s.getJoinWay();
		this.mtrtInt = s.getMtrtInt();
		this.spclCnd = s.getSpclCnd();
		this.joinDeny = s.getJoinDeny();
		this.etcNote = s.getEtcNote();
		this.maxLimit = s.getMaxLimit();
		this.dclsStrtDay = s.getDclsStrtDay();
		this.dclsEndDay = s.getDclsEndDay();
		this.finCoSubmDay = s.getFinCoSubmDay();
		
		this.dclsChrgMan = fc.getDclsChrgMan();
		this.homeUrl = fc.getHomeUrl();
		this.calTel = fc.getCalTel();
		
		this.options = optionSetToDtoSet(s.getOptions());
	}
	
	private Set<Option> optionSetToDtoSet(Set<SavingOption> savingOptionSet){
		 return savingOptionSet.stream().filter(option -> option.getId() != this.id)
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
		
		public Option(SavingOption so) {
			super();
			this.optionId = so.getId();
			this.dclsMonth = so.getDclsMonth();
			this.finCoNo = so.getFinCoNo();
			this.finPrdtCd = so.getFinPrdtCd();
			this.intrRateType = so.getIntrRateType();
			this.intrRateTypeNm = so.getIntrRateTypeNm();
			this.rsrvType = so.getRsrvType();
			this.rsrvTypeNm = so.getRsrvTypeNm();
			this.saveTrm = so.getSaveTrm();
			this.intrRate = so.getIntrRate();
			this.intrRate2 = so.getIntrRate2();
		}
		
	}

}
