package com.multi.dahon.party.controller;

import java.net.MalformedURLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.multi.dahon.member.model.vo.Member;
import com.multi.dahon.party.form.PartyMemberUpdateForm;
import com.multi.dahon.party.form.PartyNewForm;
import com.multi.dahon.party.form.PartyScheduleForm;
import com.multi.dahon.party.form.PartySearchCondition;
import com.multi.dahon.party.form.PartyUpdateForm;
import com.multi.dahon.party.service.PartyService;
import com.multi.dahon.party.vo.Party;
import com.multi.dahon.party.vo.PartyAttendees;
import com.multi.dahon.party.vo.PartyFileSavepath;
import com.multi.dahon.party.vo.PartyMember;
import com.multi.dahon.party.vo.PartyMemberRole;
import com.multi.dahon.party.vo.PartySchedule;

import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/parties")
@RestController
public class PartyController {

    private final PartyService service;

    @GetMapping
    public ResponseEntity<Page<PartyDTOForList>> allPartyListCreatedTimeDesc(
            @ModelAttribute PartySearchCondition partySearchCondition,
            Pageable pageable) {
        Page<PartyDTOForList> map = service.selectAllParty(partySearchCondition, pageable).map(PartyDTOForList::new);

        return ResponseEntity.ok(map);
    }

