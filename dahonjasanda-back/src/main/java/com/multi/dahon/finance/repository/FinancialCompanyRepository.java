package com.multi.dahon.finance.repository;

import java.util.Vector;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.multi.dahon.finance.dto.FinanceCompanyDTO;
import com.multi.dahon.finance.vo.FinancialCompany;

public interface FinancialCompanyRepository extends JpaRepository<FinancialCompany, Long>{
	
	@Query("select new com.multi.dahon.finance.dto.FinanceCompanyDTO(fc) from FinancialCompany fc where fc.companyType = :companyType")
	Vector<FinanceCompanyDTO> findByType(@Param("companyType") String companyType);
}
