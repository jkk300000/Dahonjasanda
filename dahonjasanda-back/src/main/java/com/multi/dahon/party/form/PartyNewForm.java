package com.multi.dahon.party.form;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PartyNewForm {

    @NotBlank(message = "제목을 입력해주세요.")
    @Size(min = 3, message = "소모임 이름은 3글자 이상이어야 합니다.")
    private String title;  // 소모임 이름

    @NotBlank(message = "카테고리는 비워둘 수 없습니다.")
    private String category;  // 카테고리

    @NotBlank(message = "카테고리는 비워둘 수 없습니다.")
    private String categoryDetail;  // 카테고리 상세

    //    @Size(max = 1000, message = "간략 소개는 최대 1000자까지 입력할 수 있습니다.")
    private String briefIntroduction;  // 간략 소개

    private String activityArea;  // 활동 지역

    private String leaderIntroductionTitle;  // 모임장 소개글 제목

    @Size(max = 1000, message = "모임장 소개글은 최대 1000자까지 입력할 수 있습니다.")
    private String leaderIntroduction;  // 모임장 소개글

    private String groupIntroductionTitle;  // 모임 소개글 제목

    @Size(max = 1000, message = "모임 소개글은 최대 1000자까지 입력할 수 있습니다.")
    private String groupIntroduction;  // 모임 소개글

    private String leaderSummary;   // 모임장 간단 소개글

    private MultipartFile thumbnail;  // 썸네일

    private MultipartFile leaderIntroductionImage;  //   모임장 프로필 사진

    private MultipartFile groupIntroductionImage;  // 모임 소개 사진

}
