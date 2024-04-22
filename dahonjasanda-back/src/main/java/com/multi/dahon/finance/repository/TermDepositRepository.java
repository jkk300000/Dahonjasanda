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

import com.multi.dahon.finance.dto.TermDepositOptionAndProdDTO;
import com.multi.dahon.finance.vo.TermDepositOption;

public interface TermDepositRepository
		extends JpaRepository<TermDepositOption, Long>, JpaSpecificationExecutor<TermDepositOption> {

	@Query("select new com.multi.dahon.finance.dto.TermDepositOptionAndProdDTO(to, t) from TermDepositOption to join fetch to.termDeposit t")
	Page<TermDepositOptionAndProdDTO> findTermDepositList(Pageable pageable);

	@Query("select new com.multi.dahon.finance.dto.TermDepositOptionAndProdDTO(to, t, fc) "
			+ "from TermDepositOption to join fetch to.termDeposit t join fetch t.financialCompany fc "
			+ "where to.id = :id")
	Optional<TermDepositOptionAndProdDTO> findTermDepositWithDetail(@Param("id") Long id);

	@EntityGraph(attributePaths = "termDeposit")
	Page<TermDepositOption> findAll(Specification<TermDepositOption> spec, Pageable pageable);

	@Query("select new com.multi.dahon.finance.dto.TermDepositOptionAndProdDTO(to, t) from TermDepositOption to join fetch to.termDeposit t ORDER BY to.intrRate2 DESC")
	Page<TermDepositOptionAndProdDTO> findTopInterestRateTermDeposits(Pageable pageable);
}
