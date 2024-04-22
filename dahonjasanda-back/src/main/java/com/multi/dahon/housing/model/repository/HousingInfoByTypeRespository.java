package com.multi.dahon.housing.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.multi.dahon.housing.model.vo.HousingInfoByTypeJPA;




public interface HousingInfoByTypeRespository extends JpaRepository<HousingInfoByTypeJPA, Integer> {


//	@Query(value = "SELECT * "
//	        + "FROM HOUSING_TYPE t "
//			+ "inner join HOUSING h  "
//	        + "on t.house_Manage_No_In_Type = h.house_Manage_No "
//	        + "WHERE t.house_Manage_No_In_Type like :houseManageNo"
//	        , nativeQuery = true)
//	    List<HousingInfoByTypeJPA> housingTypeSearch(
//	            @Param("houseManageNo") String houseManageNo);
	
	@Query(value = "SELECT * "
	        + "FROM HOUSING_TYPE t "
	        + "WHERE t.house_Manage_No_In_Type like :houseManageNo"
	        , nativeQuery = true)
	    List<HousingInfoByTypeJPA> housingTypeSearch(
	            @Param("houseManageNo") String houseManageNo);
	
	
	
	@Query(value = "SELECT count(*) "
			 + "FROM HOUSING_TYPE t "
		        + "WHERE t.house_Manage_No_In_Type like :houseManageNo"
	        , nativeQuery = true)
	    int housingTypeSearchCount(
	    		@Param("houseManageNo") String houseManageNo);

}
