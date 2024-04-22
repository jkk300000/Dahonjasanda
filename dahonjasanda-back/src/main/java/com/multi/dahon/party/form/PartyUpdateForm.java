package com.multi.dahon.party.form;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PartyUpdateForm {

    private String briefIntroduction;  // 간략 소개

    private String leaderIntroductionTitle;  // 모임장 소개글 제목

    @Size(max = 1000, message = "모임장 소개글은 최대 1000자까지 입력할 수 있습니다.")
    private String leaderIntroduction;  // 모임장 소개글

    private String groupIntroductionTitle;  // 모임 소개글 제목

    @Size(max = 1000, message = "모임 소개글은 최대 1000자까지 입력할 수 있습니다.")
    private String groupIntroduction;  // 모임 소개글

    private MultipartFile thumbnail;  // 썸네일

    private MultipartFile leaderIntroductionImage;  //   모임장 프로필 사진

    private MultipartFile groupIntroductionImage;  // 모임 소개 사진

}
