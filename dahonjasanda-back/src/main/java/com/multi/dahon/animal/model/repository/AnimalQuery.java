package com.multi.dahon.animal.model.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.multi.dahon.animal.model.vo.Animal;
import com.multi.dahon.animal.model.vo.AnimalParam;

import jakarta.persistence.criteria.Predicate;

public class AnimalQuery {

//    public static Specification<Plant> QuerySearchPlant(PlantParam param) {
//    	String SearchValue = param.getSearchValue();
//        List<String> growthType = param.getGrowthType();
//        List<String> FlowerColorType = param.getFlowerColorType();
//        List<String> FloweringSeason = param.getFloweringSeason();
//        List<String> LeafColor = param.getLeafColor();
//        List<String> LeafPattern = param.getLeafPattern();
//        List<String> ManagementRequirment = param.getManagementRequirement();
//        
//        return (Specification<Plant>) (plant, query, builder) -> {
//
//            Predicate predicate = builder.conjunction();
//
//            if (StringUtils.hasText(SearchValue)) {
//                predicate = builder.or(
//                        builder.like(plant.get("cntntsSj"), "%" + SearchValue + "%"),
//                        builder.like(plant.get("plntzrNm"), "%" + SearchValue + "%"),
//                        builder.like(plant.get("plntbneNm"), "%" + SearchValue + "%")
//                );
//            }
//
//            if (growthType != null && !growthType.isEmpty()) {
//            	CriteriaBuilder.In<String> growthTypeCode = builder.in(plant.get("grwhstleCodeNm"));
//            	growthType.forEach((grwhstleCodeNm) -> growthTypeCode.value(grwhstleCodeNm));
//            	predicate = builder.or(growthTypeCode, predicate);
//            }
//
//            if (FlowerColorType != null && !FlowerColorType.isEmpty()) {
//                CriteriaBuilder.In<String> FlowerColorTypeCode = builder.in(plant.get("flclrCodeNm"));
//                FlowerColorType.forEach((flclrCodeNm) -> FlowerColorTypeCode.value(flclrCodeNm));
//                predicate = builder.or(FlowerColorTypeCode, predicate);
//            }
//            if (FloweringSeason != null && !FloweringSeason.isEmpty()) {
//            	CriteriaBuilder.In<String> FloweringSeasonCode = builder.in(plant.get("fmldeSeasonCodeNm"));
//            	FloweringSeason.forEach((fmldeSeasonCodeNm) -> FloweringSeasonCode.value(fmldeSeasonCodeNm));
//            	predicate = builder.or(FloweringSeasonCode, predicate);
//            }
//            if (LeafColor != null && !LeafColor.isEmpty()) {
//            	CriteriaBuilder.In<String> LeafColorCode = builder.in(plant.get("lefcolrCodeNm"));
//            	LeafColor.forEach((lefcolrCodeNm) -> LeafColorCode.value(lefcolrCodeNm));
//            	predicate = builder.or(LeafColorCode, predicate);
//            }
//            if (LeafPattern != null && !LeafPattern.isEmpty()) {
//            	CriteriaBuilder.In<String> LeafPatternCode = builder.in(plant.get("lefmrkCodeNm"));
//            	LeafPattern.forEach((lefmrkCodeNm) -> LeafPatternCode.value(lefmrkCodeNm));
//            	predicate = builder.or(LeafPatternCode, predicate);
//            }
//            if (ManagementRequirment != null && !ManagementRequirment.isEmpty()) {
//            	CriteriaBuilder.In<String> ManagementRequirmentCode = builder.in(plant.get("managelevelCodeNm"));
//            	ManagementRequirment.forEach((managedemanddoCodeName) -> ManagementRequirmentCode.value(managelevelCodeNm));
//            	predicate = builder.or(ManagementRequirmentCode, predicate);
//            }
//            return predicate;
//
//        };
//
//    }
	public static Specification<Animal> QuerySearchAnimal(AnimalParam param) {
	    String searchValue = param.getSearchValue();

	    System.out.println("@@@@" + searchValue);
	    return (root, query, builder) -> {
	        List<Predicate> predicates = new ArrayList<>();

	        if (StringUtils.hasText(searchValue)) {
	            Predicate searchPredicate = builder.or(
	                    builder.like(root.get("careAddr"), "%" + searchValue + "%"),
	                    builder.like(root.get("careNm"), "%" + searchValue + "%"),
	                    builder.like(root.get("happenPlace"), "%" + searchValue + "%"),
	                    builder.like(root.get("kindCd"), "%" + searchValue + "%")
	            );
	            predicates.add(searchPredicate);
	        }


	        return builder.and(predicates.toArray(new Predicate[0]));
	    };
	}
}





