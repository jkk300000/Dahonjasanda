package com.multi.dahon.animal.model.vo;

import lombok.Data;

@Data
public class AnimalParam {

	private String searchValue;
	
	// 페이징 인자
	private int page;
	private int limit;
	private int offset;
	
}
