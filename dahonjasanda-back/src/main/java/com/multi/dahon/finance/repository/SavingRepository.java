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

import com.multi.dahon.finance.dto.SavingOptionAndProdDTO;
import com.multi.dahon.finance.vo.SavingOption;

public interface SavingRepository extends JpaRepository<SavingOption, Long>, JpaSpecificationExecutor<SavingOption> {

	@Query("select new com.multi.dahon.finance.dto.SavingOptionAndProdDTO(so, s) from SavingOption so join fetch so.saving s")
	Page<SavingOptionAndProdDTO> findSavingList(Pageable pageable);

	@Query("select new com.multi.dahon.finance.dto.SavingOptionAndProdDTO(so, s, fc) "
			+ "from SavingOption so join fetch so.saving s join fetch s.financialCompany fc " + "where so.id = :id")
	Optional<SavingOptionAndProdDTO> findSavingWithDetail(@Param("id") Long id);

	@EntityGraph(attributePaths = "saving")
	Page<SavingOption> findAll(Specification<SavingOption> spec, Pageable pageable);

	@Query("select new com.multi.dahon.finance.dto.SavingOptionAndProdDTO(so, s) from SavingOption so join fetch so.saving s ORDER BY so.intrRate2 DESC")
	Page<SavingOptionAndProdDTO> findTopInterestRateSavings(Pageable pageable);
}
