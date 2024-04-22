package com.multi.dahon.api;

import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.multi.dahon.plant.model.vo.Plant;

import jakarta.persistence.Column;
public class apiParsingPlant {
	
	public static void main(String[] args) {
		 List<Plant> list1 = parse();
		 for(int i = 0; i<list1.size(); i++) {
			 saveParsedData(list1.get(i));
		 }
		 
//		 saveParsedData(null, null, null);		
	}
	public static final String KEY = "20240214FZQ6E16CCREWI7Q97CHBA";
	public static final String PlantList_XML_URL = "http://api.nongsaro.go.kr/service/garden/gardenList";
	public static final String PlantDetailList_XML_URL = "http://api.nongsaro.go.kr/service/garden/gardenDtl";
//	public static final String WEEKLY_BOXOFFICE_JSON_URL = "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json";

//식물 전체 리스트 파싱
	public static List<Plant> parse() {
//		String dateStr = searchDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		List<Plant> list = new ArrayList<>();

		StringBuilder urlBuffer = new StringBuilder(PlantList_XML_URL); // 빌더는 성능때메 쓴다
		urlBuffer.append("?" + "apiKey" + "=" + KEY);
		urlBuffer.append("&" + "sType" + "=");
		urlBuffer.append("&" + "sText" + "=");  
		urlBuffer.append("&" + "wordType" + "=");  
		urlBuffer.append("&" + "word" + "=");  
		urlBuffer.append("&" + "lightChkVal" + "=");  
		urlBuffer.append("&" + "grwhstleChkVal" + "=");  
		urlBuffer.append("&" + "lefcolrChkVal" + "=");  
		urlBuffer.append("&" + "flclrChkVal" + "=");  
		urlBuffer.append("&" + "fmldecolrChkVal" + "=");  
		urlBuffer.append("&" + "ignSeasonChkVal" + "=");  
		urlBuffer.append("&" + "winterLwetChkval" + "=");  
		urlBuffer.append("&" + "priceType" + "=");  
		urlBuffer.append("&" + "priceTypeSel" + "=");  
		urlBuffer.append("&" + "waterCycleSel" + "=");  
		urlBuffer.append("&" + "pageNo" + "=" + "1");  
		urlBuffer.append("&" + "numOfRows" + "=217");  

		System.out.println(urlBuffer);

		//url을 통해 http 요청 코드
				try {
					URL url = new URL(urlBuffer.toString());  // url 객체 생성
					HttpURLConnection conn = (HttpURLConnection) url.openConnection(); // url 통해서 http 연결 요청
					conn.setRequestMethod("GET"); // get 방식 요청을 알리는 코드
					
					// api마다 요청에 대한 프로퍼티 (속성) 셋팅이 달라지는 코드
					conn.setRequestProperty("Accept", "application/xml");
//					conn.setRequestProperty("Accept", "application/json");
//					conn.setRequestProperty("content-type", "application/xml");
//					conn.setRequestProperty("content-type", "application/json");
					int code = conn.getResponseCode(); // 실제 호출하는 부 url로부터 페이징 요청
					System.out.println("ResponseCode : " + code);

					if (code < 200 || code > 300) {
						System.out.println("페이지가 잘못되었습니다.");
						return null;
					}
					System.out.println("@@@@식물 parsing 시작 ");

					// 3. 페이지 Parsing(해석)
					DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
					DocumentBuilder db = dbf.newDocumentBuilder();

					Document doc = db.parse(conn.getInputStream()); // xml 부를 파싱하여 객체화
					doc.getDocumentElement().normalize();

					//System.out.println("Root Element : " + doc.getDocumentElement().getNodeName());
					System.out.println("======================================================");
					int count = 0;
					NodeList nList = doc.getElementsByTagName("item");
					for (int i = 0; i < nList.getLength(); i++) {
						Node node = nList.item(i);
						count += count;
//						System.out.println("\nCurrent Element : " + node.getNodeName());
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							try {
								Element eElement = (Element) node;
						
								
								System.out.println("ptno    : " + getStrData(eElement, "ptno"));
								System.out.println("cntntsNo    : " + getStrData(eElement, "cntntsNo"));
								System.out.println("cntntsSj : " + getStrData(eElement, "cntntsSj"));
								System.out.println("rtnFileSeCode  : " + getStrData(eElement, "rtnFileSeCode"));
								System.out.println("rtnFileSn : " + getStrData(eElement, "rtnFileSn"));
								System.out.println("rtnOrginlFileNm : " + getStrData(eElement, "rtnOrginlFileNm"));
								System.out.println("rtnStreFileNm :  " + getStrData(eElement, "rtnStreFileNm") );
								System.out.println("rtnFileCours: " + getStrData(eElement, "rtnFileCours"));
								System.out.println("rtnImageDc: " + getStrData(eElement, "rtnImageDc"));
								System.out.println("rtnThumbFileNm: " + getStrData(eElement, "rtnThumbFileNm"));
								System.out.println("rtnImgSeCode: " + getStrData(eElement, "rtnImgSeCode"));
								System.out.println("rtnFileUrl: " + getStrData(eElement, "rtnFileUrl"));
								System.out.println("rtnThumbFileUrl: " + getStrData(eElement, "rtnThumbFileUrl"));
								System.out.println("rtnFileSeCodeName: " + getStrData(eElement, "rtnFileSeCodeName"));
								
								System.out.println("==========================" + count+" ============================");
								
								 int ptno = getIntData(eElement, "ptno");
								 String cntntsNo = getStrData(eElement, "cntntsNo");
								 String cntntsSj =  getStrData(eElement, "cntntsSj");
								 String rtnFileSeCode = getStrData(eElement, "rtnFileSeCode");
								 String rtnFileSn = getStrData(eElement, "rtnFileSn");
								 String rtnOrginlFileNm = getStrData(eElement, "rtnOrginlFileNm");
								 String rtnStreFileNm  =  getStrData(eElement, "rtnStreFileNm");
								 String rtnFileCours  = getStrData(eElement, "rtnFileCours");
								 String rtnImageDc  =  getStrData(eElement, "rtnImageDc");
								 String rtnThumbFileNm  = getStrData(eElement, "rtnThumbFileNm");
								 String rtnImgSeCode  = getStrData(eElement, "rtnImgSeCode");
								 String rtnFileUrl = getStrData(eElement, "rtnFileUrl");
								 String rtnFileUrl1 = getStrData(eElement, "rtnFileUrl1");
								 String rtnFileUrl2 = getStrData(eElement, "rtnFileUrl2");
								 String rtnThumbFileUrl = getStrData(eElement, "rtnThumbFileUrl");
								 String rtnThumbFileUrl1 = getStrData(eElement, "rtnThumbFileUrl1");
								 String rtnThumbFileUrl2 = getStrData(eElement, "rtnThumbFileUrl2");
								 String rtnFileSeCodeName = getStrData(eElement, "rtnFileSeCodeName");
									
								 Plant plant = new Plant(ptno, cntntsNo, cntntsSj, rtnFileSeCodeName, rtnFileSn, rtnOrginlFileNm, rtnFileSeCodeName, rtnStreFileNm, rtnFileCours, rtnImageDc, rtnThumbFileNm, rtnImgSeCode, rtnImgSeCode, rtnFileUrl, rtnFileUrl1, rtnFileUrl2, rtnThumbFileUrl, rtnThumbFileUrl1, rtnThumbFileUrl2, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, ptno, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, code, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, code, rtnFileSeCodeName, code, rtnFileSeCodeName, code, rtnFileSeCodeName, code, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, code, rtnFileSeCodeName, code, rtnFileSeCodeName, code, rtnFileSeCodeName, code, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, i, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, rtnFileSeCodeName, cntntsNo, cntntsSj, rtnFileSeCode, code, rtnFileSn, code, rtnFileSeCodeName, code, rtnOrginlFileNm, code, rtnStreFileNm, code, rtnFileCours, code, rtnImageDc, code, rtnThumbFileNm, code, rtnImgSeCode, code, rtnFileUrl, code, rtnFileUrl1, code, rtnFileUrl2, code, rtnThumbFileUrl, code, rtnThumbFileUrl1, code, rtnThumbFileUrl2, code, rtnFileSeCodeName);		
//								 Plant plant = new Plant(ptno, cntntsNo, cntntsSj, rtnFileSeCodeName, rtnFileSn, rtnOrginlFileNm, rtnFileSeCodeName, rtnStreFileNm, rtnFileCours, rtnImageDc, rtnThumbFileNm, rtnImgSeCode, rtnImgSeCode, rtnFileUrl, rtnFileUrl1, rtnFileUrl2, rtnThumbFileUrl, rtnThumbFileUrl1, rtnThumbFileUrl2, rtnFileSeCodeName);
								 
								 
								 //								 (ptno, cntntsNo, cntntsSj, rtnFileSeCode, rtnFileSn, rtnOrginlFileNm, rtnOrginFileNm, rtnStreFileNm, rtnFileCours, rtnImageDc, rtnThumbFileNm, rtnImgSeCode, rtnImgSeCodeName, rtnFileUrl, rtnFileUrl1, rtnFileUrl2, rtnThumbFileUrl, rtnThumbFileUrl1, rtnThumbFileUrl2, rtnFileSeCodeName, plntbneNm, plntzrNm, distbNm, fmlNm, fmlCodeNm, orgplceInfo, adviseInfo, imageEvlLinkCours, growthHgInfo, growthAraInfo, lefStleInfo, smellCode, smellCodeNm, toxctyInfo, prpgtEraInfo, etcEraInfo, managelevelCode, managelevelCodeNm, grwtveCode, grwtveCodeNm, grwhTpCode, grwhTpCodeNm, werLwetTpCode, werLwetTpCodeNm, hdCode, hdCodeNm, frtlzrInfo, soilInfo, watercycleSprngCode, watercycleSprngCodeNm, watercycleSummerCode, watercycleSummerCodeNm, watercycleAutumnCode, watercycleAutumnCodeNm, watercycleWerCode, watercycleWerCodeNm, dlthtsManageInfo, speclmanageInfo, fncltyInfo, flpodmtBigInfo, flpodmtMiddleInfo, flpodmtSmallInfo, widthBigInfo, widthMddlInfo, widthSmallInfo, vrticlBigInfo, vrticlMddlInfo, vrticlSmallInfo, hgBigInfo, hgMddlInfo, hgSmallInfo, volmeBigInfo, volmeMddlInfo, volmeSmallInfo, pcBigInfo, pcMddlInfo, pcSmallInfo, managedemanddoCode, managedemanddoCodeName, clCode, clCodeNm, grwhstleCode, grwhstleCodeNm, indoorpsncpacompositionCode, indoorpsncpacompositionCodeNm, eclgyCode, eclgyCodeNm, lefcolrCode, lefcolrCodeNm, lefmrkCode, lefmrkCodeNm, ignSeasonCode, ignSeasonCodeNm, flclrCode, flclrCodeNm, fmldecolrCode, fmldecolrCodeNm, fmldeSeasonCode, fmldeSeasonCodeNm, prpgtmthCode, prpgtmthCodeNm, lighttdemanddoCode, lighttdemanddoCodeNm, postngplaceCode, postngplaceCodeNm, dlthtsCode, dlthtsCodeNm)
//								 Plant plant2 = new Plant(0, cntntsNo, cntntsSj, rtnFileSeCode, rtnFileSn, rtnOrginlFileNm, null, rtnStreFileNm, rtnFileCours, rtnImageDc, rtnThumbFileNm, rtnImgSeCode, null, rtnFileUrl, null, null, rtnThumbFileUrl, null, null, rtnFileSeCodeName, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, 0, null, 0, null, 0, null, 0, null, 0, null, null, null, 0, null, 0, null, 0, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null);
//										restdateFood, scaleFood, seat, smoking, treatMenu, lcnsNo, originImgurl1, originImgurl2, smallImgurl);
								
								
							
//								System.out.println(food);
								list.add(plant);
								System.out.println("@@@@" + plant.getRtnThumbFileUrl());
							} catch (Exception e) {
								System.out.println("데이터가 잘못되었습니다!");
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				return list;
			}
	
	// 파이프로 구분된 문자열을 받아서 각각의 필드로 분리하고 데이터베이스에 저장하는 메소드
	public static Plant saveParsedData(Plant plant) {
		System.out.println("@@@@@분리 시작");
		System.out.println("@@@아직 분리되지 않음" + plant.getRtnThumbFileUrl());
		System.out.println("@@@아직 분리되지 않음" + plant.getRtnFileUrl());
	    String[] fields1 = plant.getRtnThumbFileUrl().split("\\|");
	    String[] fields2 = plant.getRtnFileUrl().split("\\|");
	    
	    // 필드가 적절한지 확인하고 필요한 변환 작업 수행
	    String rtnThumbFileUrl1 = fields1[0].trim(); // 예시: 첫 번째 필드를 그대로 사용
	    String rtnThumbFileUrl2 = fields1[1].trim(); // 예시: 첫 번째 필드를 그대로 사용
	    String rtnFileUrl1 = fields2[0].trim(); // 예시: 첫 번째 필드를 그대로 사용
	    String rtnFileUrl2 = fields2[1].trim(); // 예시: 첫 번째 필드를 그대로 사용
	    System.out.println("@@@분리 되었음" + rtnThumbFileUrl1);
	    System.out.println("@@@분리 되었음" + rtnFileUrl1);
	    
//	    String rtnThumbFileNm2 = fields1.length > 1 ? fields1[1].trim() : ""; // 예시: 두 번째 필드를 정수로 변환
//	    System.out.println("@@@@@@@ split : " + rtnThumbFileNm1 );
	    
//	    String rtnFileUrl2 = fields2.length > 1 ? fields2[1].trim() : ""; // 예시: 두 번째 필드를 정수로 변환
	    
	    
	    
//	    String rtnFileUrl1 = fields2[0].trim(); // 예시: 두 번째 필드를 정수로 변환
//	    String rtnFileUrl2 = fields2[1].trim(); // 예시: 두 번째 필드를 정수로 변환
	    System.out.println("@@ split나눠짐 : " + rtnThumbFileUrl1 );  // 분명히 나눠지는데...
	    
	    System.out.println("@@ split@ : " + rtnThumbFileUrl2 );
	    System.out.println("@@ split@@ : " + rtnFileUrl1 );
	    System.out.println("@@ split@@@ : " + rtnFileUrl2 );

	    // 변환된 필드 값들을 사용하여 새로운 엔티티 객체 생성
//	    YourEntity entity = new YourEntity();
	    plant.setRtnThumbFileUrl1(rtnThumbFileUrl1);
	    plant.setRtnThumbFileUrl2(rtnThumbFileUrl2);
	    plant.setRtnFileUrl1(rtnFileUrl1);
	    plant.setRtnFileUrl2(rtnFileUrl2);

	    return plant;
	}
	
	public static Plant DetailParse(Plant plant) {
//		String dateStr = searchDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		List<Plant> Detaillist = new ArrayList<>();

		StringBuilder urlBuffer = new StringBuilder(PlantDetailList_XML_URL); // 빌더는 성능때메 쓴다
		urlBuffer.append("?" + "apiKey" + "=" + KEY);
		urlBuffer.append("&" + "cntntsNo=" + plant.getCntntsNo());

		System.out.println(urlBuffer);

		//url을 통해 http 요청 코드
				try {
					URL url = new URL(urlBuffer.toString());  // url 객체 생성
					HttpURLConnection conn = (HttpURLConnection) url.openConnection(); // url 통해서 http 연결 요청
					conn.setRequestMethod("GET"); // get 방식 요청을 알리는 코드
					
					// api마다 요청에 대한 프로퍼티 (속성) 셋팅이 달라지는 코드
					conn.setRequestProperty("Accept", "application/xml");
//					conn.setRequestProperty("Accept", "application/json");
//					conn.setRequestProperty("content-type", "application/xml");
//					conn.setRequestProperty("content-type", "application/json");
					int code = conn.getResponseCode(); // 실제 호출하는 부 url로부터 페이징 요청
					System.out.println("ResponseCode : " + code);

					if (code < 200 || code > 300) {
						System.out.println("페이지가 잘못되었습니다.");
						return null;
					}
					System.out.println("parsing 시작 22");

					// 3. 페이지 Parsing(해석)
					DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
					DocumentBuilder db = dbf.newDocumentBuilder();

					Document doc = db.parse(conn.getInputStream()); // xml 부를 파싱하여 객체화
					doc.getDocumentElement().normalize();

					//System.out.println("Root Element : " + doc.getDocumentElement().getNodeName());
					System.out.println("======================================================");
					int count = 0;
					NodeList nList = doc.getElementsByTagName("item");
					for (int i = 0; i < nList.getLength(); i++) {
						Node node = nList.item(i);
						count += count;
//						System.out.println("\nCurrent Element : " + node.getNodeName());
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							try {
								Element eElement = (Element) node;
						
								
								System.out.println("cntntsNo    : " + getStrData(eElement, "cntntsNo"));
								System.out.println("plntbneNm: " + getStrData(eElement, "plntbneNm"));
								System.out.println("plntzrNm: " + getStrData(eElement, "plntzrNm"));
								System.out.println("fmlNm: " + getIntData(eElement, "fmlNm"));
								System.out.println("fmlCodeNm: " + getStrData(eElement, "fmlCodeNm"));
								System.out.println("orgplceInfo: " + getStrData(eElement, "orgplceInfo"));
								System.out.println("adviseInfo: " + getStrData(eElement, "adviseInfo"));
								System.out.println("imageEvlLinkCours: " + getStrData(eElement, "imageEvlLinkCours"));
								System.out.println("growthHgInfo: " + getStrData(eElement, "growthHgInfo"));
								System.out.println("growthAraInfo: " + getStrData(eElement, "growthAraInfo"));
								System.out.println("lefStleInfo: " + getStrData(eElement, "lefStleInfo"));
								System.out.println("smellCode: " + getIntData(eElement, "smellCode"));
								System.out.println("smellCodeNm: " + getStrData(eElement, "smellCodeNm"));
								System.out.println("toxctyInfo: " + getStrData(eElement, "toxctyInfo"));
								System.out.println("prpgtEraInfo: " + getStrData(eElement, "prpgtEraInfo"));
								System.out.println("etcEraInfo: " + getStrData(eElement, "etcEraInfo"));
								System.out.println("managelevelCode: " + getStrData(eElement, "managelevelCode"));
								System.out.println("managelevelCodeNm: " + getStrData(eElement, "managelevelCodeNm"));
								System.out.println("grwtveCode: " + getStrData(eElement, "grwtveCode"));
								System.out.println("grwtveCodeNm: " + getStrData(eElement, "grwtveCodeNm"));
								System.out.println("grwhTpCode: " + getStrData(eElement, "grwhTpCode"));
								System.out.println("grwhTpCodeNm: " + getStrData(eElement, "grwhTpCodeNm"));
								System.out.println("winterLwetTpCode: " + getStrData(eElement, "winterLwetTpCode"));
								System.out.println("winterLwetTpCodeNm: " + getStrData(eElement, "winterLwetTpCodeNm"));
								System.out.println("hdCode: " + getStrData(eElement, "hdCode"));
								System.out.println("hdCodeNm: " + getStrData(eElement, "hdCodeNm"));
								System.out.println("frtlzrInfo: " + getStrData(eElement, "frtlzrInfo"));
								System.out.println("soilInfo: " + getStrData(eElement, "soilInfo"));
								System.out.println("watercycleSprngCode: " + getIntData(eElement, "watercycleSprngCode"));
								System.out.println("watercycleSprngCodeNm: " + getStrData(eElement, "watercycleSprngCodeNm"));
								System.out.println("watercycleSummerCode: " + getIntData(eElement, "watercycleSummerCode"));
								System.out.println("watercycleSummerCodeNm: " + getStrData(eElement, "watercycleSummerCodeNm"));
								System.out.println("watercycleAutumnCode: " + getIntData(eElement, "watercycleAutumnCode"));
								System.out.println("watercycleAutumnCodeNm: " + getStrData(eElement, "watercycleAutumnCodeNm"));
								System.out.println("watercycleWinterCode: " + getIntData(eElement, "watercycleWinterCode"));
								System.out.println("watercycleWinterCodeNm: " + getStrData(eElement, "watercycleWinterCodeNm"));
								System.out.println("dlthtsManageInfo: " + getStrData(eElement, "dlthtsManageInfo"));
								System.out.println("speclmanageInfo: " + getStrData(eElement, "speclmanageInfo"));
								System.out.println("fncltyInfo: " + getStrData(eElement, "fncltyInfo"));
								System.out.println("flpodmtBigInfo: " + getIntData(eElement, "flpodmtBigInfo"));  //int
								System.out.println("flpodmtMiddleInfo: " + getStrData(eElement, "flpodmtMiddleInfo"));
								System.out.println("flpodmtSmallInfo: " + getStrData(eElement, "flpodmtSmallInfo"));
								System.out.println("widthBigInfo: " + getStrData(eElement, "widthBigInfo"));
								System.out.println("widthMddlInfo: " + getStrData(eElement, "widthMddlInfo"));
								System.out.println("widthSmallInfo: " + getStrData(eElement, "widthSmallInfo"));
								System.out.println("vrticlBigInfo: " + getStrData(eElement, "vrticlBigInfo"));
								System.out.println("vrticlMddlInfo: " + getStrData(eElement, "vrticlMddlInfo"));
								System.out.println("vrticlSmallInfo: " + getStrData(eElement, "vrticlSmallInfo"));
								System.out.println("hgBigInfo: " + getStrData(eElement, "hgBigInfo"));
								System.out.println("hgMddlInfo: " + getStrData(eElement, "hgMddlInfo"));
								System.out.println("hgSmallInfo: " + getStrData(eElement, "hgSmallInfo"));
								System.out.println("volmeBigInfo: " + getStrData(eElement, "volmeBigInfo"));
								System.out.println("volmeMddlInfo: " + getStrData(eElement, "volmeMddlInfo"));
								System.out.println("volmeSmallInfo: " + getStrData(eElement, "volmeSmallInfo"));
								System.out.println("pcBigInfo: " + getStrData(eElement, "pcBigInfo"));
								System.out.println("pcMddlInfo: " + getStrData(eElement, "pcMddlInfo"));
								System.out.println("pcSmallInfo: " + getStrData(eElement, "pcSmallInfo"));
								System.out.println("managedemanddoCode: " + getIntData(eElement, "managedemanddoCode"));
								System.out.println("managedemanddoCodeName: " + getStrData(eElement, "managedemanddoCodeName"));
								System.out.println("clCode: " + getIntData(eElement, "clCode"));
								System.out.println("clCodeNm: " + getStrData(eElement, "clCodeNm"));
								System.out.println("grwhstleCode: " + getIntData(eElement, "grwhstleCode"));
								System.out.println("grwhstleCodeNm: " + getStrData(eElement, "grwhstleCodeNm"));
								System.out.println("indoorpsncpacompositionCode: " + getIntData(eElement, "indoorpsncpacompositionCode"));
								System.out.println("indoorpsncpacompositionCodeNm: " + getStrData(eElement, "indoorpsncpacompositionCodeNm"));
								System.out.println("eclgyCode: " + getIntData(eElement, "eclgyCode"));
								System.out.println("eclgyCodeNm: " + getStrData(eElement, "eclgyCodeNm"));
								System.out.println("lefcolrCode: " + getIntData(eElement, "lefcolrCode"));
								System.out.println("lefcolrCodeNm: " + getStrData(eElement, "lefcolrCodeNm"));
								System.out.println("lefmrkCode: " + getIntData(eElement, "lefmrkCode"));
								System.out.println("lefmrkCodeNm: " + getStrData(eElement, "lefmrkCodeNm"));
								System.out.println("ignSeasonCode: " + getIntData(eElement, "ignSeasonCode"));
								System.out.println("ignSeasonCodeNm: " + getStrData(eElement, "ignSeasonCodeNm"));
								System.out.println("flclrCode: " + getIntData(eElement, "flclrCode"));
								System.out.println("flclrCodeNm: " + getStrData(eElement, "flclrCodeNm"));
								System.out.println("fmldecolrCode: " + getIntData(eElement, "fmldecolrCode"));
								System.out.println("fmldecolrCodeNm: " + getStrData(eElement, "fmldecolrCodeNm"));
								System.out.println("fmldeSeasonCode: " + getIntData(eElement, "fmldeSeasonCode"));
								System.out.println("fmldeSeasonCodeNm: " + getStrData(eElement, "fmldeSeasonCodeNm"));
								System.out.println("prpgtmthCode: " + getIntData(eElement, "prpgtmthCode"));
								System.out.println("prpgtmthCodeNm: " + getStrData(eElement, "prpgtmthCodeNm"));
								System.out.println("lighttdemanddoCode: " + getIntData(eElement, "lighttdemanddoCode"));
								System.out.println("lighttdemanddoCodeNm: " + getStrData(eElement, "lighttdemanddoCodeNm"));
								System.out.println("postngplaceCode: " + getIntData(eElement, "postngplaceCode"));
								System.out.println("postngplaceCodeNm: " + getStrData(eElement, "postngplaceCodeNm"));
								System.out.println("dlthtsCode: " + getIntData(eElement, "dlthtsCode"));
								System.out.println("dlthtsCodeNm: " + getStrData(eElement, "dlthtsCodeNm"));
								
								System.out.println("==========================" + count+" ============================");

								 String cntntsNo = getStrData(eElement, "cntntsNo");
								 String plntbneNm = getStrData(eElement, "plntbneNm");
								 String plntzrNm = getStrData(eElement, "plntzrNm");
								 String distbNm = getStrData(eElement, "distbNm");
								 int fmlNm = getIntData(eElement, "fmlNm");
								 String fmlCodeNm = getStrData(eElement, "fmlCodeNm");
								 String orgplceInfo = getStrData(eElement, "orgplceInfo");
								 String adviseInfo = getStrData(eElement, "adviseInfo");
								 String growthHgInfo = getStrData(eElement, "growthHgInfo");
								 String growthAraInfo = getStrData(eElement, "growthAraInfo");
								 String lefStleInfo = getStrData(eElement, "lefStleInfo");
								 int smellCode = getIntData(eElement, "smellCode");
								 String smellCodeNm = getStrData(eElement, "smellCodeNm");
								 String toxctyInfo = getStrData(eElement, "toxctyInfo");
								 String prpgtEraInfo = getStrData(eElement, "prpgtEraInfo");
								 String etcEraInfo = getStrData(eElement, "etcEraInfo");
								 String managelevelCode = getStrData(eElement, "managelevelCode");
								 String managelevelCodeNm = getStrData(eElement, "managelevelCodeNm");
								 int grwtveCode = getIntData(eElement, "grwtveCode");
								 String grwtveCodeNm = getStrData(eElement, "grwtveCodeNm");
								 int grwhTpCode = getIntData(eElement, "grwhTpCode");
								 String grwhTpCodeNm = getStrData(eElement, "grwhTpCodeNm");
								 int winterLwetTpCode = getIntData(eElement, "winterLwetTpCode");
								 String winterLwetTpCodeNm = getStrData(eElement, "winterLwetTpCodeNm");
								 int hdCode = getIntData(eElement, "hdCode");
								 String hdCodeNm = getStrData(eElement, "hdCodeNm");
								 String frtlzrInfo = getStrData(eElement, "frtlzrInfo");
								 String soilInfo = getStrData(eElement, "soilInfo");
								 int watercycleSprngCode = getIntData(eElement, "watercycleSprngCode");
								 String watercycleSprngCodeNm = getStrData(eElement, "watercycleSprngCodeNm");
								 int watercycleSummerCode = getIntData(eElement, "watercycleSummerCode");
								 String watercycleSummerCodeNm = getStrData(eElement, "watercycleSummerCodeNm");
								 int watercycleAutumnCode = getIntData(eElement, "watercycleAutumnCode");
								 String watercycleAutumnCodeNm = getStrData(eElement, "watercycleAutumnCodeNm");
								 int watercycleWinterCode = getIntData(eElement, "watercycleWinterCode");
								 String watercycleWinterCodeNm = getStrData(eElement, "watercycleWinterCodeNm");
								 String dlthtsManageInfo = getStrData(eElement, "dlthtsManageInfo");
								 String speclmanageInfo = getStrData(eElement, "speclmanageInfo");
								 String fncltyInfo = getStrData(eElement, "fncltyInfo");
								 int flpodmtBigInfo = getIntData(eElement, "flpodmtBigInfo");
								 String flpodmtMiddleInfo = getStrData(eElement, "flpodmtMiddleInfo");
								 String flpodmtSmallInfo = getStrData(eElement, "flpodmtSmallInfo");
								 String widthBigInfo = getStrData(eElement, "widthBigInfo");
								String widthMddlInfo = getStrData(eElement, "widthMddlInfo");
								String widthSmallInfo = getStrData(eElement, "widthSmallInfo");
								String vrticlBigInfo = getStrData(eElement, "vrticlBigInfo");
								String vrticlMddlInfo = getStrData(eElement, "vrticlMddlInfo");
								String vrticlSmallInfo = getStrData(eElement, "vrticlSmallInfo");
								String hgBigInfo = getStrData(eElement, "hgBigInfo");
								String hgMddlInfo = getStrData(eElement, "hgMddlInfo");
								String hgSmallInfo = getStrData(eElement, "hgSmallInfo");
								String volmeBigInfo = getStrData(eElement, "volmeBigInfo");
								String volmeMddlInfo = getStrData(eElement, "volmeMddlInfo");
								String volmeSmallInfo = getStrData(eElement, "volmeSmallInfo");
								String pcBigInfo = getStrData(eElement, "pcBigInfo");
								String pcMddlInfo = getStrData(eElement, "pcMddlInfo");
								String pcSmallInfo = getStrData(eElement, "pcSmallInfo");
								int managedemanddoCode = getIntData(eElement, "managedemanddoCode");
								String managedemanddoCodeName = getStrData(eElement, "managedemanddoCodeName");
								int clCode = getIntData(eElement, "clCode");
								String clCodeNm = getStrData(eElement, "clCodeNm");
								int grwhstleCode = getIntData(eElement, "grwhstleCode");
								String grwhstleCodeNm = getStrData(eElement, "grwhstleCodeNm");
								int indoorpsncpacompositionCode = getIntData(eElement, "indoorpsncpacompositionCode");
								String indoorpsncpacompositionCodeNm = getStrData(eElement, "indoorpsncpacompositionCodeNm");
								int eclgyCode = getIntData(eElement, "eclgyCode");
								String eclgyCodeNm = getStrData(eElement, "eclgyCodeNm");
								int lefcolrCode = getIntData(eElement, "lefcolrCode");
								String lefcolrCodeNm = getStrData(eElement, "lefcolrCodeNm");
								int lefmrkCode = getIntData(eElement, "lefmrkCode");
								String lefmrkCodeNm = getStrData(eElement, "lefmrkCodeNm");
								int ignSeasonCode = getIntData(eElement, "ignSeasonCode");
								String ignSeasonCodeNm = getStrData(eElement, "ignSeasonCodeNm");
								int flclrCode = getIntData(eElement, "flclrCode");
								String flclrCodeNm = getStrData(eElement, "flclrCodeNm");
								int fmldecolrCode =getIntData(eElement, "fmldecolrCode");
								String fmldecolrCodeNm = getStrData(eElement, "fmldecolrCodeNm");
								int fmldeSeasonCode = getIntData(eElement, "fmldeSeasonCode");
								String fmldeSeasonCodeNm = getStrData(eElement, "fmldeSeasonCodeNm");
								int prpgtmthCode = getIntData(eElement, "prpgtmthCode");
								String prpgtmthCodeNm = getStrData(eElement, "prpgtmthCodeNm");
								int lighttdemanddoCode = getIntData(eElement, "lighttdemanddoCode");
								String lighttdemanddoCodeNm = getStrData(eElement, "lighttdemanddoCodeNm");
								int postngplaceCode = getIntData(eElement, "postngplaceCode");
								String postngplaceCodeNm = getStrData(eElement, "postngplaceCodeNm");
								int dlthtsCode = getIntData(eElement, "dlthtsCode");
								String dlthtsCodeNm = getStrData(eElement, "dlthtsCodeNm");

								
								
//								private String rtnFileSeCodeName;
//								private String plntbneNm;
//								private String plntzrNm;
//								private String distbNm;
//								private String fmlNm;
//								private String fmlCodeNm;
//								private String orgplceInfo;
//								private String adviseInfo;
//								private String imageEvlLinkCours;
//								private String growthHgInfo;
//								private String growthAraInfo;
//								private String lefStleInfo;
//								private String smellCode;
//								private String smellCodeNm;
//								private String toxctyInfo;
//								private String prpgtEraInfo;
//								private String etcEraInfo;
//								private String managelevelCode;
//								private String managelevelCodeNm;
//								private String grwtveCode;
//								private String grwtveCodeNm;
//								private String grwhTpCode;
//								private String grwhTpCodeNm;
//								private String winterLwetTpCode;
//								private String winterLwetTpCodeNm;
//								private String hdCode;
//								private String hdCodeNm;
//								private String frtlzrInfo;
//								private String soilInfo;
//								private String watercycleSprngCode;
//								private String watercycleSprngCodeNm;
//								private String watercycleSummerCode;
//								private String watercycleSummerCodeNm;
//								private String watercycleAutumnCode;
//								private String watercycleAutumnCodeNm;
//								private String watercycleWinterCode;
//								private String watercycleWinterCodeNm;
//								private String dlthtsManageInfo;
//								private String speclmanageInfo;
//								private String fncltyInfo;
//								private String flpodmtBigInfo;
//								private String flpodmtMiddleInfo;
//								private String flpodmtSmallInfo;
//								private String widthBigInfo;
//								private String widthMddlInfo;
//								private String widthSmallInfo;
//								private String vrticlBigInfo;
//								private String vrticlMddlInfo;
//								private String vrticlSmallInfo;
//								private String hgBigInfo;
//								private String hgMddlInfo;
//								private String hgSmallInfo;
//								private String volmeBigInfo;
//								private String volmeMddlInfo;
//								private String volmeSmallInfo;
//								private String pcBigInfo;
//								private String pcMddlInfo;
//								private String pcSmallInfo;
//								private String managedemanddoCode; 
//								private String clCode;
//								private String clCodeNm;
//								private String grwhstleCode;
//								private String grwhstleCodeNm;
//								private String indoorpsncpacompositionCode;
//								private String indoorpsncpacompositionCodeNm;
//								private String eclgyCode;
//								private String eclgyCodeNm;
//								private String lefcolrCode;
//								private String lefcolrCodeNm;
//								private String lefmrkCode;
//								private String lefmrkCodeNm;
//								private String ignSeasonCode;
//								private String ignSeasonCodeNm;
//								private String flclrCode;
//								private String flclrCodeNm;
//								private String fmldecolrCode;
//								private String fmldecolrCodeNm;
//								private String fmldeSeasonCode;
//								private String fmldeSeasonCodeNm;
//								private String prpgtmthCode;
//								private String prpgtmthCodeNm;
//								private String lighttdemanddoCode;
//								private String lighttdemanddoCodeNm;
//								private String postngplaceCode;
//								private String postngplaceCodeNm;
//								private String dlthtsCode;
//								private String dlthtsCodeNm;
//								private String rtnImgSeCodeName;
//								private String rtnOrginFileNm;
//								
//								int cntntsNo = getIntData(eElement, "cntntsNo");
//								String cntntsSj = getStrData(eElement, "cntntsSj");
//								String rtnFileSeCode = getStrData(eElement, "rtnFileSeCode");
//								int rtnFileSn = getIntData(eElement, "rtnFileSn");
//								String rtnOrginlFileNm = getStrData(eElement, "rtnOrginlFileNm");
//								String rtnStreFileNm = getStrData(eElement, "rtnStreFileNm");
//								String FileCours = getStrData(eElement, "FileCours");
//								String rtnImageDc = getStrData(eElement, "rtnImageDc");
//								String rtnThumbFileNm = getStrData(eElement, "rtnThumbFileNm");
//								String ImgSeCode = getStrData(eElement, "ImgSeCode");
//								String rtnFileUrl = getStrData(eElement, "rtnFileUrl");
//								String catrtnThumbFileUrl3 = getStrData(eElement, "catrtnThumbFileUrl3");

								 plant.setCntntsNo(cntntsNo);
								 plant.setPlntbneNm(plntbneNm);
								 plant.setPlntzrNm(plntzrNm);
								 plant.setDistbNm(distbNm);
								 plant.setFmlNm(fmlNm);
								 plant.setFmlCodeNm(fmlCodeNm);
								 plant.setOrgplceInfo(orgplceInfo);
								 plant.setAdviseInfo(adviseInfo);
								 plant.setGrowthHgInfo(growthHgInfo);
								 plant.setGrowthAraInfo(growthAraInfo);
								 plant.setLefStleInfo(lefStleInfo);
								 plant.setSmellCode(smellCode);
								 plant.setSmellCodeNm(smellCodeNm);
								 plant.setToxctyInfo(toxctyInfo);
								 plant.setPrpgtEraInfo(prpgtEraInfo);
								 plant.setEtcEraInfo(etcEraInfo);
								 plant.setManagelevelCode(managelevelCode);
								 plant.setManagelevelCodeNm(managelevelCodeNm);
								 plant.setGrwtveCode(grwtveCode);
								 plant.setGrwtveCodeNm(grwtveCodeNm);
								 plant.setGrwhTpCode(grwhTpCode);
								 plant.setGrwhTpCodeNm(grwhTpCodeNm);
								 plant.setWinterLwetTpCode(winterLwetTpCode);
								 plant.setWinterLwetTpCodeNm(winterLwetTpCodeNm);
								 plant.setHdCode(hdCode);
								 plant.setHdCodeNm(hdCodeNm);
								 plant.setFrtlzrInfo(frtlzrInfo);
								 plant.setSoilInfo(soilInfo);
								 plant.setWatercycleSprngCode(watercycleSprngCode);
								 plant.setWatercycleSprngCodeNm(watercycleSprngCodeNm);
								 plant.setWatercycleSummerCode(watercycleSummerCode);
								 plant.setWatercycleSummerCodeNm(watercycleSummerCodeNm);
								 plant.setWatercycleAutumnCode(watercycleAutumnCode);
								 plant.setWatercycleAutumnCodeNm(watercycleAutumnCodeNm);
								 plant.setWatercycleWinterCode(watercycleWinterCode);
								 plant.setWatercycleWinterCodeNm(watercycleWinterCodeNm);
								 plant.setDlthtsManageInfo(dlthtsManageInfo);
								 plant.setSpeclmanageInfo(speclmanageInfo);
								 plant.setFncltyInfo(fncltyInfo);
								 plant.setFlpodmtBigInfo(flpodmtBigInfo);
								 plant.setFlpodmtMiddleInfo(flpodmtMiddleInfo);
								 plant.setFlpodmtSmallInfo(flpodmtSmallInfo);
								 plant.setWidthBigInfo(widthBigInfo);
								 plant.setWidthMddlInfo(widthMddlInfo);
								 plant.setWidthSmallInfo(widthSmallInfo);
								 plant.setVrticlBigInfo(vrticlBigInfo);
								 plant.setVrticlMddlInfo(vrticlMddlInfo);
								 plant.setVrticlSmallInfo(vrticlSmallInfo);
								 plant.setHgBigInfo(hgBigInfo);
								 plant.setHgMddlInfo(hgMddlInfo);
								 plant.setHgSmallInfo(hgSmallInfo);
								 plant.setVolmeBigInfo(volmeBigInfo);
								 plant.setVolmeMddlInfo(volmeMddlInfo);
								 plant.setVolmeSmallInfo(volmeSmallInfo);
								 plant.setPcBigInfo(pcBigInfo);
								 plant.setPcMddlInfo(pcMddlInfo);
								 plant.setPcSmallInfo(pcSmallInfo);
								 plant.setManagedemanddoCode(managedemanddoCode);
								 plant.setManagedemanddoCodeName(managedemanddoCodeName);
								 plant.setClCode(clCode);
								 plant.setClCodeNm(clCodeNm);
								 plant.setGrwhstleCode(grwhstleCode);
								 plant.setGrwhstleCodeNm(grwhstleCodeNm);
								 plant.setIndoorpsncpacompositionCode(indoorpsncpacompositionCode);
								 plant.setIndoorpsncpacompositionCodeNm(indoorpsncpacompositionCodeNm);
								 plant.setEclgyCode(eclgyCode);
								 plant.setEclgyCodeNm(eclgyCodeNm);
								 plant.setLefcolrCode(lefcolrCode);
								 plant.setLefcolrCodeNm(lefcolrCodeNm);
								 plant.setLefmrkCode(lefmrkCode);
								 plant.setLefmrkCodeNm(lefmrkCodeNm);
								 plant.setIgnSeasonCode(ignSeasonCode);
								 plant.setIgnSeasonCodeNm(ignSeasonCodeNm);
								 plant.setFlclrCode(flclrCode);
								 plant.setFlclrCodeNm(flclrCodeNm);
								 plant.setFmldecolrCode(fmldecolrCode);
								 plant.setFmldecolrCodeNm(fmldecolrCodeNm);
								 plant.setFmldeSeasonCode(fmldeSeasonCode);
								 plant.setFmldeSeasonCodeNm(fmldeSeasonCodeNm);
								 plant.setPrpgtmthCode(prpgtmthCode);
								 plant.setPrpgtmthCodeNm(prpgtmthCodeNm);
								 plant.setLighttdemanddoCode(lighttdemanddoCode);
								 plant.setLighttdemanddoCodeNm(lighttdemanddoCodeNm);
								 plant.setPostngplaceCode(postngplaceCode);
								 plant.setPostngplaceCodeNm(postngplaceCodeNm);
								plant.setDlthtsCode(dlthtsCode);
								plant.setDlthtsCodeNm(dlthtsCodeNm);
								
//								Detaillist.add(plant);
								
							} catch (Exception e) {
								System.out.println("데이터가 잘못되었습니다!");
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				return plant;
			}
	
	
	
	
	private static String getStrData(Element eElement, String tagName) {
		try {
			return eElement.getElementsByTagName(tagName).item(0).getTextContent();
		} catch (Exception e) {
			return "-";
		}
	}

	private static int getIntData(Element eElement, String tagName) {
		try {
			return Integer.parseInt(eElement.getElementsByTagName(tagName).item(0).getTextContent());
		} catch (Exception e) {
			return 0;
		}
	}

	private static long getLongData(Element eElement, String tagName) {
		try {
			return Long.parseLong(eElement.getElementsByTagName(tagName).item(0).getTextContent());
		} catch (Exception e) {
			return 0;
		}
	}

	private static double getDoubleData(Element eElement, String tagName) {
		try {
			return Double.parseDouble(eElement.getElementsByTagName(tagName).item(0).getTextContent());
		} catch (Exception e) {
			return 0.0;
		}
	}


	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	private static Date getDateData(Element eElement, String tagName) {
		try {
			String str =eElement.getElementsByTagName(tagName).item(0).getTextContent();
			return sdf.parse(str);
		} catch (Exception e) {
			return null;
		}
	}

}
