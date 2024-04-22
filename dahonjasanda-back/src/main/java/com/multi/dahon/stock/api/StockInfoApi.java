package com.multi.dahon.stock.api;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import javax.lang.model.util.Elements;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.jsoup.Jsoup;
import org.jsoup.select.Elements;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.multi.dahon.stock.model.vo.Stock;
import com.multi.dahon.stock.model.vo.StockPrice;


public class StockInfoApi {
	public static Connection conn = null;
	public static PreparedStatement pstmt = null;
	public static ResultSet rs = null;
	
	public static String driverClass = "com.mysql.cj.jdbc.Driver";
	public static String url = "jdbc:mysql://localhost:3306/bbs";
	public static String user = "user";
	public static String password = "1234";
	
	public static final String KEY = "QRde7O0zENfHCVsmkGqb6YvtADsDS5Ya7AQXR8Td1%2FLmdnVKo7cSx66kb9JtRvTmoIslxxvjeE6hZ7tSbzwMAA%3D%3D";
	public static final String STOCK_URL = "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo";
    public static final String URL = "https://finance.naver.com/item/main.nhn";
    
    public static final String CODES[] = { "005930", "000660", "373220", "207940", "005935", "005380", "000270", "068270", "005490", "051910",
    									  "035420", "028260", "105560", "006400", "035720", "003670", "012330", "055550", "086790", "032830",
    									  "066570", "003550", "138040", "015760", "034730", "000810", "323410", "450080", "011200", "096770",
    									  "018260", "033780", "017670", "259960", "316140", "024110", "030200", "047050", "009150", "034020",
    									  "329180", "010130", "402340", "022100", "003490", "010950", "352820", "009540", "012450", "090430" };
    public static final String itmsNm[] = { "삼성전자", "SK하이닉스", "LG에너지솔루션", "삼성바이오로직스", "삼성전자우", "현대차", "기아", "셀트리온", "POSCO홀딩스", "LG화학",
    	    								"NAVER", "삼성물산", "KB금융", "삼성SDI", "카카오", "포스코퓨처엠", "현대모비스", "신한지주", "하나금융지주", "삼성생명",
    	    								"LG전자", "LG", "메리츠금융지주", "한국전력", "SK", "삼성화재", "카카오뱅크", "에코프로머티", "HMM", "SK이노베이션",
    	    								"삼성에스디에스", "KT&G", "SK텔레콤", "크래프톤", "우리금융지주", "기업은행", "KT", "포스코인터내셔널", "삼성전기", "두산에너빌리티",
    	    								"HD현대중공업", "고려아연", "SK스퀘어", "포스코DX", "대한항공", "S-Oil", "하이브", "HD한국조선해양", "한화에어로스페이스", "아모레퍼시픽" };
    
    public static final int COM_AMOUNT = itmsNm.length;
    public static final int CODES_AMOUNT = CODES.length; // 50 - 40 
    
