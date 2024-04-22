package com.multi.dahon.plant.model.vo;

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
@Entity(name = "plant") // 객체를 Table로 생성 시켜주는 어노테이션입니다요 2024.03.25
@Transactional
@DynamicInsert
@DynamicUpdate
@JsonIgnoreProperties(ignoreUnknown = true)
public class Plant {

	@Id // PK 지정
	@GeneratedValue(strategy = GenerationType.IDENTITY) // id 자동 생성
	private int ptno;
	
	@Column(unique = false, nullable = true, length = 100)
	private String cntntsNo; // 컨텐츠 번호
	
	@Column(unique = false, nullable = true, length = 100)
	private String cntntsSj;
	
	@Column(unique = false, nullable = true, length = 100)
	private String rtnFileSeCode;
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnFileSn;
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnOrginlFileNm;
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnOrginFileNm; // 원 본 파일
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnStreFileNm;
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnFileCours;
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnImageDc;
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnThumbFileNm;
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnImgSeCode;
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnImgSeCodeName; // 파일 관련
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnFileUrl;

	@Column(unique = false, nullable = true, columnDefinition = "TEXT")// 추가됨
	private String rtnFileUrl1;
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")// 추가됨
	private String rtnFileUrl2;
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnThumbFileUrl;

	@Column(unique = false, nullable = true, columnDefinition = "TEXT")  // 추가됨
	private String rtnThumbFileUrl1;
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")  // 추가됨
	private String rtnThumbFileUrl2;
	
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String rtnFileSeCodeName;
	
	@Column(unique = false, nullable = true, length = 100)
	private String plntbneNm; // 식물학명
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String plntzrNm; // 식물영 명
	
	@Column(unique = false, nullable = true, length = 100)
	private String distbNm; // 유통 명
	
	@Column(unique = false, nullable = true, length = 100)
	private int fmlNm; // 과 명
	
	@Column(unique = false, nullable = true, length = 100)
	private String fmlCodeNm; // 과 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private String orgplceInfo; // 원산지 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String adviseInfo; // 조언 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String imageEvlLinkCours; // 이미지 평가 링크 경로
	
	@Column(unique = false, nullable = true, length = 100)
	private String growthHgInfo; // 성장높이
	
	@Column(unique = false, nullable = true, length = 100)
	private String growthAraInfo; // 성장 넓이
	
	@Column(unique = false, nullable = true, length = 100)
	private String lefStleInfo; // 잎 형태
	
	@Column(unique = false, nullable = true, length = 100)
	private int smellCode; // 냄새코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String smellCodeNm; // 냄새 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String toxctyInfo; // 독성 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String prpgtEraInfo; // 번식 시기 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String etcEraInfo; // 기타 시기 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String managelevelCode; // 관리 수준코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String managelevelCodeNm; // 관리 수준 코드 명
	
	@Column(unique = false, nullable = true, length = 100)
	private int grwtveCode; // 생장속도 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String grwtveCodeNm; // 생장속도 코드 명
	
	@Column(unique = false, nullable = true, length = 100)
	private int grwhTpCode; // 생육 온도코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String grwhTpCodeNm; // 생육 온도코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int winterLwetTpCode; // 겨울 최저 온도 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String winterLwetTpCodeNm; // 겨울 최저 온도 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int hdCode; // 습도 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String hdCodeNm; // 습도 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private String frtlzrInfo; // 비료 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String soilInfo; // 토양 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private int watercycleSprngCode; // 물주기봄 코
	
	@Column(unique = false, nullable = true, length = 100)
	private String watercycleSprngCodeNm; // 물주기봄 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int watercycleSummerCode; // 물주기 여름 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String watercycleSummerCodeNm; // 물주기여름 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int watercycleAutumnCode; // 물주기가을 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String watercycleAutumnCodeNm; // 물주기가을 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int watercycleWinterCode; // 물주기겨울 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String watercycleWinterCodeNm; // 물주기겨울코드명
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String dlthtsManageInfo; // 병충해 관리 정보
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String speclmanageInfo; // 특별 관리 정보
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String fncltyInfo; // 기능성 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private int flpodmtBigInfo; // 화분 직경 대 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String flpodmtMiddleInfo; // 화분 직경 중 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String flpodmtSmallInfo; // 화분 직경 소 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String widthBigInfo; // 가로 대 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String widthMddlInfo; // 가로 중 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String widthSmallInfo; // 가로 소 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String vrticlBigInfo; // 세로 대 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String vrticlMddlInfo; // 세로 중 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String vrticlSmallInfo; // 세로 소 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String hgBigInfo; // 높이 대 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String hgMddlInfo; // 높이 중 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String hgSmallInfo; // 높이 소 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String volmeBigInfo; // 볼륨 대 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String volmeMddlInfo; // 볼륨 중 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String volmeSmallInfo; // 볼륨 소 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String pcBigInfo; // 가격 대 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String pcMddlInfo; // 가격 중 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private String pcSmallInfo; // 가격 소 정보
	
	@Column(unique = false, nullable = true, length = 100)
	private int managedemanddoCode; // 관리요구도 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String managedemanddoCodeName; // 관리요구도 코드 
	
	@Column(unique = false, nullable = true, length = 100)
	private int clCode; // 분류 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String clCodeNm; // 분류 코드 명
	
	@Column(unique = false, nullable = true, length = 100)
	private int grwhstleCode; // 생육형태 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String grwhstleCodeNm; // 생육 형태 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int indoorpsncpacompositionCode; // 실내 정원 구성
	
	@Column(unique = false, nullable = true, length = 100)
	private String indoorpsncpacompositionCodeNm; // 실내 정원 구성 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private int eclgyCode; // 생태 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String eclgyCodeNm; // 생태 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int lefcolrCode; // 잎색 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String lefcolrCodeNm; // 잎색코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int lefmrkCode; // 잎무늬 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String lefmrkCodeNm; // 잎무늬 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int ignSeasonCode; // 발화계절 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String ignSeasonCodeNm; // 발화 계절 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int flclrCode; // 꽃색 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String flclrCodeNm; // 꽃색 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int fmldecolrCode; // 과일색 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String fmldecolrCodeNm;// 과일색 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int fmldeSeasonCode;//  계절 ;
	
	@Column(unique = false, nullable = true, length = 100)
	private String fmldeSeasonCodeNm; // 계절 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int prpgtmthCode; // 번식 방법
	
	@Column(unique = false, nullable = true, length = 100)
	private String prpgtmthCodeNm; // 번식 방법 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private int lighttdemanddoCode; // 광요구도 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String lighttdemanddoCodeNm; // 광요구도 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int postngplaceCode; // 배치 장소 코드
	
	@Column(unique = false, nullable = true, columnDefinition = "TEXT")
	private String postngplaceCodeNm; // 배치 장소 코드명
	
	@Column(unique = false, nullable = true, length = 100)
	private int dlthtsCode; // 병충해 코드
	
	@Column(unique = false, nullable = true, length = 100)
	private String dlthtsCodeNm; // 병충해 코드명

}
