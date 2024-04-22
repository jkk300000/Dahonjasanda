package com.multi.dahon.party.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.multi.dahon.member.model.repository.MemberRepository;
import com.multi.dahon.member.model.vo.Member;
import com.multi.dahon.party.form.PartyMemberUpdateForm;
import com.multi.dahon.party.form.PartyNewForm;
import com.multi.dahon.party.form.PartyScheduleForm;
import com.multi.dahon.party.form.PartySearchCondition;
import com.multi.dahon.party.form.PartyUpdateForm;
import com.multi.dahon.party.repository.ChatRepository;
import com.multi.dahon.party.repository.InterestedPartyRepository;
import com.multi.dahon.party.repository.PartyAttendeesRepository;
import com.multi.dahon.party.repository.PartyMemberRepository;
import com.multi.dahon.party.repository.PartyRepository;
import com.multi.dahon.party.repository.PartyScheduleRepository;
import com.multi.dahon.party.repository.PartySpec;
import com.multi.dahon.party.vo.Chat;
import com.multi.dahon.party.vo.InterestedParty;
import com.multi.dahon.party.vo.Party;
import com.multi.dahon.party.vo.PartyAttendees;
import com.multi.dahon.party.vo.PartyFileSavepath;
import com.multi.dahon.party.vo.PartyMember;
import com.multi.dahon.party.vo.PartyMemberRole;
import com.multi.dahon.party.vo.PartySchedule;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PartyService {

    private final PartyRepository partyRepository;
    private final MemberRepository memberRepository;
    private final PartyMemberRepository partyMemberRepository;
    private final PartyScheduleRepository partyScheduleRepository;
    private final PartyAttendeesRepository partyAttendeesRepository;
    private final InterestedPartyRepository interestedPartyRepository;
    private final ChatRepository chatRepository;

    public List<Party> getPartyListOrderByCreatedTimeDesc() {
        return partyRepository.findAll(Sort.by(Sort.Direction.DESC, "createdTime"));
    }
    public Page<Party> selectAllParty(PartySearchCondition condition, Pageable pageable){
        Specification<Party> partySpecification = PartySpec.conditionalParty(condition);
        return partyRepository.findAll(partySpecification, pageable);
//        return partyRepository.findAll(pageable);
    }

    public Long createParty(PartyNewForm newForm, Integer memberId) throws IOException {
        Member leader = memberRepository.findById(memberId).orElseThrow();

        String thumbnail = fileResolver(newForm.getThumbnail());
        String groupIntroductionImage = fileResolver(newForm.getGroupIntroductionImage());
        String leaderProfile = fileResolver(newForm.getLeaderIntroductionImage());

        Party party = new Party(newForm.getTitle(), newForm.getCategory(), newForm.getCategoryDetail(), newForm.getBriefIntroduction(),
                memberId, newForm.getActivityArea(), newForm.getLeaderIntroductionTitle(), newForm.getLeaderIntroduction(),
                newForm.getGroupIntroductionTitle(), newForm.getGroupIntroduction(), thumbnail, groupIntroductionImage, leaderProfile);
        partyRepository.save(party);

        PartyMember partyMember = new PartyMember(PartyMemberRole.LEADER, newForm.getLeaderSummary(), leader, party);
        partyMemberRepository.save(partyMember);

        return party.getId();
    }
    
    public Long updateParty(Long partyId ,PartyUpdateForm updateForm, Integer leaderId) throws IOException {
    	log.info("서비스 찍힘 {}, updateForm");
    	Member leader = memberRepository.findById(leaderId).orElseThrow();
    	Party party = partyRepository.findById(partyId).orElseThrow();
        if (!party.getLeaderId().equals(leaderId)) {
            throw new AccessDeniedException("권한이 없습니다.");
        }
    	MultipartFile updateThumbnail = updateForm.getThumbnail();
    	MultipartFile updateGroupImage = updateForm.getGroupIntroductionImage();
    	MultipartFile updateLeaderImage = updateForm.getLeaderIntroductionImage();
    	
    	String prevThumbnail = party.getThumbnail();
    	String prevPartyIntroductionImage = party.getPartyIntroductionImage();	
    	String prevLeaderProfileImage = party.getLeaderProfileImage();
    	
    	if (!updateThumbnail.isEmpty()) {
    		if(prevThumbnail != null) {
    			deleteFile(prevThumbnail);
    		}
    		party.setThumbnail(fileResolver(updateThumbnail));
    	}
    
    	
    	if (!updateGroupImage.isEmpty()) {
    		if(prevPartyIntroductionImage != null) {
    			deleteFile(prevPartyIntroductionImage);
    		}
    		party.setPartyIntroductionImage(fileResolver(updateGroupImage));
    	}
    	
    	if (!updateLeaderImage.isEmpty()) {
    		if(prevLeaderProfileImage != null) {
    			deleteFile(prevLeaderProfileImage);
    		}
    		party.setLeaderProfileImage(fileResolver(updateLeaderImage));
    	}
    	
    	
    	
    	
    	party.setBriefIntroduction(updateForm.getBriefIntroduction());
    	party.setLeaderIntroductionTitle(updateForm.getLeaderIntroductionTitle());
    	party.setLeaderIntroduction(updateForm.getLeaderIntroduction());
    	party.setPartyIntroductionTitle(updateForm.getGroupIntroductionTitle());
    	party.setPartyIntroduction(updateForm.getGroupIntroduction());
    	
    	return party.getId();
    }

    public Party getParty(Long partyId) {
//        return partyRepository.selectTheParty(partyId).orElseThrow();
        return partyRepository.findById(partyId).orElseThrow();
    }

    public Boolean deleteParty(Long partyId, Integer memberId) {
        Party party = partyRepository.findById(partyId).orElseThrow();
        if (!party.getLeaderId().equals(memberId)) {
            throw new AccessDeniedException("권한이 없습니다.");
        }
        partyRepository.delete(party);
        return true;
    }

    public List<PartyMember> getPartyMemberList(Long partyId) {
        return partyMemberRepository.findByPartyId(partyId);
    }

    public Optional<PartyMember> isEnrolled(Long partyId, Integer memberId) {
        return partyMemberRepository.findByPartyIdAndMemberMno(partyId, memberId);
    }

    public Optional<PartyMember> getPartyMember(Long partyMemberId) {
        return partyMemberRepository.findById(partyMemberId);
    }
    
    public Long updatePartyMember(Long partyId, Integer memberId, PartyMemberUpdateForm updateForm){
    	PartyMember partyMember = partyMemberRepository.findByPartyIdAndMemberMno(partyId, memberId).orElseThrow();
    	partyMember.setIntroduction(updateForm.getIntroduction());
    	return partyMember.getId();
    }

    public Long joinParty(Long partyId, Integer memberId, String introduction) {
        Party party = partyRepository.findById(partyId).orElseThrow();
        Member member = memberRepository.findById(memberId).orElseThrow();

        PartyMember partyMember = new PartyMember(PartyMemberRole.NORMAL, introduction, member, party);

        return partyMemberRepository.save(partyMember).getId();
    }

    public Long leavingParty(Long partyId, Integer memberId) {
        PartyMember partyMember = partyMemberRepository.findByPartyIdAndMemberMno(partyId, memberId).orElseThrow();
        partyMemberRepository.delete(partyMember);
        return partyMember.getId();
    }

    public Long postSchedule(Long partyId, Integer memberId, PartyScheduleForm newForm) {
        Party party = partyRepository.findById(partyId).orElseThrow();
        if (!party.getLeaderId().equals(memberId)) {
            throw new AccessDeniedException("권한이 없습니다.");
        }

        PartySchedule partySchedule = new PartySchedule(party.getTitle(), newForm.getTitle(), newForm.getDate(), newForm.getLocation(), newForm.getSummary(),
                newForm.getFee(), newForm.getDescription(), party);

        return partyScheduleRepository.save(partySchedule).getId();
    }

    public List<PartySchedule> getScheduleList(Long partyId) {
        return partyScheduleRepository.findByPartyIdAndDateAfterOrderByDateDesc(partyId, LocalDateTime.now());
    }

    public Long scheduleAttendees(Long scheduleId, Integer memberId) {
        Optional<PartyAttendees> optionalPartyAttendees = partyAttendeesRepository.findByPartyScheduleIdAndMemberMno(scheduleId, memberId);
        if (optionalPartyAttendees.isPresent()) {
            return optionalPartyAttendees.get().getId();
        }

        Member member = memberRepository.findById(memberId).orElseThrow();
        PartySchedule partySchedule = partyScheduleRepository.findById(scheduleId).orElseThrow();

        return new PartyAttendees(member, partySchedule).getId();
    }

    public Long scheduleAbsentees(Long scheduleId, Integer memberId) {
        return partyAttendeesRepository.deleteAllByPartyScheduleIdAndMemberMno(scheduleId, memberId);
    }

    public List<Long> getAttendedSchedules(Integer memberId) {
        return partyScheduleRepository.selectByMemberMno(memberId);
    }

    public void deleteAllAttendedSchedules(Long partyId, Integer memberId) {
        partyAttendeesRepository.deleteAllByPartySchedule_Party_IdAndMemberMno(partyId, memberId);
    }

    public List<Party> getMyParties(Integer memberId) {
        return partyRepository.selectByMno(memberId);
    }

    public List<PartySchedule> getMySchedules(Integer memberId, Pageable pageable) {
//        return partyScheduleRepository.selectByMySchedules(memberId, pageable);
        return partyScheduleRepository.findByPartyAttendees_Member_MnoOrderByDateAsc(memberId);
    }


    public Long addInterestedParty(Long partyId, Integer memberId) {
        Party party = partyRepository.findById(partyId).orElseThrow();
        Member member = memberRepository.findById(memberId).orElseThrow();

        InterestedParty interestedParty = new InterestedParty(member, party);
        return interestedPartyRepository.save(interestedParty).getId();
    }

    public void deleteInterestedParty(Long partyId, Integer memberId) {

        List<InterestedParty> interestedPartyList = interestedPartyRepository.findByPartyIdAndMemberMno(partyId, memberId);
        interestedPartyRepository.deleteAll(interestedPartyList);
    }

    public List<Long> getInterestedPartyIds(Integer memberId) {
        return interestedPartyRepository.selectByMemberMno(memberId);
    }

    public List<Party> getInterestedParies(Integer memberId) {
        return interestedPartyRepository.selectByMno(memberId);
    }

    public Chat createChat(Long partyId,String profile ,Long senderId, String senderName, String message) {
        Party party = partyRepository.findById(partyId).orElseThrow();
//        return new Chat(party, senderId, senderName, message);
        Chat chat = new Chat(party, profile, senderId, senderName, message);
        return chatRepository.save(chat);
    }

    public List<Chat> getChatList(Long partyId) {
        return chatRepository.selectByPartyId(partyId);
    }

    private String fileResolver(MultipartFile multipartFile) throws IOException {
        if(multipartFile.isEmpty()){
            return null;
        }

        String originalFilename = multipartFile.getOriginalFilename();

        String ext = originalFilename.substring(originalFilename.lastIndexOf("."));

        String uuid = UUID.randomUUID().toString();

        String storeFileName = uuid + ext;

        multipartFile.transferTo(new File(getFullPath(storeFileName)));

        return storeFileName;
    }

    private String getFullPath(String filename) {
        String savePath = "";
        String os = System.getProperty("os.name").toLowerCase();

        if (os.contains("windows")) {
            savePath = PartyFileSavepath.FILE_DIR_WINDOWS;
        } else if (os.contains("linux") || os.contains("mac")) {
            savePath = PartyFileSavepath.FILE_DIR_LINUX;
        } else {
            throw new IllegalStateException("지원하지 않는 운영 체제입니다.");
        }
        File folder = new File(savePath);

        if(!folder.exists()) {
            folder.mkdirs();
        }

        return savePath + filename;
    }
    
    private void deleteFile(String fileName) {
    	log.info("지우는 파일 찍힘 시작 {}", fileName);
    	String path = "";
        String os = System.getProperty("os.name").toLowerCase();

        if (os.contains("windows")) {
        	path = PartyFileSavepath.FILE_DIR_WINDOWS;
        } else if (os.contains("linux") || os.contains("mac")) {
        	path = PartyFileSavepath.FILE_DIR_LINUX;
        } else {
            throw new IllegalStateException("지원하지 않는 운영 체제입니다.");
        }
        try {
        	log.info("파일이름 찍기 {}", fileName);
            File file = new File(path, fileName);
  
            if (file.exists()) {
                if (file.delete()) {
                    log.info("파일이 성공적으로 삭제되었습니다.");
                } else {
                    log.info("파일 삭제 실패");
                }
            } else {
                log.info("파일이 존재하지 않습니다.");
            }
        } catch (Exception e) {
            log.error("파일 삭제 중 오류 발생: " + e.getMessage());
        }
        log.info("지우는 파일 찍힘 마지막 {}", fileName);
    }


}
