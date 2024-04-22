package com.multi.dahon.finance.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import com.multi.dahon.finance.dto.MortgageOptionAndProdDTO.Option;
import com.multi.dahon.finance.vo.FinancialCompany;
import com.multi.dahon.finance.vo.MortgageLoan;
import com.multi.dahon.finance.vo.MortgageLoanOption;
import com.multi.dahon.finance.vo.RentHouseLoan;
import com.multi.dahon.finance.vo.RentHouseLoanOption;

import lombok.Data;

@Data
public class RentHouseOptionAndProdDTO {
	
	private Long id;
	private String dclsMonth;
	private String finCoNo;
	private String finPrdtCd;
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
    
	public RentHouseOptionAndProdDTO(RentHouseLoanOption rho) {
		super();
		RentHouseLoan rh = rho.getRentHouseLoan();
		this.id = rho.getId();
		this.dclsMonth = rho.getDclsMonth();
		this.finCoNo = rho.getFinCoNo();
		this.finPrdtCd = rho.getFinPrdtCd();
		this.rpayType = rho.getRpayType();
		this.rpayTypeNm = rho.getRpayTypeNm();
		this.lendRateType = rho.getLendRateType();
		this.lendRateTypeNm = rho.getLendRateTypeNm();
		this.lendRateMin = rho.getLendRateMin();
		this.lendRateMax = rho.getLendRateMax();
		this.lendRateAvg = rho.getLendRateAvg();
		
		this.korCoNm = rh.getKorCoNm();
		this.finPrdtNm = rh.getFinPrdtNm();
		this.joinWay = rh.getJoinWay();
		this.loanInciExpn = rh.getLoanInciExpn();
		this.erlyRpayFee = rh.getErlyRpayFee();
		this.dlyRate = rh.getDlyRate();
		this.loanLmt = rh.getLoanLmt();
		this.dclsStrtDay = rh.getDclsStrtDay();
		this.dclsEndDay = rh.getDclsEndDay();
		this.finCoSubmDay = rh.getFinCoSubmDay();
		
	}
	
	public RentHouseOptionAndProdDTO(RentHouseLoanOption rho, RentHouseLoan rh) {
		super();
		this.id = rho.getId();
		this.dclsMonth = rho.getDclsMonth();
		this.finCoNo = rho.getFinCoNo();
		this.finPrdtCd = rho.getFinPrdtCd();
		this.rpayType = rho.getRpayType();
		this.rpayTypeNm = rho.getRpayTypeNm();
		this.lendRateType = rho.getLendRateType();
		this.lendRateTypeNm = rho.getLendRateTypeNm();
		this.lendRateMin = rho.getLendRateMin();
		this.lendRateMax = rho.getLendRateMax();
		this.lendRateAvg = rho.getLendRateAvg();
		
		this.korCoNm = rh.getKorCoNm();
		this.finPrdtNm = rh.getFinPrdtNm();
		this.joinWay = rh.getJoinWay();
		this.loanInciExpn = rh.getLoanInciExpn();
		this.erlyRpayFee = rh.getErlyRpayFee();
		this.dlyRate = rh.getDlyRate();
		this.loanLmt = rh.getLoanLmt();
		this.dclsStrtDay = rh.getDclsStrtDay();
		this.dclsEndDay = rh.getDclsEndDay();
		this.finCoSubmDay = rh.getFinCoSubmDay();

	}
	
	public RentHouseOptionAndProdDTO(RentHouseLoanOption rho, RentHouseLoan rh, FinancialCompany fc) {
		super();
		this.id = rho.getId();
		this.dclsMonth = rho.getDclsMonth();
		this.finCoNo = rho.getFinCoNo();
		this.finPrdtCd = rho.getFinPrdtCd();
		this.rpayType = rho.getRpayType();
		this.rpayTypeNm = rho.getRpayTypeNm();
		this.lendRateType = rho.getLendRateType();
		this.lendRateTypeNm = rho.getLendRateTypeNm();
		this.lendRateMin = rho.getLendRateMin();
		this.lendRateMax = rho.getLendRateMax();
		this.lendRateAvg = rho.getLendRateAvg();
		
		this.korCoNm = rh.getKorCoNm();
		this.finPrdtNm = rh.getFinPrdtNm();
		this.joinWay = rh.getJoinWay();
		this.loanInciExpn = rh.getLoanInciExpn();
		this.erlyRpayFee = rh.getErlyRpayFee();
		this.dlyRate = rh.getDlyRate();
		this.loanLmt = rh.getLoanLmt();
		this.dclsStrtDay = rh.getDclsStrtDay();
		this.dclsEndDay = rh.getDclsEndDay();
		this.finCoSubmDay = rh.getFinCoSubmDay();
		
		this.dclsChrgMan = fc.getDclsChrgMan();
		this.homeUrl = fc.getHomeUrl();
		this.calTel = fc.getCalTel();
	
		this.options = optionSetToDtoSet(rh.getOptions());
	}
	
	private Set<Option> optionSetToDtoSet(Set<RentHouseLoanOption> rentHouseOptionSet){
		 return rentHouseOptionSet.stream().filter(option -> option.getId() != this.id)
				 .map(Option::new).collect(Collectors.toSet());
	}
	
	@Data
	class Option {
		private Long optionId;
		private String dclsMonth;
		private String finCoNo;
		private String finPrdtCd;
		private String rpayType;
		private String rpayTypeNm;
		private String lendRateType;
		private String lendRateTypeNm;
		private BigDecimal lendRateMin;
		private BigDecimal lendRateMax;
		private BigDecimal lendRateAvg;
		
		public Option(RentHouseLoanOption rho) {
			super();
			this.optionId = rho.getId();
			this.dclsMonth = rho.getDclsMonth();
			this.finCoNo = rho.getFinCoNo();
			this.finPrdtCd = rho.getFinPrdtCd();
			this.rpayType = rho.getRpayType();
			this.rpayTypeNm = rho.getRpayTypeNm();
			this.lendRateType = rho.getLendRateType();
			this.lendRateTypeNm = rho.getLendRateTypeNm();
			this.lendRateMin = rho.getLendRateMin();
			this.lendRateMax = rho.getLendRateMax();
			this.lendRateAvg = rho.getLendRateAvg();
		}
		
	}
	
    

}
