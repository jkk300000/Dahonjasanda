package com.multi.dahon.party.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.multi.dahon.party.vo.Party;

public interface PartyRepository extends JpaRepository<Party, Long>, JpaSpecificationExecutor<Party> {

@EntityGraph(attributePaths = {"partyMembers", "partySchedules"})
    @Query("select p from Party p " +
            "where p.id = :partyId")
    public Optional<Party> selectTheParty(Long partyId);

    @EntityGraph(attributePaths = "partyMembers")
    Page<Party> findAll(Specification<Party> spec, Pageable pageable);

//    @EntityGraph(attributePaths = "partyMembers")
//    Page<Party> findAll(Pageable pageable);

    @Query("select p " +
            "from Party p " +
            "join p.partyMembers pm " +
            "join pm.member m " +
            "where m.mno = :memberId")
    List<Party> selectByMno(@Param("memberId") Integer memberId);


}
