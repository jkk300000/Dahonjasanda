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

import com.multi.dahon.board.model.vo.Board;

public class EconomyApi {
	public static final String INFO_URL = "https://webapi2.edaily.co.kr/DictionaryMgnt/List";
	
	public static Connection conn = null;
	public static PreparedStatement pstmt = null;
	public static ResultSet rs = null;
	
	public static String driverClass = "com.mysql.cj.jdbc.Driver";
	public static String url = "jdbc:mysql://localhost:3306/bbs";
	public static String user = "user";
	public static String password = "1234";
	
	public void Economy() {
		List<Board> eList = new ArrayList<Board>();
		eList = EconomyInfo();
		
		for(Board eco : eList) {
			System.out.println(eco);
		}
		System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		System.out.println("경제용어 파싱 완료! " + eList.size() + "개");
		System.out.println("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		
		try {
			
		} catch (Exception e) {
			e.printStackTrace();
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

		for(Board eco : eList) {
		    try {
		    	int result = insert(eco);
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
	
	private static List<Board> EconomyInfo() {
		List<Board> wordlist = new ArrayList<>();
        try {
            int page = 1;
            int numOfRows = 10;

            while (true) {
                StringBuilder urlBuilder = new StringBuilder(INFO_URL); /*URL*/
                urlBuilder.append("?" + URLEncoder.encode("Page", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(page), "UTF-8")); /*페이지번호*/
                urlBuilder.append("&" + URLEncoder.encode("PageSize", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(numOfRows), "UTF-8")); /*갯수*/

                URL url = new URL(urlBuilder.toString());
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Content-type", "application/xml");

                if (conn.getResponseCode() < 200 || conn.getResponseCode() >= 300) {
                    return wordlist;
                }

                DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
                DocumentBuilder db = dbf.newDocumentBuilder();
                Document doc = db.parse(conn.getInputStream());
                doc.normalizeDocument();

                NodeList items = doc.getElementsByTagName("DictionaryModels");
                if(items.getLength() == 0) {
                	System.out.println(" 파싱을 종료합니다.");
                	break;
                }

                int totalCount = Integer.parseInt(getString(doc, "TotalCnt"));
                int totalPage = (totalCount + numOfRows - 1) / numOfRows;
                System.out.println(" 파싱 중입니다." + "현재 파싱 중인 페이지 : " + page + " / " + totalPage);
                
                
                for (int i = 0; i < items.getLength(); i++) {
                    Node node = items.item(i);
                    if (node.getNodeType() == Node.ELEMENT_NODE) {
                    	try {
                    		Element e = (Element) node;
							String title = getString(e, "Term");
							String content = getString(e, "BasicInformation");
							
							Board eco = new Board();
							eco.setTitle(title);
							eco.setContent(content);
							
							wordlist.add(eco);
							
							
						} catch (Exception e) {
							e.printStackTrace();
						}
                    }
                }
                
                page++;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return wordlist;
    }
	
	private static int insert(Board eco) throws SQLException {
		System.out.println("DB 연동 - Insert 시작");
		String sql = "INSERT INTO board(bno, member_mno, board_category_type, title, content, read_count) "
				+ "VALUES(?, ?, ?, ?, ?, ?)";
		pstmt = conn.prepareStatement(sql);
		
		pstmt.setInt(1, 0);
		pstmt.setInt(2, 1);
		pstmt.setString(3, "ECONOMY");
		pstmt.setString(4, eco.title);
		pstmt.setString(5, eco.content);
		pstmt.setInt(6, 0);
//		pstmt.setString(7, "Y");
//		pstmt.setString(8, "default");
//		pstmt.setString(9, "default");
//		pstmt.setString(10, null);
		
		int result = pstmt.executeUpdate();
		if(result > 0) {
			System.out.println("Insert 성공@@");
			return 0;
		} else {
			System.out.println("Insert 실패!!");
			return 1;
		}
	}

    public static String getString(Element e, String name) {
        try {
            return e.getElementsByTagName(name).item(0).getTextContent();
        } catch (Exception e2) {
            return null;
        }
    }

    public static String getString(Document doc, String name) {
        try {
            return doc.getElementsByTagName(name).item(0).getTextContent();
        } catch (Exception e) {
            return null;
        }
    }
}
