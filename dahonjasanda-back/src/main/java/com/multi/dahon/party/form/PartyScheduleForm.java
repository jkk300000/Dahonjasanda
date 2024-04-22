package com.multi.dahon.party.form;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PartyScheduleForm {

    @NotBlank(message = "제목을 입력해주세요.")
    @Size(max = 100, message = "제목은 100자 이내로 입력해주세요.")
    private String title;

    @NotNull(message = "날짜를 선택해주세요.")
    @Future(message = "날짜는 현재 시간 이후로 선택해주세요.")
    private LocalDateTime date;

    @NotBlank(message = "장소를 입력해주세요.")
    @Size(max = 100, message = "장소는 100자 이내로 입력해주세요.")
    private String location;

    @NotBlank(message = "간추린 내용을 입력해주세요.")
    @Size(max = 1000, message = "간추린 내용은 1000자 이내로 입력해주세요.")
    private String summary;

    @NotBlank(message = "회비를 입력해주세요.")
    @Size(max = 100, message = "회비는 100자 이내로 입력해주세요.")
    private String fee;

    @Size(max = 1000, message = "설명은 1000자 이내로 입력해주세요.")
    private String description;
}
