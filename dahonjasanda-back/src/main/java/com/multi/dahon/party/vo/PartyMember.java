package com.multi.dahon.party.vo;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multi.dahon.member.model.vo.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "party_member")
public class PartyMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "party_member_id")
    private Long id;  // 식별자

    @Column(name = "name")
    private String name;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private PartyMemberRole role = PartyMemberRole.NORMAL;    // 디폴트 값 노멀

    @Column(name = "join_date")
    private LocalDateTime joinDate;  // 가입일

    @Column(name = "introduction")
    private String introduction;  // 간단 소개글 (1000자 제한)

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;  // Member와의 연관관계

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_id")
    private Party party;  // party와의 연관관계

    public PartyMember(PartyMemberRole role, String introduction, Member member, Party party) {
        this.name = member.getName();
        this.role = role;
        this.introduction = introduction;
        this.member = member;
        setParty(party);
        this.joinDate = LocalDateTime.now();
    }

  public void setParty(Party party) {
        this.party = party;
         party.getPartyMembers().add(this);
  }

}
