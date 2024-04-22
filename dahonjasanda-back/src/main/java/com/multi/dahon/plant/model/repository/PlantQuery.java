package com.multi.dahon.plant.model.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.multi.dahon.plant.model.vo.Plant;
import com.multi.dahon.plant.model.vo.PlantParam;

import jakarta.persistence.criteria.Predicate;

public class PlantQuery {

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
	public static Specification<Plant> QuerySearchPlant(PlantParam param) {
	    String searchValue = param.getSearchValue();
	    List<String> growthType = param.getGrowthType();
	    List<String> flowerColorType = param.getFlowerColorType();
	    List<String> floweringSeason = param.getFloweringSeason();
	    List<String> leafColor = param.getLeafColor();
	    List<String> leafPattern = param.getLeafPattern();
	    List<String> managementRequirement = param.getManagementRequirement();

	    System.out.println("@@@@" + searchValue);
	    return (root, query, builder) -> {
	        List<Predicate> predicates = new ArrayList<>();

	        if (StringUtils.hasText(searchValue)) {
	            Predicate searchPredicate = builder.or(
	                    builder.like(root.get("cntntsSj"), "%" + searchValue + "%"),
	                    builder.like(root.get("plntzrNm"), "%" + searchValue + "%"),
	                    builder.like(root.get("plntbneNm"), "%" + searchValue + "%")
	            );
	            predicates.add(searchPredicate);
	        }

	        if (growthType != null && !growthType.isEmpty()) {
	            List<Predicate> growthTypePredicates = new ArrayList<>();
	            for (String type : growthType) {
	                growthTypePredicates.add(builder.like(root.get("grwhstleCodeNm"), "%" + type + "%"));
	            }
	            predicates.add(builder.or(growthTypePredicates.toArray(new Predicate[0])));
	        }

	        if (flowerColorType != null && !flowerColorType.isEmpty()) {
	            List<Predicate> flowerColorTypePredicates = new ArrayList<>();
	            for (String type : flowerColorType) {
	                flowerColorTypePredicates.add(builder.like(root.get("flclrCodeNm"), "%" + type + "%"));
	            }
	            predicates.add(builder.or(flowerColorTypePredicates.toArray(new Predicate[0])));
	        }

	        if (floweringSeason != null && !floweringSeason.isEmpty()) {
	            List<Predicate> floweringSeasonPredicates = new ArrayList<>();
	            for (String season : floweringSeason) {
	                floweringSeasonPredicates.add(builder.like(root.get("fmldeSeasonCodeNm"), "%" + season + "%"));
	            }
	            predicates.add(builder.or(floweringSeasonPredicates.toArray(new Predicate[0])));
	        }

	        if (leafColor != null && !leafColor.isEmpty()) {
	            List<Predicate> leafColorPredicates = new ArrayList<>();
	            for (String color : leafColor) {
	                leafColorPredicates.add(builder.like(root.get("lefcolrCodeNm"), "%" + color + "%"));
	            }
	            predicates.add(builder.or(leafColorPredicates.toArray(new Predicate[0])));
	        }

	        if (leafPattern != null && !leafPattern.isEmpty()) {
	            List<Predicate> leafPatternPredicates = new ArrayList<>();
	            for (String pattern : leafPattern) {
	                leafPatternPredicates.add(builder.like(root.get("lefmrkCodeNm"), "%" + pattern + "%"));
	            }
	            predicates.add(builder.or(leafPatternPredicates.toArray(new Predicate[0])));
	        }

	        if (managementRequirement != null && !managementRequirement.isEmpty()) {
	            List<Predicate> managementRequirementPredicates = new ArrayList<>();
	            for (String requirement : managementRequirement) {
	                managementRequirementPredicates.add(builder.like(root.get("managelevelCodeNm"), "%" + requirement + "%"));
	            }
	            predicates.add(builder.or(managementRequirementPredicates.toArray(new Predicate[0])));
	        }

	        return builder.and(predicates.toArray(new Predicate[0]));
	    };
	}
}





