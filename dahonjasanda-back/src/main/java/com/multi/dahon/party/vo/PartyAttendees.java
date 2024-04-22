package com.multi.dahon.party.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multi.dahon.member.model.vo.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "party_attendees")
public class PartyAttendees {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="party_attendees_id" )
    private Long id;  // 식별자

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_schedule_id")
    private PartySchedule partySchedule;  //  연관관계

    public PartyAttendees(Member member, PartySchedule partySchedule) {
       this.member = member;
       setPartySchedule(partySchedule);
    }

    public void setPartySchedule(PartySchedule partySchedule) {
        this.partySchedule = partySchedule;
        partySchedule.getPartyAttendees().add(this);
    }
}
