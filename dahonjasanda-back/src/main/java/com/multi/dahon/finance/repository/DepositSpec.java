package com.multi.dahon.finance.repository;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import com.multi.dahon.finance.vo.AnnuitySaving;
import com.multi.dahon.finance.vo.AnnuitySavingOption;
import com.multi.dahon.finance.vo.DepositsParam;
import com.multi.dahon.finance.vo.Saving;
import com.multi.dahon.finance.vo.SavingOption;
import com.multi.dahon.finance.vo.TermDeposit;
import com.multi.dahon.finance.vo.TermDepositOption;

import jakarta.persistence.criteria.CriteriaBuilder.In;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DepositSpec {

	public static Specification<TermDepositOption> conditionalTermDeposit(final DepositsParam param) {
		List<String> intrRateType = param.getIntrRateType();
		List<String> saveTrm = param.getSaveTrm();
	    String keyword = param.getKeyword();
	    List<String> companies = param.getCompanies();
	    String sortField = param.getSortField();
	    String sortOrder = param.getSortOrder();
		
		return (Specification<TermDepositOption>) (termDepositOption, query, builder) -> {
			Join<TermDepositOption, TermDeposit> termDeposit = termDepositOption.join("termDeposit", JoinType.LEFT);
			
			Predicate predicate = builder.conjunction();
			
			if (!StringUtils.isEmpty(keyword)) {
				predicate = builder.or(
						builder.like(termDeposit.get("finPrdtCd"), "%"+keyword+"%"),
		                builder.like(termDeposit.get("korCoNm"), "%"+keyword+"%"),
		                builder.like(termDeposit.get("finPrdtNm"), "%"+keyword+"%"),
		                builder.like(termDeposit.get("mtrtInt"), "%"+keyword+"%"),
		                builder.like(termDeposit.get("spclCnd"), "%"+keyword+"%")
						);
			}
			
			if (intrRateType != null && !intrRateType.isEmpty()) {
	            In<String> intrRateTypeIn = builder.in(termDepositOption.get("intrRateType"));
	            intrRateType.forEach(intrRateTypeIn::value);
	            predicate = builder.and(predicate, intrRateTypeIn);
	        }

	        if (saveTrm != null && !saveTrm.isEmpty()) {
	            In<String> saveTrmIn = builder.in(termDepositOption.get("saveTrm"));
	            saveTrm.forEach(saveTrmIn::value);
	            predicate = builder.and(predicate, saveTrmIn);
	        }
	
			if(companies!=null && !companies.isEmpty()) {
				In<String> companyCode = builder.in(termDeposit.get("finCoNo"));
				companies.forEach((company) -> companyCode.value(company));
				predicate = builder.and(companyCode, predicate);
			}
			
			if (StringUtils.isNotBlank(sortField) && StringUtils.isNotBlank(sortOrder)) {
			    Path<Object> sortFieldPath = termDeposit.get(sortField);
			    Order order = "asc".equalsIgnoreCase(sortOrder) ? builder.asc(sortFieldPath) : builder.desc(sortFieldPath);
			    query.orderBy(order);
			}
			
			return predicate;
		};
	}
	
	public static Specification<SavingOption> conditionalSavings(final DepositsParam param) {
		List<String> intrRateType = param.getIntrRateType();
		List<String> saveTrm = param.getSaveTrm();
		List<String> rsrvType = param.getRsrvType();
	    String keyword = param.getKeyword();
	    List<String> companies = param.getCompanies();
	    String sortField = param.getSortField();
	    String sortOrder = param.getSortOrder();
	    
	    return (Specification<SavingOption>)(savingOption, query, builder) -> {
	        Join<SavingOption, Saving> saving = savingOption.join("saving", JoinType.LEFT);
	        
	        Predicate predicate = builder.conjunction();
	        
	        if (!StringUtils.isEmpty(keyword)) {
	            predicate = builder.or(
	                builder.like(saving.get("finPrdtCd"), "%"+keyword+"%"),
	                builder.like(saving.get("korCoNm"), "%"+keyword+"%"),
	                builder.like(saving.get("finPrdtNm"), "%"+keyword+"%"),
	                builder.like(saving.get("mtrtInt"), "%"+keyword+"%"),
	                builder.like(saving.get("spclCnd"), "%"+keyword+"%")
	                );
	        }
	        
	        if (intrRateType != null && !intrRateType.isEmpty()) {
	            In<String> intrRateTypeIn = builder.in(savingOption.get("intrRateType"));
	            intrRateType.forEach(intrRateTypeIn::value);
	            predicate = builder.and(predicate, intrRateTypeIn);
	        }

	        if (saveTrm != null && !saveTrm.isEmpty()) {
	            In<String> saveTrmIn = builder.in(savingOption.get("saveTrm"));
	            saveTrm.forEach(saveTrmIn::value);
	            predicate = builder.and(predicate, saveTrmIn);
	        }
	        
	        if (rsrvType != null && !rsrvType.isEmpty()) {
	        	In<String> rsrvTypeIn = builder.in(savingOption.get("rsrvType"));
	        	rsrvType.forEach(rsrvTypeIn::value);
	        	predicate = builder.and(predicate, rsrvTypeIn);
	        }
	        
	        if(companies!=null && !companies.isEmpty()) {
	            In<String> companyCode = builder.in(saving.get("finCoNo"));
	            companies.forEach((company) -> companyCode.value(company));
	            predicate = builder.and(companyCode, predicate);
	        }
	        
	        if (StringUtils.isNotBlank(sortField) && StringUtils.isNotBlank(sortOrder)) {
	            Path<Object> sortFieldPath = saving.get(sortField);
	            Order order = "asc".equalsIgnoreCase(sortOrder) ? builder.asc(sortFieldPath) : builder.desc(sortFieldPath);
	            query.orderBy(order);
	        }
	        
	        return predicate;
	    };
	}

	
	
	
	public static Specification<AnnuitySavingOption> conditionalAnnuitySaving(final DepositsParam param) {
		List<String> paymPrd = param.getPaymPrd();
		List<String> pnsnRecpTrm = param.getPnsnRecpTrm();
		String keyword = param.getKeyword();
		List<String> companies = param.getCompanies();
		String sortField = param.getSortField();
	    String sortOrder = param.getSortOrder();
		
		return (Specification<AnnuitySavingOption>) (annuitySavingOption, query, builder) -> {
			Join<AnnuitySavingOption, AnnuitySaving> annuitySaving = annuitySavingOption.join("annuitySaving", JoinType.LEFT);
			
			Predicate predicate = builder.conjunction();
			
			if (!StringUtils.isEmpty(keyword)) {
				predicate = builder.or(
						builder.like(annuitySaving.get("finPrdtCd"), "%"+keyword+"%"),
						builder.like(annuitySaving.get("finPrdtNm"), "%"+keyword+"%"),
						builder.like(annuitySaving.get("korCoNm"), "%"+keyword+"%"),
						builder.like(annuitySaving.get("prdtTypeNm"), "%"+keyword+"%"),
						builder.like(annuitySaving.get("pnsnKindNm"), "%"+keyword+"%")
						);
			}
			
			if (paymPrd != null && !paymPrd.isEmpty()) {
	            In<String> paymPrdIn = builder.in(annuitySavingOption.get("paymPrd"));
	            paymPrd.forEach(paymPrdIn::value);
	            predicate = builder.and(predicate, paymPrdIn);
	        }

	        if (pnsnRecpTrm != null && !pnsnRecpTrm.isEmpty()) {
	            In<String> pnsnRecpTrmIn = builder.in(annuitySavingOption.get("pnsnRecpTrm"));
	            pnsnRecpTrm.forEach(pnsnRecpTrmIn::value);
	            predicate = builder.and(predicate, pnsnRecpTrmIn);
	        }
			
			if(companies!=null && !companies.isEmpty()) {
				In<String> companyCode = builder.in(annuitySaving.get("finCoNo"));
				companies.forEach((company) -> companyCode.value(company));
				predicate = builder.and(companyCode, predicate);
			}
			
			if (StringUtils.isNotBlank(sortField) && StringUtils.isNotBlank(sortOrder)) {
			    Path<Object> sortFieldPath = annuitySaving.get(sortField);
			    Order order = "asc".equalsIgnoreCase(sortOrder) ? builder.asc(sortFieldPath) : builder.desc(sortFieldPath);
			    query.orderBy(order);
			}
			
			return predicate;
		};
	}

}
