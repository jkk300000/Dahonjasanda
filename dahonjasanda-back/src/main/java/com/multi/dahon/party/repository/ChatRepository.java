package com.multi.dahon.party.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.multi.dahon.party.vo.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("SELECT c FROM Chat c WHERE c.party.id = :partyId")
    List<Chat> selectByPartyId(@Param("partyId") Long partyId);
}

