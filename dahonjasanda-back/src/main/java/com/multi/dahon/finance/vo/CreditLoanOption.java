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
public class CreditLoanOption {
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
    private String crdtPrdtType;
    
    @Column(nullable = false)
    private String crdtLendRateType;
    
    @Column(nullable = false)
    private String crdtLendRateTypeNm;
    
    @Column(nullable = true)
    private BigDecimal crdtGrad1; // Can be null
    
    @Column(nullable = true)
    private BigDecimal crdtGrad4; // Can be null
    
    @Column(nullable = true)
    private BigDecimal crdtGrad5; // Can be null
    
    @Column(nullable = true)
    private BigDecimal crdtGrad6; // Can be null
    
    @Column(nullable = true)
    private BigDecimal crdtGrad10; // Can be null
    
    @Column(nullable = true)
    private BigDecimal crdtGrad11; // Can be null
    
    @Column(nullable = true)
    private BigDecimal crdtGrad12; // Can be null
    
    @Column(nullable = true)
    private BigDecimal crdtGrad13; // Can be null
    
    @Column(nullable = true)
    private BigDecimal crdtGradAvg; // Can be null

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "credit_loan_id")
    private CreditLoan creditLoan;

    protected CreditLoanOption() {
    }

    public CreditLoanOption(String dclsMonth, String finCoNo, String finPrdtCd, String crdtPrdtType, String crdtLendRateType, String crdtLendRateTypeNm, BigDecimal crdtGrad1, BigDecimal crdtGrad4, BigDecimal crdtGrad5, BigDecimal crdtGrad6, BigDecimal crdtGrad10, BigDecimal crdtGrad11, BigDecimal crdtGrad12, BigDecimal crdtGrad13, BigDecimal crdtGradAvg) {
        this.dclsMonth = dclsMonth;
        this.finCoNo = finCoNo;
        this.finPrdtCd = finPrdtCd;
        this.crdtPrdtType = crdtPrdtType;
        this.crdtLendRateType = crdtLendRateType;
        this.crdtLendRateTypeNm = crdtLendRateTypeNm;
        this.crdtGrad1 = crdtGrad1;
        this.crdtGrad4 = crdtGrad4;
        this.crdtGrad5 = crdtGrad5;
        this.crdtGrad6 = crdtGrad6;
        this.crdtGrad10 = crdtGrad10;
        this.crdtGrad11 = crdtGrad11;
        this.crdtGrad12 = crdtGrad12;
        this.crdtGrad13 = crdtGrad13;
        this.crdtGradAvg = crdtGradAvg;
    }

    // 연관관계 편의 메소드 !!!!
    public void setCreditLoan(CreditLoan creditLoan) {
        this.creditLoan = creditLoan;
        creditLoan.getOptions().add(this);
    }


}