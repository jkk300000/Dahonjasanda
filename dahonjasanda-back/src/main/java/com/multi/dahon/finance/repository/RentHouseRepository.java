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

import com.multi.dahon.finance.dto.RentHouseOptionAndProdDTO;
import com.multi.dahon.finance.vo.RentHouseLoanOption;

public interface RentHouseRepository extends JpaRepository<RentHouseLoanOption, Long>, JpaSpecificationExecutor<RentHouseLoanOption>{

	@Query("select new com.multi.dahon.finance.dto.RentHouseOptionAndProdDTO(rho, rh) from RentHouseLoanOption rho join fetch rho.rentHouseLoan rh")
	Page<RentHouseOptionAndProdDTO> findRentHouseList(Pageable pageable);
	
	
	@Query("select new com.multi.dahon.finance.dto.RentHouseOptionAndProdDTO(rho, rh, fc) "
			+ "from RentHouseLoanOption rho join fetch rho.rentHouseLoan rh join fetch rh.financialCompany fc "
			+ "where rho.id = :id")
	Optional<RentHouseOptionAndProdDTO> findRentHouseWithDetail(@Param("id") Long id);
	
	@EntityGraph(attributePaths = "rentHouseLoan")
	Page<RentHouseLoanOption> findAll(Specification<RentHouseLoanOption> spec, Pageable pageable);
}
