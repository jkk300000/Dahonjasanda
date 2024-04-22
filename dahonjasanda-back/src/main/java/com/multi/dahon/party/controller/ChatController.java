package com.multi.dahon.party.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.multi.dahon.party.service.PartyService;
import com.multi.dahon.party.vo.Chat;
import com.multi.dahon.party.vo.Party;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final PartyService chatService;

    @MessageMapping("/chat/{partyId}")
    @SendTo("/topic/{partyId}")
    public ChatMessage chat(@DestinationVariable Long partyId, @Payload ChatMessage message) {
        log.info("메세지 정보 : {}", message);

        Chat chat = chatService.createChat(partyId, message.getProfile() ,message.getSenderId(), message.getSenderName(), message.getMessage());
        return ChatMessage.builder().partyId(partyId).senderName(chat.getSenderName())
                .senderId(chat.getSenderId()).message(chat.getMessage()).build();
    }

    @GetMapping("/parties/{partyId}/chat")
    @ResponseBody
    public List<ChatMessage> getChatList(@PathVariable("partyId") Long partyId) {
        return chatService.getChatList(partyId).stream().map(m ->
                new ChatMessage(m.getId(), m.getProfile(), m.getSenderName(), m.getSenderId(), m.getMessage(), m.getSendDate()))
                .toList();
    }

    @Data
    static class ChatMessage{

        private Long id;

        private String profile;

        private Long partyId;

        private String senderName;

        private Long senderId;

        private String message;

        private LocalDateTime sendTime;
        

        @Builder
        public ChatMessage(Long partyId, String profile, String senderName, Long senderId, String message, LocalDateTime sendTime) {
            this.partyId = partyId;
            this.profile = profile;
            this.senderName = senderName;
            this.senderId = senderId;
            this.message = message;
            this.sendTime = sendTime;
        }

        public static Chat createChat(Party party, String profile, String senderName, Long senderId, String message, LocalDateTime sendTime) {
            return Chat.builder().party(party).profile(profile).senderName(senderName)
                    .senderId(senderId).message(message).build();
        }

		public ChatMessage() {
			super();
			// TODO Auto-generated constructor stub
		}



    }
}

