package com.multi.dahon.api;

import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.hibernate.sql.results.graph.embeddable.internal.AbstractNonAggregatedIdentifierMappingInitializer;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.multi.dahon.animal.model.vo.Animal;
import com.multi.dahon.plant.model.vo.Plant;
import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;

import jakarta.persistence.Column;
public class apiParsingAnimal2 {
	
	public static void main(String[] args) {
		List<Animal> list1 = DetailParse4();
		System.out.println("전체 내역1 : " + list1.toString().replace("],","],\\n"));
		for(int i=0; i<list1.size(); i++) {
			parse(list1.get(i));
		}
		for(int i=0; i<list1.size(); i++) {
			DetailParse1(list1.get(i));
			System.out.println("전체 내역2 : " + list1.toString().replace("],","],\n"));
		}
		System.out.println("전체 내역3 : " + list1.toString().replace("],","],\n"));
		for(int i=0; i<list1.size(); i++) {
			DetailParse2(list1.get(i));
			System.out.println("전체 내역4 : " + list1.toString().replace("],","],\\n"));
		}
		System.out.println("전체 내역5@@@@@@@@@ : " + list1.toString().replace("],","],\\n"));
		
		 
//		 saveParsedData(null, null, null);		
	}
	public static final String KEY = "p%2BFVc5OsZMt6%2FY2XE0P8H0C1yMbOJNO1uhCrn4dNsKVyYG6lt0DxS%2Fsv4Gkw0Mpeu4AEoRzZ6b9zbhxajBR9%2FQ%3D%3D";
	public static final String AnimalBasic_XML_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido";
	public static final String AnimalDetail_XML_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sigungu";
	public static final String AnimalDetail2_XML_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/shelter";
	public static final String AnimalDetail3_XML_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/kind";
	public static final String AnimalDetailFinal_XML_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";
//	public static final String WEEKLY_BOXOFFICE_JSON_URL = "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json";

//동물  전체 리스트 파싱  . 먼저 담아주자
	public static List<Animal> DetailParse4() {
//		String dateStr = searchDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		List<Animal> list = new ArrayList<>();
		
		StringBuilder urlBuffer = new StringBuilder(AnimalDetailFinal_XML_URL); // 빌더는 성능때메 쓴다
		urlBuffer.append("?" + "bgnde" + "=20211201");
		urlBuffer.append("&" + "endde" + "=20221231");
		urlBuffer.append("&" + "pageNo" + "=" + "1");  
		urlBuffer.append("&" + "numOfRows" + "=100");  
		urlBuffer.append("&" + "serviceKey" + "=" + KEY);
		
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
			System.out.println("동물 parsing 시작 44");
			
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
						
						System.out.println("anno: " + getIntData(eElement, "anno"));
						System.out.println("orgCd: " + getStrData(eElement, "orgCd"));
						System.out.println("orgdownNm: " + getStrData(eElement, "orgdownNm"));
						
						System.out.println("careRegNo    : " + getIntData(eElement, "careRegNo"));
						System.out.println("careNm: " + getStrData(eElement, "careNm"));
						
						System.out.println("kindCd    : " + getStrData(eElement, "kindCd"));
						System.out.println("desertionNo    : " + getIntData(eElement, "desertionNo"));
						System.out.println("filename    : " + getStrData(eElement, "filename"));
						System.out.println("happenDt    : " + getStrData(eElement, "happenDt"));
						System.out.println("happenPlace    : " + getStrData(eElement, "happenPlace"));
						
						System.out.println("colorCd    : " + getStrData(eElement, "colorCd"));
						System.out.println("age    : " + getStrData(eElement, "age"));
						System.out.println("weight    : " + getStrData(eElement, "weight"));
						System.out.println("noticeNo    : " + getStrData(eElement, "noticeNo"));
						System.out.println("noticeSdt    : " + getStrData(eElement, "noticeSdt"));
						System.out.println("noticeEdt    : " + getStrData(eElement, "noticeEdt"));
						System.out.println("popfile    : " + getStrData(eElement, "popfile"));
						System.out.println("processState    : " + getStrData(eElement, "processState"));
						System.out.println("sexCd    : " + getStrData(eElement, "sexCd"));
						
						System.out.println("neuterYn    : " + getStrData(eElement, "neuterYn"));
						System.out.println("specialMark    : " + getStrData(eElement, "specialMark"));
						System.out.println("careTel    : " + getStrData(eElement, "careTel"));
						System.out.println("careAddr    : " + getStrData(eElement, "careAddr"));
						System.out.println("orgNm    : " + getStrData(eElement, "orgNm"));
						System.out.println("chargeNm    : " + getStrData(eElement, "chargeNm"));
						System.out.println("officetel    : " + getStrData(eElement, "officetel"));
						
						
						
						int anno = getIntData(eElement, "ptno");
						 String orgCd = getStrData(eElement, "orgCd");
						 String orgdownNm = getStrData(eElement, "orgdownNm");
						 String orgCd2 = getStrData(eElement, "orgCd2");
						 String orgdownNm2 = getStrData(eElement, "orgdownNm2");
						String uprCd2 = getStrData(eElement, "uprCd2");
						int careRegNo = getIntData(eElement, "careRegNo");
						String careNm = getStrData(eElement, "careNm");
						String kindCd = getStrData(eElement, "kindCd");
						String KNm = getStrData(eElement, "KNm");
						String desertionNo = getStrData(eElement, "desertionNo");
						String filename = getStrData(eElement, "filename");
						String happenDt = getStrData(eElement, "happenDt");
						String happenPlace = getStrData(eElement, "happenPlace");
						
						String colorCd = getStrData(eElement, "colorCd");
						String age = getStrData(eElement, "age");
						String weight = getStrData(eElement, "weight");
						String noticeNo = getStrData(eElement, "noticeNo");
						String noticeSdt = getStrData(eElement, "noticeSdt");
						String noticeEdt = getStrData(eElement, "noticeEdt");
						String popfile = getStrData(eElement, "popfile");
						String processState = getStrData(eElement, "processState");
						String sexCd = getStrData(eElement, "sexCd");
						
						String neuterYn = getStrData(eElement, "neuterYn");
						String specialMark = getStrData(eElement, "specialMark");
						String careTel = getStrData(eElement, "careTel");
						String careAddr = getStrData(eElement, "careAddr");
						String orgNm = getStrData(eElement, "orgNm");
						String chargeNm = getStrData(eElement, "chargeNm");
						String officetel = getStrData(eElement, "officetel");
//						animal.setKindCd(kindCd);
//						animal.setDesertionNo(desertionNo);
//						animal.setFilename(filename);
//						animal.setHappenDt(happenDt);
//						animal.setHappenPlace(happenPlace);
//						animal.setColorCd(colorCd);
//						animal.setAge(age);
//						animal.setWeight(weight);
//						animal.setNoticeNo(noticeNo);
//						animal.setNoticeSdt(noticeSdt);
//						animal.setNoticeEdt(noticeEdt);
//						animal.setPopfile(popfile);
//						animal.setProcessState(processState);
//						animal.setSexCd(sexCd);
//						
//						animal.setNeuterYn(neuterYn);
//						animal.setSpecialMark(specialMark);
//						animal.setCareTel(careTel);
//						animal.setCareAddr(careAddr);
//						animal.setOrgNm(orgNm);
//						animal.setChargeNm(chargeNm);
//						animal.setOfficetel(officetel);
						
						
						Animal animal = new Animal(anno, orgCd, orgdownNm, orgdownNm2, uprCd2, orgCd2, careRegNo, careNm, kindCd, KNm, desertionNo, filename, happenDt, happenPlace, colorCd, age, weight, noticeNo, noticeSdt, noticeEdt, popfile, processState, sexCd, neuterYn, specialMark, careTel, careAddr, orgNm, chargeNm, officetel);
						
						list.add(animal);
					} catch (Exception e) {
						System.out.println("데이터가 잘못되었습니다!");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(list.toString());
		return list;
	}

	
	public static Animal parse(Animal animal) {
//		String dateStr = searchDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
//		List<Animal> list = new ArrayList<>();

		StringBuilder urlBuffer = new StringBuilder(AnimalBasic_XML_URL); // 빌더는 성능때메 쓴다
		
		urlBuffer.append("?" + "numOfRows" + "=100");  
		urlBuffer.append("&" + "pageNo" + "=" + "1");  
		urlBuffer.append("&" + "serviceKey" + "=" + KEY);

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
					System.out.println("@@@@ 동물 시도코드 parsing 시작 ");

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
								
								System.out.println("orgCd: " + getStrData(eElement, "orgCd"));
								System.out.println("orgdownNm: " + getStrData(eElement, "orgdownNm"));
//								System.out.println("orgdownNm2    : " + getStrData(eElement, "orgdownNm2"));
//								System.out.println("orgCd2    : " + getStrData(eElement, "orgCd2"));
//								System.out.println("careRegNo    : " + getIntData(eElement, "careRegNo"));
//								System.out.println("careNm    : " + getStrData(eElement, "careNm"));
//								System.out.println("kindCd    : " + getIntData(eElement, "kindCd"));
//								System.out.println("KNm    : " + getStrData(eElement, "KNm"));
//								System.out.println("desertionNo    : " + getIntData(eElement, "desertionNo"));
//								System.out.println("filename    : " + getStrData(eElement, "filename"));
//								System.out.println("happenDt    : " + getStrData(eElement, "happenDt"));
//								System.out.println("happenPlace    : " + getStrData(eElement, "happenPlace"));
//								
//								System.out.println("colorCd    : " + getStrData(eElement, "colorCd"));
//								System.out.println("age    : " + getIntData(eElement, "age"));
//								System.out.println("weight    : " + getDoubleData(eElement, "weight"));
//								System.out.println("noticeNo    : " + getIntData(eElement, "noticeNo"));
//								System.out.println("noticeSdt    : " + getStrData(eElement, "noticeSdt"));
//								System.out.println("noticeEdt    : " + getStrData(eElement, "noticeEdt"));
//								System.out.println("popfile    : " + getStrData(eElement, "popfile"));
//								System.out.println("processState    : " + getStrData(eElement, "processState"));
//								System.out.println("sexCd    : " + getStrData(eElement, "sexCd"));
//								
//								System.out.println("neuterYn    : " + getStrData(eElement, "neuterYn"));
//								System.out.println("specialMark    : " + getStrData(eElement, "specialMark"));
//								System.out.println("careTel    : " + getStrData(eElement, "careTel"));
//								System.out.println("careAddr    : " + getStrData(eElement, "careAddr"));
//								System.out.println("orgNm    : " + getStrData(eElement, "orgNm"));
//								System.out.println("chargeNm    : " + getStrData(eElement, "chargeNm"));
//								System.out.println("officetel    : " + getStrData(eElement, "officetel"));
								
								
							
								 String orgCd = getStrData(eElement, "orgCd");
								 String orgdownNm = getStrData(eElement, "orgdownNm");
//								 String orgCd2 = getStrData(eElement, "orgCd");
//								 String orgdownNm2 = getStrData(eElement, "orgdownNm");
//								 String kindCd = getStrData(eElement, "kindCd");
//								String KNm = getStrData(eElement, "KNm");
//								String desertionNo = getStrData(eElement, "desertionNo");
//								String filename = getStrData(eElement, "filename");
//								String happenDt = getStrData(eElement, "happenDt");
//								String happenPlace = getStrData(eElement, "happenPlace");
//								
//								String colorCd = getStrData(eElement, "colorCd");
//								String age = getStrData(eElement, "age");
//								String weight = getStrData(eElement, "weight");
//								String noticeNo = getStrData(eElement, "noticeNo");
//								String noticeSdt = getStrData(eElement, "noticeSdt");
//								String noticeEdt = getStrData(eElement, "noticeEdt");
//								String popfile = getStrData(eElement, "popfile");
//								String processState = getStrData(eElement, "processState");
//								String sexCd = getStrData(eElement, "sexCd");
//								
//								String neuterYn = getStrData(eElement, "neuterYn");
//								String specialMark = getStrData(eElement, "specialMark");
//								String careTel = getStrData(eElement, "careTel");
//								String careAddr = getStrData(eElement, "careAddr");
//								String orgNm = getStrData(eElement, "orgNm");
//								String chargeNm = getStrData(eElement, "chargeNm");
//								String officetel = getStrData(eElement, "officetel");
//									
//								System.out.println("========================여기 오나@@@@@@@@@@============================");
								
							
								 animal.setUprCd2(orgCd);  //6110000
								 animal.setOrgdownNm(orgdownNm);  //서울 특별
								
//								Detaillist.add(plant);
								
							} catch (Exception e) {
								System.out.println("데이터가 잘못되었습니다!");
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				return animal;
			}
	
	
	public static Animal DetailParse1(Animal animal) {
//		String dateStr = searchDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		List<Animal> Detaillist = new ArrayList<>();

		StringBuilder urlBuffer = new StringBuilder(AnimalDetail_XML_URL); // 빌더는 성능때메 쓴다
		urlBuffer.append("?" + "upr_cd=" + animal.getUprCd2()); // org이지만 upr로 활용됌
		urlBuffer.append("&" + "serviceKey" + "=" + KEY);

		System.out.println("@@@@@@@@@@ upr_cd: "+ animal.getUprCd2());
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
					System.out.println("동물 군구 코드 parsing 시작 22");

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
						
								
								System.out.println("uprCd2 : " + getStrData(eElement, "uprCd"));
								System.out.println("orgCd2 : " + getStrData(eElement, "orgCd"));
								System.out.println("orgdownNm2 : " + getStrData(eElement, "orgdownNm"));
								
								
								
								 String uprCd2 = getStrData(eElement, "uprCd");  // 본래대로 upr옮겨줌  6110000으로감
								 String orgCd2 = getStrData(eElement, "orgCd");
								 String orgdownNm2 = getStrData(eElement, "orgdownNm");

								 animal.setUprCd2(uprCd2);
								 animal.setOrgCd2(orgCd2);  // 기존 or는 원래 대로 org를 가져가게됌   // 61100 -> 6119999
								 animal.setOrgdownNm2(orgdownNm2);  // 군구
								
//								Detaillist.add(plant);
								
							} catch (Exception e) {
								System.out.println("데이터가 잘못되었습니다!");
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				return animal;
			}
	
