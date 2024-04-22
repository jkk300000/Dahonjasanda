package com.multi.dahon.housing.model.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.multi.dahon.housing.model.vo.HousingInfoJPA;




@Repository
public interface HousingInfoRespository extends JpaRepository<HousingInfoJPA, Integer> {
    
	@Query(value = "SELECT * "
	        + "FROM HOUSING h WHERE "
	        + "(h.rent_Secd_Nm LIKE %:transactionType%) and "
	        + "(h.house_Secd_Nm LIKE %:propertyType%) and "
	        + "(h.hssply_Adres LIKE %:location%) and "
	        + "(h.hssply_Adres LIKE %:searchValue% or "
	        + "h.house_Nm LIKE %:searchValue%) "
	        , nativeQuery = true)
	    List<HousingInfoJPA> housingSearch(
	            @Param("transactionType") String transactionType,
	            @Param("propertyType") String propertyType,
	            @Param("location") String location,
	            @Param("searchValue") String searchValue);



	@Query(value = "SELECT count(*) "
	        + "FROM HOUSING h WHERE "
	        + "(h.rent_Secd_Nm LIKE %:transactionType%) and "
	        + "(h.house_Secd_Nm LIKE %:propertyType%) and "
	        + "(h.hssply_Adres LIKE %:location%) and "
	        + "(h.hssply_Adres LIKE %:searchValue% or "
	        + "h.house_Nm LIKE %:searchValue%) "
	        , nativeQuery = true)
	    int housingSearchCount(
	            @Param("transactionType") String transactionType,
	            @Param("propertyType") String propertyType,
	            @Param("location") String location,
	            @Param("searchValue") String searchValue);
	@Query(value = "SELECT house_nm AS title, house_secd_nm AS category, rcept_endde AS date ,pblanc_url as info "
            + "FROM housing", nativeQuery = true)
    List<Object[]> findAllHousingInfo();
    
    
    @Query(value = "SELECT * "
	        + "FROM HOUSING h WHERE "
	        + "h.house_manage_no = :houseManageNo "
	        , nativeQuery = true)
	    List<HousingInfoJPA> housingSearchByManageNo(
	            @Param("houseManageNo") String houseManageNo);
	
	
	@Query(value = "SELECT count(*) "
			+ "FROM HOUSING h WHERE "
	        + "h.house_manage_no = :houseManageNo "
	        , nativeQuery = true)
	    int housingSearchByManageNoCount(
	    		@Param("houseManageNo") String houseManageNo);
	

	
}




