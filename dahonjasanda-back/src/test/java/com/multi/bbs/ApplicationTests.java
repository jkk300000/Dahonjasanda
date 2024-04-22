package com.multi.bbs;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.multi.dahon.plant.model.service.PlantService;

@SpringBootTest
class ApplicationTests {
	// https://it-mesung.tistory.com/55
	// TDD 개발할때 해당 클래스에서 사용
	// 회귀테스트 (개발을 다 끝내고 사이드이펙트 방지용) 
	// 테스트 커버리지 : 테스트를 할 범위 (갯수)
	// 통과의 원리 : 커버리지 숫자 만큼 성공해야 테스트 통과
	@Autowired
	private PlantService ps;
	
	
}
