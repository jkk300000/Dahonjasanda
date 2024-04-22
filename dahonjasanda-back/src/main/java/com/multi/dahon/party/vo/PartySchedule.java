package com.multi.dahon.party.vo;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "party_schedule")
public class PartySchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "party_schedule_id")
    private Long id;  // 식별자

    @Column(name = "party_name")
    private String partyName;

    @Column(name = "title")
    private String title;  // 제목

    @Column(name = "date")
    private LocalDateTime date;  // 날짜

    @Column(name = "location")
    private String location;  // 장소

    @Column(name = "summary")
    private String summary;  // 간추린 내용

    @Column(name = "fee")
    private String fee;  // 회비

    @Column(name = "description", length = 1000)
    private String description;  // 설명 (1000자 제한)

    @Column(name = "created_time")
    private LocalDateTime createdTime;  // 작성 시간

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_id")
    private Party party;  // party와의 연관관계

    @OneToMany(orphanRemoval = true, mappedBy = "partySchedule", cascade = CascadeType.ALL)
    private Set<PartyAttendees> partyAttendees = new HashSet<>();


    public PartySchedule(String partyName, String title, LocalDateTime date, String location, String summary, String fee, String description, Party party) {
        this.partyName = partyName;
        this.title = title;
        this.date = date;
        this.location = location;
        this.summary = summary;
        this.fee = fee;
        this.description = description;
        setParty(party);
        this.createdTime = LocalDateTime.now();
    }

    private void setParty(Party party) {
        this.party = party;
        party.getPartySchedules().add(this);
    }

}