    @PostMapping
    public Result<String> createParty(
            @SessionAttribute(name = "loginMember", required = false) Member loginMember,
            @ModelAttribute @Valid PartyNewForm newForm,
            BindingResult bindingResult
            ) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(error -> {
                log.error("바인딩 에러 : {}", error.getDefaultMessage());
            });
            log.info("여기까지는 찍혔음");
            return new Result<>("검증 실패, 작성 내용을 확인해주세요", false, HttpStatus.BAD_REQUEST);
        }
        try {
            Long createdPartyId = service.createParty(newForm, loginMember.getMno());
            log.info("뉴 폼 정보 {}", newForm);
            return new Result<>("파티 만들기 성공"+createdPartyId, true, HttpStatus.OK);
        } catch (Exception e) {
            log.error("에러다", e);
            return new Result<>(null, false, HttpStatus.OK);
        }
    }
    
    @PatchMapping("/{partyId}")
    public Result<String> updateParty(
    		  @SessionAttribute(name = "loginMember", required = false) Member loginMember,
    		  @PathVariable("partyId") Long partyId,
              @ModelAttribute @Valid PartyUpdateForm updateForm,
              BindingResult bindingResult
              ) {
    	log.info("업데이트 폼 보자 {}",updateForm);
    	  if (bindingResult.hasErrors()) {
              bindingResult.getAllErrors().forEach(error -> {
                  log.error("바인딩 에러 : {}", error.getDefaultMessage());
              });
              log.info("여기까지는 찍혔음");
              return new Result<>("검증 실패, 작성 내용을 확인해주세요", false, HttpStatus.BAD_REQUEST);
          }
    	  try {
              Long updatedPartyId = service.updateParty(partyId, updateForm, loginMember.getMno());
              log.info("업데이트 폼 정보 {}", updateForm);
              return new Result<>("파티 업데이트 성공"+updatedPartyId, true, HttpStatus.OK);
          } catch (Exception e) {
              log.error("업데이트 예외다", e);
              return new Result<>(null, false, HttpStatus.OK);
          }
    	  
    }
    

    @GetMapping("/{partyId}")
    public Result<PartyDTO> partyInfo(@PathVariable("partyId") Long partyId) {
        try {
            Party party = service.getParty(partyId);
            return new Result<>(new PartyDTO(party), true, HttpStatus.OK);
        } catch (Exception e) {
            log.error("파티를 찾지 못했습니다.", e);
            return new Result<>(null, false, HttpStatus.OK);
        }
    }
    
    

    @DeleteMapping("/{partyId}")
    public Result<String> deleteParty(@PathVariable("partyId") Long partyId,
                                     @SessionAttribute(name = "loginMember", required = true) Member loginMember) {
        boolean result = false;
        try {
            result = service.deleteParty(partyId, loginMember.getMno());
            return new Result<>("파티 삭제에 성공하였습니다.", result, HttpStatus.OK);
        } catch (NoSuchElementException ne) {
            log.error("파티를 찾아오지 못했습니다.", ne);
            return new Result<>("파티 삭제에 성공하였습니다.", result, HttpStatus.BAD_REQUEST);
        } catch (AccessDeniedException ae) {
            log.error("삭제 권한이 없습니다.", ae);
            return new Result<>("삭제 권한이 없습니다.", result, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("파티 삭제도중 예외", e);
            return new Result<>("삭제 도중 에러", result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{partyId}/members")
    public Result<List<PartyMemberDTO>> partyMembers(@PathVariable("partyId") Long partyId) {
        List<PartyMemberDTO> dtoList = service.getPartyMemberList(partyId).stream().map(PartyMemberDTO::new).toList();
        return new Result<>(dtoList, true, HttpStatus.OK);
    }

    @GetMapping("/{partyId}/enrollment")
    public Result<Boolean> enrolled(@SessionAttribute(name = "loginMember", required = false) Member loginMember,
                                    @PathVariable("partyId") Long partyId) {
        if (loginMember == null) {
            return new Result<>(false, true, HttpStatus.OK);
        }
        Boolean isEnrolled = service.isEnrolled(partyId, loginMember.getMno()).isPresent();

        return new Result<>(isEnrolled, true, HttpStatus.OK);
    }

    @PostMapping("/{partyId}/members")
    public Result<Long> joinParty(@RequestBody Map<String, String> requestBody,
                                  @SessionAttribute(name = "loginMember", required = true) Member loginMember,
                                  @PathVariable("partyId") Long partyId) {
        String introduction = requestBody.get("introduction");
        try {
            Long partyMemberId = service.joinParty(partyId, loginMember.getMno(), introduction);
            return new Result<>(partyMemberId, true, HttpStatus.OK);
        } catch (Exception e) {
            log.error("파티에 가입도중 에러터짐", e);
            return new Result<>(null, false, HttpStatus.OK);
        }
    }
    
    @PatchMapping("/{partyId}/members/{memberId}")
    public Result<String> updatePartyMember(@SessionAttribute(name = "loginMember", required = true) Member loginMember,
											@PathVariable("partyId") Long partyId,
											@PathVariable("memberId") Integer memberId,
											@ModelAttribute @Valid PartyMemberUpdateForm updateForm){
    log.info("뭐가 왔을까 ??????? {} ",updateForm);
    	boolean result = false;
    	String message = "";
    	HttpStatus httpStatus = null;
    	  if (loginMember.getMno() != memberId) {
              message = "세션아이디가 일치하지 않습니다";
              return new Result<>(message, result, HttpStatus.UNAUTHORIZED);
          }
    	  try {
    		  service.updatePartyMember(partyId, memberId, updateForm);
    		  message = "파티멤버 수정에 성공였습니다.";
    		  result = true;
    		  httpStatus = HttpStatus.OK;
    		  
    	   } catch (NoSuchElementException ne) {
               log.error("파티 멤버 조회 에러", ne);
               message = "파티 멤버 조회 에러";
               result = false;
     		  httpStatus = HttpStatus.BAD_REQUEST;
           } catch (Exception e) {
               log.error("파티 수정 중 에러", e);
               message = "파티 수정 중 에러";
               result = false;
      		  httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
           } finally {
			return new Result<>(message, result, httpStatus);
		}
    }

    @DeleteMapping("/{partyId}/members/{memberId}")
    public Result<String> leavingParty(@SessionAttribute(name = "loginMember", required = true) Member loginMember,
                                       @PathVariable("partyId") Long partyId,
                                       @PathVariable("memberId") Integer memberId) {
        boolean result = false;
        String message = "";
        if (loginMember.getMno() != memberId) {
            message = "세션아이디가 일치하지 않습니다";
            return new Result<>(message, result, HttpStatus.OK);
        }
        try {
            Long partyMemberId = service.leavingParty(partyId, memberId);
            Optional<PartyMember> partyMember = service.getPartyMember(partyMemberId);
            if (partyMember.isEmpty()) {
                result = true;
                message = "탈퇴에 성공하셨습니다.";
            }
        } catch (NoSuchElementException ne) {
            log.error("파티 멤버 조회 에러", ne);
            message = "파티 멤버 조회 에러";
        } catch (Exception e) {
            log.error("파티 탈퇴 중 에러");
            message = "파티 탈퇴 중 에러";
        }

        return new Result<>(message, result, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping("/images/{filename}")
    public Resource downloadImage(@PathVariable("filename") String filename) {
        log.debug("여기까지 찍혔음!!!!");
        String os = System.getProperty("os.name").toLowerCase();
        String filePath = "";
        if (os.contains("windows")) {
            filePath = PartyFileSavepath.FILE_DIR_WINDOWS;
        } else if (os.contains("linux") || os.contains("mac")) {
            filePath = PartyFileSavepath.FILE_DIR_LINUX;
        } else {
            throw new IllegalStateException("지원하지 않는 운영 체제입니다.");
        }

        try {
            log.info("여기 파일 경로 {}", "file:" + filePath + filename);
            return new UrlResource("file:" + filePath + filename);
        } catch (MalformedURLException e) {
            throw new RuntimeException("파일을 찾을 수 없습니다.", e);
        }
    }

    @GetMapping("/{partyId}/schedules")
    public Result<List<PartyScheduleDTO>> getScheduleList(@PathVariable("partyId") Long partyId) {
        List<PartyScheduleDTO> list = service.getScheduleList(partyId).stream().map(PartyScheduleDTO::new).toList();
        return new Result<>(list, true, HttpStatus.OK);
    }

    @PostMapping("/{partyId}/schedules")
    public Result<String> postSchedule(@SessionAttribute(name = "loginMember", required = true) Member loginMember,
                                       @PathVariable("partyId") Long partyId,
                                       @ModelAttribute @Valid PartyScheduleForm newForm,
                                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(error -> {
                log.error("바인딩 에러 : {}", error.getDefaultMessage());
            });
            log.info("여기까지는 찍혔음");
            return new Result<>("검증 실패, 작성 내용을 확인해주세요", false, HttpStatus.BAD_REQUEST);
        }

        try {
            service.postSchedule(partyId, loginMember.getMno(), newForm);

            return new Result<>("스케쥴 생성에 성공하였습니다.", true, HttpStatus.OK);
        } catch (AccessDeniedException ade) {
            log.error("권한 없음 에러", ade);
            return new Result<>("스케쥴 생성 권한이 없습니다.", false, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("스케쥴 생성 도중 에러", e);
            return new Result<>("스케쥴 생성에 실패하였습니다.", false, HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/{partyId}/members/{memberId}/schedules/{scheduleId}")
    public Result<String> scheduleAttendees(@SessionAttribute(name = "loginMember", required = true) Member loginMember,
                                            @PathVariable("scheduleId") Long scheduleId,
                                            @PathVariable("memberId") Integer memberId) {
        if (!memberId.equals(loginMember.getMno())) {
            return new Result<>("로그인 정보가 잘못 되었습니다.", false, HttpStatus.BAD_REQUEST);
        }
        try {
            Long attendeesId = service.scheduleAttendees(scheduleId, loginMember.getMno());
            log.info("바로 아이디 나오나 확인 {}", attendeesId);
            return new Result<>("모임 참여에 성공하였습니다.", true, HttpStatus.OK);
        } catch (NoSuchElementException ne) {
            log.error("데이터를 불러오지 못한 예외", ne);
            return new Result<>("스케쥴 정보나 로그인 정보를 확인바랍니다.", false, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("모임 참석중 예외", e);
            return new Result<>("모임 참여 실패", false, HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{partyId}/members/{memberId}/schedules/{scheduleId}")
    public Result<String> scheduleAbsentees(@SessionAttribute(name = "loginMember", required = true) Member loginMember,
                                            @PathVariable("scheduleId") Long scheduleId,
                                            @PathVariable("memberId") Integer memberId) {
        if (!memberId.equals(loginMember.getMno())) {
            return new Result<>("로그인 정보가 잘못되었습니다.", false, HttpStatus.BAD_REQUEST);
        }
        Long deletedId = service.scheduleAbsentees(scheduleId, loginMember.getMno());
        return new Result<>("참석이 취소 되었습니다.", true, HttpStatus.OK);
    }

    @GetMapping("/{partyId}/members/{memberId}/schedules")
    public Result<List<Long>> getAttendedSchedules(
            @SessionAttribute(name = "loginMember", required = true) Member loginMember,
            @PathVariable("partyId") Long partyId, @PathVariable("memberId") Integer memberId) {
        try {
            List<Long> attendedSchedules = service.getAttendedSchedules(memberId);
            return new Result<>(attendedSchedules, true, HttpStatus.OK);
        } catch (Exception e) {
            return new Result<>(null, false, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{partyId}/members/{memberId}/schedules")
    public Result<String> allDeleteAttendedSchedules(
            @SessionAttribute(name = "loginMember", required = true) Member loginMember,
            @PathVariable("partyId") Long partyId, @PathVariable("memberId") Integer memberId) {
        if (!memberId.equals(loginMember.getMno())) {
            return new Result<>("로그인 정보가 잘못 되었습니다.", false, HttpStatus.BAD_REQUEST);
        }
        try {
            service.deleteAllAttendedSchedules(partyId, memberId);
            return new Result<>("정상적으로 삭제됐습니다", true, HttpStatus.OK);
        } catch (Exception e) {
            log.error("스케쥴 참가 삭제 중 예외", e);
            return new Result<>("삭제에 실패하였습니다.", false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/members/{memberId}/interested-parties/{partyId}")
    public ResponseEntity<Map<String, Object>> addInterestedParty(
            @SessionAttribute(name = "loginMember", required = true) Member loginMember,
            @PathVariable("partyId") Long partyId, @PathVariable("memberId") Integer memberId
    ) {
        Map<String, Object> map = new HashMap<>();

        if (!memberId.equals(loginMember.getMno())) {
            map.put("result", false);
            map.put("message", "로그인 세션과 일치하지 않음");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        try {
            Long ipId = service.addInterestedParty(partyId, memberId);
            map.put("interestedPartyId", ipId);
            map.put("result", true);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (NoSuchElementException ne) {
            log.error("요청 파라미터가 잘못됐음", ne);
            map.put("result", false);
            map.put("message", "요청 파라미터가 잘못됐음");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            map.put("result", false);
            return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/members/{memberId}/interested-parties/{partyId}")
    public ResponseEntity<Map<String, Object>> deleteInterestedParty(
            @SessionAttribute(name = "loginMember", required = true) Member loginMember,
            @PathVariable("partyId") Long partyId, @PathVariable("memberId") Integer memberId
    ) {
        Map<String, Object> map = new HashMap<>();

        if (!memberId.equals(loginMember.getMno())) {
            map.put("result", false);
            map.put("message", "로그인 세션과 일치하지 않음");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        try {
            service.deleteInterestedParty(partyId, memberId);
            map.put("result", true);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (NoSuchElementException ne) {
            log.error("요청 파라미터가 잘못됐음", ne);
            map.put("result", false);
            map.put("message", "요청 파라미터가 잘못됐음");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            map.put("result", false);
            return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/members/{memberId}/interested-party-ids")
    public ResponseEntity<Map<String, Object>> getInterestedPartyIds(
            @SessionAttribute(name = "loginMember", required = true) Member loginMember,
            @PathVariable("memberId") Integer memberId
    ) {
        Map<String, Object> map = new HashMap<>();

        if (!memberId.equals(loginMember.getMno())) {
            map.put("result", false);
            map.put("message", "로그인 세션과 일치하지 않음");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        try {
            List<Long> interestedPartyIds = service.getInterestedPartyIds(memberId);
            map.put("result", true);
            map.put("data", interestedPartyIds);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (NoSuchElementException ne) {
            log.error("요청 파라미터가 잘못됐음", ne);
            map.put("result", false);
            map.put("message", "요청 파라미터가 잘못됐음");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            map.put("result", false);
            return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/members/{memberId}/parties")
    public ResponseEntity<Map<String, Object>> getMyParties(
            @SessionAttribute(name = "loginMember", required = true) Member loginMember,
            @PathVariable("memberId") Integer memberId
    ) {
        Map<String, Object> map = new HashMap<>();

        if (!memberId.equals(loginMember.getMno())) {
            map.put("result", false);
            map.put("message", "로그인 세션과 일치하지 않음");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }

        List<PartyDTOForList> myParties = service.getMyParties(memberId).stream()
                .map((party) -> new PartyDTOForList(party.getId(), party.getTitle(), party.getCategory(), party.getCategoryDetail(), party.getBriefIntroduction(),
                        party.getActivityArea(), party.getThumbnail(), party.getCreatedTime())).toList();
        map.put("data", myParties);
        map.put("result", true);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/members/{memberId}/schedules")
    public ResponseEntity<Map<String, Object>> getMySchedules(
            @SessionAttribute(name = "loginMember", required = true) Member loginMember,
            @PathVariable("memberId") Integer memberId, Pageable pageable
    ) {
        Map<String, Object> map = new HashMap<>();

        if (!memberId.equals(loginMember.getMno())) {
            map.put("result", false);
            map.put("message", "로그인 세션과 일치하지 않음");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        List<PartyScheduleDTO> mySchedules = service.getMySchedules(memberId, pageable).stream().map(PartyScheduleDTO::new).toList();
        map.put("data", mySchedules);
        map.put("result", true);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/members/{memberId}/schedules/{scheduleId}")
    public Result<String> myScheduleAttendees(@SessionAttribute(name = "loginMember", required = true) Member loginMember,
                                                            @PathVariable("scheduleId") Long scheduleId,
                                                            @PathVariable("memberId") Integer memberId) {
        if (!memberId.equals(loginMember.getMno())) {
            return new PartyController.Result<>("로그인 정보가 잘못 되었습니다.", false, HttpStatus.BAD_REQUEST);
        }
        try {
            Long attendeesId = service.scheduleAttendees(scheduleId, loginMember.getMno());
            log.info("바로 아이디 나오나 확인 {}", attendeesId);
            return new PartyController.Result<>("모임 참여에 성공하였습니다.", true, HttpStatus.OK);
        } catch (NoSuchElementException ne) {
            log.error("데이터를 불러오지 못한 예외", ne);
            return new PartyController.Result<>("스케쥴 정보나 로그인 정보를 확인바랍니다.", false, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("모임 참석중 예외", e);
            return new PartyController.Result<>("모임 참여 실패", false, HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/members/{memberId}/schedules/{scheduleId}")
    public Result<String> myScheduleAbsentees(@SessionAttribute(name = "loginMember", required = true) Member loginMember,
                                                            @PathVariable("scheduleId") Long scheduleId,
                                                            @PathVariable("memberId") Integer memberId) {
        if (!memberId.equals(loginMember.getMno())) {
            return new Result<>("로그인 정보가 잘못되었습니다.", false, HttpStatus.BAD_REQUEST);
        }
        Long deletedId = service.scheduleAbsentees(scheduleId, loginMember.getMno());
        return new Result<>("참석이 취소 되었습니다.", true, HttpStatus.OK);
    }


    @GetMapping("/members/{memberId}/interested-parties")
    public Result<List<PartyDTOForList>> myInterestedParties(
            @SessionAttribute(name = "loginMember", required = true) Member loginMember,
            @PathVariable("memberId") Integer memberId) {
        if (!memberId.equals(loginMember.getMno())) {
            return new Result<>(null, false, HttpStatus.UNAUTHORIZED);
        }
        try {
            List<PartyDTOForList> list = service.getInterestedParies(memberId).stream()
                    .map((party) -> new PartyDTOForList(party.getId(), party.getTitle(), party.getCategory(), party.getCategoryDetail(), party.getBriefIntroduction(),
                            party.getActivityArea(), party.getThumbnail(), party.getCreatedTime())).toList();
            return new Result<>(list, false, HttpStatus.OK);
        } catch (Exception e) {
            log.error("관심파티 도중 예외", e);
            return new Result<>(null, false, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }







    @Data
    public static class Result<T> {
        private final T data;
        private final Boolean result;
        private final HttpStatus httpStatus;

        public Result(T data, boolean result, HttpStatus httpStatus) {
            this.data = data;
            this.result = result;
            this.httpStatus = httpStatus;
        }
    }

    @Data
    public static class PartyDTO {

        private Long id;
        private String title;
        private String category;
        private String categoryDetail;
        private String briefIntroduction;
        private Integer leaderId;
        private String activityArea;
        private String leaderIntroductionTitle;
        private String leaderIntroduction;
        private String partyIntroductionTitle;
        private String partyIntroduction;
        private String thumbnail;
        private String partyIntroductionImage;
        private String leaderProfileImage;
        private LocalDateTime createdTime;

        public PartyDTO(Party party) {
            this.id = party.getId();
            this.title = party.getTitle();
            this.category = party.getCategory();
            this.categoryDetail = party.getCategoryDetail();
            this.briefIntroduction = party.getBriefIntroduction();
            this.leaderId = party.getLeaderId();
            this.activityArea = party.getActivityArea();
            this.leaderIntroductionTitle = party.getLeaderIntroductionTitle();
            this.leaderIntroduction = party.getLeaderIntroduction();
            this.partyIntroductionTitle = party.getPartyIntroductionTitle();
            this.partyIntroduction = party.getPartyIntroduction();
            this.thumbnail = party.getThumbnail();
            this.partyIntroductionImage = party.getPartyIntroductionImage();
            this.leaderProfileImage = party.getLeaderProfileImage();
            this.createdTime = party.getCreatedTime();
        }
    }

    @Data
    public static class PartyDTOForList {

        private Long id;
        private String title;
        private String category;
        private String categoryDetail;
        private String briefIntroduction;
        private String activityArea;
        private String thumbnail;
        private LocalDateTime createdTime;
        private Integer partyMemberCount;

        public PartyDTOForList(Long id,String title, String category, String categoryDetail, String briefIntroduction, String activityArea, String thumbnail, LocalDateTime createdTime) {
            this.id = id;
            this.title = title;
            this.category = category;
            this.categoryDetail = categoryDetail;
            this.briefIntroduction = briefIntroduction;
            this.activityArea = activityArea;
            this.thumbnail = thumbnail;
            this.createdTime = createdTime;
        }

        public PartyDTOForList(Party party) {
            this.id = party.getId();
            this.title = party.getTitle();
            this.category = party.getCategory();
            this.categoryDetail = party.getCategoryDetail();
            this.briefIntroduction = party.getBriefIntroduction();
            this.activityArea = party.getActivityArea();
            this.thumbnail = party.getThumbnail();
            this.createdTime = party.getCreatedTime();
            if(!party.getPartyMembers().isEmpty()){
                this.partyMemberCount = party.getPartyMembers().size();
            }
        }
    }

    @Data
    public static class PartyMemberDTO {
        private Long id;  // 식별자
        private String name;  // 이름
        private PartyMemberRole role;  // 역할
        private LocalDateTime joinDate;  // 가입일
        private String introduction;  // 간단 소개글

        public PartyMemberDTO(PartyMember partyMember) {
            this.id = partyMember.getId();
            this.name = partyMember.getName();
            this.role = partyMember.getRole();
            this.joinDate = partyMember.getJoinDate();
            this.introduction = partyMember.getIntroduction();
        }
    }

    @Data
    public static class PartyScheduleDTO {
        private Long id;
        private String partyName;
        private String title;
        private LocalDateTime date;
        private String location;
        private String summary;
        private String fee;
        private String description;
        private LocalDateTime createdTime;
        private List<PartyAttendeesDTO> partyAttendees;

        public PartyScheduleDTO(PartySchedule partySchedule) {
            this.id = partySchedule.getId();
            this.partyName = partySchedule.getPartyName();
            this.title = partySchedule.getTitle();
            this.date = partySchedule.getDate();
            this.location = partySchedule.getLocation();
            this.summary = partySchedule.getSummary();
            this.fee = partySchedule.getFee();
            this.description = partySchedule.getDescription();
            this.createdTime = partySchedule.getCreatedTime();
            if (!partySchedule.getPartyAttendees().isEmpty()) {
                this.partyAttendees = partySchedule.getPartyAttendees().stream().map(PartyAttendeesDTO::new).toList();
            }
        }
    }

    @Data
    public static class PartyAttendeesDTO {

        private Long id;
        private Integer attendeeId;
        private String attendeeName;

        public PartyAttendeesDTO(PartyAttendees partyAttendees) {
            this.id = partyAttendees.getId();
            this.attendeeId = partyAttendees.getMember().getMno();
            this.attendeeName = partyAttendees.getMember().getName();
        }
    }

}
//    @PostMapping("/example") // HTTP 바디 보기
//    public ResponseEntity<String> handlePost(HttpServletRequest request) throws IOException {
//        // HTTP 요청의 바디를 읽어옴
//        String body = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
//        // 바디 내용을 로그로 출력
//        System.out.println("HTTP 요청 바디: " + body);
//
//        // 여기서 바디 내용에 대한 추가적인 처리를 수행할 수 있음
//
//        return ResponseEntity.ok("요청이 성공적으로 처리되었습니다.");
//    }