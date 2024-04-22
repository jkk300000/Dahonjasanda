package com.multi.dahon.finance.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import com.multi.dahon.finance.vo.AnnuitySaving;
import com.multi.dahon.finance.vo.AnnuitySavingOption;
import com.multi.dahon.finance.vo.FinancialCompany;
import com.multi.dahon.finance.vo.TermDeposit;
import com.multi.dahon.finance.vo.TermDepositOption;

import lombok.Data;

@Data
public class AnnuitySavingOptionAndProdDTO {
	
	private Long id;
	private String dclsMonth;
	private String finCoNo;
	private String finPrdtCd;
	private String pnsnRecpTrm;
	private String pnsnRecpTrmNm;
	private int pnsnEntrAge;
	private String pnsnEntrAgeNm;
	private BigDecimal monPaymAtm;
	private String monPaymAtmNm;
	private int paymPrd;
	private String paymPrdNm;
	private int pnsnStrtAge;
	private String pnsnStrtAgeNm;
	private Long pnsnRecpAmt;
	
	private String korCoNm;
    private String finPrdtNm;
    private String joinWay;
    private String pnsnKind;
    private String pnsnKindNm;
    private LocalDate saleStrtDay;
    private Long mntnCnt;
    private String prdtType;
    private String prdtTypeNm;
    private BigDecimal avgPrftRate;
    private String dclsRate;
    private String guarRate;
    private BigDecimal btrmPrftRate1;
    private BigDecimal btrmPrftRate2;
    private BigDecimal btrmPrftRate3;
    private String etc;
    private String saleCo;
    private LocalDate dclsStrtDay;
    private LocalDate dclsEndDay;
    private LocalDateTime finCoSubmDay;
    
	private String dclsChrgMan;
	private String homeUrl;
	private String calTel;
	
	private Set<Option> options;
    
	public AnnuitySavingOptionAndProdDTO(AnnuitySavingOption ao) {
		super();
		AnnuitySaving a = ao.getAnnuitySaving();
		this.id = ao.getId();
		this.dclsMonth = ao.getDclsMonth();
		this.finCoNo = ao.getFinCoNo();
		this.finPrdtCd = ao.getFinPrdtCd();
		this.pnsnRecpTrm = ao.getPnsnRecpTrm();
        this.pnsnRecpTrmNm = ao.getPnsnRecpTrmNm();
        this.pnsnEntrAge = ao.getPnsnEntrAge();
        this.pnsnEntrAgeNm = ao.getPnsnEntrAgeNm();
        this.monPaymAtm = ao.getMonPaymAtm();
        this.monPaymAtmNm = ao.getMonPaymAtmNm();
        this.paymPrd = ao.getPaymPrd();
        this.paymPrdNm = ao.getPaymPrdNm();
        this.pnsnStrtAge = ao.getPnsnStrtAge();
        this.pnsnStrtAgeNm = ao.getPnsnStrtAgeNm();
        this.pnsnRecpAmt = ao.getPnsnRecpAmt();
        
        
		this.korCoNm = a.getKorCoNm();
		this.finPrdtNm = a.getFinPrdtNm();
		this.joinWay = a.getJoinWay();
		this.pnsnKind = a.getPnsnKind();
        this.pnsnKindNm = a.getPnsnKindNm();
        this.saleStrtDay = a.getSaleStrtDay();
        this.mntnCnt = a.getMntnCnt();
        this.prdtType = a.getPrdtType();
        this.prdtTypeNm = a.getPrdtTypeNm();
        this.avgPrftRate = a.getAvgPrftRate();
        this.dclsRate = a.getDclsRate();
        this.guarRate = a.getGuarRate();
        this.btrmPrftRate1 = a.getBtrmPrftRate1();
        this.btrmPrftRate2 = a.getBtrmPrftRate2();
        this.btrmPrftRate3 = a.getBtrmPrftRate3();
        this.etc = a.getEtc();
        this.saleCo = a.getSaleCo();
		this.dclsStrtDay = a.getDclsStrtDay();
		this.dclsEndDay = a.getDclsEndDay();
		this.finCoSubmDay = a.getFinCoSubmDay();
	}
    
	public AnnuitySavingOptionAndProdDTO(AnnuitySavingOption ao, AnnuitySaving a) {
		super();
		this.id = ao.getId();
		this.dclsMonth = ao.getDclsMonth();
		this.finCoNo = ao.getFinCoNo();
		this.finPrdtCd = ao.getFinPrdtCd();
		this.pnsnRecpTrm = ao.getPnsnRecpTrm();
        this.pnsnRecpTrmNm = ao.getPnsnRecpTrmNm();
        this.pnsnEntrAge = ao.getPnsnEntrAge();
        this.pnsnEntrAgeNm = ao.getPnsnEntrAgeNm();
        this.monPaymAtm = ao.getMonPaymAtm();
        this.monPaymAtmNm = ao.getMonPaymAtmNm();
        this.paymPrd = ao.getPaymPrd();
        this.paymPrdNm = ao.getPaymPrdNm();
        this.pnsnStrtAge = ao.getPnsnStrtAge();
        this.pnsnStrtAgeNm = ao.getPnsnStrtAgeNm();
        this.pnsnRecpAmt = ao.getPnsnRecpAmt();
        
        
		this.korCoNm = a.getKorCoNm();
		this.finPrdtNm = a.getFinPrdtNm();
		this.joinWay = a.getJoinWay();
		this.pnsnKind = a.getPnsnKind();
        this.pnsnKindNm = a.getPnsnKindNm();
        this.saleStrtDay = a.getSaleStrtDay();
        this.mntnCnt = a.getMntnCnt();
        this.prdtType = a.getPrdtType();
        this.prdtTypeNm = a.getPrdtTypeNm();
        this.avgPrftRate = a.getAvgPrftRate();
        this.dclsRate = a.getDclsRate();
        this.guarRate = a.getGuarRate();
        this.btrmPrftRate1 = a.getBtrmPrftRate1();
        this.btrmPrftRate2 = a.getBtrmPrftRate2();
        this.btrmPrftRate3 = a.getBtrmPrftRate3();
        this.etc = a.getEtc();
        this.saleCo = a.getSaleCo();
		this.dclsStrtDay = a.getDclsStrtDay();
		this.dclsEndDay = a.getDclsEndDay();
		this.finCoSubmDay = a.getFinCoSubmDay();
	}
	
