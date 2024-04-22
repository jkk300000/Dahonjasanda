package com.multi.dahon.finance.vo;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter
public class MortgageLoanOption {

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
    private String mrtgType;
    
    @Column(nullable = false)
    private String mrtgTypeNm;
    
    @Column(nullable = false)
    private String rpayType;
    
    @Column(nullable = false)
    private String rpayTypeNm;
    
    @Column(nullable = false)
    private String lendRateType;
    
    @Column(nullable = false)
    private String lendRateTypeNm;
    
    @Column(nullable = false)
    private BigDecimal lendRateMin;
    
    @Column(nullable = false)
    private BigDecimal lendRateMax;
    
    @Column(nullable = true)
    private BigDecimal lendRateAvg; // Can be null

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mortgage_loan_id")
    private MortgageLoan mortgageLoan;

    // 연관관계 편의 메소드!!!  양쪽에 다 값을 넣어줌
    public void setMortgageLoan(MortgageLoan mortgageLoan) {
        this.mortgageLoan = mortgageLoan;
        mortgageLoan.getOptions().add(this);
    }

    protected MortgageLoanOption() {
    }
    
    public MortgageLoanOption(String dclsMonth, String finCoNo, String finPrdtCd, String mrtgType, String mrtgTypeNm, String rpayType, String rpayTypeNm, String lendRateType, String lendRateTypeNm, BigDecimal lendRateMin, BigDecimal lendRateMax, BigDecimal lendRateAvg) {
        this.dclsMonth = dclsMonth;
        this.finCoNo = finCoNo;
        this.finPrdtCd = finPrdtCd;
        this.mrtgType = mrtgType;
        this.mrtgTypeNm = mrtgTypeNm;
        this.rpayType = rpayType;
        this.rpayTypeNm = rpayTypeNm;
        this.lendRateType = lendRateType;
        this.lendRateTypeNm = lendRateTypeNm;
        this.lendRateMin = lendRateMin;
        this.lendRateMax = lendRateMax;
        this.lendRateAvg = lendRateAvg;
    }
}