	public static Animal DetailParse2(Animal animal) {
//		String dateStr = searchDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		List<Animal> Detaillist = new ArrayList<>();
		
		StringBuilder urlBuffer = new StringBuilder(AnimalDetail2_XML_URL); // 빌더는 성능때메 쓴다
		urlBuffer.append("?" + "upr_cd=" + animal.getUprCd2());
		urlBuffer.append("&" + "org_cd=" + animal.getOrgCd());
		urlBuffer.append("&" + "serviceKey" + "=" + KEY);
		
		System.out.println(urlBuffer);
		System.out.println("@@@@@ : " + animal.getUprCd2());
		System.out.println("@@@@@ : " + animal.getOrgCd());
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
			System.out.println("동물 보호소 parsing 시작 33");
			
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

						
						System.out.println("careRegNo : " + getIntData(eElement, "careRegNo"));
						System.out.println("careNm: " + getStrData(eElement, "careNm"));
						
						System.out.println("==========================" + count+" ============================");
						
						int careRegNo = getIntData(eElement, "careRegNo");
						String careNm = getStrData(eElement, "careNm");
						
						animal.setCareRegNo(careRegNo);
						animal.setCareNm(careNm);
						
//								Detaillist.add(plant);
						
					} catch (Exception e) {
						System.out.println("데이터가 잘못되었습니다!");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return animal;
	}
//	public static Animal DetailParse3(Animal animal) {
////		String dateStr = searchDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
//		List<Animal> Detaillist = new ArrayList<>();
//		
//		StringBuilder urlBuffer = new StringBuilder(AnimalDetail2_XML_URL); // 빌더는 성능때메 쓴다
//		urlBuffer.append("?" + "upr_cd=" + animal.getOrgCd());
//		urlBuffer.append("&" + "org_cd=" + animal.getOrgCd2());
//		urlBuffer.append("&" + "serviceKey" + "=" + KEY);
//		
//		System.out.println(urlBuffer);
//		
//		//url을 통해 http 요청 코드
//		try {
//			URL url = new URL(urlBuffer.toString());  // url 객체 생성
//			HttpURLConnection conn = (HttpURLConnection) url.openConnection(); // url 통해서 http 연결 요청
//			conn.setRequestMethod("GET"); // get 방식 요청을 알리는 코드
//			
//			// api마다 요청에 대한 프로퍼티 (속성) 셋팅이 달라지는 코드
//			conn.setRequestProperty("Accept", "application/xml");
////					conn.setRequestProperty("Accept", "application/json");
////					conn.setRequestProperty("content-type", "application/xml");
////					conn.setRequestProperty("content-type", "application/json");
//			int code = conn.getResponseCode(); // 실제 호출하는 부 url로부터 페이징 요청
//			System.out.println("ResponseCode : " + code);
//			
//			if (code < 200 || code > 300) {
//				System.out.println("페이지가 잘못되었습니다.");
//				return null;
//			}
//			System.out.println("동물 parsing 시작 33");
//			
//			// 3. 페이지 Parsing(해석)
//			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
//			DocumentBuilder db = dbf.newDocumentBuilder();
//			
//			Document doc = db.parse(conn.getInputStream()); // xml 부를 파싱하여 객체화
//			doc.getDocumentElement().normalize();
//			
//			//System.out.println("Root Element : " + doc.getDocumentElement().getNodeName());
//			System.out.println("======================================================");
//			int count = 0;
//			NodeList nList = doc.getElementsByTagName("item");
//			for (int i = 0; i < nList.getLength(); i++) {
//				Node node = nList.item(i);
//				count += count;
////						System.out.println("\nCurrent Element : " + node.getNodeName());
//				if (node.getNodeType() == Node.ELEMENT_NODE) {
//					try {
//						Element eElement = (Element) node;
//						
//						
//						System.out.println("careRegNo    : " + getStrData(eElement, "careRegNo"));
//						System.out.println("careNm: " + getStrData(eElement, "careNm"));
//						
//						System.out.println("==========================" + count+" ============================");
//						
//						int careRegNo = getIntData(eElement, "careRegNo");
//						String careNm = getStrData(eElement, "careNm");
//						
//						animal.setCareRegNo(careRegNo);
//						animal.setCareNm(careNm);
//						
////								Detaillist.add(plant);
//						
//					} catch (Exception e) {
//						System.out.println("데이터가 잘못되었습니다!");
//					}
//				}
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return animal;
//	}
	
	
	
	
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
