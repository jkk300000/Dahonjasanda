package com.multi.dahon.plant.model.repository;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.multi.dahon.plant.model.vo.Plant;



@Repository
public interface PlantRespository extends JpaRepository<Plant, Integer>, JpaSpecificationExecutor<Plant> {
    
	
	List<Plant> findFirstByOrderByPtnoDesc();
	
	
	@Query("select p " +
            "from plant p " +
            "where p.ptno = :ptno")
	Plant selectByPtno(@Param("ptno") Integer ptno);
	 
//    @Query("SELECT p FROM Plant p WHERE p.ptno = :ptno")
//    Plant findByPtno(@Param("ptno") Long ptno);
//	List<Plant> findFirstByOrderBy
//	@Query(value = "SELECT * "
//	        + "FROM HOUSING h WHERE "
//	        + "(h.rent_Secd_Nm LIKE %:transactionType%) and "
//	        + "(h.house_Secd_Nm LIKE %:propertyType%) and "
//	        + "(h.hssply_Adres LIKE %:location%) and "
//	        + "(h.hssply_Adres LIKE %:searchValue% or "
//	        + "h.house_Nm LIKE %:searchValue%) "
//	        , nativeQuery = true)
//	    List<HousingInfoJPA> housingSearch(
//	            @Param("transactionType") String transactionType,
//	            @Param("propertyType") String propertyType,
//	            @Param("location") String location,
//	            @Param("searchValue") String searchValue);
//
//
//
//	@Query(value = "SELECT count(*) "
//	        + "FROM HOUSING h WHERE "
//	        + "(h.rent_Secd_Nm LIKE %:transactionType%) and "
//	        + "(h.house_Secd_Nm LIKE %:propertyType%) and "
//	        + "(h.hssply_Adres LIKE %:location%) and "
//	        + "(h.hssply_Adres LIKE %:searchValue% or "
//	        + "h.house_Nm LIKE %:searchValue%) "
//	        , nativeQuery = true)
//	    int housingSearchCount(
//	            @Param("transactionType") String transactionType,
//	            @Param("propertyType") String propertyType,
//	            @Param("location") String location,
//	            @Param("searchValue") String searchValue);
//	@Query(value = "SELECT house_nm AS title, house_secd_nm AS category, rcept_endde AS date ,pblanc_url as info "
//            + "FROM housing", nativeQuery = true)
//    List<Object[]> findAllHousingInfo();
//
//	Page<Plant> findBysearchValueContainingOrGrowthTypeContainingOrFloweringSeasonContainingOrLeafPatternContainingOrLeafColorContainingOrFlowerColorContainingManagementRequirement
//	(String title, String content, Pageable pageable);

	Page<Plant> findAll(Specification<Plant> spec, Pageable pageable);

	
	// 검색 파라메터, 검색 쿼
//	@Query(value = "SELECT * 
//	        + "FROM PLANT WHERE "
//	        + "(cntnts_Sj LIKE %:searchValue%) or "
//	        + "(grwhstle_Code LIKE %:growthType%) or "
//	        + "(fmlde_Season_Code_Nm LIKE %:floweringSeason%) or "
//	        + "(lefmrk_Code_Nm LIKE %:leafPattern%) or "
//	        + "(lefcolr_Code_Nm LIKE %:leafColor%) or "
//	        + "(flclr_Code_Nm LIKE %:flowerColorType%) or "
//	        + "(managelevel_Code_Nm LIKE %:managementRequirement%) ORDER BY ptno DESC "
//	        , nativeQuery = true)  // orderBy 삽입 
//	List<Plant> plantSearchList(
//	            @Param("searchValue") String searchValue,
//	            @Param("growthType") List<String> growthType,
//	            @Param("floweringSeason") List<String> floweringSeason,
//				@Param("leafPattern") List<String> leafPattern,
//				@Param("leafColor") List<String> leafColor,
//				@Param("flowerColorType") List<String> flowerColorType,
//				@Param("managementRequirement") List<String> managementRequirement
//				);
//
//	@Query(value = "SELECT count(*)"
//			+ "FROM PLANT WHERE "
//			+ "(cntnts_Sj LIKE %:searchValue%) or "
//			+ "(grwhstle_Code IN :growthType) or "
//			+ "(fmlde_Season_Code_Nm IN %:floweringSeason%) or "
//			+ "(lefmrk_Code_Nm LIKE %:leafPattern%) or "
//			+ "(lefcolr_Code_Nm LIKE %:leafColor%) or "
//			+ "(flclr_Code_Nm LIKE %:flowerColorType%) or "
//			+ "(managelevel_Code_Nm LIKE %:managementRequirement%) ORDER BY ptno DESC"
//			, nativeQuery = true)
//	int plantSearchCount(
//			@Param("searchValue") String searchValue,
//			@Param("growthType") List<String> growthType,
//			@Param("floweringSeason") List<String> floweringSeason,
//			@Param("leafPattern") List<String> leafPattern,
//			@Param("leafColor") List<String> leafColor,
//			@Param("flowerColorType") List<String> flowerColorType,
//			@Param("managementRequirement") List<String> managementRequirement
//			);
	
}

//private String searchValue;
//private String growthTypeC;
//private String floweringSeasonC;
//private String leafPatternC;
//private String leafColorC;
//private String flowerColorC;
//private String managementRequirementC;
//private List<String> searchData;
//
//private String growthType;
//private String floweringSeason;
//private String leafPattern;
//private String leafColor;
//private String growthflowerColorType;
//private String managementRequirement;


