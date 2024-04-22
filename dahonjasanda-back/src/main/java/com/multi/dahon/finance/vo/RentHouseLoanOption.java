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
public class RentHouseLoanOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column
    private String dclsMonth;
    
    @Column
    private String finCoNo;
    
    @Column
    private String finPrdtCd;
    
    @Column
    private String rpayType;
    
    @Column
    private String rpayTypeNm;
    
    @Column
    private String lendRateType;
    
    @Column
    private String lendRateTypeNm;
    
    @Column
    private BigDecimal lendRateMin; // Can be null
    
    @Column
    private BigDecimal lendRateMax; // Can be null
    
    @Column
    private BigDecimal lendRateAvg; // Can be null

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rent_house_loan_id")
    private RentHouseLoan rentHouseLoan;

    // 연관관계 편의 메소드!!!  양쪽에 다 값을 넣어줌
    public void setRentHouseLoan(RentHouseLoan rentHouseLoan) {
        this.rentHouseLoan = rentHouseLoan;
        rentHouseLoan.getOptions().add(this);
    }

    public RentHouseLoanOption(String dclsMonth, String finCoNo, String finPrdtCd, String rpayType, String rpayTypeNm, String lendRateType, String lendRateTypeNm, BigDecimal lendRateMin, BigDecimal lendRateMax, BigDecimal lendRateAvg) {
        this.dclsMonth = dclsMonth;
        this.finCoNo = finCoNo;
        this.finPrdtCd = finPrdtCd;
        this.rpayType = rpayType;
        this.rpayTypeNm = rpayTypeNm;
        this.lendRateType = lendRateType;
        this.lendRateTypeNm = lendRateTypeNm;
        this.lendRateMin = lendRateMin;
        this.lendRateMax = lendRateMax;
        this.lendRateAvg = lendRateAvg;
    }

    protected RentHouseLoanOption() {
    }

}