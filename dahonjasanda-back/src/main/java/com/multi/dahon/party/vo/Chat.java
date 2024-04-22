package com.multi.dahon.party.vo;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_id")
    private Party party;

    @Column(name = "profile")
    private String profile;

    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "sender_name")
    private String senderName;

    @Column(columnDefinition = "TEXT")
    private String message;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime sendDate;

    @Builder
    public Chat(Party party,String profile ,Long senderId, String senderName, String message) {
        this.party = party;
        this.profile = profile;
        this.senderId = senderId;
        this.senderName = senderName;
        this.message = message;
        this.sendDate = LocalDateTime.now();
    }

    public static Chat createChat(Party party, String senderName, Long senderId, String message) {
        return Chat.builder().party(party).senderName(senderName)
                .senderId(senderId).message(message).build();
    }


}
