package com.multi.dahon.stock.api;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.multi.dahon.stock.model.vo.StockIndex;


public class StockIndexApi {
	public static Connection conn = null;
	public static PreparedStatement pstmt = null;
	public static ResultSet rs = null;
	
	public static String driverClass = "com.mysql.cj.jdbc.Driver";
	public static String url = "jdbc:mysql://localhost:3306/bbs";
	public static String user = "user";
	public static String password = "1234";
	
	public static final String SMINDEX_URL = "https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex";
	public static final String DPMINDEX_URL = "https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getDerivationProductMarketIndex";
	public static final String KEY = "QRde7O0zENfHCVsmkGqb6YvtADsDS5Ya7AQXR8Td1%2FLmdnVKo7cSx66kb9JtRvTmoIslxxvjeE6hZ7tSbzwMAA%3D%3D";
	
	public static final String idxNm[] = { "코스닥", "코스피", "코스피 200" };
	public static final int INDEX_AMOUNT = idxNm.length;
	
	public void Index() {
		long startTime = System.currentTimeMillis();
		List<StockIndex> indexList = new ArrayList<StockIndex>();
		for(int i = 0; i < INDEX_AMOUNT; i++) {
			List<StockIndex> smilist = parseStep1(idxNm[i]);
			if(smilist.size() == 0) {
				break;
			}
			indexList.addAll(smilist);
		}
		
		for(StockIndex si : indexList) {
			System.out.println(si);
		}
		
		long fTime = System.currentTimeMillis();
		double FirstTime = Math.round((fTime - startTime) * 10) / 10000;
		System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		System.out.println("지수 data 파싱 완료!");
		System.out.println("Third Loading Time : " + FirstTime + "s");
		System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		
		List<StockIndex> dpmlist = parseStep2();
		indexList.addAll(dpmlist);
		
		for(StockIndex s : indexList) {
			System.out.println(s);
		}
		
		long sTime = System.currentTimeMillis();
		double SecondTime = Math.round((sTime-fTime) * 10) / 10000;
		double TotalTime = Math.round((SecondTime - startTime) * 10) / 10000;
		System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		System.out.println("선물 지수 data 파싱 완료!");
		System.out.println("Third Loading Time : " + SecondTime + "s" + "\n" + "Total Loading Time : " + TotalTime + "s");
		System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		
		try {
		    Class.forName(driverClass);
		    conn = DriverManager.getConnection(url, user, password);
		    conn.setAutoCommit(false);
		} catch (Exception e) {
			e.printStackTrace();
		}
		    
		int countSuccess = 0;
		int countFail = 0;

		for(StockIndex s : indexList) {
		    try {
		    	int result = insert(s);
		    	if (result == 0) {
		    		countSuccess++;
		    	} else {
		    		countFail++;
		    	}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		try {
			System.out.println("Insert count: " + countSuccess);
			System.out.println("Fail count: " + countFail);
			
			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static List<StockIndex> parseStep1(String idxNm) {
		List<StockIndex> smList = new ArrayList<>();
		int page = 1;
		int numOfRows = 15;
		int date = 20230330; // 221 data
		
		while(true) {
			try {
				StringBuilder urlBuilder = new StringBuilder(SMINDEX_URL);
				urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + KEY); /* Service Key */
				urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(page), "UTF-8")); /*페이지번호*/
				urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(numOfRows), "UTF-8")); /*한 페이지 결과 수*/
				urlBuilder.append("&" + URLEncoder.encode("beginBasDt", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(date), "UTF-8")); /*조회 날짜*/
				urlBuilder.append("&" + URLEncoder.encode("idxNm", "UTF-8") + "=" + URLEncoder.encode(idxNm, "UTF-8")); /*지수명*/
				
				URL url = new URL(urlBuilder.toString());
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");
				conn.setRequestProperty("Content-type", "application/json");
				if(conn.getResponseCode() < 200 || conn.getResponseCode() >= 300) {
					System.out.println("페이지를 찾을 수 없습니다.");
					return smList;
				}
				
				DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
				DocumentBuilder db = dbf.newDocumentBuilder();
				Document doc = db.parse(conn.getInputStream());
				doc.normalizeDocument();
				
				NodeList items = doc.getElementsByTagName("item");
				
				if(items.getLength() == 0) {
					System.out.println(idxNm + " 파싱을 종료합니다.");
		            break;
		        }
				
				int totalCount = Integer.parseInt(getString(doc, "totalCount"));
                int totalPage = (totalCount + numOfRows - 1) / numOfRows;
                System.out.println(idxNm +" 파싱 중입니다." + "현재 파싱 중인 페이지 : " + page + " / " + totalPage);
				
				for(int i = 0; i < items.getLength(); i++) {
					Node node = items.item(i);
					if(node.getNodeType() == Node.ELEMENT_NODE) {
						try {
							Element e = (Element) node;
							int sDATE = getIntData(e, "basDt");
							String indexname = getStrData(e, "idxNm");
							String gap = getStrData(e, "vs");
							double CLPR = getDoubleData(e, "clpr");
							double MKP = getDoubleData(e, "mkp");
							double HIPR = getDoubleData(e, "hipr");
							double LOPR = getDoubleData(e, "lopr");
							
							StockIndex dpmindex = new StockIndex();
							dpmindex.setSdate(sDATE);
							dpmindex.setIndexname(indexname);
							dpmindex.setGap(gap);
							dpmindex.setClpr(CLPR);
							dpmindex.setMkp(MKP);
							dpmindex.setHipr(HIPR);
							dpmindex.setLopr(LOPR);
							
							smList.add(dpmindex);
							
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
				page++;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return smList;
	}
	
	public static List<StockIndex> parseStep2() {
		List<StockIndex> smList = new ArrayList<>();
		int page = 1;
		int numOfRows = 15;
		int date = 20230330; // 221 data
		String idxNm = "코스피 200 선물지수";
		
		while(true) {
			try {
				StringBuilder urlBuilder = new StringBuilder(DPMINDEX_URL);
				urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + KEY); /* Service Key */
				urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(page), "UTF-8")); /*페이지번호*/
				urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(numOfRows), "UTF-8")); /*한 페이지 결과 수*/
				urlBuilder.append("&" + URLEncoder.encode("beginBasDt", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(date), "UTF-8")); /*조회 날짜*/
				urlBuilder.append("&" + URLEncoder.encode("idxNm", "UTF-8") + "=" + URLEncoder.encode(idxNm, "UTF-8")); /*지수명*/
				
				URL url = new URL(urlBuilder.toString());
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");
				conn.setRequestProperty("Content-type", "application/json");
				if(conn.getResponseCode() < 200 || conn.getResponseCode() >= 300) {
					System.out.println("페이지를 찾을 수 없습니다.");
					return smList;
				}
				
				DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
				DocumentBuilder db = dbf.newDocumentBuilder();
				Document doc = db.parse(conn.getInputStream());
				doc.normalizeDocument();
				
				NodeList items = doc.getElementsByTagName("item");
				
				if(items.getLength() == 0) {
					System.out.println(idxNm + " 파싱을 종료합니다.");
		            break;
		        }
				
				int totalCount = Integer.parseInt(getString(doc, "totalCount"));
                int totalPage = (totalCount + numOfRows - 1) / numOfRows;
                System.out.println(idxNm +" 파싱 중입니다." + "현재 파싱 중인 페이지 : " + page + " / " + totalPage);
				
				for(int i = 0; i < items.getLength(); i++) {
					Node node = items.item(i);
					if(node.getNodeType() == Node.ELEMENT_NODE) {
						try {
							Element e = (Element) node;
							int sDATE = getIntData(e, "basDt");
							String indexname = getStrData(e, "idxNm");
							String gap = getStrData(e, "vs");
							double CLPR = getDoubleData(e, "clpr");
							double MKP = getDoubleData(e, "mkp");
							double HIPR = getDoubleData(e, "hipr");
							double LOPR = getDoubleData(e, "lopr");
							
							StockIndex smindex = new StockIndex();
							smindex.setSdate(sDATE);
							smindex.setIndexname(indexname);
							smindex.setGap(gap);
							smindex.setClpr(CLPR);
							smindex.setMkp(MKP);
							smindex.setHipr(HIPR);
							smindex.setLopr(LOPR);
							
							smList.add(smindex);
							
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
				page++;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return smList;
	}
	
	private static int insert(StockIndex s) throws SQLException {
		System.out.println("DB 연동 - Insert 시작");
		String sql = "INSERT INTO stockindex(sino, sdate, indexname, gap, clpr, mkp, hipr, lopr) "
				+ "VALUES(?, ?, ? ,? ,? ,? ,? ,?)";
		pstmt = conn.prepareStatement(sql);
		
		pstmt.setString(1, null);
		pstmt.setInt(2, s.sdate);
		pstmt.setString(3, s.indexname);
		pstmt.setString(4, s.gap);
		pstmt.setDouble(5, s.clpr);
		pstmt.setDouble(6, s.mkp);
		pstmt.setDouble(7, s.hipr);
		pstmt.setDouble(8, s.lopr);
		System.out.println("중복검사 : " + s.toString());
		
		int result = pstmt.executeUpdate();
		if(result > 0) {
			System.out.println("Insert 성공@");
			return 0;
		} else {
			System.out.println("Insert 실패!");
			return 1;
		}
	}
	
	private static String getString(Document doc, String name) {
		try {
			return doc.getElementsByTagName(name).item(0).getTextContent();
		} catch (Exception e2) {
			return "-";
		}
	}
	
	private static String getStrData(Element e, String tagName) {
		try {
			return e.getElementsByTagName(tagName).item(0).getTextContent();
		} catch (Exception e2) {
			return "-";
		}
	}
	
	private static int getIntData(Element e, String tagName) {
		try {
			return Integer.parseInt(e.getElementsByTagName(tagName).item(0).getTextContent());
		} catch (Exception e2) {
			return 0;
		}
	}
	
	private static double getDoubleData(Element e, String tagName) {
		try {
			return Double.parseDouble(e.getElementsByTagName(tagName).item(0).getTextContent());
		} catch (Exception e2) {
			return 0.0;
		}
	}
}