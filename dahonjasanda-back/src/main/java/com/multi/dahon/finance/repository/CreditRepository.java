package com.multi.dahon.finance.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.multi.dahon.finance.dto.CreditOptionAndProdDTO;
import com.multi.dahon.finance.vo.CreditLoanOption;

public interface CreditRepository extends JpaRepository<CreditLoanOption, Long>, JpaSpecificationExecutor<CreditLoanOption>{

	@Query("select new com.multi.dahon.finance.dto.CreditOptionAndProdDTO(co, c) from CreditLoanOption co join fetch co.creditLoan c")
	Page<CreditOptionAndProdDTO> findCreditList(Pageable pageable);
	
	
	@Query("select new com.multi.dahon.finance.dto.CreditOptionAndProdDTO(co, c, fc) "
			+ "from CreditLoanOption co join fetch co.creditLoan c join fetch c.financialCompany fc "
			+ "where co.id = :id")
	Optional<CreditOptionAndProdDTO> findCreditWithDetail(@Param("id") Long id);
	
	@EntityGraph(attributePaths = "creditLoan")
	Page<CreditLoanOption> findAll(Specification<CreditLoanOption> spec, Pageable pageable);
}
