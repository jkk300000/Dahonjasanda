package com.multi.dahon.plant.model.vo;

import java.util.List;

import lombok.Data;

@Data
public class PlantParam {

	private String searchValue;
	private List<String> growthTypeC;
	private List<String> floweringSeasonC;
	private List<String> leafPatternC;
	private List<String> leafColorC;
	private List<String> flowerColorC;
	private List<String> managementRequirementC;
	
	private List<String> growthType;
	private List<String> floweringSeason;
	private List<String> leafPattern;
	private List<String> leafColor;
	private List<String> flowerColorType;
	private List<String> managementRequirement;
	// 페이징 인자
	private int page;
	private int limit;
	private int offset;
	
}
