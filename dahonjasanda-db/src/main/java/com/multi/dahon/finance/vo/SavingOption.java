package com.multi.dahon.finance.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class SavingOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String dclsMonth;
    
    @Column(nullable = false)
    private String finCoNo;
    
    @Column(nullable = false)
    private String finPrdtCd;
    
    @Column(nullable = false)
    private String intrRateType;
    
    @Column(nullable = false)
    private String intrRateTypeNm;
    
    @Column(nullable = false)
    private String rsrvType; // Reservation type
    
    @Column(nullable = false)
    private String rsrvTypeNm; // Reservation type name
    
    @Column(nullable = false)
    private Integer saveTrm; // Saving term in months
    
    @Column
    private BigDecimal intrRate;
    
    @Column
    private BigDecimal intrRate2; // Highest preferential interest rate

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saving_id")
    private Saving saving;


    public String identifying() {
        return getFinCoNo() + "_" + getFinPrdtCd();
    }

    // 연관관계 편의 메소드 내쪽에서 한번 넣을때 상대편 리스트에도 나를 넣는다.
    public void setSaving(Saving saving) {
        // 내꺼에 세이빙 저장
        this.saving = saving;
        // 상대방 리스트에 나를 저장
        saving.getOptions().add(this);
    }

    // JPA 사용하려면 기본 생성자가 필요해서 만들어놓은거고 사용안하려고 protected 로 막아놨음
    protected SavingOption() {
    }

    public SavingOption(String dclsMonth, String finCoNo, String finPrdtCd, String intrRateType, String intrRateTypeNm, String rsrvType, String rsrvTypeNm, Integer saveTrm, BigDecimal intrRate, BigDecimal intrRate2) {
        this.dclsMonth = dclsMonth;
        this.finCoNo = finCoNo;
        this.finPrdtCd = finPrdtCd;
        this.intrRateType = intrRateType;
        this.intrRateTypeNm = intrRateTypeNm;
        this.rsrvType = rsrvType;
        this.rsrvTypeNm = rsrvTypeNm;
        this.saveTrm = saveTrm;
        this.intrRate = intrRate;
        this.intrRate2 = intrRate2;
    }
}