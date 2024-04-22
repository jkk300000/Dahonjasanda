package com.multi.dahon.finance.repository;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import com.multi.dahon.finance.vo.CreditLoan;
import com.multi.dahon.finance.vo.CreditLoanOption;
import com.multi.dahon.finance.vo.LoansParam;
import com.multi.dahon.finance.vo.MortgageLoan;
import com.multi.dahon.finance.vo.MortgageLoanOption;
import com.multi.dahon.finance.vo.RentHouseLoan;
import com.multi.dahon.finance.vo.RentHouseLoanOption;

import jakarta.persistence.criteria.CriteriaBuilder.In;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoanSpec {
	
	public static Specification<MortgageLoanOption> conditionalMortgages(final LoansParam param) {
	    String lendRateType = param.getLendRateType();
	    String rpayType = param.getRpayType();
	    String keyword = param.getKeyword();
	    List<String> companies = param.getCompanies();
	    
	    return (Specification<MortgageLoanOption>)(mortgageOption, query, builder) -> {
	        Join<MortgageLoanOption, MortgageLoan> mortgage = mortgageOption.join("mortgageLoan", JoinType.LEFT);
	        
	        Predicate predicate = builder.conjunction();
	        
	        if (!StringUtils.isEmpty(keyword)) {
	            predicate = builder.or(
            		builder.like(mortgage.get("korCoNm"), "%"+keyword+"%"),
	                builder.like(mortgage.get("finPrdtNm"), "%"+keyword+"%"),
	                builder.like(mortgage.get("dlyRate"), "%"+keyword+"%"),
	                builder.like(mortgage.get("erlyRpayFee"), "%"+keyword+"%"),
	                builder.like(mortgage.get("joinWay"), "%"+keyword+"%"),
	                builder.like(mortgage.get("loanInciExpn"), "%"+keyword+"%"),
	                builder.like(mortgage.get("loanLmt"), "%"+keyword+"%")
	                );
	        }
	        
	        if (!StringUtils.isEmpty(lendRateType)) {
	            predicate = builder.and(predicate, builder.equal(mortgageOption.get("lendRateType"), lendRateType));
	        }

	        if (!StringUtils.isEmpty(rpayType)) {
	            predicate = builder.and(predicate, builder.equal(mortgageOption.get("rpayType"), rpayType));
	        }
	        
	        if(companies!=null && !companies.isEmpty()) {
	            In<String> companyCode = builder.in(mortgageOption.get("finCoNo"));
	            companies.forEach((company) -> companyCode.value(company));
	            predicate = builder.and(companyCode, predicate);
	        }
	        return predicate;
	        
	    };
	}

	
	
	public static Specification<RentHouseLoanOption> conditionalRentHouses(final LoansParam param) {
		String lendRateType = param.getLendRateType();
		String rpayType = param.getRpayType();
		String keyword = param.getKeyword();
		List<String> companies = param.getCompanies();
		
		return (Specification<RentHouseLoanOption>) (rentHouseOption, query, builder) -> {
			Join<RentHouseLoanOption, RentHouseLoan> rentHouse = rentHouseOption.join("rentHouseLoan", JoinType.LEFT);
			
			Predicate predicate = builder.conjunction();
			
			if (!StringUtils.isEmpty(keyword)) {
				predicate = builder.or(
						builder.like(rentHouse.get("korCoNm"), "%"+keyword+"%"),
		                builder.like(rentHouse.get("finPrdtNm"), "%"+keyword+"%"),
						builder.like(rentHouse.get("dlyRate"), "%"+keyword+"%"),
						builder.like(rentHouse.get("erlyRpayFee"), "%"+keyword+"%"),
						builder.like(rentHouse.get("joinWay"), "%"+keyword+"%"),
						builder.like(rentHouse.get("loanInciExpn"), "%"+keyword+"%"),
						builder.like(rentHouse.get("loanLmt"), "%"+keyword+"%")
						);
			}
			
			if (!StringUtils.isEmpty(lendRateType)) {
				predicate = builder.and(predicate, builder.equal(rentHouseOption.get("lendRateType"), lendRateType));
			}
			
			if (!StringUtils.isEmpty(rpayType)) {
				predicate = builder.and(predicate, builder.equal(rentHouseOption.get("rpayType"), rpayType));
			}
			
			if(companies!=null && !companies.isEmpty()) {
				In<String> companyCode = builder.in(rentHouse.get("finCoNo"));
				companies.forEach((company) -> companyCode.value(company));
				predicate = builder.and(companyCode, predicate);
			}
			return predicate;
			
		};
	}
	
	public static Specification<CreditLoanOption> conditionalCredits(final LoansParam param) {
		String crdtPrdtType = param.getCrdtPrdtType();
		String crdtLendRateType = param.getCrdtLendRateType();
		String keyword = param.getKeyword();
		List<String> companies = param.getCompanies();
		
		return (Specification<CreditLoanOption>) (creditOption, query, builder) -> {
			Join<CreditLoanOption, CreditLoan> credit = creditOption.join("creditLoan", JoinType.LEFT);
			
			Predicate predicate = builder.conjunction();
			
			if (!StringUtils.isEmpty(keyword)) {
				predicate = builder.or(
						builder.like(credit.get("korCoNm"), "%"+keyword+"%"),
		                builder.like(credit.get("finPrdtNm"), "%"+keyword+"%"),
						builder.like(credit.get("joinWay"), "%"+keyword+"%"),
						builder.like(creditOption.get("crdtLendRateTypeNm"), "%"+keyword+"%")
						);
			}
			
			if (!StringUtils.isEmpty(crdtPrdtType)) {
				predicate = builder.and(predicate, builder.equal(creditOption.get("crdtPrdtType"), crdtPrdtType));
			}
			
			if (!StringUtils.isEmpty(crdtLendRateType)) {
				predicate = builder.and(predicate, builder.equal(creditOption.get("crdtLendRateType"), crdtLendRateType));
			}
			
			if(companies!=null && !companies.isEmpty()) {
				In<String> companyCode = builder.in(credit.get("finCoNo"));
				companies.forEach((company) -> companyCode.value(company));
				predicate = builder.and(companyCode, predicate);
			}
			return predicate;
			
		};
	}

}