    public void Info() {
    	long startTime = System.currentTimeMillis();
        Map<Integer, Stock> map = new HashMap<>();
        List<Stock> stockList = new ArrayList<Stock>();
        for (int i = 0; i < CODES_AMOUNT; i++) {
            List<Stock> list = parseStep1(CODES[i]); 
            if (list.size() == 0) {
                break;
            }
            stockList.addAll(list);
        }
        
        for(Stock s : stockList) {
        	System.out.println(s);
        	map.put(s.getSno(), s);
        }
        
        long fTime = System.currentTimeMillis();
        double firstTime = Math.round((fTime - startTime) * 10) /10000; // 6~7s
        System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        System.out.println("Top 50 기업 단일 1차 data 파싱 완료! 결과 : " + stockList.size() + "개");
        System.out.println("First Loading Time : " + firstTime + "s");
		System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		
		int updateStep2Count = 0;
		for(int i = 0; i < COM_AMOUNT; i++) {
			updateStep2Count += parseStep2(itmsNm[i], map);
		}
		
		for(Stock s : stockList) {
			System.out.println(s);
		}
		
		long sTime = System.currentTimeMillis();
		double secondTime = Math.round((sTime - fTime) *10) / 10000; // 30s
		double total = Math.round((sTime-startTime) * 10) / 10000;
		System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		System.out.println("Top 50 기업 단일 2차 data 파싱 완료! 결과 : " + updateStep2Count + "개");
		System.out.println("Second Loading Time : " + secondTime + "s" + "\n" + "Total : " + total + "s");
		System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		
		
		List<StockPrice> priceList = new ArrayList<StockPrice>();
		for(int i = 0; i < COM_AMOUNT; i++) {
			List<StockPrice> prlist = parseStep3(itmsNm[i]);
			if(prlist.size() == 0) {
				break;
			}
			priceList.addAll(prlist);
		}
		for(StockPrice sp : priceList) {
			System.out.println(sp);
		}
		
		long lTime = System.currentTimeMillis();
		double LastTime = Math.round((lTime - sTime) * 10) / 10000; // 20min
		double totalTime = Math.round((lTime - startTime) * 10) / 10000;
		int tminute = (int) totalTime / 60;
		double tseconds = totalTime % 60; 
		System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		System.out.println("Top 50 기업 3차 data 파싱 완료!");
		System.out.println("Third Loading Time : " + LastTime + "s" + "\n" + "Total : " + tminute + "min" + tseconds + "sec");
		System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		
		try {
			Class.forName(driverClass);
			conn = DriverManager.getConnection(url, user, password);
			conn.setAutoCommit(false);
			
			int countSuccess = 0;
			int countFail = 0;
			
			for(Stock s : stockList) {
				try {
					int result = insert(s);
					if(result == 0) {
						countSuccess++;
					} else {
						countFail++;
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			
			for(StockPrice sp : priceList) {
				try {
					int result = insert2(sp);
					if(result == 0) {
						countSuccess++;
					} else {
						countFail++;
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			
			System.out.println("Insert count: " + countSuccess);
			System.out.println("Fail count: " + countFail);
			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
    }

    public static List<Stock> parseStep1(String code) {
        List<Stock> slist = new ArrayList<>();
        try {
        	StringBuilder urlBuilder = new StringBuilder(URL);
        	urlBuilder.append("?" + URLEncoder.encode("code", "UTF-8") + "=" + code);
        	
        	URL url = new URL(urlBuilder.toString());
        	
        	org.jsoup.nodes.Document doc = Jsoup.connect(url.toString()).get();
        	
        	// 코드
        	Elements c = doc.getElementsByAttributeValue("class", "code");
        	String codeText = c.text();
        	int cod = Integer.parseInt(codeText);
        	
        	// 현재가
        	Elements e1 = doc.getElementsByAttributeValue("class", "no_today");
        	org.jsoup.nodes.Element e2 = e1.get(0);
        	Elements e3 = e2.select("span");
        	String pric = e3.get(0).text().replace(",", "");
        	int price = Integer.parseInt(pric);
        	
        	// 전일
        	org.jsoup.nodes.Element yesterday = doc.selectFirst(".sptxt.sp_txt2");
        	org.jsoup.nodes.Element price0 = yesterday.nextElementSibling().selectFirst(".blind");
        	String ypric = price0.text().replace(",", "");
        	int yprice = Integer.parseInt(ypric);
        	
        	// 시가
        	org.jsoup.nodes.Element today = doc.selectFirst(".sptxt.sp_txt3");
        	org.jsoup.nodes.Element price1 = today.nextElementSibling().selectFirst(".blind");
        	String ope = price1.text().replace(",", "");
        	int open = Integer.parseInt(ope);
        	
        	// 고가
        	org.jsoup.nodes.Element h = doc.selectFirst(".sptxt.sp_txt4");
        	org.jsoup.nodes.Element price2 = h.nextElementSibling().selectFirst(".blind");
        	String hig = price2.text().replace(",", "");
        	int high = Integer.parseInt(hig);
        	
        	// 저가
        	org.jsoup.nodes.Element l = doc.selectFirst(".sptxt.sp_txt5");
        	org.jsoup.nodes.Element price3 = l.nextElementSibling().selectFirst(".blind");
        	String lo = price3.text().replace(",", "");
        	int low = Integer.parseInt(lo);
        	
        	// 거래량
        	org.jsoup.nodes.Element v = doc.selectFirst(".sptxt.sp_txt9");
        	org.jsoup.nodes.Element price4 = v.nextElementSibling().selectFirst(".blind");
        	String volume = price4.text();
        				
        	// 거래대금
        	org.jsoup.nodes.Element a = doc.selectFirst(".sptxt.sp_txt10");
        	org.jsoup.nodes.Element price5 = a.nextElementSibling().selectFirst(".blind");
        	String amount = price5.text();
        				
        	// 시가총액
        	Elements to = doc.getElementsByAttributeValue("id", "_market_sum");
        	String total = to.text();
        	
        	// 외인소진율
        	Elements f = doc.getElementsByAttributeValue("class", "lwidth");
        	Elements fo = f.select("td em");
//        	Element foA = fo.get(0); // 외국인 한도주식수(A)
//        	Element foB = fo.get(1); // 외국인 보유주식수(B)
        	org.jsoup.nodes.Element fop = fo.get(2);
        	String foreignapb = fop.text();
        				
        	// 투자 정보
        	Elements inv = doc.getElementsByAttributeValue("class", "rwidth");
        	Elements invi = inv.select("td span");
        	org.jsoup.nodes.Element invin = invi.get(0);
        	Elements invi1 = inv.select("em");
        	String investinfo = invin.text(); // 투자의견
        	String targetprice = invi1.get(1).text(); // 목표 주가
        	String topprice = invi1.get(2).text();
        	String bottomprice = invi1.get(3).text();
        				
        	// per, eps 정보
        	Elements inf = doc.getElementsByAttributeValue("class", "per_table");
        	Elements info = inf.select("em");
        	String per = info.get(0).text();
        	String eps = info.get(1).text();
        	
        	// 사업내용
        	Elements d = doc.getElementsByAttributeValue("class", "summary_info");
        	String content = d.select("p").text();
        	
        	// transaction 정보
        	Elements tinfo = doc.getElementsByAttributeValue("class", "tb_type1");
        	Elements tinfo1 = tinfo.select("td");
        				
			String sellname1 = tinfo1.get(5).text();
			String sellname2 = tinfo1.get(9).text();
			String sellname3 = tinfo1.get(13).text();
			String sellname4 = tinfo1.get(17).text();
			String sellname5 = tinfo1.get(21).text();
			String sell1 = tinfo1.get(6).text();
			String sell2 = tinfo1.get(10).text();
			String sell3 = tinfo1.get(14).text();
			String sell4 = tinfo1.get(18).text();
			String sell5 = tinfo1.get(22).text();
        				
			String buyname1 = tinfo1.get(7).text();
			String buyname2 = tinfo1.get(11).text();
			String buyname3 = tinfo1.get(15).text();
			String buyname4 = tinfo1.get(19).text();
			String buyname5 = tinfo1.get(23).text();
			String buy1 = tinfo1.get(8).text();
			String buy2 = tinfo1.get(12).text();
			String buy3 = tinfo1.get(16).text();
			String buy4 = tinfo1.get(20).text();
			String buy5 = tinfo1.get(24).text();

			String foreignsell = tinfo1.get(1).text();
			String foreigngap = tinfo1.get(2).text();
			String foreignbuy = tinfo1.get(3).text();
        	
			// sub section 정보
			Elements sinfo = doc.getElementsByAttributeValue("class", "sub_section right");
			Elements sinfo1 = sinfo.select("th");
			Elements sinfo2 = sinfo.select("td");

			String date1 = sinfo1.get(5).text(); // 전날
			String date2 = sinfo1.get(6).text(); // 전전날
			String date3 = sinfo1.get(7).text(); // -3
			String date4 = sinfo1.get(8).text(); // -4
			String date5 = sinfo1.get(9).text(); // -5
			String date6 = sinfo1.get(10).text(); // -5

			String value1price = sinfo2.get(1).text(); // date1
			String value1gap = sinfo2.get(2).text();
			String value1foreigner = sinfo2.get(3).text();
			String value1organ = sinfo2.get(4).text();

			String value2price = sinfo2.get(5).text(); // date2
			String value2gap = sinfo2.get(6).text();
			String value2foreigner = sinfo2.get(7).text();
			String value2organ = sinfo2.get(8).text();

			String value3price = sinfo2.get(9).text(); // date3
			String value3gap = sinfo2.get(10).text();
			String value3foreigner = sinfo2.get(11).text();
			String value3organ = sinfo2.get(12).text();

			String value4price = sinfo2.get(13).text(); // date4
			String value4gap = sinfo2.get(14).text();
			String value4foreigner = sinfo2.get(15).text();
			String value4organ = sinfo2.get(16).text();

			String value5price = sinfo2.get(17).text(); // date5
			String value5gap = sinfo2.get(18).text();
			String value5foreigner = sinfo2.get(19).text();
			String value5organ = sinfo2.get(20).text();

			String value6price = sinfo2.get(21).text(); // date6
			String value6gap = sinfo2.get(22).text();
			String value6foreigner = sinfo2.get(23).text();
			String value6organ = sinfo2.get(24).text();
			
        	Stock stock = new Stock();
        	stock.setCode(codeText);
        	stock.setSno(cod);
        	stock.setPrice(price);
        	stock.setYprice(yprice);
        	stock.setOpen(open);
        	stock.setHigh(high);
        	stock.setLow(low);
        	stock.setVolume(volume);
        	stock.setOnevolume(amount+"백만");
        	stock.setTotal(total+"억원");
        	stock.setForeignapb(foreignapb);
        	stock.setInvestinfo(investinfo);
        	stock.setTargetprice(targetprice);
        	stock.setTopprice(topprice);
        	stock.setBottomprice(bottomprice);
        	stock.setPer(per);
        	stock.setEps(eps);
        	stock.setContent(content);
        	stock.setSellname1(sellname1);
        	stock.setSellname2(sellname2);
        	stock.setSellname3(sellname3);
        	stock.setSellname4(sellname4);
        	stock.setSellname5(sellname5);
        	stock.setSell1(sell1);
        	stock.setSell2(sell2);
        	stock.setSell3(sell3);
        	stock.setSell4(sell4);
        	stock.setSell5(sell5);
        	stock.setBuyname1(buyname1);
        	stock.setBuyname2(buyname2);
        	stock.setBuyname3(buyname3);
        	stock.setBuyname4(buyname4);
        	stock.setBuyname5(buyname5);
        	stock.setBuy1(buy1);
        	stock.setBuy2(buy2);
        	stock.setBuy3(buy3);
        	stock.setBuy4(buy4);
        	stock.setBuy5(buy5);
        	stock.setForeignsell(foreignsell);
        	stock.setForeigngap(foreigngap);
        	stock.setForeignbuy(foreignbuy);
        	stock.setDate1(date1);
        	stock.setDate2(date2);
        	stock.setDate3(date3);
        	stock.setDate4(date4);
        	stock.setDate5(date5);
        	stock.setDate6(date6);
        	stock.setValueprice1(value1price);
        	stock.setValuegap1(value1gap);
        	stock.setValueforeigner1(value1foreigner);
        	stock.setValueorgan1(value1organ);
        	stock.setValueprice2(value2price);
        	stock.setValuegap2(value2gap);
        	stock.setValueforeigner2(value2foreigner);
        	stock.setValueorgan2(value2organ);
        	stock.setValueprice3(value3price);
        	stock.setValuegap3(value3gap);
        	stock.setValueforeigner3(value3foreigner);
        	stock.setValueorgan3(value3organ);
        	stock.setValueprice4(value4price);
        	stock.setValuegap4(value4gap);
        	stock.setValueforeigner4(value4foreigner);
        	stock.setValueorgan4(value4organ);
        	stock.setValueprice5(value5price);
        	stock.setValuegap5(value5gap);
        	stock.setValueforeigner5(value5foreigner);
        	stock.setValueorgan5(value5organ);
        	stock.setValueprice6(value6price);
        	stock.setValuegap6(value6gap);
        	stock.setValueforeigner6(value6foreigner);
        	stock.setValueorgan6(value6organ);
        	
        	slist.add(stock);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return slist;
    }
    
    public static int parseStep2(String itmsNm, Map<Integer, Stock> map) {
    	int updateCount = 0;
    	Calendar c1 = new GregorianCalendar();
		c1.add(Calendar.DATE, -1);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		
//		String date = sdf.format(c1.getTime());
		String date = "20240315";
		int numOfRows = 1;
		int page = 1;
    	try {
    		StringBuilder urlBuilder = new StringBuilder(STOCK_URL);
			urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + KEY); /* Service Key */
			urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(numOfRows), "UTF-8")); /*한 페이지 결과 수*/
			urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(page), "UTF-8")); /*페이지번호*/
			urlBuilder.append("&" + URLEncoder.encode("basDt", "UTF-8") + "=" + URLEncoder.encode(date, "UTF-8")); /*어제 날짜*/
			urlBuilder.append("&" + URLEncoder.encode("itmsNm", "UTF-8") + "=" + URLEncoder.encode(itmsNm, "UTF-8")); /*회사명*/
			
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");
			if(conn.getResponseCode() < 200 || conn.getResponseCode() >= 300) {
				System.out.println("페이지를 찾을 수 없습니다.");
				return updateCount;
			}
			
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			Document doc = db.parse(conn.getInputStream());
			doc.normalizeDocument();
			
			NodeList items = doc.getElementsByTagName("item");
			
			for(int i = 0; i < items.getLength(); i++) {
				Node node = items.item(i);
				if(node.getNodeType() == Node.ELEMENT_NODE) {
					try {
						Element e = (Element) node;
						int sNO = getIntData(e, "srtnCd");
						int sDATE = getIntData(e, "basDt");
						String sCODE = getStrData(e, "srtnCd");
						int sGAP = getIntData(e, "vs");
						String sNAME = getStrData(e, "itmsNm");
						int CLPR = getIntData(e, "clpr");
						int MKP = getIntData(e, "mkp");
						int HIPR = getIntData(e, "hipr");
						int LOPR = getIntData(e, "lopr");
						
						if(map.containsKey(sNO) == false) {
							continue;
						}
						Stock s = map.get(sNO);
						s.setSdate(sDATE);
						s.setSgap(sGAP);
						s.setScode(sCODE);
						s.setSname(sNAME);
						s.setClpr(CLPR);
						s.setMkp(MKP);
						s.setHipr(HIPR);
						s.setLopr(LOPR);
						
						updateCount++;
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return updateCount;
    }
    
    public static List<StockPrice> parseStep3(String itmsNm) {
    	List<StockPrice> plist = new ArrayList<>();
    	int numOfRows = 15;
		int page = 1;
		int date = 20230330; // 221 data
		
		while(true) {
			try {
				StringBuilder urlBuilder = new StringBuilder(STOCK_URL);
				urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + KEY); /* Service Key */
				urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(numOfRows), "UTF-8")); /*한 페이지 결과 수*/
				urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(page), "UTF-8")); /*페이지번호*/
				urlBuilder.append("&" + URLEncoder.encode("beginBasDt", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(date), "UTF-8")); /*조회 날짜*/
				urlBuilder.append("&" + URLEncoder.encode("itmsNm", "UTF-8") + "=" + URLEncoder.encode(itmsNm, "UTF-8")); /*회사명*/
				
				URL url = new URL(urlBuilder.toString());
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");
				conn.setRequestProperty("Content-type", "application/json");
				if(conn.getResponseCode() < 200 || conn.getResponseCode() >= 300) {
					System.out.println("페이지를 찾을 수 없습니다.");
					return plist;
				}
				
				DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
				DocumentBuilder db = dbf.newDocumentBuilder();
				Document doc = db.parse(conn.getInputStream());
				doc.normalizeDocument();
				
				NodeList items = doc.getElementsByTagName("item");
				
				if(items.getLength() == 0) {
					System.out.println(itmsNm + " 파싱을 종료합니다.");
		            break;
		        }
				
				int totalCount = Integer.parseInt(getString(doc, "totalCount"));
                int totalPage = (totalCount + numOfRows - 1) / numOfRows;
                System.out.println(itmsNm +" 파싱 중입니다." + "현재 파싱 중인 페이지 : " + page + " / " + totalPage);
				
				for(int i = 0; i < items.getLength(); i++) {
					Node node = items.item(i);
					if(node.getNodeType() == Node.ELEMENT_NODE) {
						try {
							Element e = (Element) node;
							int spNO = getIntData(e, "srtnCd");
							int sNO = getIntData(e, "srtnCd");
							int sDATE = getIntData(e, "basDt");
							String sCODE = getStrData(e, "srtnCd");
							String sName = getStrData(e, "itmsNm");
							int CLPR = getIntData(e, "clpr");
							int MKP = getIntData(e, "mkp");
							int HIPR = getIntData(e, "hipr");
							int LOPR = getIntData(e, "lopr");
							
							StockPrice price = new StockPrice();
							price.setSpno(spNO);
							price.setSdate(sDATE);
							price.setScode(sCODE);
							price.setSname(sName);
							price.setClpr(CLPR);
							price.setMkp(MKP);
							price.setHipr(HIPR);
							price.setLopr(LOPR);
							
							Stock stock = new Stock();
							stock.setSno(sNO);
							
							price.setStock(stock);
							
							plist.add(price);
							
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
		return plist;
    }
    
    private static int insert(Stock s) throws SQLException {
    	System.out.println("DB연동 - Insert 시작");
    	String sql = "INSERT INTO stock(sno, sdate, sgap, scode, sname, clpr, mkp, hipr, lopr, code, "
    			+ "price, yprice, open, high, low, volume, onevolume, total, foreignapb, investinfo, "
    			+ "targetprice, topprice, bottomprice, per, eps, content, sellname1, sellname2, sellname3, sellname4, "
    			+ "sellname5, sell1, sell2, sell3, sell4, sell5, buyname1, buyname2, buyname3, buyname4, "
    			+ "buyname5, buy1, buy2, buy3, buy4, buy5, foreignsell, foreigngap, foreignbuy, date1, "
    			+ "date2, date3, date4, date5, date6, valueprice1, valuegap1, valueforeigner1, valueorgan1, valueprice2, "
    			+ "valuegap2, valueforeigner2, valueorgan2, valueprice3, valuegap3, valueforeigner3, valueorgan3, valueprice4, valuegap4, valueforeigner4, "
    			+ "valueorgan4, valueprice5, valuegap5, valueforeigner5, valueorgan5, valueprice6, valuegap6, valueforeigner6, valueorgan6) "
    			+ "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
    			+ "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
    			+ "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
    			+ "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
    			+ "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
    			+ "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
    			+ "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
    			+ "?, ?, ?, ?, ?, ?, ?, ?, ?)";
    	pstmt = conn.prepareStatement(sql);
    	
    	pstmt.setString(1, Integer.toString(s.getSno()));
    	pstmt.setInt(2, s.sdate);
    	pstmt.setInt(3, s.sgap);
    	pstmt.setString(4, s.scode);
    	pstmt.setString(5, s.sname);
    	pstmt.setInt(6, s.clpr);
    	pstmt.setInt(7, s.mkp);
    	pstmt.setInt(8, s.hipr);
    	pstmt.setInt(9, s.lopr);
    	pstmt.setString(10, s.code);
    	pstmt.setInt(11, s.price);
    	pstmt.setInt(12, s.yprice);
    	pstmt.setInt(13, s.open);
    	pstmt.setInt(14, s.high);
    	pstmt.setInt(15, s.low);
    	pstmt.setString(16, s.volume);
    	pstmt.setString(17, s.onevolume);
    	pstmt.setString(18, s.total);
    	pstmt.setString(19, s.foreignapb);
    	pstmt.setString(20, s.investinfo);
    	pstmt.setString(21, s.targetprice);
    	pstmt.setString(22, s.topprice);
    	pstmt.setString(23, s.bottomprice);
    	pstmt.setString(24, s.per);
    	pstmt.setString(25, s.eps);
    	pstmt.setString(26, s.content);
    	pstmt.setString(27, s.sellname1);
    	pstmt.setString(28, s.sellname2);
    	pstmt.setString(29, s.sellname3);
    	pstmt.setString(30, s.sellname4);
    	pstmt.setString(31, s.sellname5);
    	pstmt.setString(32, s.sell1);
    	pstmt.setString(33, s.sell2);
    	pstmt.setString(34, s.sell3);
    	pstmt.setString(35, s.sell4);
    	pstmt.setString(36, s.sell5);
    	pstmt.setString(37, s.buyname1);
    	pstmt.setString(38, s.buyname2);
    	pstmt.setString(39, s.buyname3);
    	pstmt.setString(40, s.buyname4);
    	pstmt.setString(41, s.buyname5);
    	pstmt.setString(42, s.buy1);
    	pstmt.setString(43, s.buy2);
    	pstmt.setString(44, s.buy3);
    	pstmt.setString(45, s.buy4);
    	pstmt.setString(46, s.buy5);
    	pstmt.setString(47, s.foreignsell);
    	pstmt.setString(48, s.foreigngap);
    	pstmt.setString(49, s.foreignbuy);
    	pstmt.setString(50, s.date1);
    	pstmt.setString(51, s.date2);
    	pstmt.setString(52, s.date3);
    	pstmt.setString(53, s.date4);
    	pstmt.setString(54, s.date5);
    	pstmt.setString(55, s.date6);
    	pstmt.setString(56, s.valueprice1);
    	pstmt.setString(57, s.valuegap1);
    	pstmt.setString(58, s.valueforeigner1);
    	pstmt.setString(59, s.valueorgan1);
    	pstmt.setString(60, s.valueprice2);
    	pstmt.setString(61, s.valuegap2);
    	pstmt.setString(62, s.valueforeigner2);
    	pstmt.setString(63, s.valueorgan2);
    	pstmt.setString(64, s.valueprice3);
    	pstmt.setString(65, s.valuegap3);
    	pstmt.setString(66, s.valueforeigner3);
    	pstmt.setString(67, s.valueorgan3);
    	pstmt.setString(68, s.valueprice4);
    	pstmt.setString(69, s.valuegap4);
    	pstmt.setString(70, s.valueforeigner4);
    	pstmt.setString(71, s.valueorgan4);
    	pstmt.setString(72, s.valueprice5);
    	pstmt.setString(73, s.valuegap5);
    	pstmt.setString(74, s.valueforeigner5);
    	pstmt.setString(75, s.valueorgan5);
    	pstmt.setString(76, s.valueprice6);
    	pstmt.setString(77, s.valuegap6);
    	pstmt.setString(78, s.valueforeigner6);
    	pstmt.setString(79, s.valueorgan6);
    	
    	int result = pstmt.executeUpdate();
    	if(result > 0) {
    		System.out.println("Insert 성공@@");
    		return 0;
    	} else {
    		System.out.println("Insert 실패!!");
    		return 1;
    	}
    }
    
    private static int insert2(StockPrice sp) throws SQLException {
    	System.out.println("DB 연동 - Insert2 시작");
		String sql = "INSERT INTO stock_price(spno, sno, sdate, scode, sname, clpr, mkp, hipr, lopr) "
				+ "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
		pstmt = conn.prepareStatement(sql);
		
		pstmt.setString(1, null);
		pstmt.setInt(2, sp.getStock().sno);
		pstmt.setInt(3, sp.sdate);
		pstmt.setString(4, sp.scode);
		pstmt.setString(5, sp.sname);
		pstmt.setInt(6, sp.clpr);
		pstmt.setInt(7, sp.mkp);
		pstmt.setInt(8, sp.hipr);
		pstmt.setInt(9, sp.lopr);
		
		int result = pstmt.executeUpdate();
		if(result > 0) {
			System.out.println("Insert 성공@@@@");
			return 0;
		} else {
			System.out.println("Insert 실패!!!!");
			return 1;
		}
    }
    
    private static String getString(Element e, String tagName) {
		try {
			return e.getElementsByTagName(tagName).item(0).getTextContent();
		} catch (Exception e2) {
			return "-";
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