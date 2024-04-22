package com.multi.dahon.api;

// 부동산 정보 api 
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import java.util.ArrayList;
import java.util.List;


import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;



import com.multi.dahon.housing.model.vo.HousingInfoByTypeJPA;
import com.multi.dahon.housing.model.vo.HousingInfoJPA;
public class apiParsing {
	
	public static void main(String[] args) {
//		allOfInfoByType();
//		parseHousingInfo();
//		parseHousingInfoType();
//		houseNumFromHouseInfo();
//		parseHousingInfoOfficeTelByType();
		
		
		
	}

	public static final String KEY = "h2lhej78GekTAT6cgb8bWbpjhxpVprV8WdMIVj6%2BYCVbQKYwcHbdKVwFQ7SGd39IcnGYVQeeWSKXJme%2BcDdaUw%3D%3D";
	public static final String AptInfo_JSON_URL = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail";
	public static final String OfficeTelAndEtcInfo_JSON_URL = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getUrbtyOfctlLttotPblancDetail";
	public static final String AptInfoForNoOrder_JSON_URL = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getRemndrLttotPblancDetail";
	public static final String AptInfoByType_JSON_URL = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancMdl";
	public static final String OfficeTelAndEtcInfoByType_JSON_URL = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getUrbtyOfctlLttotPblancMdl";
	public static final String AptInfoForNoOrderByType_JSON_URL = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getRemndrLttotPblancMdl";
	public static final String PublicRentInfo_JSON_URL = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getPblPvtRentLttotPblancDetail";
	public static final String PublicRentInfoByType_JSON_URL = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getPblPvtRentLttotPblancMdl";
	public static final String NoLimitInfo_JSON_URL = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getOPTLttotPblancDetail"; // 임의공급
	public static final String NoLimitInfoByType_JSON_URL = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getOPTLttotPblancMdl";
	
	
	
	////////아파트 상세정보/주택형별 상세정보
	