	public AnnuitySavingOptionAndProdDTO(AnnuitySavingOption ao, AnnuitySaving a, FinancialCompany fc) {
		super();
		this.id = ao.getId();
		this.dclsMonth = ao.getDclsMonth();
		this.finCoNo = ao.getFinCoNo();
		this.finPrdtCd = ao.getFinPrdtCd();
		this.pnsnRecpTrm = ao.getPnsnRecpTrm();
        this.pnsnRecpTrmNm = ao.getPnsnRecpTrmNm();
        this.pnsnEntrAge = ao.getPnsnEntrAge();
        this.pnsnEntrAgeNm = ao.getPnsnEntrAgeNm();
        this.monPaymAtm = ao.getMonPaymAtm();
        this.monPaymAtmNm = ao.getMonPaymAtmNm();
        this.paymPrd = ao.getPaymPrd();
        this.paymPrdNm = ao.getPaymPrdNm();
        this.pnsnStrtAge = ao.getPnsnStrtAge();
        this.pnsnStrtAgeNm = ao.getPnsnStrtAgeNm();
        this.pnsnRecpAmt = ao.getPnsnRecpAmt();
        
        
		this.korCoNm = a.getKorCoNm();
		this.finPrdtNm = a.getFinPrdtNm();
		this.joinWay = a.getJoinWay();
		this.pnsnKind = a.getPnsnKind();
        this.pnsnKindNm = a.getPnsnKindNm();
        this.saleStrtDay = a.getSaleStrtDay();
        this.mntnCnt = a.getMntnCnt();
        this.prdtType = a.getPrdtType();
        this.prdtTypeNm = a.getPrdtTypeNm();
        this.avgPrftRate = a.getAvgPrftRate();
        this.dclsRate = a.getDclsRate();
        this.guarRate = a.getGuarRate();
        this.btrmPrftRate1 = a.getBtrmPrftRate1();
        this.btrmPrftRate2 = a.getBtrmPrftRate2();
        this.btrmPrftRate3 = a.getBtrmPrftRate3();
        this.etc = a.getEtc();
        this.saleCo = a.getSaleCo();
		this.dclsStrtDay = a.getDclsStrtDay();
		this.dclsEndDay = a.getDclsEndDay();
		this.finCoSubmDay = a.getFinCoSubmDay();
		
		this.options = optionSetToDtoSet(a.getOptions());
	}
	
	private Set<Option> optionSetToDtoSet(Set<AnnuitySavingOption> annuitySavingOptionSet){
		 return annuitySavingOptionSet.stream().filter(option -> option.getId() != this.id)
				 .map(Option::new).collect(Collectors.toSet());
	}
	
	@Data
	class Option {
		private Long optionId;
		private String dclsMonth;
		private String finCoNo;
		private String finPrdtCd;
		private String pnsnRecpTrm;
		private String pnsnRecpTrmNm;
		private int pnsnEntrAge;
		private String pnsnEntrAgeNm;
		private BigDecimal monPaymAtm;
		private String monPaymAtmNm;
		private int paymPrd;
		private String paymPrdNm;
		private int pnsnStrtAge;
		private String pnsnStrtAgeNm;
		private Long pnsnRecpAmt;
		
		public Option(AnnuitySavingOption ao) {
			super();
			this.dclsMonth = ao.getDclsMonth();
			this.finCoNo = ao.getFinCoNo();
			this.finPrdtCd = ao.getFinPrdtCd();
			this.pnsnRecpTrm = ao.getPnsnRecpTrm();
	        this.pnsnRecpTrmNm = ao.getPnsnRecpTrmNm();
	        this.pnsnEntrAge = ao.getPnsnEntrAge();
	        this.pnsnEntrAgeNm = ao.getPnsnEntrAgeNm();
	        this.monPaymAtm = ao.getMonPaymAtm();
	        this.monPaymAtmNm = ao.getMonPaymAtmNm();
	        this.paymPrd = ao.getPaymPrd();
	        this.paymPrdNm = ao.getPaymPrdNm();
	        this.pnsnStrtAge = ao.getPnsnStrtAge();
	        this.pnsnStrtAgeNm = ao.getPnsnStrtAgeNm();
	        this.pnsnRecpAmt = ao.getPnsnRecpAmt();
		}
		
	}

}
