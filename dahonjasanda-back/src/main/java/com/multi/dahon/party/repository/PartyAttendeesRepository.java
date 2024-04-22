package com.multi.dahon.party.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multi.dahon.party.vo.PartyAttendees;

public interface PartyAttendeesRepository extends JpaRepository<PartyAttendees, Long> {

    Long deleteAllByPartyScheduleIdAndMemberMno(Long partyScheduleId, Integer memberMno);

    Optional<PartyAttendees> findByPartyScheduleIdAndMemberMno(Long partyScheduleId, Integer memberMno);

    void deleteAllByPartySchedule_Party_IdAndMemberMno(Long partyId, Integer memberMno);

}