	public static List<HousingInfoJPA> parseHousingInfo() {
		List<HousingInfoJPA> list = new ArrayList<>();

		try {
		
			StringBuilder urlBuilder = new StringBuilder(AptInfo_JSON_URL);
		
			urlBuilder.append("?" + "page=" + 1);
			urlBuilder.append("&" + "perPage=" + 10);
			urlBuilder.append("&" + "serviceKey=" + KEY);
			System.out.println(urlBuilder.toString());
			
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			int code = conn.getResponseCode(); // 실제 page를 요청하는 코드부
			System.out.println("ResponseCode : " + code);
			if (code < 200 || code >= 300) {
				System.out.println("페이지가 잘못되었습니다.");
				return list;
			}
			
			InputStreamReader isr = new InputStreamReader(conn.getInputStream(), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			
			JSONParser jsonParser = new JSONParser(); 
			JSONObject rootObj = (JSONObject) jsonParser.parse(br);
			JSONArray array = (JSONArray) rootObj.get("data");
			for(int i = 0; i< array.size(); i++) {
				JSONObject obj = (JSONObject) array.get(i);
			
				String  BSNS_MBY_NM	 = getStrData(obj, "BSNS_MBY_NM");
				String  CNSTRCT_ENTRPS_NM	=  getStrData(obj, "CNSTRCT_ENTRPS_NM");
				String  CNTRCT_CNCLS_BGNDE	 =  getStrData(obj, "CNTRCT_CNCLS_BGNDE");
				String  CNTRCT_CNCLS_ENDDE	 =  getStrData(obj, "CNTRCT_CNCLS_ENDDE");
				String  GNRL_RCEPT_BGNDE	 =  getStrData(obj, "GNRL_RCEPT_BGNDE");
				String  GNRL_RCEPT_ENDDE	 =  getStrData(obj, "GNRL_RCEPT_ENDDE");
				String  GNRL_RNK1_CRSPAREA_RCEPT_PD	=  getStrData(obj, "GNRL_RNK1_CRSPAREA_RCEPT_PD");
				String  GNRL_RNK1_ETC_AREA_RCPTDE_PD	 =  getStrData(obj, "GNRL_RNK1_ETC_AREA_RCPTDE_PD");
				String  GNRL_RNK1_ETC_GG_RCPTDE_PD =  getStrData(obj, "GNRL_RNK1_ETC_GG_RCPTDE_PD");
				String  GNRL_RNK2_CRSPAREA_RCEPT_PD	 =  getStrData(obj, "GNRL_RNK2_CRSPAREA_RCEPT_PD");
				String  GNRL_RNK2_ETC_AREA_RCPTDE_PD	=  getStrData(obj, "GNRL_RNK2_ETC_AREA_RCPTDE_PD");
				String  GNRL_RNK2_ETC_GG_RCPTDE_PD =  getStrData(obj, "GNRL_RNK2_ETC_GG_RCPTDE_PD");
				String  HMPG_ADRES =  getStrData(obj, "HMPG_ADRES");
		    	String  HOUSE_DTL_SECD  =  getStrData(obj, "HOUSE_DTL_SECD");
		    	String  HOUSE_DTL_SECD_NM  =  getStrData(obj, "HOUSE_DTL_SECD_NM");
		    	String  HOUSE_MANAGE_NO =  getStrData(obj, "HOUSE_MANAGE_NO");
		    	String  HOUSE_NM =  getStrData(obj, "HOUSE_NM");
		    	String  HOUSE_SECD  =  getStrData(obj, "HOUSE_SECD");
		    	String  HOUSE_SECD_NM =  getStrData(obj, "HOUSE_SECD_NM");
		    	String  HSSPLY_ADRES =  getStrData(obj, "HSSPLY_ADRES");
		    	String  HSSPLY_ZIP 		             = getStrData(obj, "HSSPLY_ZIP");
		    	String  IMPRMN_BSNS_AT               = getStrData(obj, "IMPRMN_BSNS_AT");
		    	String  LRSCL_BLDLND_AT              = getStrData(obj, "LRSCL_BLDLND_AT");
		    	String  MDAT_TRGET_AREA_SECD         = getStrData(obj, "MDAT_TRGET_AREA_SECD");
		    	String  MDHS_TELNO                   = getStrData(obj, "MDHS_TELNO");
		    	String  MVN_PREARNGE_YM              = getStrData(obj, "MVN_PREARNGE_YM");
		    	String  NPLN_PRVOPR_PUBLIC_HOUSE_AT  = getStrData(obj, "NPLN_PRVOPR_PUBLIC_HOUSE_AT");
		    	String  PARCPRC_ULS_AT               = getStrData(obj, "PARCPRC_ULS_AT");
		    	String  PBLANC_NO                    = getStrData(obj, "PBLANC_NO");
		    	String  PBLANC_URL                   = getStrData(obj, "PBLANC_URL");
		    	String  PRZWNER_PRESNATN_DE          = getStrData(obj, "PRZWNER_PRESNATN_DE");
		    	String  PUBLIC_HOUSE_EARTH_AT        = getStrData(obj, "PUBLIC_HOUSE_EARTH_AT");
		    	String  RCEPT_BGNDE                  = getStrData(obj, "RCEPT_BGNDE");
		    	if(RCEPT_BGNDE == "-") {RCEPT_BGNDE = getStrData(obj, "SUBSCRPT_RCEPT_BGNDE");}
		    	String  RCEPT_ENDDE                  = getStrData(obj, "RCEPT_ENDDE");
		    	if(RCEPT_ENDDE == "-") {RCEPT_ENDDE = getStrData(obj, "SUBSCRPT_RCEPT_ENDDE");}
		    	String  RCRIT_PBLANC_DE              = getStrData(obj, "RCRIT_PBLANC_DE");
		        String  RENT_SECD                    = getStrData(obj, "RENT_SECD");
		        String  RENT_SECD_NM                 = getStrData(obj, "RENT_SECD_NM");
		        String  SPECLT_RDN_EARTH_AT          = getStrData(obj, "SPECLT_RDN_EARTH_AT");
		        String  SPSPLY_RCEPT_BGNDE           = getStrData(obj, "SPSPLY_RCEPT_BGNDE");
		        String  SPSPLY_RCEPT_ENDDE           = getStrData(obj, "SPSPLY_RCEPT_ENDDE");
		        String  SUBSCRPT_AREA_CODE           = getStrData(obj, "SUBSCRPT_AREA_CODE");
		        String  SUBSCRPT_AREA_CODE_NM        = getStrData(obj, "SUBSCRPT_AREA_CODE_NM");
		        int  	TOT_SUPLY_HSHLDCO            = getIntData(obj, "TOT_SUPLY_HSHLDCO");
		        String  SEARCH_HOUSE_SECD            = getStrData(obj, "SEARCH_HOUSE_SECD");
		        String  HOUSE_DETAIL_SECD            = getStrData(obj, "HOUSE_DETAIL_SECD");
		        String  HOUSE_DETAIL_SECD_NM         = getStrData(obj, "HOUSE_DETAIL_SECD_NM");
	        
	        
	          

	          
	          
		        HousingInfoJPA info = new HousingInfoJPA(0,BSNS_MBY_NM, CNSTRCT_ENTRPS_NM, CNTRCT_CNCLS_BGNDE, CNTRCT_CNCLS_ENDDE, GNRL_RCEPT_BGNDE, GNRL_RCEPT_ENDDE, GNRL_RNK1_CRSPAREA_RCEPT_PD, GNRL_RNK1_ETC_AREA_RCPTDE_PD, GNRL_RNK1_ETC_GG_RCPTDE_PD, GNRL_RNK2_CRSPAREA_RCEPT_PD, GNRL_RNK2_ETC_AREA_RCPTDE_PD, GNRL_RNK2_ETC_GG_RCPTDE_PD, HMPG_ADRES, HOUSE_DTL_SECD, HOUSE_DTL_SECD_NM, HOUSE_MANAGE_NO, HOUSE_NM, HOUSE_SECD, HOUSE_SECD_NM, HSSPLY_ADRES, HSSPLY_ZIP, IMPRMN_BSNS_AT, LRSCL_BLDLND_AT, MDAT_TRGET_AREA_SECD, MDHS_TELNO, MVN_PREARNGE_YM, NPLN_PRVOPR_PUBLIC_HOUSE_AT, PARCPRC_ULS_AT, PBLANC_NO, PBLANC_URL, PRZWNER_PRESNATN_DE, PUBLIC_HOUSE_EARTH_AT, RCEPT_BGNDE, RCEPT_ENDDE, RCRIT_PBLANC_DE, RENT_SECD, RENT_SECD_NM, SPECLT_RDN_EARTH_AT, SPSPLY_RCEPT_BGNDE, SPSPLY_RCEPT_ENDDE, SUBSCRPT_AREA_CODE, SUBSCRPT_AREA_CODE_NM, TOT_SUPLY_HSHLDCO, SEARCH_HOUSE_SECD, HOUSE_DETAIL_SECD, HOUSE_DETAIL_SECD_NM);
	        
	        list.add(info);
	        
	      
	        //System.out.println(list.get(i).getHOUSE_MANAGE_NO());
	      
	       
			}   
			
			System.out.println(list);   
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	
	

	
	public static List<HousingInfoByTypeJPA> parseHousingInfoType() {
		List<HousingInfoByTypeJPA> list = new ArrayList<>();
		List<String> houseNumList = new ArrayList<>();

 		try {
 			for (int i = 0; i < parseHousingInfo().size(); i++) {
				
			
			StringBuilder urlBuilder = new StringBuilder(AptInfoByType_JSON_URL);

 			urlBuilder.append("?" + "page=" + 1);
			urlBuilder.append("&" + "perPage=" + 100);
			urlBuilder.append("&" + "cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=" + parseHousingInfo().get(i).getHouseManageNo());
			
			
			houseNumList.add(parseHousingInfo().get(i).getHouseManageNo());
			
			
			urlBuilder.append("&" + "serviceKey=" + KEY);
			System.out.println(urlBuilder.toString());
			
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			int code = conn.getResponseCode(); // 실제 page를 요청하는 코드부
			System.out.println("ResponseCode : " + code);
			if (code < 200 || code >= 300) {
				System.out.println("페이지가 잘못되었습니다.");
				return list;
			}
			
			InputStreamReader isr = new InputStreamReader(conn.getInputStream(), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			
			JSONParser jsonParser = new JSONParser(); 
			JSONObject rootObj = (JSONObject) jsonParser.parse(br);
			JSONArray array = (JSONArray) rootObj.get("data");
			for(int j = 0; j< array.size(); j++) {
				JSONObject obj = (JSONObject) array.get(j);

			       int  	ETC_HSHLDCO                  = getIntData(obj, "ETC_HSHLDCO");
			       String HOUSE_MANAGE_NO               = getStrData(obj, "HOUSE_MANAGE_NO");
			       String  HOUSE_TY                     = getStrData(obj, "HOUSE_TY");
			       int  INSTT_RECOMEND_HSHLDCO          = getIntData(obj, "INSTT_RECOMEND_HSHLDCO");
			       int  LFE_FRST_HSHLDCO                = getIntData(obj, "LFE_FRST_HSHLDCO");
			       int  LTTOT_TOP_AMOUNT                = getIntData(obj, "LTTOT_TOP_AMOUNT");
			       if(LTTOT_TOP_AMOUNT == 0) {LTTOT_TOP_AMOUNT = getIntData(obj, "SUPLY_AMOUNT");}
			       int  MNYCH_HSHLDCO                   = getIntData(obj, "MNYCH_HSHLDCO");
			       String  MODEL_NO                     = getStrData(obj, "MODEL_NO");
			       int  NWWDS_HSHLDCO                   = getIntData(obj, "NWWDS_HSHLDCO");
			       int  OLD_PARNTS_SUPORT_HSHLDCO       = getIntData(obj, "OLD_PARNTS_SUPORT_HSHLDCO");
			       int  SPSPLY_HSHLDCO                  = getIntData(obj, "SPSPLY_HSHLDCO");
			       String  SUPLY_AR                     = getStrData(obj, "SUPLY_AR");
			       int  SUPLY_HSHLDCO                   = getIntData(obj, "SUPLY_HSHLDCO");
			       int  TRANSR_INSTT_ENFSN_HSHLDCO      = getIntData(obj, "TRANSR_INSTT_ENFSN_HSHLDCO");
			       int spsply_ygmn_hshldco = getIntData(obj, "SPSPLY_YGMN_HSHLDCO");
			       String  GP                           = getStrData(obj, "GP");
			       String  TP                           = getStrData(obj, "TP");
			       String  EXCLUSE_AR                   = getStrData(obj, "EXCLUSE_AR");
			       String  CNTRCT_AR                    = getStrData(obj, "CNTRCT_AR");
			       int  GNSPLY_HSHLDCO                  = getIntData(obj, "GNSPLY_HSHLDCO");
			       int  SPSPLY_AGED_HSHLDCO             = getIntData(obj, "SPSPLY_AGED_HSHLDCO");
			       int  SPSPLY_NEW_MRRG_HSHLDCO         = getIntData(obj, "SPSPLY_NEW_MRRG_HSHLDCO");
			       int  SUBSCRPT_REQST_AMOUNT           = getIntData(obj, "SUBSCRPT_REQST_AMOUNT");
			          

			          
			          
			       HousingInfoByTypeJPA info = new HousingInfoByTypeJPA(0,ETC_HSHLDCO, HOUSE_MANAGE_NO,HOUSE_TY, INSTT_RECOMEND_HSHLDCO, LFE_FRST_HSHLDCO, LTTOT_TOP_AMOUNT, MNYCH_HSHLDCO, MODEL_NO, NWWDS_HSHLDCO, OLD_PARNTS_SUPORT_HSHLDCO, SPSPLY_HSHLDCO, SUPLY_AR, SUPLY_HSHLDCO, TRANSR_INSTT_ENFSN_HSHLDCO, GP, TP, EXCLUSE_AR, CNTRCT_AR, GNSPLY_HSHLDCO, SPSPLY_AGED_HSHLDCO, SPSPLY_NEW_MRRG_HSHLDCO, SUBSCRPT_REQST_AMOUNT,spsply_ygmn_hshldco);
			        list.add(info);
	        
	        
			}
 			}
			//System.out.println(list);
			System.out.println("아파트: " +  houseNumList);
			 
			
			
			
	       
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
		
	}
	
////////오피스텔 및 다른 주택 상세정보/주택형별 상세정보
	
	public static List<HousingInfoJPA> parseHousingInfoOfficeTel() {
		List<HousingInfoJPA> list = new ArrayList<>();

		try {
	
			StringBuilder urlBuilder = new StringBuilder(OfficeTelAndEtcInfo_JSON_URL);
			urlBuilder.append("?" + "page=" + 1);
			urlBuilder.append("&" + "perPage=" + 10);
			urlBuilder.append("&" + "serviceKey=" + KEY);
			System.out.println(urlBuilder.toString());
			
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			int code = conn.getResponseCode(); // 실제 page를 요청하는 코드부
			System.out.println("ResponseCode : " + code);
			if (code < 200 || code >= 300) {
				System.out.println("페이지가 잘못되었습니다.");
				return list;
			}
			
			InputStreamReader isr = new InputStreamReader(conn.getInputStream(), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			
			JSONParser jsonParser = new JSONParser(); 
			JSONObject rootObj = (JSONObject) jsonParser.parse(br);
			JSONArray array = (JSONArray) rootObj.get("data");
			for(int i = 0; i< array.size(); i++) {
				JSONObject obj = (JSONObject) array.get(i);
			
				String  BSNS_MBY_NM	 = getStrData(obj, "BSNS_MBY_NM");
				String  CNSTRCT_ENTRPS_NM	=  getStrData(obj, "CNSTRCT_ENTRPS_NM");
				String  CNTRCT_CNCLS_BGNDE	 =  getStrData(obj, "CNTRCT_CNCLS_BGNDE");
				String  CNTRCT_CNCLS_ENDDE	 =  getStrData(obj, "CNTRCT_CNCLS_ENDDE");
				String  GNRL_RCEPT_BGNDE	 =  getStrData(obj, "GNRL_RCEPT_BGNDE");
				String  GNRL_RCEPT_ENDDE	 =  getStrData(obj, "GNRL_RCEPT_ENDDE");
				String  GNRL_RNK1_CRSPAREA_RCEPT_PD	=  getStrData(obj, "GNRL_RNK1_CRSPAREA_RCEPT_PD");
				String  GNRL_RNK1_ETC_AREA_RCPTDE_PD	 =  getStrData(obj, "GNRL_RNK1_ETC_AREA_RCPTDE_PD");
				String  GNRL_RNK1_ETC_GG_RCPTDE_PD =  getStrData(obj, "GNRL_RNK1_ETC_GG_RCPTDE_PD");
				String  GNRL_RNK2_CRSPAREA_RCEPT_PD	 =  getStrData(obj, "GNRL_RNK2_CRSPAREA_RCEPT_PD");
				String  GNRL_RNK2_ETC_AREA_RCPTDE_PD	=  getStrData(obj, "GNRL_RNK2_ETC_AREA_RCPTDE_PD");
				String  GNRL_RNK2_ETC_GG_RCPTDE_PD =  getStrData(obj, "GNRL_RNK2_ETC_GG_RCPTDE_PD");
				String  HMPG_ADRES =  getStrData(obj, "HMPG_ADRES");
		    	String  HOUSE_DTL_SECD  =  getStrData(obj, "HOUSE_DTL_SECD");
		    	String  HOUSE_DTL_SECD_NM  =  getStrData(obj, "HOUSE_DTL_SECD_NM");
		    	String  HOUSE_MANAGE_NO =  getStrData(obj, "HOUSE_MANAGE_NO");
		    	String  HOUSE_NM =  getStrData(obj, "HOUSE_NM");
		    	String  HOUSE_SECD  =  getStrData(obj, "HOUSE_SECD");
		    	String  HOUSE_SECD_NM =  getStrData(obj, "HOUSE_SECD_NM");
		    	String  HSSPLY_ADRES =  getStrData(obj, "HSSPLY_ADRES");
		    	String  HSSPLY_ZIP 		             = getStrData(obj, "HSSPLY_ZIP");
		    	String  IMPRMN_BSNS_AT               = getStrData(obj, "IMPRMN_BSNS_AT");
		    	String  LRSCL_BLDLND_AT              = getStrData(obj, "LRSCL_BLDLND_AT");
		    	String  MDAT_TRGET_AREA_SECD         = getStrData(obj, "MDAT_TRGET_AREA_SECD");
		    	String  MDHS_TELNO                   = getStrData(obj, "MDHS_TELNO");
		    	String  MVN_PREARNGE_YM              = getStrData(obj, "MVN_PREARNGE_YM");
		    	String  NPLN_PRVOPR_PUBLIC_HOUSE_AT  = getStrData(obj, "NPLN_PRVOPR_PUBLIC_HOUSE_AT");
		    	String  PARCPRC_ULS_AT               = getStrData(obj, "PARCPRC_ULS_AT");
		    	String  PBLANC_NO                    = getStrData(obj, "PBLANC_NO");
		    	String  PBLANC_URL                   = getStrData(obj, "PBLANC_URL");
		    	String  PRZWNER_PRESNATN_DE          = getStrData(obj, "PRZWNER_PRESNATN_DE");
		    	String  PUBLIC_HOUSE_EARTH_AT        = getStrData(obj, "PUBLIC_HOUSE_EARTH_AT");
		    	String  RCEPT_BGNDE                  = getStrDataExceptAptInfo(obj, "SUBSCRPT_RCEPT_BGNDE");
		    	String  RCEPT_ENDDE                  = getStrDataExceptAptInfo(obj, "SUBSCRPT_RCEPT_ENDDE");
		    	String  RCRIT_PBLANC_DE              = getStrData(obj, "RCRIT_PBLANC_DE");
		        String  RENT_SECD                    = getStrData(obj, "RENT_SECD");
		        String  RENT_SECD_NM                 = getStrData(obj, "RENT_SECD_NM");
		        String  SPECLT_RDN_EARTH_AT          = getStrData(obj, "SPECLT_RDN_EARTH_AT");
		        String  SPSPLY_RCEPT_BGNDE           = getStrData(obj, "SPSPLY_RCEPT_BGNDE");
		        String  SPSPLY_RCEPT_ENDDE           = getStrData(obj, "SPSPLY_RCEPT_ENDDE");
		        String  SUBSCRPT_AREA_CODE           = getStrData(obj, "SUBSCRPT_AREA_CODE");
		        String  SUBSCRPT_AREA_CODE_NM        = getStrData(obj, "SUBSCRPT_AREA_CODE_NM");
		        int  	TOT_SUPLY_HSHLDCO            = getIntData(obj, "TOT_SUPLY_HSHLDCO");
		        String  SEARCH_HOUSE_SECD            = getStrData(obj, "SEARCH_HOUSE_SECD");
		        String  HOUSE_DETAIL_SECD            = getStrData(obj, "HOUSE_DETAIL_SECD");
		        String  HOUSE_DETAIL_SECD_NM         = getStrData(obj, "HOUSE_DETAIL_SECD_NM");
	        
	        
	          

	          
	          
		        HousingInfoJPA info = new HousingInfoJPA(0,BSNS_MBY_NM, CNSTRCT_ENTRPS_NM, CNTRCT_CNCLS_BGNDE, CNTRCT_CNCLS_ENDDE, GNRL_RCEPT_BGNDE, GNRL_RCEPT_ENDDE, GNRL_RNK1_CRSPAREA_RCEPT_PD, GNRL_RNK1_ETC_AREA_RCPTDE_PD, GNRL_RNK1_ETC_GG_RCPTDE_PD, GNRL_RNK2_CRSPAREA_RCEPT_PD, GNRL_RNK2_ETC_AREA_RCPTDE_PD, GNRL_RNK2_ETC_GG_RCPTDE_PD, HMPG_ADRES, HOUSE_DTL_SECD, HOUSE_DTL_SECD_NM, HOUSE_MANAGE_NO, HOUSE_NM, HOUSE_SECD, HOUSE_SECD_NM, HSSPLY_ADRES, HSSPLY_ZIP, IMPRMN_BSNS_AT, LRSCL_BLDLND_AT, MDAT_TRGET_AREA_SECD, MDHS_TELNO, MVN_PREARNGE_YM, NPLN_PRVOPR_PUBLIC_HOUSE_AT, PARCPRC_ULS_AT, PBLANC_NO, PBLANC_URL, PRZWNER_PRESNATN_DE, PUBLIC_HOUSE_EARTH_AT, RCEPT_BGNDE, RCEPT_ENDDE, RCRIT_PBLANC_DE, RENT_SECD, RENT_SECD_NM, SPECLT_RDN_EARTH_AT, SPSPLY_RCEPT_BGNDE, SPSPLY_RCEPT_ENDDE, SUBSCRPT_AREA_CODE, SUBSCRPT_AREA_CODE_NM, TOT_SUPLY_HSHLDCO, SEARCH_HOUSE_SECD, HOUSE_DETAIL_SECD, HOUSE_DETAIL_SECD_NM);
	        
	        list.add(info);
	        
	      
	        //System.out.println("오피스텔: " + list.get(i).getHouseManageNo());
	      
	       
			}   
			
			//System.out.println(list);   
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	
	
	public static List<HousingInfoByTypeJPA> parseHousingInfoOfficeTelByType() {
		List<HousingInfoByTypeJPA> list = new ArrayList<>();
		List<String> houseNumList = new ArrayList<>();

 		try {
 			for (int i = 0; i < parseHousingInfo().size(); i++) {
				
			
			StringBuilder urlBuilder = new StringBuilder(OfficeTelAndEtcInfoByType_JSON_URL);

 			urlBuilder.append("?" + "page=" + 1);
			urlBuilder.append("&" + "perPage=" + 100);
			urlBuilder.append("&" + "cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=" + parseHousingInfoOfficeTel().get(i).getHouseManageNo());
			
			
			houseNumList.add(parseHousingInfoOfficeTel().get(i).getHouseManageNo());
			
			
			urlBuilder.append("&" + "serviceKey=" + KEY);
			System.out.println(urlBuilder.toString());
			
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			int code = conn.getResponseCode(); // 실제 page를 요청하는 코드부
			System.out.println("ResponseCode : " + code);
			if (code < 200 || code >= 300) {
				System.out.println("페이지가 잘못되었습니다.");
				return list;
			}
			
			InputStreamReader isr = new InputStreamReader(conn.getInputStream(), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			
			JSONParser jsonParser = new JSONParser(); 
			JSONObject rootObj = (JSONObject) jsonParser.parse(br);
			JSONArray array = (JSONArray) rootObj.get("data");
			for(int j = 0; j< array.size(); j++) {
				JSONObject obj = (JSONObject) array.get(j);

			       int  	ETC_HSHLDCO                  = getIntData(obj, "ETC_HSHLDCO");
			       String HOUSE_MANAGE_NO               = getStrData(obj, "HOUSE_MANAGE_NO");
			       String  HOUSE_TY                     = getStrData(obj, "HOUSE_TY");
			       int  INSTT_RECOMEND_HSHLDCO          = getIntData(obj, "INSTT_RECOMEND_HSHLDCO");
			       int  LFE_FRST_HSHLDCO                = getIntData(obj, "LFE_FRST_HSHLDCO");
			       int  LTTOT_TOP_AMOUNT                = getIntData(obj, "LTTOT_TOP_AMOUNT");
			       if(LTTOT_TOP_AMOUNT == 0) {LTTOT_TOP_AMOUNT = getIntData(obj, "SUPLY_AMOUNT");}
			       int  MNYCH_HSHLDCO                   = getIntData(obj, "MNYCH_HSHLDCO");
			       String  MODEL_NO                     = getStrData(obj, "MODEL_NO");
			       int  NWWDS_HSHLDCO                   = getIntData(obj, "NWWDS_HSHLDCO");
			       int  OLD_PARNTS_SUPORT_HSHLDCO       = getIntData(obj, "OLD_PARNTS_SUPORT_HSHLDCO");
			       int  SPSPLY_HSHLDCO                  = getIntData(obj, "SPSPLY_HSHLDCO");
			       String  SUPLY_AR                     = getStrData(obj, "SUPLY_AR");
			       int  SUPLY_HSHLDCO                   = getIntData(obj, "SUPLY_HSHLDCO");
			       int  TRANSR_INSTT_ENFSN_HSHLDCO      = getIntData(obj, "TRANSR_INSTT_ENFSN_HSHLDCO");
			       int spsply_ygmn_hshldco = getIntData(obj, "SPSPLY_YGMN_HSHLDCO");
			       String  GP                           = getStrData(obj, "GP");
			       String  TP                           = getStrData(obj, "TP");
			       String  EXCLUSE_AR                   = getStrData(obj, "EXCLUSE_AR");
			       String  CNTRCT_AR                    = getStrData(obj, "CNTRCT_AR");
			       int  GNSPLY_HSHLDCO                  = getIntData(obj, "GNSPLY_HSHLDCO");
			       int  SPSPLY_AGED_HSHLDCO             = getIntData(obj, "SPSPLY_AGED_HSHLDCO");
			       int  SPSPLY_NEW_MRRG_HSHLDCO         = getIntData(obj, "SPSPLY_NEW_MRRG_HSHLDCO");
			       int  SUBSCRPT_REQST_AMOUNT           = getIntData(obj, "SUBSCRPT_REQST_AMOUNT");
			          

			          
			          
			       HousingInfoByTypeJPA info = new HousingInfoByTypeJPA(0,ETC_HSHLDCO, HOUSE_MANAGE_NO,HOUSE_TY, INSTT_RECOMEND_HSHLDCO, LFE_FRST_HSHLDCO, LTTOT_TOP_AMOUNT, MNYCH_HSHLDCO, MODEL_NO, NWWDS_HSHLDCO, OLD_PARNTS_SUPORT_HSHLDCO, SPSPLY_HSHLDCO, SUPLY_AR, SUPLY_HSHLDCO, TRANSR_INSTT_ENFSN_HSHLDCO, GP, TP, EXCLUSE_AR, CNTRCT_AR, GNSPLY_HSHLDCO, SPSPLY_AGED_HSHLDCO, SPSPLY_NEW_MRRG_HSHLDCO, SUBSCRPT_REQST_AMOUNT,spsply_ygmn_hshldco);
			        list.add(info);
	
	        
	        
			}
 			}
			//System.out.println(list);
			System.out.println("오피스텔: " + houseNumList);
			 
			
			
			
	       
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
		
	}
	
	//무순위 아파트 상세정보 및 주택형 상세정보
	
	public static List<HousingInfoJPA> parseHousingInfoNoOrderApt() {
		List<HousingInfoJPA> list = new ArrayList<>();

		try {
	
			StringBuilder urlBuilder = new StringBuilder(AptInfoForNoOrder_JSON_URL);
			urlBuilder.append("?" + "page=" + 1);
			urlBuilder.append("&" + "perPage=" + 10);
			urlBuilder.append("&" + "serviceKey=" + KEY);
			System.out.println(urlBuilder.toString());
			
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			int code = conn.getResponseCode(); // 실제 page를 요청하는 코드부
			System.out.println("ResponseCode : " + code);
			if (code < 200 || code >= 300) {
				System.out.println("페이지가 잘못되었습니다.");
				return list;
			}
			
			InputStreamReader isr = new InputStreamReader(conn.getInputStream(), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			
			JSONParser jsonParser = new JSONParser(); 
			JSONObject rootObj = (JSONObject) jsonParser.parse(br);
			JSONArray array = (JSONArray) rootObj.get("data");
			for(int j = 0; j< array.size(); j++) {
				JSONObject obj = (JSONObject) array.get(j);
			
				String  BSNS_MBY_NM	 = getStrData(obj, "BSNS_MBY_NM");
				String  CNSTRCT_ENTRPS_NM	=  getStrData(obj, "CNSTRCT_ENTRPS_NM");
				String  CNTRCT_CNCLS_BGNDE	 =  getStrData(obj, "CNTRCT_CNCLS_BGNDE");
				String  CNTRCT_CNCLS_ENDDE	 =  getStrData(obj, "CNTRCT_CNCLS_ENDDE");
				String  GNRL_RCEPT_BGNDE	 =  getStrData(obj, "GNRL_RCEPT_BGNDE");
				String  GNRL_RCEPT_ENDDE	 =  getStrData(obj, "GNRL_RCEPT_ENDDE");
				String  GNRL_RNK1_CRSPAREA_RCEPT_PD	=  getStrData(obj, "GNRL_RNK1_CRSPAREA_RCEPT_PD");
				String  GNRL_RNK1_ETC_AREA_RCPTDE_PD	 =  getStrData(obj, "GNRL_RNK1_ETC_AREA_RCPTDE_PD");
				String  GNRL_RNK1_ETC_GG_RCPTDE_PD =  getStrData(obj, "GNRL_RNK1_ETC_GG_RCPTDE_PD");
				String  GNRL_RNK2_CRSPAREA_RCEPT_PD	 =  getStrData(obj, "GNRL_RNK2_CRSPAREA_RCEPT_PD");
				String  GNRL_RNK2_ETC_AREA_RCPTDE_PD	=  getStrData(obj, "GNRL_RNK2_ETC_AREA_RCPTDE_PD");
				String  GNRL_RNK2_ETC_GG_RCPTDE_PD =  getStrData(obj, "GNRL_RNK2_ETC_GG_RCPTDE_PD");
				String  HMPG_ADRES =  getStrData(obj, "HMPG_ADRES");
		    	String  HOUSE_DTL_SECD  =  getStrData(obj, "HOUSE_DTL_SECD");
		    	String  HOUSE_DTL_SECD_NM  =  getStrData(obj, "HOUSE_DTL_SECD_NM");
		    	String  HOUSE_MANAGE_NO =  getStrData(obj, "HOUSE_MANAGE_NO");
		    	String  HOUSE_NM =  getStrData(obj, "HOUSE_NM");
		    	String  HOUSE_SECD  =  getStrData(obj, "HOUSE_SECD");
		    	String  HOUSE_SECD_NM =  getStrData(obj, "HOUSE_SECD_NM");
		    	String  HSSPLY_ADRES =  getStrData(obj, "HSSPLY_ADRES");
		    	String  HSSPLY_ZIP 		             = getStrData(obj, "HSSPLY_ZIP");
		    	String  IMPRMN_BSNS_AT               = getStrData(obj, "IMPRMN_BSNS_AT");
		    	String  LRSCL_BLDLND_AT              = getStrData(obj, "LRSCL_BLDLND_AT");
		    	String  MDAT_TRGET_AREA_SECD         = getStrData(obj, "MDAT_TRGET_AREA_SECD");
		    	String  MDHS_TELNO                   = getStrData(obj, "MDHS_TELNO");
		    	String  MVN_PREARNGE_YM              = getStrData(obj, "MVN_PREARNGE_YM");
		    	String  NPLN_PRVOPR_PUBLIC_HOUSE_AT  = getStrData(obj, "NPLN_PRVOPR_PUBLIC_HOUSE_AT");
		    	String  PARCPRC_ULS_AT               = getStrData(obj, "PARCPRC_ULS_AT");
		    	String  PBLANC_NO                    = getStrData(obj, "PBLANC_NO");
		    	String  PBLANC_URL                   = getStrData(obj, "PBLANC_URL");
		    	String  PRZWNER_PRESNATN_DE          = getStrData(obj, "PRZWNER_PRESNATN_DE");
		    	String  PUBLIC_HOUSE_EARTH_AT        = getStrData(obj, "PUBLIC_HOUSE_EARTH_AT");
		    	String  RCEPT_BGNDE                  = getStrDataExceptAptInfo(obj, "SUBSCRPT_RCEPT_BGNDE");
		    	String  RCEPT_ENDDE                  = getStrDataExceptAptInfo(obj, "SUBSCRPT_RCEPT_ENDDE");
		    	String  RCRIT_PBLANC_DE              = getStrData(obj, "RCRIT_PBLANC_DE");
		        String  RENT_SECD                    = getStrData(obj, "RENT_SECD");
		        String  RENT_SECD_NM                 = getStrData(obj, "RENT_SECD_NM");
		        String  SPECLT_RDN_EARTH_AT          = getStrData(obj, "SPECLT_RDN_EARTH_AT");
		        String  SPSPLY_RCEPT_BGNDE           = getStrData(obj, "SPSPLY_RCEPT_BGNDE");
		        String  SPSPLY_RCEPT_ENDDE           = getStrData(obj, "SPSPLY_RCEPT_ENDDE");
		        String  SUBSCRPT_AREA_CODE           = getStrData(obj, "SUBSCRPT_AREA_CODE");
		        String  SUBSCRPT_AREA_CODE_NM        = getStrData(obj, "SUBSCRPT_AREA_CODE_NM");
		        int  	TOT_SUPLY_HSHLDCO            = getIntData(obj, "TOT_SUPLY_HSHLDCO");
		        String  SEARCH_HOUSE_SECD            = getStrData(obj, "SEARCH_HOUSE_SECD");
		        String  HOUSE_DETAIL_SECD            = getStrData(obj, "HOUSE_DETAIL_SECD");
		        String  HOUSE_DETAIL_SECD_NM         = getStrData(obj, "HOUSE_DETAIL_SECD_NM");
	          

	          
	          
		        HousingInfoJPA info = new HousingInfoJPA(0,BSNS_MBY_NM, CNSTRCT_ENTRPS_NM, CNTRCT_CNCLS_BGNDE, CNTRCT_CNCLS_ENDDE, GNRL_RCEPT_BGNDE, GNRL_RCEPT_ENDDE, GNRL_RNK1_CRSPAREA_RCEPT_PD, GNRL_RNK1_ETC_AREA_RCPTDE_PD, GNRL_RNK1_ETC_GG_RCPTDE_PD, GNRL_RNK2_CRSPAREA_RCEPT_PD, GNRL_RNK2_ETC_AREA_RCPTDE_PD, GNRL_RNK2_ETC_GG_RCPTDE_PD, HMPG_ADRES, HOUSE_DTL_SECD, HOUSE_DTL_SECD_NM, HOUSE_MANAGE_NO, HOUSE_NM, HOUSE_SECD, HOUSE_SECD_NM, HSSPLY_ADRES, HSSPLY_ZIP, IMPRMN_BSNS_AT, LRSCL_BLDLND_AT, MDAT_TRGET_AREA_SECD, MDHS_TELNO, MVN_PREARNGE_YM, NPLN_PRVOPR_PUBLIC_HOUSE_AT, PARCPRC_ULS_AT, PBLANC_NO, PBLANC_URL, PRZWNER_PRESNATN_DE, PUBLIC_HOUSE_EARTH_AT, RCEPT_BGNDE, RCEPT_ENDDE, RCRIT_PBLANC_DE, RENT_SECD, RENT_SECD_NM, SPECLT_RDN_EARTH_AT, SPSPLY_RCEPT_BGNDE, SPSPLY_RCEPT_ENDDE, SUBSCRPT_AREA_CODE, SUBSCRPT_AREA_CODE_NM, TOT_SUPLY_HSHLDCO, SEARCH_HOUSE_SECD, HOUSE_DETAIL_SECD, HOUSE_DETAIL_SECD_NM);
	        
	        list.add(info);
	        
	      
	        //System.out.println(list.get(i).getHOUSE_MANAGE_NO());
	      
	       
			}   
			
			//System.out.println(list);   
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	
	
	public static List<HousingInfoByTypeJPA> parseHousingInfoNoOrderAptByType() {
		List<HousingInfoByTypeJPA> list = new ArrayList<>();
		List<String> houseNumList = new ArrayList<>();

 		try {
 			for (int i = 0; i < parseHousingInfoNoOrderApt().size(); i++) {
				
			
			StringBuilder urlBuilder = new StringBuilder(AptInfoForNoOrderByType_JSON_URL);

 			urlBuilder.append("?" + "page=" + 1);
			urlBuilder.append("&" + "perPage=" + 100);
			urlBuilder.append("&" + "cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=" + parseHousingInfoNoOrderApt().get(i).getHouseManageNo());
			
			
			houseNumList.add(parseHousingInfoNoOrderApt().get(i).getHouseManageNo());
			
			
			urlBuilder.append("&" + "serviceKey=" + KEY);
			System.out.println(urlBuilder.toString());
			
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			int code = conn.getResponseCode(); // 실제 page를 요청하는 코드부
			System.out.println("ResponseCode : " + code);
			if (code < 200 || code >= 300) {
				System.out.println("페이지가 잘못되었습니다.");
				return list;
			}
			
			InputStreamReader isr = new InputStreamReader(conn.getInputStream(), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			
			JSONParser jsonParser = new JSONParser(); 
			JSONObject rootObj = (JSONObject) jsonParser.parse(br);
			JSONArray array = (JSONArray) rootObj.get("data");
			for(int j = 0; j< array.size(); j++) {
				JSONObject obj = (JSONObject) array.get(j);

			       int  	ETC_HSHLDCO                  = getIntData(obj, "ETC_HSHLDCO");
			       String HOUSE_MANAGE_NO               = getStrData(obj, "HOUSE_MANAGE_NO");
			       String  HOUSE_TY                     = getStrData(obj, "HOUSE_TY");
			       int  INSTT_RECOMEND_HSHLDCO          = getIntData(obj, "INSTT_RECOMEND_HSHLDCO");
			       int  LFE_FRST_HSHLDCO                = getIntData(obj, "LFE_FRST_HSHLDCO");
			       int  LTTOT_TOP_AMOUNT                = getIntData(obj, "LTTOT_TOP_AMOUNT");
			       if(LTTOT_TOP_AMOUNT == 0) {LTTOT_TOP_AMOUNT = getIntData(obj, "SUPLY_AMOUNT");}
			       int  MNYCH_HSHLDCO                   = getIntData(obj, "MNYCH_HSHLDCO");
			       String  MODEL_NO                     = getStrData(obj, "MODEL_NO");
			       int  NWWDS_HSHLDCO                   = getIntData(obj, "NWWDS_HSHLDCO");
			       int  OLD_PARNTS_SUPORT_HSHLDCO       = getIntData(obj, "OLD_PARNTS_SUPORT_HSHLDCO");
			       int  SPSPLY_HSHLDCO                  = getIntData(obj, "SPSPLY_HSHLDCO");
			       String  SUPLY_AR                     = getStrData(obj, "SUPLY_AR");
			       int  SUPLY_HSHLDCO                   = getIntData(obj, "SUPLY_HSHLDCO");
			       int  TRANSR_INSTT_ENFSN_HSHLDCO      = getIntData(obj, "TRANSR_INSTT_ENFSN_HSHLDCO");
			       int spsply_ygmn_hshldco = getIntData(obj, "SPSPLY_YGMN_HSHLDCO");
			       String  GP                           = getStrData(obj, "GP");
			       String  TP                           = getStrData(obj, "TP");
			       String  EXCLUSE_AR                   = getStrData(obj, "EXCLUSE_AR");
			       String  CNTRCT_AR                    = getStrData(obj, "CNTRCT_AR");
			       int  GNSPLY_HSHLDCO                  = getIntData(obj, "GNSPLY_HSHLDCO");
			       int  SPSPLY_AGED_HSHLDCO             = getIntData(obj, "SPSPLY_AGED_HSHLDCO");
			       int  SPSPLY_NEW_MRRG_HSHLDCO         = getIntData(obj, "SPSPLY_NEW_MRRG_HSHLDCO");
			       int  SUBSCRPT_REQST_AMOUNT           = getIntData(obj, "SUBSCRPT_REQST_AMOUNT");
			          

			          
			          
			       HousingInfoByTypeJPA info = new HousingInfoByTypeJPA(0,ETC_HSHLDCO, HOUSE_MANAGE_NO,HOUSE_TY, INSTT_RECOMEND_HSHLDCO, LFE_FRST_HSHLDCO, LTTOT_TOP_AMOUNT, MNYCH_HSHLDCO, MODEL_NO, NWWDS_HSHLDCO, OLD_PARNTS_SUPORT_HSHLDCO, SPSPLY_HSHLDCO, SUPLY_AR, SUPLY_HSHLDCO, TRANSR_INSTT_ENFSN_HSHLDCO, GP, TP, EXCLUSE_AR, CNTRCT_AR, GNSPLY_HSHLDCO, SPSPLY_AGED_HSHLDCO, SPSPLY_NEW_MRRG_HSHLDCO, SUBSCRPT_REQST_AMOUNT,spsply_ygmn_hshldco);
			        list.add(info);
	
	        
	        
			}
 			}
			//System.out.println(list);
			System.out.println("무순위: " + houseNumList);
			 
			
			
			
	       
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
		
	}
	
	//공공임대 상세정보 및 주택형별 상세정보
	
	public static List<HousingInfoJPA> parseHousingInfoPulbicRent() {
		List<HousingInfoJPA> list = new ArrayList<>();

		try {
	
			StringBuilder urlBuilder = new StringBuilder(PublicRentInfo_JSON_URL);
			urlBuilder.append("?" + "page=" + 1);
			urlBuilder.append("&" + "perPage=" + 10);
			urlBuilder.append("&" + "serviceKey=" + KEY);
			System.out.println(urlBuilder.toString());
			
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			int code = conn.getResponseCode(); // 실제 page를 요청하는 코드부
			System.out.println("ResponseCode : " + code);
			if (code < 200 || code >= 300) {
				System.out.println("페이지가 잘못되었습니다.");
				return list;
			}
			
			InputStreamReader isr = new InputStreamReader(conn.getInputStream(), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			
			JSONParser jsonParser = new JSONParser(); 
			JSONObject rootObj = (JSONObject) jsonParser.parse(br);
			JSONArray array = (JSONArray) rootObj.get("data");
			for(int i = 0; i< array.size(); i++) {
				JSONObject obj = (JSONObject) array.get(i);
			
				String  BSNS_MBY_NM	 = getStrData(obj, "BSNS_MBY_NM");
				String  CNSTRCT_ENTRPS_NM	=  getStrData(obj, "CNSTRCT_ENTRPS_NM");
				String  CNTRCT_CNCLS_BGNDE	 =  getStrData(obj, "CNTRCT_CNCLS_BGNDE");
				String  CNTRCT_CNCLS_ENDDE	 =  getStrData(obj, "CNTRCT_CNCLS_ENDDE");
				String  GNRL_RCEPT_BGNDE	 =  getStrData(obj, "GNRL_RCEPT_BGNDE");
				String  GNRL_RCEPT_ENDDE	 =  getStrData(obj, "GNRL_RCEPT_ENDDE");
				String  GNRL_RNK1_CRSPAREA_RCEPT_PD	=  getStrData(obj, "GNRL_RNK1_CRSPAREA_RCEPT_PD");
				String  GNRL_RNK1_ETC_AREA_RCPTDE_PD	 =  getStrData(obj, "GNRL_RNK1_ETC_AREA_RCPTDE_PD");
				String  GNRL_RNK1_ETC_GG_RCPTDE_PD =  getStrData(obj, "GNRL_RNK1_ETC_GG_RCPTDE_PD");
				String  GNRL_RNK2_CRSPAREA_RCEPT_PD	 =  getStrData(obj, "GNRL_RNK2_CRSPAREA_RCEPT_PD");
				String  GNRL_RNK2_ETC_AREA_RCPTDE_PD	=  getStrData(obj, "GNRL_RNK2_ETC_AREA_RCPTDE_PD");
				String  GNRL_RNK2_ETC_GG_RCPTDE_PD =  getStrData(obj, "GNRL_RNK2_ETC_GG_RCPTDE_PD");
				String  HMPG_ADRES =  getStrData(obj, "HMPG_ADRES");
		    	String  HOUSE_DTL_SECD  =  getStrData(obj, "HOUSE_DTL_SECD");
		    	String  HOUSE_DTL_SECD_NM  =  getStrData(obj, "HOUSE_DTL_SECD_NM");
		    	String  HOUSE_MANAGE_NO =  getStrData(obj, "HOUSE_MANAGE_NO");
		    	String  HOUSE_NM =  getStrData(obj, "HOUSE_NM");
		    	String  HOUSE_SECD  =  getStrData(obj, "HOUSE_SECD");
		    	String  HOUSE_SECD_NM =  getStrData(obj, "HOUSE_SECD_NM");
		    	String  HSSPLY_ADRES =  getStrData(obj, "HSSPLY_ADRES");
		    	String  HSSPLY_ZIP 		             = getStrData(obj, "HSSPLY_ZIP");
		    	String  IMPRMN_BSNS_AT               = getStrData(obj, "IMPRMN_BSNS_AT");
		    	String  LRSCL_BLDLND_AT              = getStrData(obj, "LRSCL_BLDLND_AT");
		    	String  MDAT_TRGET_AREA_SECD         = getStrData(obj, "MDAT_TRGET_AREA_SECD");
		    	String  MDHS_TELNO                   = getStrData(obj, "MDHS_TELNO");
		    	String  MVN_PREARNGE_YM              = getStrData(obj, "MVN_PREARNGE_YM");
		    	String  NPLN_PRVOPR_PUBLIC_HOUSE_AT  = getStrData(obj, "NPLN_PRVOPR_PUBLIC_HOUSE_AT");
		    	String  PARCPRC_ULS_AT               = getStrData(obj, "PARCPRC_ULS_AT");
		    	String  PBLANC_NO                    = getStrData(obj, "PBLANC_NO");
		    	String  PBLANC_URL                   = getStrData(obj, "PBLANC_URL");
		    	String  PRZWNER_PRESNATN_DE          = getStrData(obj, "PRZWNER_PRESNATN_DE");
		    	String  PUBLIC_HOUSE_EARTH_AT        = getStrData(obj, "PUBLIC_HOUSE_EARTH_AT");
		    	String  RCEPT_BGNDE                  = getStrDataExceptAptInfo(obj, "SUBSCRPT_RCEPT_BGNDE");
		    	String  RCEPT_ENDDE                  = getStrDataExceptAptInfo(obj, "SUBSCRPT_RCEPT_ENDDE");
		    	String  RCRIT_PBLANC_DE              = getStrData(obj, "RCRIT_PBLANC_DE");
		        String  RENT_SECD                    = getStrData(obj, "RENT_SECD");
		        String  RENT_SECD_NM                 = getStrData(obj, "RENT_SECD_NM");
		        String  SPECLT_RDN_EARTH_AT          = getStrData(obj, "SPECLT_RDN_EARTH_AT");
		        String  SPSPLY_RCEPT_BGNDE           = getStrData(obj, "SPSPLY_RCEPT_BGNDE");
		        String  SPSPLY_RCEPT_ENDDE           = getStrData(obj, "SPSPLY_RCEPT_ENDDE");
		        String  SUBSCRPT_AREA_CODE           = getStrData(obj, "SUBSCRPT_AREA_CODE");
		        String  SUBSCRPT_AREA_CODE_NM        = getStrData(obj, "SUBSCRPT_AREA_CODE_NM");
		        int  	TOT_SUPLY_HSHLDCO            = getIntData(obj, "TOT_SUPLY_HSHLDCO");
		        String  SEARCH_HOUSE_SECD            = getStrData(obj, "SEARCH_HOUSE_SECD");
		        String  HOUSE_DETAIL_SECD            = getStrData(obj, "HOUSE_DETAIL_SECD");
		        String  HOUSE_DETAIL_SECD_NM         = getStrData(obj, "HOUSE_DETAIL_SECD_NM");
	        
	          

	          
	          
	        HousingInfoJPA info = new HousingInfoJPA(0,BSNS_MBY_NM, CNSTRCT_ENTRPS_NM, CNTRCT_CNCLS_BGNDE, CNTRCT_CNCLS_ENDDE, GNRL_RCEPT_BGNDE, GNRL_RCEPT_ENDDE, GNRL_RNK1_CRSPAREA_RCEPT_PD, GNRL_RNK1_ETC_AREA_RCPTDE_PD, GNRL_RNK1_ETC_GG_RCPTDE_PD, GNRL_RNK2_CRSPAREA_RCEPT_PD, GNRL_RNK2_ETC_AREA_RCPTDE_PD, GNRL_RNK2_ETC_GG_RCPTDE_PD, HMPG_ADRES, HOUSE_DTL_SECD, HOUSE_DTL_SECD_NM, HOUSE_MANAGE_NO, HOUSE_NM, HOUSE_SECD, HOUSE_SECD_NM, HSSPLY_ADRES, HSSPLY_ZIP, IMPRMN_BSNS_AT, LRSCL_BLDLND_AT, MDAT_TRGET_AREA_SECD, MDHS_TELNO, MVN_PREARNGE_YM, NPLN_PRVOPR_PUBLIC_HOUSE_AT, PARCPRC_ULS_AT, PBLANC_NO, PBLANC_URL, PRZWNER_PRESNATN_DE, PUBLIC_HOUSE_EARTH_AT, RCEPT_BGNDE, RCEPT_ENDDE, RCRIT_PBLANC_DE, RENT_SECD, RENT_SECD_NM, SPECLT_RDN_EARTH_AT, SPSPLY_RCEPT_BGNDE, SPSPLY_RCEPT_ENDDE, SUBSCRPT_AREA_CODE, SUBSCRPT_AREA_CODE_NM, TOT_SUPLY_HSHLDCO, SEARCH_HOUSE_SECD, HOUSE_DETAIL_SECD, HOUSE_DETAIL_SECD_NM);
	        
	        list.add(info);
	        
	      
	        //System.out.println(list.get(i).getHOUSE_MANAGE_NO());
	      
	       
			}   
			
			//System.out.println(list);   
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	
	
	public static List<HousingInfoByTypeJPA> parseHousingInfoPublicRentByType() {
		List<HousingInfoByTypeJPA> list = new ArrayList<>();
		List<String> houseNumList = new ArrayList<>();

 		try {
 			for (int i = 0; i < parseHousingInfoPulbicRent().size(); i++) {
				
			
			StringBuilder urlBuilder = new StringBuilder(PublicRentInfoByType_JSON_URL);

 			urlBuilder.append("?" + "page=" + 1);
			urlBuilder.append("&" + "perPage=" + 100);
			urlBuilder.append("&" + "cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=" + parseHousingInfoPulbicRent().get(i).getHouseManageNo());
			
			
			houseNumList.add(parseHousingInfoPulbicRent().get(i).getHouseManageNo());
			
			
			urlBuilder.append("&" + "serviceKey=" + KEY);
			System.out.println(urlBuilder.toString());
			
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			int code = conn.getResponseCode(); // 실제 page를 요청하는 코드부
			System.out.println("ResponseCode : " + code);
			if (code < 200 || code >= 300) {
				System.out.println("페이지가 잘못되었습니다.");
				return list;
			}
			
			InputStreamReader isr = new InputStreamReader(conn.getInputStream(), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			
			JSONParser jsonParser = new JSONParser(); 
			JSONObject rootObj = (JSONObject) jsonParser.parse(br);
			JSONArray array = (JSONArray) rootObj.get("data");
			for(int j = 0; j< array.size(); j++) {
				JSONObject obj = (JSONObject) array.get(j);

			       int  	ETC_HSHLDCO                  = getIntData(obj, "ETC_HSHLDCO");
			       String HOUSE_MANAGE_NO               = getStrData(obj, "HOUSE_MANAGE_NO");
			       String  HOUSE_TY                     = getStrData(obj, "HOUSE_TY");
			       int  INSTT_RECOMEND_HSHLDCO          = getIntData(obj, "INSTT_RECOMEND_HSHLDCO");
			       int  LFE_FRST_HSHLDCO                = getIntData(obj, "LFE_FRST_HSHLDCO");
			       int  LTTOT_TOP_AMOUNT                = getIntData(obj, "LTTOT_TOP_AMOUNT");
			       if(LTTOT_TOP_AMOUNT == 0) {LTTOT_TOP_AMOUNT = getIntData(obj, "SUPLY_AMOUNT");}
			       int  MNYCH_HSHLDCO                   = getIntData(obj, "MNYCH_HSHLDCO");
			       String  MODEL_NO                     = getStrData(obj, "MODEL_NO");
			       int  NWWDS_HSHLDCO                   = getIntData(obj, "NWWDS_HSHLDCO");
			       int  OLD_PARNTS_SUPORT_HSHLDCO       = getIntData(obj, "OLD_PARNTS_SUPORT_HSHLDCO");
			       int  SPSPLY_HSHLDCO                  = getIntData(obj, "SPSPLY_HSHLDCO");
			       String  SUPLY_AR                     = getStrData(obj, "SUPLY_AR");
			       int  SUPLY_HSHLDCO                   = getIntData(obj, "SUPLY_HSHLDCO");
			       int  TRANSR_INSTT_ENFSN_HSHLDCO      = getIntData(obj, "TRANSR_INSTT_ENFSN_HSHLDCO");
			       int spsply_ygmn_hshldco = getIntData(obj, "SPSPLY_YGMN_HSHLDCO");
			       String  GP                           = getStrData(obj, "GP");
			       String  TP                           = getStrData(obj, "TP");
			       String  EXCLUSE_AR                   = getStrData(obj, "EXCLUSE_AR");
			       String  CNTRCT_AR                    = getStrData(obj, "CNTRCT_AR");
			       int  GNSPLY_HSHLDCO                  = getIntData(obj, "GNSPLY_HSHLDCO");
			       int  SPSPLY_AGED_HSHLDCO             = getIntData(obj, "SPSPLY_AGED_HSHLDCO");
			       int  SPSPLY_NEW_MRRG_HSHLDCO         = getIntData(obj, "SPSPLY_NEW_MRRG_HSHLDCO");
			       int  SUBSCRPT_REQST_AMOUNT           = getIntData(obj, "SUBSCRPT_REQST_AMOUNT");
			          

			          
			          
			       HousingInfoByTypeJPA info = new HousingInfoByTypeJPA(0,ETC_HSHLDCO, HOUSE_MANAGE_NO,HOUSE_TY, INSTT_RECOMEND_HSHLDCO, LFE_FRST_HSHLDCO, LTTOT_TOP_AMOUNT, MNYCH_HSHLDCO, MODEL_NO, NWWDS_HSHLDCO, OLD_PARNTS_SUPORT_HSHLDCO, SPSPLY_HSHLDCO, SUPLY_AR, SUPLY_HSHLDCO, TRANSR_INSTT_ENFSN_HSHLDCO, GP, TP, EXCLUSE_AR, CNTRCT_AR, GNSPLY_HSHLDCO, SPSPLY_AGED_HSHLDCO, SPSPLY_NEW_MRRG_HSHLDCO, SUBSCRPT_REQST_AMOUNT,spsply_ygmn_hshldco);
			        list.add(info);
	
	        
	        
			}
 			}
			//System.out.println(list);
			System.out.println("공공지원:" + houseNumList);
			 
			
			
			
	       
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
		
	}
	
	// 임의공급 상세정보 및 주택형별 상세정보
	
	public static List<HousingInfoJPA> parseHousingInfoNolimit() {
		List<HousingInfoJPA> list = new ArrayList<>();

		try {
	
			StringBuilder urlBuilder = new StringBuilder(NoLimitInfo_JSON_URL);
			urlBuilder.append("?" + "page=" + 1);
			urlBuilder.append("&" + "perPage=" + 10);
			urlBuilder.append("&" + "serviceKey=" + KEY);
			System.out.println(urlBuilder.toString());
			
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			int code = conn.getResponseCode(); // 실제 page를 요청하는 코드부
			System.out.println("ResponseCode : " + code);
			if (code < 200 || code >= 300) {
				System.out.println("페이지가 잘못되었습니다.");
				return list;
			}
			
			InputStreamReader isr = new InputStreamReader(conn.getInputStream(), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			
			JSONParser jsonParser = new JSONParser(); 
			JSONObject rootObj = (JSONObject) jsonParser.parse(br);
			JSONArray array = (JSONArray) rootObj.get("data");
			for(int i = 0; i< array.size(); i++) {
				JSONObject obj = (JSONObject) array.get(i);
			
				String  BSNS_MBY_NM	 = getStrData(obj, "BSNS_MBY_NM");
				String  CNSTRCT_ENTRPS_NM	=  getStrData(obj, "CNSTRCT_ENTRPS_NM");
				String  CNTRCT_CNCLS_BGNDE	 =  getStrData(obj, "CNTRCT_CNCLS_BGNDE");
				String  CNTRCT_CNCLS_ENDDE	 =  getStrData(obj, "CNTRCT_CNCLS_ENDDE");
				String  GNRL_RCEPT_BGNDE	 =  getStrData(obj, "GNRL_RCEPT_BGNDE");
				String  GNRL_RCEPT_ENDDE	 =  getStrData(obj, "GNRL_RCEPT_ENDDE");
				String  GNRL_RNK1_CRSPAREA_RCEPT_PD	=  getStrData(obj, "GNRL_RNK1_CRSPAREA_RCEPT_PD");
				String  GNRL_RNK1_ETC_AREA_RCPTDE_PD	 =  getStrData(obj, "GNRL_RNK1_ETC_AREA_RCPTDE_PD");
				String  GNRL_RNK1_ETC_GG_RCPTDE_PD =  getStrData(obj, "GNRL_RNK1_ETC_GG_RCPTDE_PD");
				String  GNRL_RNK2_CRSPAREA_RCEPT_PD	 =  getStrData(obj, "GNRL_RNK2_CRSPAREA_RCEPT_PD");
				String  GNRL_RNK2_ETC_AREA_RCPTDE_PD	=  getStrData(obj, "GNRL_RNK2_ETC_AREA_RCPTDE_PD");
				String  GNRL_RNK2_ETC_GG_RCPTDE_PD =  getStrData(obj, "GNRL_RNK2_ETC_GG_RCPTDE_PD");
				String  HMPG_ADRES =  getStrData(obj, "HMPG_ADRES");
		    	String  HOUSE_DTL_SECD  =  getStrData(obj, "HOUSE_DTL_SECD");
		    	String  HOUSE_DTL_SECD_NM  =  getStrData(obj, "HOUSE_DTL_SECD_NM");
		    	String  HOUSE_MANAGE_NO =  getStrData(obj, "HOUSE_MANAGE_NO");
		    	String  HOUSE_NM =  getStrData(obj, "HOUSE_NM");
		    	String  HOUSE_SECD  =  getStrData(obj, "HOUSE_SECD");
		    	String  HOUSE_SECD_NM =  getStrData(obj, "HOUSE_SECD_NM");
		    	String  HSSPLY_ADRES =  getStrData(obj, "HSSPLY_ADRES");
		    	String  HSSPLY_ZIP 		             = getStrData(obj, "HSSPLY_ZIP");
		    	String  IMPRMN_BSNS_AT               = getStrData(obj, "IMPRMN_BSNS_AT");
		    	String  LRSCL_BLDLND_AT              = getStrData(obj, "LRSCL_BLDLND_AT");
		    	String  MDAT_TRGET_AREA_SECD         = getStrData(obj, "MDAT_TRGET_AREA_SECD");
		    	String  MDHS_TELNO                   = getStrData(obj, "MDHS_TELNO");
		    	String  MVN_PREARNGE_YM              = getStrData(obj, "MVN_PREARNGE_YM");
		    	String  NPLN_PRVOPR_PUBLIC_HOUSE_AT  = getStrData(obj, "NPLN_PRVOPR_PUBLIC_HOUSE_AT");
		    	String  PARCPRC_ULS_AT               = getStrData(obj, "PARCPRC_ULS_AT");
		    	String  PBLANC_NO                    = getStrData(obj, "PBLANC_NO");
		    	String  PBLANC_URL                   = getStrData(obj, "PBLANC_URL");
		    	String  PRZWNER_PRESNATN_DE          = getStrData(obj, "PRZWNER_PRESNATN_DE");
		    	String  PUBLIC_HOUSE_EARTH_AT        = getStrData(obj, "PUBLIC_HOUSE_EARTH_AT");
		    	String  RCEPT_BGNDE                  = getStrDataExceptAptInfo(obj, "SUBSCRPT_RCEPT_BGNDE");
		    	String  RCEPT_ENDDE                  = getStrDataExceptAptInfo(obj, "SUBSCRPT_RCEPT_ENDDE");
		    	String  RCRIT_PBLANC_DE              = getStrData(obj, "RCRIT_PBLANC_DE");
		        String  RENT_SECD                    = getStrData(obj, "RENT_SECD");
		        String  RENT_SECD_NM                 = getStrData(obj, "RENT_SECD_NM");
		        String  SPECLT_RDN_EARTH_AT          = getStrData(obj, "SPECLT_RDN_EARTH_AT");
		        String  SPSPLY_RCEPT_BGNDE           = getStrData(obj, "SPSPLY_RCEPT_BGNDE");
		        String  SPSPLY_RCEPT_ENDDE           = getStrData(obj, "SPSPLY_RCEPT_ENDDE");
		        String  SUBSCRPT_AREA_CODE           = getStrData(obj, "SUBSCRPT_AREA_CODE");
		        String  SUBSCRPT_AREA_CODE_NM        = getStrData(obj, "SUBSCRPT_AREA_CODE_NM");
		        int  	TOT_SUPLY_HSHLDCO            = getIntData(obj, "TOT_SUPLY_HSHLDCO");
		        String  SEARCH_HOUSE_SECD            = getStrData(obj, "SEARCH_HOUSE_SECD");
		        String  HOUSE_DETAIL_SECD            = getStrData(obj, "HOUSE_DETAIL_SECD");
		        String  HOUSE_DETAIL_SECD_NM         = getStrData(obj, "HOUSE_DETAIL_SECD_NM");
	        
	          

	          
	          
		        HousingInfoJPA info = new HousingInfoJPA(0,BSNS_MBY_NM, CNSTRCT_ENTRPS_NM, CNTRCT_CNCLS_BGNDE, CNTRCT_CNCLS_ENDDE, GNRL_RCEPT_BGNDE, GNRL_RCEPT_ENDDE, GNRL_RNK1_CRSPAREA_RCEPT_PD, GNRL_RNK1_ETC_AREA_RCPTDE_PD, GNRL_RNK1_ETC_GG_RCPTDE_PD, GNRL_RNK2_CRSPAREA_RCEPT_PD, GNRL_RNK2_ETC_AREA_RCPTDE_PD, GNRL_RNK2_ETC_GG_RCPTDE_PD, HMPG_ADRES, HOUSE_DTL_SECD, HOUSE_DTL_SECD_NM, HOUSE_MANAGE_NO, HOUSE_NM, HOUSE_SECD, HOUSE_SECD_NM, HSSPLY_ADRES, HSSPLY_ZIP, IMPRMN_BSNS_AT, LRSCL_BLDLND_AT, MDAT_TRGET_AREA_SECD, MDHS_TELNO, MVN_PREARNGE_YM, NPLN_PRVOPR_PUBLIC_HOUSE_AT, PARCPRC_ULS_AT, PBLANC_NO, PBLANC_URL, PRZWNER_PRESNATN_DE, PUBLIC_HOUSE_EARTH_AT, RCEPT_BGNDE, RCEPT_ENDDE, RCRIT_PBLANC_DE, RENT_SECD, RENT_SECD_NM, SPECLT_RDN_EARTH_AT, SPSPLY_RCEPT_BGNDE, SPSPLY_RCEPT_ENDDE, SUBSCRPT_AREA_CODE, SUBSCRPT_AREA_CODE_NM, TOT_SUPLY_HSHLDCO, SEARCH_HOUSE_SECD, HOUSE_DETAIL_SECD, HOUSE_DETAIL_SECD_NM);
	        
	        list.add(info);
	        
	      
	        //System.out.println(list.get(i).getHOUSE_MANAGE_NO());
	      
	       
			}   
			
			//System.out.println(list);   
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	
	
	public static List<HousingInfoByTypeJPA> parseHousingInfoNolimitByType() {
		List<HousingInfoByTypeJPA> list = new ArrayList<>();
		List<String> houseNumList = new ArrayList<>();

 		try {
 			for (int i = 0; i < parseHousingInfoNolimit().size(); i++) {
				
			
			StringBuilder urlBuilder = new StringBuilder(NoLimitInfoByType_JSON_URL);

 			urlBuilder.append("?" + "page=" + 1);
			urlBuilder.append("&" + "perPage=" + 100);
			urlBuilder.append("&" + "cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=" + parseHousingInfoNolimit().get(i).getHouseManageNo());
			
			
			houseNumList.add(parseHousingInfoNolimit().get(i).getHouseManageNo());
			
			
			urlBuilder.append("&" + "serviceKey=" + KEY);
			System.out.println(urlBuilder.toString());
			
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			int code = conn.getResponseCode(); // 실제 page를 요청하는 코드부
			System.out.println("ResponseCode : " + code);
			if (code < 200 || code >= 300) {
				System.out.println("페이지가 잘못되었습니다.");
				return list;
			}
			
			InputStreamReader isr = new InputStreamReader(conn.getInputStream(), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			
			JSONParser jsonParser = new JSONParser(); 
			JSONObject rootObj = (JSONObject) jsonParser.parse(br);
			JSONArray array = (JSONArray) rootObj.get("data");
			for(int j = 0; j< array.size(); j++) {
				JSONObject obj = (JSONObject) array.get(j);

	       int  	ETC_HSHLDCO                  = getIntData(obj, "ETC_HSHLDCO");
	       String HOUSE_MANAGE_NO               = getStrData(obj, "HOUSE_MANAGE_NO");
	       String  HOUSE_TY                     = getStrData(obj, "HOUSE_TY");
	       int  INSTT_RECOMEND_HSHLDCO          = getIntData(obj, "INSTT_RECOMEND_HSHLDCO");
	       int  LFE_FRST_HSHLDCO                = getIntData(obj, "LFE_FRST_HSHLDCO");
	       int  LTTOT_TOP_AMOUNT                = getIntData(obj, "LTTOT_TOP_AMOUNT");
	       if(LTTOT_TOP_AMOUNT == 0) {LTTOT_TOP_AMOUNT = getIntData(obj, "SUPLY_AMOUNT");}
	       int  MNYCH_HSHLDCO                   = getIntData(obj, "MNYCH_HSHLDCO");
	       String  MODEL_NO                     = getStrData(obj, "MODEL_NO");
	       int  NWWDS_HSHLDCO                   = getIntData(obj, "NWWDS_HSHLDCO");
	       int  OLD_PARNTS_SUPORT_HSHLDCO       = getIntData(obj, "OLD_PARNTS_SUPORT_HSHLDCO");
	       int  SPSPLY_HSHLDCO                  = getIntData(obj, "SPSPLY_HSHLDCO");
	       String  SUPLY_AR                     = getStrData(obj, "SUPLY_AR");
	       int  SUPLY_HSHLDCO                   = getIntData(obj, "SUPLY_HSHLDCO");
	       int  TRANSR_INSTT_ENFSN_HSHLDCO      = getIntData(obj, "TRANSR_INSTT_ENFSN_HSHLDCO");
	       int spsply_ygmn_hshldco = getIntData(obj, "SPSPLY_YGMN_HSHLDCO");
	       String  GP                           = getStrData(obj, "GP");
	       String  TP                           = getStrData(obj, "TP");
	       String  EXCLUSE_AR                   = getStrData(obj, "EXCLUSE_AR");
	       String  CNTRCT_AR                    = getStrData(obj, "CNTRCT_AR");
	       int  GNSPLY_HSHLDCO                  = getIntData(obj, "GNSPLY_HSHLDCO");
	       int  SPSPLY_AGED_HSHLDCO             = getIntData(obj, "SPSPLY_AGED_HSHLDCO");
	       int  SPSPLY_NEW_MRRG_HSHLDCO         = getIntData(obj, "SPSPLY_NEW_MRRG_HSHLDCO");
	       int  SUBSCRPT_REQST_AMOUNT           = getIntData(obj, "SUBSCRPT_REQST_AMOUNT");
	          

	          
	          
	       HousingInfoByTypeJPA info = new HousingInfoByTypeJPA(0,ETC_HSHLDCO, HOUSE_MANAGE_NO,HOUSE_TY, INSTT_RECOMEND_HSHLDCO, LFE_FRST_HSHLDCO, LTTOT_TOP_AMOUNT, MNYCH_HSHLDCO, MODEL_NO, NWWDS_HSHLDCO, OLD_PARNTS_SUPORT_HSHLDCO, SPSPLY_HSHLDCO, SUPLY_AR, SUPLY_HSHLDCO, TRANSR_INSTT_ENFSN_HSHLDCO, GP, TP, EXCLUSE_AR, CNTRCT_AR, GNSPLY_HSHLDCO, SPSPLY_AGED_HSHLDCO, SPSPLY_NEW_MRRG_HSHLDCO, SUBSCRPT_REQST_AMOUNT,spsply_ygmn_hshldco);
	        list.add(info);
	
	        
	        
			}
 			}
			//System.out.println(list);
			System.out.println("임의 공급 :" + houseNumList);
			 
			
			
			
	       
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
		
	}
	
	
	//모든 상세정보 리스트로 합치기
	public static List<HousingInfoJPA> allOfInfo() {
		List<HousingInfoJPA> list = new ArrayList<>();
		
		list.addAll(parseHousingInfo());
		list.addAll(parseHousingInfoOfficeTel());
		list.addAll(parseHousingInfoNoOrderApt());
		list.addAll(parseHousingInfoNolimit());
		list.addAll(parseHousingInfoPulbicRent());
		return list;
	}
	
	// 모든 주택형별 리스트 합치기
	
	public static List<HousingInfoByTypeJPA> allOfInfoByType() {
		List<HousingInfoByTypeJPA> list = new ArrayList<>();
		
		list.addAll(parseHousingInfoType());
		list.addAll(parseHousingInfoOfficeTelByType());
		list.addAll(parseHousingInfoNoOrderAptByType());
		list.addAll(parseHousingInfoNolimitByType());
		list.addAll(parseHousingInfoPublicRentByType());
		return list;
	}
	
	
	private static String getStrData(JSONObject obj , String key){
		String str = String.valueOf(obj.get(key));
		if(str == null) {
			return "-";
		}else {
			return str;
		}
	}
	
	private static String getStrDataExceptAptInfo(JSONObject obj , String key){
		String str = String.valueOf(obj.get(key));
		if(str == null) {
			return "-";
		}else {
			return str;
		}
	}
	
//	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//	private static Date getDateData(JSONObject obj , String key){
//		String str = (String) obj.get(key);
//		Date date = null;
//		try {
//			date = sdf.parse(str);
//		} catch (ParseException e) {
//			e.printStackTrace();
//		}
//		return date;
//	}
	
//	private static long getLongData(JSONObject obj , String key){
//		String str = (String) obj.get(key);
//		if(str != null) {
//			try {
//				return Long.parseLong(str);
//			} catch (Exception e) {}
//		}
//		return 0;
//	}
	
	private static int getIntData(JSONObject obj , String key){
		String str = String.valueOf(obj.get(key));
		if(str != null) {
			try {
				return Integer.parseInt(str);
			} catch (Exception e) {}
		}
		return 0;
	}
	
//	private static double getDoubleData(JSONObject obj , String key){
//		String str = (String) obj.get(key);
//		if(str != null) {
//			try {
//				return Double.parseDouble(str);
//			} catch (Exception e) {}
//		}
//		return 0;
//	}

}






