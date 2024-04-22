package com.multi.dahon.party.vo;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "party")
public class Party {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "party_id")
    private Long id;  // 소모임 식별자

    @Column(name = "title")
    private String title;  // 소모임 이름

    @Column(name = "category")
    private String category;  // 카테고리

    @Column(name = "category_detail")
    private String categoryDetail;  // 카테고리 상세

    @Column(name = "brief_introduction")
    private String briefIntroduction;  // 간략 소개

    @Column(name = "leader_id")
    private Integer leaderId;  // 모임장 아이디

    @Column(name = "activity_area")
    private String activityArea;  // 활동 지역

    @Column(name = "leader_introduction_title")
    private String leaderIntroductionTitle;  // 모임장 소개글 제목

    @Column(name = "leader_introduction" , length = 1000)
    private String leaderIntroduction;  // 모임장 소개글

    @Column(name = "group_introduction_title")
    private String partyIntroductionTitle;  // 모임 소개글 제목

    @Column(name = "group_introduction", length = 1000)
    private String partyIntroduction;  // 모임 소개글

    @Column(name = "thumbnail")
    private String thumbnail;  // 썸네일

    @Column(name = "party_introduction_image")
    private String partyIntroductionImage;  // 모임 소개 사진

    @Column(name= "leader_profile_image")
    private String leaderProfileImage;  //   모임장 프로필 사진

    @Column(name = "created_time")
    private LocalDateTime createdTime;  // 생성 시간

    // SubgroupSchedule과의 양방향 연관관계
    @OneToMany(orphanRemoval = true, mappedBy = "party", cascade = CascadeType.ALL)
    private Set<PartySchedule> partySchedules = new HashSet<>();

    // SubgroupMembers과의 양방향 연관관계
    @OneToMany(orphanRemoval = true, mappedBy = "party", cascade = CascadeType.ALL)
    private Set<PartyMember> partyMembers = new HashSet<>();

    public Party(String title, String category, String categoryDetail, String briefIntroduction, Integer leaderId, String activityArea, String leaderIntroductionTitle, String leaderIntroduction, String groupIntroductionTitle, String groupIntroduction, String thumbnail, String partyIntroductionImage, String leaderProfileImage) {
        this.title = title;
        this.category = category;
        this.categoryDetail = categoryDetail;
        this.briefIntroduction = briefIntroduction;
        this.leaderId = leaderId;
        this.activityArea = activityArea;
        this.leaderIntroductionTitle = leaderIntroductionTitle;
        this.leaderIntroduction = leaderIntroduction;
        this.partyIntroductionTitle = groupIntroductionTitle;
        this.partyIntroduction = groupIntroduction;
        this.thumbnail = thumbnail;
        this.partyIntroductionImage = partyIntroductionImage;
        this.leaderProfileImage = leaderProfileImage;
        this.createdTime = LocalDateTime.now();
    }
}
