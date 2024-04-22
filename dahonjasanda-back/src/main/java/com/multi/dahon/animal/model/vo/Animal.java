package com.multi.dahon.animal.model.vo;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Animal") // 객체를 Table로 생성 시켜주는 어노테이션입니다요 2024.03.25
@Transactional
@DynamicInsert
@DynamicUpdate
@JsonIgnoreProperties(ignoreUnknown = true)
public class Animal {

	@Id // PK 지정
	@GeneratedValue(strategy = GenerationType.IDENTITY) // id 자동 생성
	private int anno;
	
	@Column(unique = false, nullable = true, length = 100)
	private String orgCd;
	//시도코
	
	@Column(unique = false, nullable = true, length = 100)
	private String orgdownNm;
	//시도
	
	@Column(unique = false, nullable = true, length = 100)
	private String orgdownNm2; //set으로 떙겨야함 
	//시군구명
	
	@Column(unique = false, nullable = true, length = 100)
	private String uprCd2;
	
	@Column(unique = false, nullable = true, length = 100)
	private String orgCd2;
	
	@Column(unique = false, nullable = true, length = 100)
	private int careRegNo;
	//보소호번호
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String careNm;
	//보호소이름
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String kindCd;
	//품종코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String KNm;
	//품명
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String desertionNo;
	//유기번호
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String filename;
	//썸네일 이미
	
	@Column(unique = false, nullable = true, length = 100)
	private String happenDt;
	// 접수일
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String happenPlace;
	// 발견장소
	
	@Column(unique = false, nullable = true, length = 100)
	private String colorCd;
	// 색상
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String age;
	//나이
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String weight;
	//체중
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String noticeNo;
	//공고번호
	
	@Column(unique = false, nullable = true, length = 100)
	private String noticeSdt;
	//공고 시작일
	
	@Column(unique = false, nullable = true, length = 100)
	private String noticeEdt;
	//공고 종료일
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String popfile;
	//image 썸네일말고
	
	@Column(unique = false, nullable = true, length = 100)
	private String processState;
	// 상태
	
	@Column(unique = false, nullable = true, length = 100)
	private String sexCd;
	//성별
	
	@Column(unique = false, nullable = true, length = 100)
	private String neuterYn;
	//중성화여부
	
	@Column(unique = false, nullable = true, length = 100)
	private String specialMark;
	//특징
	
	
	@Column(unique = false, nullable = true, length = 100)
	private String careTel;
	//보호소 전화번호
	
	@Column(unique = false, nullable = true, length = 100)
	private String careAddr;
	//보호 장소 주소
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String orgNm;
	// 관할 기관
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String chargeNm;
	//담당자
	
	private String officetel;
	//담당자 연락처 
}

//
//private int anno;
//private String orgCd; 사실상 얘가 uprCd 역할 중 org이지만 upr로 활용됌   시도 코
//private String orgdownNm;  // 여기까지 그냥 바로  시도 이름
//
// 여기 돌릴떄는 upr 필요
//private String orgdownNm2; // 여기는 필수가 upr이지만  String orgCd로 돌려야하고  //set으로 orgdownNm가 나온 것을  Nm2로 떙겨야함 (군구이름)   
//private String orgCd2;	 // 여기는 필수가 upr이지만  String orgCd로 돌려야하고 // set으로 orgcd가 나온 것을 orgCd2가 되야하고 떙겨야함 // 사실상 얘가 orgCd 역할 중  군구 코드


// 보호소 조회
//private int careRegNo;   // 여기는 orgCd랑(uprCd) ordCd2(orgCd) 필수.
//private String careNm;
//

//여기서부터는 https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20201201&endde=20221231&pageNo=1&numOfRows=50&serviceKey=
//bgnde  endde pageNo=1&numOfRows=50&serviceKey=
//private int kindCd;
//private String KNm;
//private int desertionNo;
//private String filename;
//private String happenDt;
//private String happenPlace;
//private String colorCd;
//private int age;
//private double weight;
//private int noticeNo;
//private String noticeSdt;
//private String noticeEdt;
//private String popfile;
//private String processState;
//private String sexCd;
//private String neuterYn;
//private String specialMark;
//private String careNm;
//private String careTel;
//private String careAddr;
//private String orgNm;
//private String chargeNm;
//private String officetel;
