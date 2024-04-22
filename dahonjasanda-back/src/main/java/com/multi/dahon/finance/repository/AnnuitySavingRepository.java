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

import com.multi.dahon.finance.dto.AnnuitySavingOptionAndProdDTO;
import com.multi.dahon.finance.vo.AnnuitySavingOption;

public interface AnnuitySavingRepository
		extends JpaRepository<AnnuitySavingOption, Long>, JpaSpecificationExecutor<AnnuitySavingOption> {

	@Query("select new com.multi.dahon.finance.dto.AnnuitySavingOptionAndProdDTO(ao, a) from AnnuitySavingOption ao join fetch ao.annuitySaving a")
	Page<AnnuitySavingOptionAndProdDTO> findAnnuitySavingList(Pageable pageable);

	@Query("select new com.multi.dahon.finance.dto.AnnuitySavingOptionAndProdDTO(ao, a, fc) "
			+ "from AnnuitySavingOption ao join fetch ao.annuitySaving a join fetch a.financialCompany fc "
			+ "where ao.id = :id")
	Optional<AnnuitySavingOptionAndProdDTO> findAnnuitySavingWithDetail(@Param("id") Long id);

	@EntityGraph(attributePaths = "annuitySaving")
	Page<AnnuitySavingOption> findAll(Specification<AnnuitySavingOption> spec, Pageable pageable);
}
