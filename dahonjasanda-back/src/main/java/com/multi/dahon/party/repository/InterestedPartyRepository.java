package com.multi.dahon.party.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.multi.dahon.party.vo.InterestedParty;
import com.multi.dahon.party.vo.Party;

public interface InterestedPartyRepository extends JpaRepository<InterestedParty, Long> {

    List<InterestedParty> findByPartyIdAndMemberMno(Long partyId, Integer memberId);

    @Query("select p.id from InterestedParty ip " +
            "join ip.party p join ip.member m " +
            "where m.mno = :memberId")
    public List<Long> selectByMemberMno(@Param("memberId") Integer memberId);

    @Query("select p from InterestedParty ip " +
            "join ip.party p join ip.member m " +
            "where m.mno = :memberId")
    public List<Party> selectByMno(@Param("memberId") Integer memberId);
}
