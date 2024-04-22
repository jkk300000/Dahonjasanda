package com.multi.dahon.finance.parsing;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.multi.dahon.finance.parsing.parsingForm.*;

import lombok.extern.slf4j.Slf4j;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Slf4j
public class ApiParser {

    private static final List<String> topFinFrpNoList;

    static {
        topFinFrpNoList = new ArrayList<>();
        topFinFrpNoList.add("020000");
        topFinFrpNoList.add("030200");
        topFinFrpNoList.add("030300");
        topFinFrpNoList.add("050000");
        topFinFrpNoList.add("060000");
    }

    private static <T> String urlResolver(Class<T> targetClass) {

        if (targetClass == MortgageParsingForm.class) {
            return "http://finlife.fss.or.kr/finlifeapi/mortgageLoanProductsSearch.json?auth=91594de461e35f3b363fea83024257bb&topFinGrpNo=";
        } else if (targetClass == RentHouseLoanParsingForm.class) {
            return "http://finlife.fss.or.kr/finlifeapi/rentHouseLoanProductsSearch.json?auth=91594de461e35f3b363fea83024257bb&topFinGrpNo=";
        } else if (targetClass == CreditLoanParsingForm.class) {
            return "https://finlife.fss.or.kr/finlifeapi/creditLoanProductsSearch.json?auth=91594de461e35f3b363fea83024257bb&topFinGrpNo=";
        } else if (targetClass == FinancialCompanyParsingForm.class) {
            return "http://finlife.fss.or.kr/finlifeapi/companySearch.json?auth=91594de461e35f3b363fea83024257bb&topFinGrpNo=";
        } else if (targetClass == DepositParsingForm.class) {
            return "http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json?auth=91594de461e35f3b363fea83024257bb&topFinGrpNo=";
        } else if (targetClass == AnnuityParsingForm.class) {
            return "http://finlife.fss.or.kr/finlifeapi/annuitySavingProductsSearch.json?auth=91594de461e35f3b363fea83024257bb&topFinGrpNo=";
        } else if (targetClass == SavingParsingForm.class) {
            return "http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json?auth=91594de461e35f3b363fea83024257bb&topFinGrpNo=";
        }

       throw new RuntimeException("클래스가 잘못넘어왔다.");
    }


    public static <T, O> Map<String, Object> parsing(Class<T> targetClass, Class<O> optionClass) {
        Map<String, Object> resultMap = new HashMap<>();
        List<T> targetList = new ArrayList<>();
        List<O> optionList = new ArrayList<>();

        for(String s : topFinFrpNoList) {
            String emptyPageUrl = urlResolver(targetClass) + s +"&pageNo=";
            String targetUrl = emptyPageUrl + 1;

            log.info("target :  {} ", targetUrl);

            HttpURLConnection conn = null;
            try {
                URL url = new URL(targetUrl);
                conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");

                int responseCode = conn.getResponseCode(); // 실제 HTTP로 호출을 시도하는 코드

                // 리디렉션을 따르지 않기 설정
                conn.setInstanceFollowRedirects(false);

                // 리디렉션 처리
                if (responseCode == HttpURLConnection.HTTP_MOVED_TEMP || responseCode == HttpURLConnection.HTTP_MOVED_PERM
                        || responseCode == HttpURLConnection.HTTP_SEE_OTHER || responseCode == 307) {
                    String newUrl = conn.getHeaderField("Location");
                    conn = (HttpURLConnection) new URL(newUrl).openConnection();
                    conn.setRequestMethod("GET");
                    responseCode = conn.getResponseCode();
                }

                log.info("responseCode is  {}", responseCode);

                try (InputStream is = conn.getInputStream();
                     InputStreamReader isr = new InputStreamReader(is, StandardCharsets.UTF_8);
                     BufferedReader br = new BufferedReader(isr);) {

                    // json 을 파싱하는 도구 ObjectMapper
                    ObjectMapper objMapper = new ObjectMapper();

                    String line = br.readLine();

                    JsonNode rootNode = objMapper.readTree(line);
                    int maxPage = rootNode.path("result").get("max_page_no").asInt();
                    if(maxPage == 1) {
                        JsonNode itemsNode = rootNode.path("result").path("baseList");

                        for (JsonNode itemNode : itemsNode) {
                            T target = objMapper.treeToValue(itemNode, targetClass);
                            if(target instanceof FinancialCompanyParsingForm) {
                            	((FinancialCompanyParsingForm)target).setCompanyType(s);
                            }
                            targetList.add(target);
                        }

                        JsonNode itemsNode2 = rootNode.path("result").path("optionList");

                        for (JsonNode itemNode : itemsNode2) {
                            O option = objMapper.treeToValue(itemNode, optionClass);
                            optionList.add(option);
                        }
                    } else {
                        pageLoop(emptyPageUrl, maxPage, targetClass, optionClass, targetList, optionList);
                    }


                } catch (Exception e) {
                    e.printStackTrace();
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (conn != null) {
                    conn.disconnect(); // 리소스 닫기
                }
            }

        }
        resultMap.put("target", targetList);
        resultMap.put("option", optionList);

        return resultMap;
    }

    private static <T, O> void pageLoop(String emptyPageUrl, int maxPage, Class<T> targetClass, Class<O> optionClass, List<T> targetList, List<O> optionList) {

        for (int i = 1; i <= maxPage; i++) {
            String targetUrl = emptyPageUrl + i;


            log.info("target :  {} ", targetUrl);

            HttpURLConnection conn = null;
            try {
                URL url = new URL(targetUrl);
                conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");

                int responseCode = conn.getResponseCode(); // 실제 HTTP로 호출을 시도하는 코드

                // 리디렉션을 따르지 않기 설정
                conn.setInstanceFollowRedirects(false);

                // 리디렉션 처리
                if (responseCode == HttpURLConnection.HTTP_MOVED_TEMP || responseCode == HttpURLConnection.HTTP_MOVED_PERM
                        || responseCode == HttpURLConnection.HTTP_SEE_OTHER || responseCode == 307) {
                    String newUrl = conn.getHeaderField("Location");
                    conn = (HttpURLConnection) new URL(newUrl).openConnection();
                    conn.setRequestMethod("GET");
                    responseCode = conn.getResponseCode();
                }

                log.info("responseCode is  {}", responseCode);

                try (InputStream is = conn.getInputStream();
                     InputStreamReader isr = new InputStreamReader(is, StandardCharsets.UTF_8);
                     BufferedReader br = new BufferedReader(isr);) {

                    // json 을 파싱하는 도구 ObjectMapper
                    ObjectMapper objMapper = new ObjectMapper();

                    String line = br.readLine();

                    JsonNode rootNode = objMapper.readTree(line);
                    JsonNode itemsNode = rootNode.path("result").path("baseList");

                    for (JsonNode itemNode : itemsNode) {
                        T target = objMapper.treeToValue(itemNode, targetClass);
                        targetList.add(target);
                    }

                    JsonNode itemsNode2 = rootNode.path("result").path("optionList");

                    for (JsonNode itemNode : itemsNode2) {
                        O option = objMapper.treeToValue(itemNode, optionClass);
                        optionList.add(option);
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (conn != null) {
                    conn.disconnect(); // 리소스 닫기
                }
            }

        }
    }

}

