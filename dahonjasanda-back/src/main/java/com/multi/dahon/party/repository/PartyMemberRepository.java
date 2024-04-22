package com.multi.dahon.party.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.multi.dahon.party.vo.Party;
import com.multi.dahon.party.vo.PartyMember;

public interface PartyMemberRepository extends JpaRepository<PartyMember, Long> {

    List<PartyMember> findByPartyId(Long partyId);

    Optional<PartyMember> findByPartyIdAndMemberMno(Long partyId, Integer memberId);

    @Query("SELECT COUNT(pm) FROM PartyMember pm WHERE pm.party = :party")
    int countByParty(@Param("party") Party party);
}
