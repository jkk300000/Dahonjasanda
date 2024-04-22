package com.multi.dahon.finance.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import com.multi.dahon.finance.vo.FinancialCompany;
import com.multi.dahon.finance.vo.MortgageLoan;
import com.multi.dahon.finance.vo.MortgageLoanOption;

import lombok.Data;

@Data
public class MortgageOptionAndProdDTO {
	
	private Long id;
	private String dclsMonth;
	private String finCoNo;
	private String finPrdtCd;
	private String mrtgType;
	private String mrtgTypeNm;
	private String rpayType;
	private String rpayTypeNm;
	private String lendRateType;
	private String lendRateTypeNm;
	private BigDecimal lendRateMin;
	private BigDecimal lendRateMax;
	private BigDecimal lendRateAvg;
	
	private String korCoNm;
    private String finPrdtNm;
    private String joinWay;
    private String loanInciExpn;
    private String erlyRpayFee;
    private String dlyRate;
    private String loanLmt;
    private LocalDate dclsStrtDay;
    private LocalDate dclsEndDay;
    private LocalDateTime finCoSubmDay;
    
	private String dclsChrgMan;
	private String homeUrl;
	private String calTel;
	
	private Set<Option> options;
    
    
	public MortgageOptionAndProdDTO(MortgageLoanOption mo) {
		super();
		MortgageLoan m = mo.getMortgageLoan();
		this.id = mo.getId();
		this.dclsMonth = mo.getDclsMonth();
		this.finCoNo = mo.getFinCoNo();
		this.finPrdtCd = mo.getFinPrdtCd();
		this.mrtgType = mo.getMrtgType();
		this.mrtgTypeNm = mo.getMrtgTypeNm();
		this.rpayType = mo.getRpayType();
		this.rpayTypeNm = mo.getRpayTypeNm();
		this.lendRateType = mo.getLendRateType();
		this.lendRateTypeNm = mo.getLendRateTypeNm();
		this.lendRateMin = mo.getLendRateMin();
		this.lendRateMax = mo.getLendRateMax();
		this.lendRateAvg = mo.getLendRateAvg();
		
		this.korCoNm = m.getKorCoNm();
		this.finPrdtNm = m.getFinPrdtNm();
		this.joinWay = m.getJoinWay();
		this.loanInciExpn = m.getLoanInciExpn();
		this.erlyRpayFee = m.getErlyRpayFee();
		this.dlyRate = m.getDlyRate();
		this.loanLmt = m.getLoanLmt();
		this.dclsStrtDay = m.getDclsStrtDay();
		this.dclsEndDay = m.getDclsEndDay();
		this.finCoSubmDay = m.getFinCoSubmDay();
	}
	
	public MortgageOptionAndProdDTO(MortgageLoanOption mo, MortgageLoan m) {
		super();
		this.id = mo.getId();
		this.dclsMonth = mo.getDclsMonth();
		this.finCoNo = mo.getFinCoNo();
		this.finPrdtCd = mo.getFinPrdtCd();
		this.mrtgType = mo.getMrtgType();
		this.mrtgTypeNm = mo.getMrtgTypeNm();
		this.rpayType = mo.getRpayType();
		this.rpayTypeNm = mo.getRpayTypeNm();
		this.lendRateType = mo.getLendRateType();
		this.lendRateTypeNm = mo.getLendRateTypeNm();
		this.lendRateMin = mo.getLendRateMin();
		this.lendRateMax = mo.getLendRateMax();
		this.lendRateAvg = mo.getLendRateAvg();
		
		this.korCoNm = m.getKorCoNm();
		this.finPrdtNm = m.getFinPrdtNm();
		this.joinWay = m.getJoinWay();
		this.loanInciExpn = m.getLoanInciExpn();
		this.erlyRpayFee = m.getErlyRpayFee();
		this.dlyRate = m.getDlyRate();
		this.loanLmt = m.getLoanLmt();
		this.dclsStrtDay = m.getDclsStrtDay();
		this.dclsEndDay = m.getDclsEndDay();
		this.finCoSubmDay = m.getFinCoSubmDay();
	}
	
	public MortgageOptionAndProdDTO(MortgageLoanOption mo, MortgageLoan m, FinancialCompany fc) {
		super();
		this.id = mo.getId();
		this.dclsMonth = mo.getDclsMonth();
		this.finCoNo = mo.getFinCoNo();
		this.finPrdtCd = mo.getFinPrdtCd();
		this.mrtgType = mo.getMrtgType();
		this.mrtgTypeNm = mo.getMrtgTypeNm();
		this.rpayType = mo.getRpayType();
		this.rpayTypeNm = mo.getRpayTypeNm();
		this.lendRateType = mo.getLendRateType();
		this.lendRateTypeNm = mo.getLendRateTypeNm();
		this.lendRateMin = mo.getLendRateMin();
		this.lendRateMax = mo.getLendRateMax();
		this.lendRateAvg = mo.getLendRateAvg();
		
		this.korCoNm = m.getKorCoNm();
		this.finPrdtNm = m.getFinPrdtNm();
		this.joinWay = m.getJoinWay();
		this.loanInciExpn = m.getLoanInciExpn();
		this.erlyRpayFee = m.getErlyRpayFee();
		this.dlyRate = m.getDlyRate();
		this.loanLmt = m.getLoanLmt();
		this.dclsStrtDay = m.getDclsStrtDay();
		this.dclsEndDay = m.getDclsEndDay();
		this.finCoSubmDay = m.getFinCoSubmDay();
		
		this.dclsChrgMan = fc.getDclsChrgMan();
		this.homeUrl = fc.getHomeUrl();
		this.calTel = fc.getCalTel();
		
		this.options = optionSetToDtoSet(m.getOptions());
	}
	
	private Set<Option> optionSetToDtoSet(Set<MortgageLoanOption> mortgageOptionSet){
		 return mortgageOptionSet.stream().filter(option -> option.getId() != this.id)
				 .map(Option::new).collect(Collectors.toSet());
	}
	
	@Data
	class Option {
		private Long optionId;
		private String dclsMonth;
		private String finCoNo;
		private String finPrdtCd;
		private String mrtgType;
		private String mrtgTypeNm;
		private String rpayType;
		private String rpayTypeNm;
		private String lendRateType;
		private String lendRateTypeNm;
		private BigDecimal lendRateMin;
		private BigDecimal lendRateMax;
		private BigDecimal lendRateAvg;
		
		public Option(MortgageLoanOption mo) {
			super();
			this.optionId = mo.getId();
			this.dclsMonth = mo.getDclsMonth();
			this.finCoNo = mo.getFinCoNo();
			this.finPrdtCd = mo.getFinPrdtCd();
			this.mrtgType = mo.getMrtgType();
			this.mrtgTypeNm = mo.getMrtgTypeNm();
			this.rpayType = mo.getRpayType();
			this.rpayTypeNm = mo.getRpayTypeNm();
			this.lendRateType = mo.getLendRateType();
			this.lendRateTypeNm = mo.getLendRateTypeNm();
			this.lendRateMin = mo.getLendRateMin();
			this.lendRateMax = mo.getLendRateMax();
			this.lendRateAvg = mo.getLendRateAvg();
		}
		
	}
    

}
