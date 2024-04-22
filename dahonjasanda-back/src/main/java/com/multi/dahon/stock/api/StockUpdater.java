package com.multi.dahon.stock.api;

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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.jsoup.Jsoup;
import org.jsoup.select.Elements;

import com.multi.dahon.stock.model.vo.Stock;
import com.multi.dahon.stock.model.vo.StockTime;


public class StockUpdater {
	private static final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
	
	public static Connection conn = null;
	public static PreparedStatement pstmt = null;
	public static ResultSet rs = null;
	
	public static String driverClass = "com.mysql.cj.jdbc.Driver";
	public static String url = "jdbc:mysql://localhost:3306/bbs";
	public static String user = "user";
	public static String password = "1234";
	
	public static final String URL = "https://finance.naver.com/item/main.nhn";
    
    public static final String CODES[] = { "005930", "000660", "373220", "207940", "005935", "005380", "000270", "068270", "005490", "051910",
    									  "035420", "028260", "105560", "006400", "035720", "003670", "012330", "055550", "086790", "032830",
    									  "066570", "003550", "138040", "015760", "034730", "000810", "323410", "450080", "011200", "096770",
    									  "018260", "033780", "017670", "259960", "316140", "024110", "030200", "047050", "009150", "034020",
    									  "329180", "010130", "402340", "022100", "003490", "010950", "352820", "009540", "012450", "090430" };
    public static final int CODES_AMOUNT = CODES.length;
    
    public void Timer() {
    	List<StockTime> timeList = new ArrayList<StockTime>();
		for(int i = 0; i < CODES_AMOUNT; i++) {
			List<StockTime> stlist = parseUpdate(CODES[i]);
			if(stlist.size() == 0) {
				break;
			}
			timeList.addAll(stlist);
		}
		
		for(StockTime st : timeList) {
			System.out.println(st);
		}
		
		try {
		    Class.forName(driverClass);
		    conn = DriverManager.getConnection(url, user, password);
		    conn.setAutoCommit(false);
		} catch (Exception e) {
			e.printStackTrace();
		}
		    
		int countSuccess = 0;
		int countFail = 0;

		for(StockTime st : timeList) {
		    try {
		    	int result = Insert(st);
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
		
		scheduler.scheduleAtFixedRate(StockUpdater::updateStocks, 0, 1, TimeUnit.MINUTES);
	}
    
    public static void updateStocks() {
    	Map<Integer, StockTime> map = new HashMap<>();
        List<StockTime> stList = new ArrayList<StockTime>();
        for (int i = 0; i < CODES_AMOUNT; i++) {
            List<StockTime> list = parseUpdate(CODES[i]); 
            if (list.size() == 0) {
                break;
            }
            stList.addAll(list);
        }
        
        for(StockTime st : stList) {
        	System.out.println(st);
        }
        System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        System.out.println("Top 50 기업 단일 1차 data 업데이트 완료! 결과 : " + stList.size() + "개");
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

		for(StockTime st : stList) {
		    try {
		    	int result = Insert(st);
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
			Date now = new Date();
	        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        String formattedDate = sdf.format(now);
			System.out.println("Insert count: " + countSuccess);
			System.out.println("Fail count: " + countFail);
			System.out.println("업데이트 시간 : " + formattedDate);
			
			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
    
    public static List<StockTime> parseUpdate(String code) {
    	List<StockTime> stlist = new ArrayList<>();
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
        	
        	// 기준시간
        	Elements pt = doc.getElementsByAttributeValue("class", "date");
        	org.jsoup.nodes.Element pti = pt.get(0);
        	String ptime = pti.text();
        	
        	// 회사명
        	Elements t = doc.getElementsByAttributeValue("class", "wrap_company");
        	String name = t.select("h2 a").text();
        	
        	Calendar CREATE_DATE = Calendar.getInstance();
        	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss");
			String formattedDate = dateFormat.format(CREATE_DATE.getTime());
        	
        	StockTime stocktime = new StockTime();
        	stocktime.setSdate(ptime);
        	stocktime.setPrice(price);
        	stocktime.setScode(codeText);
        	stocktime.setSname(name);
        	stocktime.setCreateDate(formattedDate);
        	stocktime.setSno(cod);
        	
        	stlist.add(stocktime);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return stlist;
    }
    
    private static int Insert(StockTime st) throws SQLException {
    	System.out.println("DB 연동 - Insert 시작");
    	String sql = "INSERT INTO stock_time(stno, sdate, price, scode, sname, sno, create_date) "
				+ "VALUES(?, ?, ?, ?, ?, ?, ?)";
    	
    	pstmt = conn.prepareStatement(sql);
    	pstmt.setString(1, null);
    	pstmt.setString(2, st.sdate);
    	pstmt.setInt(3, st.price);
    	pstmt.setString(4, st.scode);
    	pstmt.setString(5, st.sname);
    	pstmt.setInt(6, st.sno);
    	pstmt.setString(7, st.createDate);
    	
    	int result = pstmt.executeUpdate();
    	if(result > 0) {
    		System.out.println("Update 성공@@");
    		return 0;
    	} else {
    		System.out.println("Update 실패!!");
    		return 1;
    	}
    }
    
    private static int Update(StockTime st) throws SQLException {
    	System.out.println("Update 진행");
    	String sql = "update stocktime set price = ? where sno = ?";
    	pstmt = conn.prepareStatement(sql);
    	pstmt.setInt(1, st.price);
    	pstmt.setInt(2, st.sno);
    	
    	int result = pstmt.executeUpdate();
    	if(result > 0) {
    		System.out.println("Update 성공@@");
    		return 0;
    	} else {
    		System.out.println("Update 실패!!");
    		return 1;
    	}
    }

}
