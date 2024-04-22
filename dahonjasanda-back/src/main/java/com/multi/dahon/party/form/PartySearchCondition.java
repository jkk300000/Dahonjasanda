package com.multi.dahon.party.form;

import java.util.List;

import lombok.Data;

@Data
public class PartySearchCondition {
    private List<String> categories;  // 카테고리
    private String activityArea;  // 활동 지역
    private String keyword;
}
